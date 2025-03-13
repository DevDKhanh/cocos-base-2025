/*
 * @Author: dgflash
 * @Date: 2022-08-15 10:06:47
 * @LastEditors: dgflash
 * @LastEditTime: 2022-09-02 13:44:12
 */
import { BlockInputEvents, Layers, Node, Widget, instantiate } from "cc";

/*
 * 滚动消息提示层
 */
export class LayerNotify extends Node {
  private black!: BlockInputEvents;

  constructor(name: string) {
    super(name);

    const widget: Widget = this.addComponent(Widget);
    widget.isAlignLeft =
      widget.isAlignRight =
      widget.isAlignTop =
      widget.isAlignBottom =
        true;
    widget.left = widget.right = widget.top = widget.bottom = 0;
    widget.alignMode = 2;
    widget.enabled = true;
    this.init();
  }

  private init() {
    this.layer = Layers.Enum.UI_2D;
    this.black = this.addComponent(BlockInputEvents);
    this.black.enabled = false;
  }
}
