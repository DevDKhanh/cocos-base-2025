import { _decorator, Component, Label, warn } from "cc";
import kk from "../kk";
const { ccclass, property } = _decorator;

@ccclass("LocalizedLabel")
export class LocalizedLabel extends Component {
  @property({ tooltip: "Key for localization" })
  key: string = "";

  @property({ tooltip: "Optional parameters" })
  params: string[] = [];

  @property(Label)
  label: Label = null!;

  protected onLoad(): void {
    if (!this.label) {
      this.label = this.node.getComponent(Label);
    }
  }

  start() {
    if (!this.label) {
      warn("LocalizedLabel requires a Label component!");
      return;
    }
    kk.lang.registerLabel(this);
    kk.eventMgr.on("language-changed", this.updateText, this);
    this.updateText();
  }

  protected onDestroy(): void {
    kk.lang.unregisterLabel(this);
    kk.eventMgr.offTargetAll(this);
  }

  updateText() {
    const localizedText = kk.lang.getText(this.key, this.params);
    this.label.string = localizedText;
  }
}
