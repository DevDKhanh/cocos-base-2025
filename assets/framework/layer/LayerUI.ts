import { instantiate, Node, Prefab, SafeArea, Widget } from "cc";
import { UICallbacks, ViewParams } from "./Defines";
import { DelegateComponent } from "./DelegateComponent";
import { UIConfig } from "./LayerManager";

/** 界面层对象 */
export class LayerUI extends Node {
  /** 全局窗口打开失败 */
  onOpenFailure: Function = null!;
  /** 显示界面节点集合 */
  protected ui_nodes = new Map<string, ViewParams>();
  /** 被移除的界面缓存数据 */
  protected ui_cache = new Map<string, ViewParams>();

  /**
   * UI基础层，允许添加多个预制件节点
   * @param name 该层名
   */
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
  }
}
