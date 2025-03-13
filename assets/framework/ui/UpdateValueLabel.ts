import { Component, Label, _decorator } from "cc";
import { coin } from "../tools/CocosHelper";
const { ccclass, requireComponent } = _decorator;

@ccclass("UpdateValueLabel")
@requireComponent(Label)
export class UpdateValueLabel extends Component {
  isPlaying: boolean = false;
  startVal = 0;
  endVal = 0;
  currVal = 0;
  diffVal = 0;
  currTime = 0;
  changingTime = 0;
  label: Label = null!;

  playUpdateValue({
    startVal = 0,
    endVal,
    changingTime = 0.3,
  }: {
    startVal?: number;
    endVal: number;
    changingTime?: number;
  }) {
    this.startVal = startVal;
    this.endVal = endVal;
    this.diffVal = this.endVal - this.startVal;
    this.currTime = 0;
    this.changingTime = changingTime;
    this.currVal = endVal;
    this.label = this.node.getComponent(Label)!;
    this.label.string = coin(startVal);
    this.isPlaying = true;
  }

  update(dt: number) {
    if (!this.isPlaying) return;

    if (this.currTime < this.changingTime) {
      this.currTime = Math.min(this.currTime + dt, this.changingTime);
      const progress = this.currTime / this.changingTime;

      // Tính toán giá trị hiện tại với độ chính xác số thực
      const exactValue = this.startVal + this.diffVal * progress;

      // Làm tròn theo hướng về phía endVal
      const currVal = this.calculateRoundedValue(exactValue, progress);

      this.label.string = coin(currVal);
      return;
    }

    this.label.string = coin(this.endVal);
    this.isPlaying = false;
  }

  private calculateRoundedValue(exactValue: number, progress: number): number {
    // Làm tròn theo hướng di chuyển của giá trị
    if (this.diffVal > 0) {
      return Math.floor(exactValue);
    }
    return Math.ceil(exactValue);
  }
}
