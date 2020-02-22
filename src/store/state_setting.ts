import CryptoJS from "crypto-js";
import { saveJson } from "@/components/common/Utility";

export default {
  // FIXME settingのデータは別経路で保存する？
  state: {
    /** バージョン */
    version: "1.0.2",
    magicWord: "I walk slowly, but I never walk backward.",
    /** 接続情報 */
    connect: {
      skywayKey: "",
      type: "",
      bcdiceServer: ""
    },
    /** 権限 */
    roles: [
      {
        label: "玩家",
        value: "PL",
        description: "無法更改某些房間和其他玩家的設定。"
      },
      {
        label: "GM",
        value: "GM",
        description: "可以更改所有房間和其他玩家的設定。"
      },
      {
        label: "副GM",
        value: "副GM",
        description: "外觀不同，與GM有相同的權限。"
      },
      {
        label: "觀戰者",
        value: "觀戰者",
        description: "無法變更所有房間和玩家的設定。"
      }
    ],
    systemLog: {
      name: "Quoridorn",
      colorKey: "color-Quoridorn",
      color: "#000",
      tab: "chatTab-1",
      from: "Quoridorn"
    },
    chatFormat: {
      lineRegExp: null,
      borderStyleRegExp: null,
      styleRegExp: null,
      targetList: []
    }
  } /* end of state */,

  actions: {
    onTest({ rootGetters }: { rootGetters: any }) {
      // 特定の位置にファイルが置いてあったら変換する
      rootGetters
        .loadJson("/static/mod/bgm.json")
        .then((bgmJson: any) => {
          const bgmList: any[] = bgmJson.saveData;
          if (!bgmList.length) return;
          const data: any = bgmList.map((bgm: any) => {
            if (!/youtube/.test(bgm.url)) {
              window.console.log("--------------");
              window.console.log(bgm.url);
              bgm.url = rootGetters.decrypt({ cipherText: bgm.url });
              window.console.log(bgm.url);
            }
            if (bgm.forceReset === undefined) {
              bgm.forceReset = true;
            }
            delete bgm.key;
            return bgm;
          });

          setTimeout(() => {
            window.console.log(
              "-----------------------------------------------------",
              bgmList
            );
            saveJson("bgmData", {
              saveDataTypeName: "Quoridorn_BGM_01",
              saveData: data
            });
          }, 500);
        })
        .catch(() => {});
    },

    /**
     * ダイスボット一覧を取得する
     * @param state
     */
    getBcdiceSystemList({ state }: { state: any }) {
      return new Promise((resolve: Function, reject: Function) => {
        const url = `${state.connect.bcdiceServer}/v1/names`;
        fetch(url)
          .then(response => response.json())
          .then(json => {
            json.names.sort((i1: any, i2: any) => {
              if (i1.name === "DiceBot") return -1;
              if (i2.name === "DiceBot") return 1;
              if (i1.name > i2.name) return 1;
              if (i1.name < i2.name) return -1;
              return 0;
            });
            resolve(json.names);
          })
          .catch(err => reject(err));
      });
    },

    /**
     * ダイスボットの情報を取得する
     * @param state
     * @param system
     */
    getBcdiceSystemInfo({ state }: { state: any }, system: string) {
      return new Promise((resolve: Function, reject: Function) => {
        const params: string = `system=${system}`;
        const url = `${state.connect.bcdiceServer}/v1/systeminfo?${params}`;
        fetch(url)
          .then(response => response.json())
          .then(json => {
            if (json.ok) {
              resolve(json.systeminfo);
            } else {
              reject(json);
            }
          })
          .catch(err => reject(err));
      });
    },

    /**
     * ダイスコマンドを送信して結果を取得する
     * @param state
     * @param system
     * @param command
     */
    sendBcdiceServer(
      { state }: { state: any },
      { system, command }: { system: string; command: string }
    ) {
      return new Promise((resolve: Function, reject: Function) => {
        const params: string = [
          `system=${system}`,
          `command=${encodeURIComponent(command)}`
        ].join("&");
        const url = `${state.connect.bcdiceServer}/v1/diceroll?${params}`;

        try {
          fetch(url)
            .then(response => response.json())
            .then(json => {
              resolve(json);
            });
          // .catch(err => { /* 無視 */ }); // reject(err)
        } catch (error) {
          window.console.error(error);
          // 無視
        }
      });
    }
  },

  mutations: {
    init_state_setting: (state: any) => {
      /* ----------------------------------------------------------------------
       * チャット整形に使う正規表現の初期化
       */
      const colorFormat = "#[0-9a-f]+|rgba? *\\([0-9., ]+\\)|[a-z]+";
      const lineStyleFormat = "solid|double|dotted|dashed|wavy";
      state.chatFormat.borderStyleRegExp = new RegExp(lineStyleFormat, "gi");
      const colorAndLineFormat = `(${lineStyleFormat}|${colorFormat})`;
      const styleRegExpList = [
        `(b?c)(?: *{ *)(${colorFormat})(?: *})`,
        `([uo])(?: *{ *)${colorAndLineFormat}(?: *\\| *${colorAndLineFormat})?(?: *})`,
        "(b)",
        "(i)",
        "(lt)",
        "(r)(?: *{ *)([^}]+)(?: *})"
      ];
      const styleRegExpStr = `(?:: *)(?:${styleRegExpList.join("|")})`;
      state.chatFormat.styleRegExp = new RegExp(styleRegExpStr, "gi");

      const regExpStr = `\\[\\[ *style((?: *${styleRegExpStr})*) *]]`;
      // window.console.log(regExpStr);
      state.chatFormat.lineRegExp = new RegExp(regExpStr, "gi");
    }
  },

  getters: {
    roles: (state: any) => state.roles,
    systemLog: (state: any) => state.systemLog,
    magicWord: (state: any) => state.magicWord,
    chatOptionPagingSize: () => 8,
    skywayKey: (state: any) => state.connect.skywayKey,
    connectType: (state: any) => state.connect.type,
    version: (state: any) => state.version,
    bcdiceServer: (state: any) => state.bcdiceServer,
    chatFormats: (state: any) => state.chatFormat.targetList,
    chatLineRegExp: (state: any) => state.chatFormat.lineRegExp,
    borderStyleRegExp: (state: any) => state.chatFormat.borderStyleRegExp,
    chatStyleRegExp: (state: any) => state.chatFormat.styleRegExp,

    /** 暗号化 */
    encrypt: (state: any) => ({
      planeText,
      salt = state.magicWord
    }: {
      planeText: string;
      salt: string;
    }) => {
      // window.console.log("------encrypt------");
      // window.console.log(planeText);
      // window.console.log(encodeURIComponent(planeText));
      return CryptoJS.AES.encrypt(
        encodeURIComponent(planeText),
        salt
      ).toString();
    },

    /** 復号化 */
    decrypt: (state: any) => ({
      cipherText,
      salt = state.magicWord
    }: {
      cipherText: string;
      salt: string;
    }) => {
      // window.console.log("decrypt", salt, cipherText);
      // window.console.log(CryptoJS.AES.decrypt(cipherText, salt).toString(CryptoJS.enc.Utf8));
      return decodeURIComponent(
        CryptoJS.AES.decrypt(cipherText, salt).toString(CryptoJS.enc.Utf8)
      );
    }
  }
};
