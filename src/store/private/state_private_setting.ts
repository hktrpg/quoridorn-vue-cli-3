export default {
  /** 設定(private) */
  state: {
    standImage: true, // 立ち絵を顯示是か
    dice: true, // 骰子を顯示是か
    cutIn: true, // カットインを顯示是か
    standImageAutoResize: true // 立ち絵的大小を自動調節是
  },
  actions: {},
  mutations: {},
  getters: {
    isViewStandImage: (state: any) => state.standImage
  }
};
