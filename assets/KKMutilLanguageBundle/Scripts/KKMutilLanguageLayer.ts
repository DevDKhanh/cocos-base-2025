/**
 *
 * @author DESKTOP-KJPUS6T
 * @created 3/14/2025, 11:04:45 AM
 */

import { _decorator, Component, Node, Event } from "cc";
import { LayerBase } from "../../framework/ui/LayerBase";
import kk from "../../framework/kk";
import { KKLayerConf } from "../../Boot/Scripts/KKGameUIConf";
const { ccclass, property } = _decorator;

@ccclass("KKMutilLanguageLayer")
export class KKMutilLanguageLayer extends LayerBase {
  onLoad() {}

  start() {}

  onBtnClick(evt: Event, name: string): void {
    switch (name) {
      case "en":
      case "vi":
        kk.lang.loadLanguage(name);
        break;
      case "back":
        kk.uiMgr.goLayerAsync(KKLayerConf.Hall);
        break;
    }
  }
}
