import { Button, Component, Node, _decorator } from "cc";
import kk from "../kk";
const { ccclass, property, menu, requireComponent, disallowMultiple } =
  _decorator;

@ccclass("btnAdapter")
@menu("Custom Components/BtnAdapter")
@requireComponent(Button)
@disallowMultiple
export class BtnAdapter extends Component {
  /**
   * Có phát âm thanh khi nhấn hay không
   * @property isPlaySound
   * @type {Boolean}
   * @default true
   */
  @property({ tooltip: "Có phát âm thanh khi nhấn hay không" })
  isPlaySound = true;

  /**
   * Tên của hiệu ứng âm thanh khi nhấn
   * @property clickSoundName
   * @type {String}
   * @default "click"
   */
  @property({ tooltip: "Tên của hiệu ứng âm thanh khi nhấn" })
  clickSoundName = "click";

  /**
   * Có ngăn chặn nhấn liên tiếp nhanh hay không
   * @property isPreventSecondClick
   * @type {Boolean}
   * @default false
   */
  @property({ tooltip: "Có ngăn chặn nhấn liên tiếp nhanh hay không" })
  isPreventSecondClick = false;

  /**
   * Khoảng thời gian (tính bằng giây) cần thiết trước khi cho phép nhấn lại.
   * Chỉ có hiệu lực khi `isPreventSecondClick` được bật.
   * @property preventTime
   * @type {number}
   * @default 2
   */
  @property({
    tooltip:
      "Khoảng thời gian (tính bằng giây) cần thiết trước khi cho phép nhấn lại. Chỉ có hiệu lực khi isPreventSecondClick được bật.",
  })
  preventTime = 200;

  start() {
    const button = this.node.getComponent(Button)!;
    this.node.on("click", () => {
      if (this.isPreventSecondClick) {
        button.interactable = false;
        this.scheduleOnce(() => {
          if (button.node) button.interactable = true;
        }, this.preventTime);
      }

      // Bỏ ghi chú và triển khai trình quản lý âm thanh để phát âm thanh
      if (this.isPlaySound)
        kk.soundMgr.playEffectAsync(this.clickSoundName, "Audios", false);
    });
  }
}
