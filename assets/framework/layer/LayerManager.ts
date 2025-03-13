import {
  Camera,
  Layers,
  Node,
  ResolutionPolicy,
  SafeArea,
  Widget,
  screen,
  view,
  warn,
} from "cc";
import { UICallbacks } from "./Defines";
import { DelegateComponent } from "./DelegateComponent";
import { LayerDialog } from "./LayerDialog";
import { LayerNotify } from "./LayerNotify";
import { LayerPopUp } from "./LayerPopup";
import { LayerUI } from "./LayerUI";
import kk from "../kk";

/** 屏幕适配类型 */
export enum ScreenAdapterType {
  /** 自动适配 */
  Auto,
  /** 横屏适配 */
  Landscape,
  /** 竖屏适配 */
  Portrait,
}

/** 界面层类型 */
export enum LayerType {
  /** 二维游戏层 */
  Game = "LayerGame",
  /** 主界面层 */
  UI = "LayerUI",
  /** 弹窗层 */
  PopUp = "LayerPopUp",
  /** 模式窗口层 */
  Dialog = "LayerDialog",
  /** 系统触发模式窗口层 */
  System = "LayerSystem",
  /** 滚动消息提示层 */
  Notify = "LayerNotify",
  /** 新手引导层 */
  Guide = "LayerGuide",
}

/** 
 * 界面配置结构体
 * @help    https://gitee.com/dgflash/oops-framework/wikis/pages?sort_id=12037986&doc_id=2873565
 * @example
// 界面唯一标识
export enum UIID {
    Loading = 1,
    Window,
    Netinstable
}

// 打开界面方式的配置数据
export var UIConfigData: { [key: number]: UIConfig } = {
    [UIID.Loading]: { layer: LayerType.UI, prefab: "loading/prefab/loading", bundle: "resources" },
    [UIID.Netinstable]: { layer: LayerType.PopUp, prefab: "common/prefab/netinstable" },
    [UIID.Window]: { layer: LayerType.Dialog, prefab: "common/prefab/window" }
}
 */
export interface UIConfig {
  /** -----公共属性----- */
  /** 远程包名 */
  bundle?: string;
  /** 窗口层级 */
  layer: LayerType;
  /** 预制资源相对路径 */
  prefab: string;
  /** 是否自动施放（默认不自动释放） */
  destroy?: boolean;

  /** -----弹窗属性----- */
  /** 是否触摸非窗口区域关闭（默认关闭） */
  vacancy?: boolean;
  /** 是否打开窗口后显示背景遮罩（默认关闭） */
  mask?: boolean;
  /** 是否启动真机安全区域显示 */
  safeArea?: boolean;
}

/** 界面层级管理器 */
export class LayerManager {
  /** 界面根节点 */
  root!: Node;
  /** 界面摄像机 */
  camera!: Camera;
  /** 游戏界面特效层 */
  game!: Node;
  /** 新手引导层 */
  guide!: Node;

  /** 窗口宽高比例 */
  windowAspectRatio: number = 0;
  /** 设计宽高比例 */
  designAspectRatio: number = 0;
  /** 是否开启移动设备安全区域适配 */
  mobileSafeArea: boolean = false;

  /** 界面层 */
  private ui!: LayerUI;
  /** 弹窗层 */
  private popup!: LayerPopUp;
  /** 只能弹出一个的弹窗 */
  private dialog!: LayerDialog;
  /** 游戏系统提示弹窗  */
  private system!: LayerDialog;
  /** 消息提示控制器，请使用show方法来显示 */
  private notify!: LayerNotify;
  /** UI配置 */
  private configs: { [key: number]: UIConfig } = {};

  initLayer(root: Node) {
    this.root = root;
    this.initScreenAdapter();
    this.camera = this.root.getComponentInChildren(Camera)!;
    this.game = this.create_node(LayerType.Game);

    this.ui = new LayerUI(LayerType.UI);
    this.popup = new LayerPopUp(LayerType.PopUp);
    this.dialog = new LayerDialog(LayerType.Dialog);
    this.system = new LayerDialog(LayerType.System);
    this.notify = new LayerNotify(LayerType.Notify);
    this.guide = this.create_node(LayerType.Guide);

    root.addChild(this.game);
    root.addChild(this.ui);
    root.addChild(this.popup);
    root.addChild(this.dialog);
    root.addChild(this.system);
    root.addChild(this.notify);
    root.addChild(this.guide);
  }

  private initScreenAdapter() {
    const drs = view.getDesignResolutionSize();
    const ws = screen.windowSize;
    this.windowAspectRatio = ws.width / ws.height;
    this.designAspectRatio = drs.width / drs.height;

    let finalW: number = 0;
    let finalH: number = 0;

    if (this.windowAspectRatio > this.designAspectRatio) {
      finalH = drs.height;
      finalW = (finalH * ws.width) / ws.height;
    } else {
      finalW = drs.width;
      finalH = (finalW * ws.height) / ws.width;
    }
    view.setDesignResolutionSize(finalW, finalH, ResolutionPolicy.UNKNOWN);

    if (this.mobileSafeArea) {
      this.root.addComponent(SafeArea);
    }
  }

  private create_node(name: string) {
    const node = new Node(name);
    node.layer = Layers.Enum.UI_2D;
    const w: Widget = node.addComponent(Widget);
    w.isAlignLeft = w.isAlignRight = w.isAlignTop = w.isAlignBottom = true;
    w.left = w.right = w.top = w.bottom = 0;
    w.alignMode = 2;
    w.enabled = true;
    return node;
  }
}
