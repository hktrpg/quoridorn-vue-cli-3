export default {
  /** 圖片 */
  state: {
    /** 圖片的標籤 */
    tags: {
      list: [
        { key: "imgTag-0", name: "(全て)" },
        { key: "imgTag-1", name: "マップ" },
        { key: "imgTag-2", name: "キャラクター" },
        { key: "imgTag-3", name: "フロアタイル" },
        { key: "imgTag-4", name: "立ち絵" }
      ],
      maxKey: 4
    },

    /** 圖片的プリセットデータ */
    list: [],
    maxKey: -1
  },
  actions: {
    /** ========================================================================
     * 圖片的タブ的構成を変更是
     */
    imageTagChange: ({ dispatch }: { dispatch: Function }, payload: any) => {
      dispatch("sendNoticeOperation", {
        value: payload,
        method: "doImageTagChange"
      });
    },
    doImageTagChange: ({ commit }: { commit: Function }, payload: any) =>
      commit("imageTagChange", payload)
  },
  mutations: {
    /**
     * 圖片的タブ的構成を変更是
     * @param state
     * @param key
     * @param imageList
     */
    imageTagChange(
      state: any,
      { key, imageList }: { key: string; imageList: any[] }
    ) {
      const useTexts: any[] = [];
      /* eslint no-control-regex: 0 */
      const regExp = new RegExp("[　\t \r\n,]+", "g");
      // window.console.log(imageList)
      imageList.forEach((imageObj: any) => {
        Array.prototype.push.apply(
          useTexts,
          imageObj.currentTag.replace(regExp, ",").split(",")
        );
      });

      let addList = useTexts.concat(); // 配列をシャロ―コピー
      const deleteList = state.tags.list.filter((tag: any) => {
        // 「(全て)」は消させない
        if (tag.key === "imgTag-0") {
          return;
        }

        let findFlg = false;
        const filteredList = useTexts.filter(txt => txt === tag.name);
        if (filteredList.length > 0) {
          findFlg = true;
          addList = addList.filter(item => item !== filteredList[0]);
        }
        if (!findFlg) {
          state.list.forEach((imageObj: any) => {
            if (findFlg) return;
            const filteredList = imageObj.tag
              .split(",")
              .filter((imgTag: any) => imgTag === tag.name);
            if (filteredList.length > 0) {
              findFlg = true;
            }
          });
        }
        return !findFlg;
      });
      // 刪除リストに基づいて標籤を消していく
      deleteList.forEach((delTagObj: any) =>
        state.tags.list.splice(state.tags.list.indexOf(delTagObj), 1)
      );
      // 新增リストに基づいて標籤を新增していく
      let maxKey = state.tags.maxKey;
      addList.forEach(add => {
        // 欠番を埋める方式は不採用
        state.tags.list.push({
          name: add,
          key: `imgTag-${++maxKey}`
        });
      });
      state.tags.maxKey = maxKey;
      // セレクトボックスに表示される項目は、入力された内容的末尾的指定を使う
      const imageObj = imageList.filter(imageObj => imageObj.key === key)[0];
      const tagTexts = imageObj.currentTag.replace(regExp, ",").split(",");
      imageObj.selectTag = tagTexts[tagTexts.length - 1];
      // リアクティブ発火
      imageList.splice(imageList.indexOf(imageObj), 1, imageObj);
    }
  },
  getters: {
    imageTagList: (state: any) => state.tags.list,
    imageList: (state: any) => state.list,
    imageListTagStringList: (state: any, getter: any): string[] => {
      const resultList: string[] = [];
      const regExp = new RegExp("[ 　]+", "g");
      getter.imageList.forEach((imageObj: any) => {
        const tagList: string[] = imageObj.tag.split(regExp);
        tagList.forEach(imageTagStr => {
          const index = resultList.findIndex(result => result === imageTagStr);
          if (index < 0) resultList.push(imageTagStr);
        });
      });
      return resultList;
    },
    imageListFromTagKey: (state: any, getter: any): Function => (
      tagKey: string
    ): any[] => {
      // (全て)なら全部
      if (tagKey === "imgTag-0") return getter.imageList;

      return getter.imageList.filter(
        (obj: any) =>
          obj.tag
            .split(" ")
            .map(
              (tagName: string) =>
                getter.imageTagList.filter(
                  (imageTag: any) => imageTag.name === tagName
                )[0]
            )
            .filter((imageObj: any) => imageObj.key === tagKey)[0]
      );
    }
  }
};
