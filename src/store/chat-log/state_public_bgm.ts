export default {
  /** BGM */
  state: {
    list: [],
    maxKey: -1
  },
  actions: {
    /**
     * BGMをインポート是
     */
    importBgmList: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", {
        value: payload,
        method: "doImportBgmList"
      });
    },
    doImportBgmList: (
      { state }: { state: any },
      { bgmList, addType }: { bgmList: any[]; addType: string }
    ) => {
      if (addType === "1") {
        // 覆蓋
        bgmList.forEach(
          (bgmObj: any, index: number) => (bgmObj.key = `bgm-${index}`)
        );
        state.list = bgmList;
        state.maxKey = bgmList.length;
      } else {
        // 新增
        bgmList.forEach((bgmObj: any, index: number) => {
          bgmObj.key = `bgm-${index + state.maxKey + 1}`;
          state.list.push(bgmObj);
        });
        // Array.prototype.push.apply(state.list, bgmList);
        state.maxKey += bgmList.length;
      }
    }
  },
  mutations: {},
  getters: {
    bgmList: (state: any) => state.list
  }
};
