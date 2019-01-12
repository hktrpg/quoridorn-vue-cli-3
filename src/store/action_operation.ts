// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'bcdice-js/lib/preload-dicebots'
import Vue from "vue";
import Vuex from "vuex";
import { qLog } from "@/components/common/Utility";

Vue.use(Vuex);

/**
 * Store
 * @type { Vuex }
 */
export default {
  actions: {
    /** ========================================================================
     * チャットログを追加する
     */
    addChatLog: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", {
        value: payload,
        method: "doAddChatLog"
      });
    },
    doAddChatLog: (
      {
        dispatch,
        rootState,
        rootGetters
      }: { dispatch: Function; rootState: any; rootGetters: any },
      payload: any
    ) => {
      let text = payload.text;
      if (!text.startsWith("@")) {
        const activeChatTab = rootGetters.activeChatTab;
        const name = payload.name;
        const color = payload.color;
        const tab = payload.tab ? payload.tab : activeChatTab.name;
        const from = payload.from;
        const target = payload.target;
        let viewHtml;
        if (target) {
          const targetName = rootGetters.getObj(target).name;
          viewHtml = `<span style="color: ${color};"><b>${name} > ${targetName}</b>：${text.replace(
            /\r?\n/g,
            "<br>"
          )}</span>`;
        } else {
          viewHtml = `<span style="color: ${color};"><b>${name}</b>：${text.replace(
            /\r?\n/g,
            "<br>"
          )}</span>`;
        }
        const logObj = {
          owner: payload.owner,
          target: target,
          from: from,
          viewHtml: viewHtml
        };
        // 未読カウントアップ
        if (tab !== activeChatTab.name) {
          const tabObj = rootState.public.chat.tabs.filter(
            (tabObj: any) => tabObj.name === tab
          )[0];
          tabObj.unRead++;
          const index = rootState.public.chat.tabs.indexOf(tabObj);
          rootState.public.chat.tabs.splice(index, 1, tabObj);
        }
        rootState.public.chat.logs[tab].push(logObj);
      }

      // チャット文字連携処理
      dispatch("chatLinkage", text);
    },
    /** ========================================================================
     * チャット文字色変更
     */
    changeChatFontColor: (
      { dispatch }: { dispatch: Function },
      payload: any
    ) => {
      dispatch("sendNoticeOperation", {
        value: payload,
        method: "doChangeChatFontColor"
      });
    },
    doChangeChatFontColor: (
      {
        dispatch,
        rootState,
        rootGetters
      }: { dispatch: Function; rootState: any; rootGetters: any },
      {
        key,
        color,
        historyChange
      }: { key: string; color: string; historyChange: boolean }
    ) => {
      window.console.log("doChangeChatFontColor", key, color, historyChange);
      const kind = key.split("-")[0];
      const target = rootState.public[kind].list.filter(
        (obj: any) => obj.key === key
      )[0];
      window.console.log(target, rootState.public[kind]);
      if (!target) return;
      target.fontColor = color;
      if (!historyChange) return;
      const change: any = {};
      for (const tab in rootState.public.chat.logs) {
        if (!rootState.public.chat.logs.hasOwnProperty(tab)) continue;
        const changeTab: any = {};
        change[tab] = changeTab;
        rootState.public.chat.logs[tab].forEach((log: any, index: number) => {
          window.console.log(
            "chatLogs",
            tab,
            log.owner,
            target.key,
            log.owner !== target.key,
            log.viewHtml
          );
          if (log.owner !== target.key) return;
          window.console.log("push");
          changeTab[index] = {
            viewHtml: log.viewHtml.replace(
              /^(<span style="color: )([^;]+)(;">)/,
              `$1${color}$3`
            )
          };
        });
      }
      dispatch("setProperty", {
        property: `public.chat.logs`,
        value: change,
        isNotice: false,
        logOff: false
      });
    },
    /** ========================================================================
     * チャット文字連携処理
     */
    chatLinkage: (
      {
        dispatch,
        rootState,
        rootGetters
      }: { dispatch: Function; rootState: any; rootGetters: any },
      text: string
    ) => {
      rootState.setting.bgm.list
        .filter((bgmObj: any) => {
          if (
            bgmObj.chatLinkage === 1 &&
            text.endsWith(bgmObj.chatLinkageSearch)
          ) {
            return true;
          }
          return (
            bgmObj.chatLinkage === 2 &&
            new RegExp(bgmObj.chatLinkageSearch).test(text)
          );
        })
        .sort((a: any, b: any) => {
          if (a.title.length > b.title.length) return -1;
          if (a.title.length < b.title.length) return 1;
          return 0;
        })
        .filter(
          (bgmObj: any, index: number, self: any) =>
            self.filter(
              (s: any, i: number) => index > i && s.tag === bgmObj.tag
            ).length === 0
        )
        .forEach((bgmObj: any) => {
          dispatch("setProperty", {
            property: "private.display.jukeboxWindow.command",
            isNotice: true,
            value: { command: "add", payload: bgmObj.key }
          });
        });
    },
    /** ========================================================================
     * 画像を追加する
     */
    addImage: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", { value: payload, method: "doAddImage" });
    },
    doAddImage: (
      { rootState, rootGetters }: { rootState: any; rootGetters: any },
      {
        tag,
        data,
        ownerPeerId
      }: { tag: string; data: any; ownerPeerId: string }
    ) => {
      // 欠番を埋める方式は不採用
      let maxKey = rootState.public.image.maxKey;
      const key = `image-${++maxKey}`;
      rootState.public.image.maxKey = maxKey;
      rootState.public.image.list.push({
        tag: tag,
        data: data,
        key: key
      });
      if (rootGetters.peerId === ownerPeerId) {
        rootState.private.history.push({ type: "add", key: key });
      }
    },
    /** ========================================================================
     * BGMを追加する
     */
    addBGM: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", { value: payload, method: "doAddBGM" });
    },
    doAddBGM: ({ rootState }: { rootState: any }, payload: any) => {
      // 欠番を埋める方式は不採用
      let maxKey = rootState.setting.bgm.maxKey;
      const key = `bgm-${++maxKey}`;
      rootState.setting.bgm.maxKey = maxKey;
      payload.key = key;
      rootState.setting.bgm.list.push(payload);
    },
    /** ========================================================================
     * マップオブジェクトを追加する
     */
    addPieceInfo: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", {
        value: payload,
        method: "doAddPieceInfo"
      });
    },
    doAddPieceInfo: (
      { rootState, rootGetters }: { rootState: any; rootGetters: any },
      payload: any
    ) => {
      const obj: any = {
        isDraggingLeft: false,
        move: {
          from: { x: 0, y: 0 },
          dragging: { x: 0, y: 0 },
          gridOffset: { x: 0, y: 0 }
        },
        angle: {
          total: 0,
          dragging: 0,
          dragStart: 0
        },
        isLock: false
      };
      for (let prop in payload) {
        if (!payload.hasOwnProperty(prop)) continue;
        obj[prop] = payload[prop];
      }

      // 欠番を埋める方式は不採用
      let maxKey = rootState.public[payload.propName].maxKey;
      const key = `${payload.kind}-${++maxKey}`;
      obj.key = key;
      rootState.public[payload.propName].maxKey = maxKey;

      qLog(
        `[mutations] doAddPieceInfo => { type: ${obj.type}, key:${
          obj.key
        }, name:"${obj.name}", locate:(${obj.top}, ${obj.left}), CsRs:(${
          obj.columns
        }, ${obj.rows}), bg:"${obj.color}", font:"${obj.fontColor}" }`
      );

      rootState.public[payload.propName].list.push(obj);
      if (rootGetters.peerId === payload.ownerPeerId) {
        rootState.private.history.push({ type: "add", key: key });
      }
    },
    /** ========================================================================
     * マップオブジェクト情報を変更する
     */
    changePieceInfo: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", {
        value: payload,
        method: "doChangePieceInfo"
      });
    },
    doChangePieceInfo: (
      { rootState, rootGetters }: { rootState: any; rootGetters: any },
      payload: any
    ) => {
      const key = payload.key;
      const propName = payload.propName;

      const pieceObj = rootGetters.getObj(key);
      for (let prop in payload) {
        if (!payload.hasOwnProperty(prop)) continue;
        if (prop === "key" || prop === "propName") {
          continue;
        }
        if (pieceObj[prop] !== payload[prop]) {
          qLog(
            `[mutations] update ${propName}(${key}) => ${prop}: ${
              pieceObj[prop]
            } -> ${payload[prop]}`
          );
          pieceObj[prop] = payload[prop];
        }
      }
      const index = rootState.public[propName].list.indexOf(pieceObj);
      rootState.public[propName].list.splice(index, 1, pieceObj);
    },
    /** ========================================================================
     * マップオブジェクトの削除
     */
    deletePieceInfo: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", {
        value: payload,
        method: "doDeletePieceInfo"
      });
    },
    doDeletePieceInfo: (
      { rootState, rootGetters }: { rootState: any; rootGetters: any },
      payload: any
    ) => {
      // qLog(`delete pieceInfo -> ${payload.propName}(${payload.key})`)
      const obj = rootGetters.getObj(payload.key);
      const index = rootState.public[payload.propName].list.indexOf(obj);
      rootState.public[payload.propName].list.splice(index, 1);

      if (rootGetters.peerId === payload.ownerPeerId) {
        rootState.private.history.splice(
          rootState.private.history.findIndex(
            (hisObj: any) => hisObj.key === payload.key
          ),
          1
        );
      }
    },
    /** ========================================================================
     * デッキのシャッフル
     */
    shuffleDeck: ({ dispatch }: { dispatch: Function }) => {
      dispatch("sendNoticeOperation", { value: {}, method: "doShuffleDeck" });
    },
    doShuffleDeck: ({
      rootState,
      rootGetters
    }: {
      rootState: any;
      rootGetters: any;
    }) => {
      const cardList = rootGetters.deckCardList.concat();
      for (let i = cardList.length - 1; i >= 0; i--) {
        // 0~iのランダムな数値を取得
        const rand = Math.floor(Math.random() * (i + 1));

        // [cardList[i], cardList[rand]] = [cardList[rand], cardList[i]]
        const tmp = cardList[i];
        cardList[i] = cardList[rand];
        cardList[rand] = tmp;
        // cardList.splice(i, 1, cardList[rand])
        // cardList.splice(rand, 1, tmp)
      }
      rootState.public.deck.cards.list = cardList;
      // cardList.splice(0, 1, cardList[0])
    },
    /** ========================================================================
     * カードのドロー
     */
    drawCard: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", { value: payload, method: "doDrawCard" });
    },
    doDrawCard: (
      { rootState, rootGetters }: { rootState: any; rootGetters: any },
      payload: any
    ) => {
      const index = payload.index;
      // const cardKey = payload.key

      const cardList = rootGetters.deckCardList;
      const card = cardList[index];
      cardList.splice(index, 1);

      // TODO 手札に加える処理
      rootState.private.self.cards.push(card);
    },
    /** ========================================================================
     * グループチャットの追加
     */
    addGroupTargetTab: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", {
        value: payload,
        method: "doAddGroupTargetTab"
      });
    },
    doAddGroupTargetTab: (
      { rootGetters }: { rootGetters: any },
      payload: any
    ) => {
      rootGetters.groupTargetTab.list.push({
        key: `groupTargetTab-${++rootGetters.groupTargetTab.maxKey}`,
        isSecret: false,
        name: "",
        targetTab: null,
        isAll: false,
        group: [payload.ownerKey]
      });
    }
  },
  getters: {
    chatLogList: (
      state: any,
      getters: any,
      rootState: any,
      rootGetters: any
    ) => {
      return rootState.public.chat.logs[rootGetters.activeTab].filter(
        (log: any) => {
          if (log.from === rootGetters.playerKey) return true;
          if (!log.target) return true;
          if (log.target === "groupTargetTab-0") return true;
          const kind = log.target.split("-")[0];
          if (kind === "groupTargetTab") {
            const target = getters.getObj(log.target);
            if (!target.isSecret) return true;
            if (target.isAll) return true;
            const findIndex = target.group.findIndex((g: string) => {
              const kind = g.split("-")[0];
              if (kind === "player") {
                if (g === rootGetters.playerKey) return true;
              } else if (kind === "character") {
                if (getters.getObj(g).owner === rootGetters.playerKey)
                  return true;
              }
              return false;
            });
            return findIndex > -1;
          } else if (kind === "player") {
            window.console.log(
              "-----player",
              log.target,
              rootGetters.playerKey,
              log.target === rootGetters.playerKey
            );
            return log.target === rootGetters.playerKey;
          } else {
            const target = getters.getObj(log.target);
            return target.owner === rootGetters.playerKey;
          }
        }
      );
    },
    groupTargetTabList: (
      state: any,
      getters: any,
      rootState: any,
      rootGetters: any
    ) => {
      return rootGetters.groupTargetTab.list.filter((tab: any) => {
        if (tab.isAll) return true;
        const filterObj = tab.group.filter((targetKey: string) => {
          if (targetKey === getters.currentActorKey) return true;
          const characterList = rootGetters.getMapObjectList({
            kind: "character"
          });
          if (getters.currentActorKey.split("-")[0] === "player") {
            const targetCharacter = characterList
              .filter(
                (character: any) => character.owner === getters.currentActorKey
              )
              .filter((character: any) => character.key === targetKey)[0];
            if (targetCharacter) return true;
          } else if (getters.currentActorKey.split("-")[0] === "character") {
            const targetCharacter = characterList.filter(
              (character: any) => character.key === getters.currentActorKey
            )[0];
            if (targetCharacter) return true;
          }
          return false;
        });
        if (filterObj.length > 0) return true;
      });
    },
    createInputtingMsg: () => (name: string) => `${name}が入力中...`,
    chatTargetList: (
      state: any,
      getters: any,
      rootState: any,
      rootGetters: any
    ) => {
      return [
        ...getters.groupTargetTabList,
        ...rootGetters.playerList,
        ...rootGetters.getMapObjectList({ kind: "character", place: "field" })
      ];
    }
  }
};
