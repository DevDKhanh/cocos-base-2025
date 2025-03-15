import { _decorator, resources, JsonAsset } from "cc";
import kk from "../kk";
import { LocalizedLabel } from "../ui/LocalizedLabel";

export class LocalizationManager {
  private currentLang: string = "vi";
  private langData: any = {};
  private labels: LocalizedLabel[] = [];

  async loadLanguage(lang: string) {
    lang = lang.toLowerCase();
    kk.localMgr.setItem("selectedLang", `${lang}`);
    try {
      const data = await new Promise<JsonAsset>((resolve, reject) => {
        resources.load(
          `lang/${lang}`,
          JsonAsset,
          (err: Error, data: JsonAsset) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
      this.currentLang = lang;
      this.langData = data.json;
      this.updateAllLabels();
      kk.eventMgr.emit("language-changed");
    } catch (err) {
      console.error("Failed to load language file:", err);
    }
  }

  registerLabel(label: LocalizedLabel) {
    this.labels.push(label);
  }

  unregisterLabel(label: LocalizedLabel) {
    this.labels = this.labels.filter((l) => l !== label);
  }

  updateAllLabels() {
    this.labels.forEach((label) => label.updateText());
  }

  getText(key: string, params?: any[]): string {
    let text = this.langData[key] || key;
    if (params) {
      params.forEach((value, index) => {
        text = text.replace(`{${index}}`, value.toString());
      });
    }
    return text;
  }

  // Lấy ngôn ngữ hệ thống hoặc từ Local Storage
  detectLanguage(): string {
    const savedLang = kk.localMgr.getItemWithDefault("selectedLang", "vi");
    const systemLang = navigator.language.split("-")[0]; // 'en', 'vi', etc.
    return savedLang || systemLang || "vi";
  }
}
