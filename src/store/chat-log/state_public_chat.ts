export default {
  /** 聊天視窗 */
  state: {
    /** 聊天視窗的タブ */
    tab: {
      list: [{ key: "chatTab-1", name: "分頁" }],
      isVertical: false
    },

    /** グループ聊天視窗的タブ */
    groupTargetTab: {
      list: [
        {
          key: "groupTargetTab-0",
          isSecret: false,
          name: "全部人",
          targetTab: null,
          isAll: true,
          group: []
        }
      ]
    },

    /** 聊天視窗的リスト */
    logs: [],

    /** 輸入中的ルームメイト的peerId列表 */
    inputting: {},

    diceBotMessage: {
      isView: false,
      message: ""
    }
  },
  actions: {
    /**
     * NOTICE_INPUT
     * ルームメンバ的輸入中狀態的通知
     * @param commit
     * @param key
     */
    noticeInput: (
      { commit }: { commit: Function },
      { key }: { key: string }
    ) => {
      // 即時輸入カウントアップ
      commit("inputPeerId", { key: key, add: 1 });
      // 少し経ったらカウントダウン
      setTimeout(() => {
        commit("inputPeerId", { key: key, add: -1 });
      }, 400);
    }
  },
  mutations: {
    /**
     * 聊天視窗ログを設定是
     * @param state
     * @param logs
     * @returns { *[] }
     */
    setChatLogs: (state: any, logs: any[]) => {
      state.logs = logs;
    },
    /**
     * 聊天視窗分頁設定是
     * @param state
     * @param chatTabs
     * @returns { *[] }
     */
    setChatTabs: (state: any, chatTabs: any[]) => {
      state.tab.list = chatTabs;
    },
    /**
     * グループ聊天視窗分頁設定是
     * @param state
     * @param groupTargetTabList
     * @returns { *[] }
     */
    setGroupTargetTabList: (state: any, groupTargetTabList: any[]) => {
      state.groupTargetTab.list = groupTargetTabList;
    },
    setChatTabVertical: (state: any, isVertical: boolean) =>
      (state.tab.isVertical = isVertical)
  },
  getters: {
    chatLogs: (state: any): any[] => state.logs,
    chatTabList: (state: any): any[] => state.tab.list,
    groupTargetTabList: (state: any): any => state.groupTargetTab.list,
    isChatTabVertical: (state: any) => state.tab.isVertical,
    getChatColor: (
      state: any,
      getters: any,
      rootState: any,
      rootGetters: any
    ) => (actorKey: string) => {
      const actor = rootGetters.getObj(actorKey);
      if (!actor) return "black";
      if (actor.fontColorType === "0") {
        const owner = rootGetters.getObj(actor.owner);
        return owner.fontColor;
      }
      return actor.fontColor;
    },
    colorMap: (state: any, getters: any, rootState: any, rootGetters: any) => {
      const resultObj: any = {};
      resultObj[rootGetters.systemLog.colorKey] = rootGetters.systemLog.color;
      rootGetters.characterList.forEach((c: any) => {
        resultObj[`color-${c.key}`] = rootGetters.getChatColor(c.key);
      });
      rootGetters.playerList.forEach((p: any) => {
        resultObj[`color-${p.key}`] = p.fontColor;
      });
      // window.console.log(JSON.stringify(resultObj, null, "    "));
      return resultObj;
    }
  }
};
