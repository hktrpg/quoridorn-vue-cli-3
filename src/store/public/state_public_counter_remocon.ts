export default {
  /** 累計遙控器 */
  state: {
    list: [
      {
        key: "counterRemocon-0",
        buttonName: "萬用",
        target: "",
        counterName: "",
        modifyType: "2",
        modifyValue: "",
        message: "{0}的{1}{2}，結果{4}",
        exampleText: "[選擇角色]的[選擇項目]-1，結果（[選擇項目]：3->3）"
      }
    ],
    maxKey: 0
  },
  actions: {},
  mutations: {},
  getters: {
    publicCounterRemocon: (state: any) => state,
    publicCounterRemoconList: (state: any) => state.list
  }
};
