export default {
  /** 設定(private) */
  state: {
    standImage: true, // 立ち絵を表示是か
    dice: true, // ダイスを表示是か
    cutIn: true, // カットインを表示是か
    standImageAutoResize: true // 立ち絵的大小を自動調節是
  },
  actions: {},
  mutations: {},
  getters: {
    isViewStandImage: (state: any) => state.standImage
  }
};
