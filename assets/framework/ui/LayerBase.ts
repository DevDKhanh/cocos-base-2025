/**
 *
 * @author Mortal-Li
 * @created Mon Apr 15 2024 15:13:44 GMT+0800 (中国标准时间)
 */

import { _decorator } from "cc";
import { UIBase } from "./UIBase";
const { ccclass } = _decorator;

@ccclass("LayerBase")
export class LayerBase extends UIBase {
  refresh() {}
}
