<template>
  <div :style="menuStyle" id="menu" @contextmenu.prevent>
    <!-- 操作鍵グループ -->
    <div class="span-group">
      <span
        @click="menuClick()"
        @mouseenter="menuHover('檔案')"
        :class="{ isHover: isShow('檔案') }"
      >
        檔案
      </span>
      <span
        @click="menuClick()"
        @mouseenter="menuHover('顯示')"
        :class="{ isHover: isShow('顯示', '視窗設定') }"
      >
        顯示
      </span>
      <span
        @click="menuClick()"
        @mouseenter="menuHover('方塊')"
        :class="{ isHover: isShow('方塊') }"
      >
        方塊
      </span>
      <span
        @click="menuClick()"
        @mouseenter="menuHover('地圖')"
        :class="{ isHover: isShow('地圖') }"
      >
        地圖
      </span>
      <span
        @click="menuClick()"
        @mouseenter="menuHover('圖片')"
        :class="{ isHover: isShow('圖片') }"
      >
        圖片
      </span>
      <span
        @click="menuClick()"
        @mouseenter="menuHover('說明')"
        :class="{ isHover: isShow('說明') }"
      >
        說明
      </span>
      <span
        @click="menuClick()"
        @mouseenter="menuHover('Demo')"
        :class="{ isHover: isShow('Demo') }"
      >
        Demo
      </span>
    </div>
    <!-- 房間情報 -->
    <div
      class="menu-button"
      @click="clickRoomInfo"
      :title="roomInfoTitle"
      :class="{ isDisconnect: !isRoomJoined }"
    >
      <span :class="{ isDisconnect: !isRoomJoined }">{{
        `${roomName}` || "未連線"
      }}</span>
      ：
      <span>{{ members.length }}</span>
      名
    </div>
    <!-- 共用筆記 -->
    <div class="menu-button" @click="clickPublicMemo" :title="publicMemoTitle">
      共用筆記
    </div>
    <!-- 登出 -->
    <div
      class="menu-button"
      @click="clickLogOut"
      :class="{ isDisconnect: !isRoomJoined }"
      :title="logoutTitle"
    >
      登出
    </div>

    <!--------------------------------------------------
     ! 檔案
     !-------------------------------------------------->
    <div class="hoverMenu hoverMenu2" v-show="isShow('檔案')">
      <div class="item" @click="clickExport">儲存</div>
      <div class="item" @click="clickImport">讀取(未實裝)</div>
      <hr @mouseenter="menuHover('檔案')" />
      <div class="item" @click="clickChatLog">獲取聊天記錄</div>
    </div>
    <!--------------------------------------------------
     ! 顯示
     !-------------------------------------------------->
    <div class="hoverMenu hoverMenu3" v-show="isShow('顯示', '視窗')">
      <div class="item" @mouseenter="menuHover('視窗')">
        視窗
        <span class="triangle"></span>
      </div>
      <hr @mouseenter="menuHover('顯示')" />
      <menu-boolean-item
        property="private.setting.standImage"
        @mouseenter="menuHover('顯示')"
      >
        立繪顯示
      </menu-boolean-item>
      <menu-boolean-item
        property="private.setting.cutIn"
        @mouseenter="menuHover('顯示')"
      >
        Cut-In顯示
      </menu-boolean-item>
      <hr @mouseenter="menuHover('顯示')" />
      <menu-boolean-item
        property="public.setting.gridId"
        @mouseenter="menuHover('顯示')"
      >
        座標顯示
      </menu-boolean-item>
      <menu-boolean-item
        property="public.setting.gridLine"
        @mouseenter="menuHover('顯示')"
      >
        網格顯示
      </menu-boolean-item>
      <hr @mouseenter="menuHover('顯示')" />
      <menu-boolean-item
        property="public.setting.isFitGrid"
        @mouseenter="menuHover('顯示')"
      >
        格線貼齊
      </menu-boolean-item>
      <hr @mouseenter="menuHover('顯示')" />
      <div
        class="item"
        @click="clickSettingFontSize"
        @mouseenter="menuHover('顯示')"
      >
        字體大小調整(未實裝)
      </div>
      <hr @mouseenter="menuHover('顯示')" />
      <div
        class="item"
        @click="clickResetWindowLocate"
        @mouseenter="menuHover('顯示')"
      >
        視窗配置初期化
      </div>
    </div>
    <!--------------------------------------------------
     ! 方塊
     !-------------------------------------------------->
    <div class="hoverMenu hoverMenu4" v-show="isShow('方塊')">
      <div class="item" @click="clickAddCharacter">添加角色</div>
      <div class="item" @click="clickAddRange">添加範圍(未實裝)</div>
      <hr />
      <div class="item" @click="clickAddChit">添加棋子</div>
      <hr />
      <div class="item" @click="clickGraveyard">墓場(整合到棋子管理盒)</div>
      <div class="item" @click="clickWaitingRoom">
        角色等候室(整合到棋子管理盒)
      </div>
      <hr />
      <menu-boolean-item property="public.setting.pieceRotateMarker">
        顯示旋轉標誌
      </menu-boolean-item>
    </div>
    <!--------------------------------------------------
     ! 地圖
     !-------------------------------------------------->
    <div class="hoverMenu hoverMenu5" v-show="isShow('地圖')">
      <div class="item" @click="clickChangeMap">變更地圖</div>
      <div class="item" @click="clickAddFloorTile">添加地圖版塊</div>
      <div class="item" @click="clickAddMapMask">添加地圖迷霧</div>
      <div class="item" @click="clickCreateEasyMap">製作簡易地圖(未實裝)</div>
      <hr />
      <div class="item" @click="clickSaveMap">保存地圖狀態(未實裝)</div>
      <div class="item" @click="clickSwitchMap">切換地圖(未實裝)</div>
    </div>
    <!--------------------------------------------------
     ! 圖片
     !-------------------------------------------------->
    <div class="hoverMenu hoverMenu6" v-show="isShow('圖片')">
      <div class="item" @click="clickFileUploader">上傳檔案</div>
      <hr />
      <div class="item" @click="clickTagEdit" disabled>TAG編輯(未實裝)</div>
      <div class="item" @click="clickDeleteImage" disabled>
        圖片刪除(未實裝)
      </div>
    </div>
    <!--------------------------------------------------
     ! 說明
     !-------------------------------------------------->
    <div class="hoverMenu hoverMenu7" v-show="isShow('說明')">
      <div class="item" @click="clickWelcome">歡迎畫面</div>
      <div class="item" @click="clickVersion">版本</div>
      <div class="item" @click="clickManual" disabled>Manual(未實裝)</div>
      <hr />
      <div class="item" @click="clickOfficialSite">冰丼官網</div>
      <div class="item" @click="clickHKTRPG">HKTRPG官網</div>
    </div>
    <!--------------------------------------------------
     ! 視窗
     !-------------------------------------------------->
    <div class="hoverMenu hoverMenu8" v-show="isShow('視窗')">
      <menu-boolean-item
        @click="menuClick"
        property="private.display.chatWindow"
      >
        顯示對話
      </menu-boolean-item>
      <menu-boolean-item @click="menuClick" property="private.setting.dice">
        顯示棋子
      </menu-boolean-item>
      <menu-boolean-item
        @click="menuClick"
        property="private.display.playerBoxWindow"
      >
        顯示棋子管理盒
      </menu-boolean-item>
      <menu-boolean-item
        @click="menuClick"
        property="private.display.initiativeWindow"
      >
        顯示先攻表
      </menu-boolean-item>
      <menu-boolean-item
        @click="menuClick"
        property="private.display.resourceWindow"
      >
        顯示資源表
      </menu-boolean-item>
      <hr />
      <menu-boolean-item
        @click="menuClick"
        property="private.display.chatPaletteSettingWindow"
      >
        對話組合版顯示
      </menu-boolean-item>
      <menu-boolean-item
        @click="menuClick"
        property="private.display.counterRemoconWindow"
      >
        累計遙控器顯示
      </menu-boolean-item>
    </div>
    <!--------------------------------------------------
     ! Demo
     !-------------------------------------------------->
    <div class="hoverMenu hoverMenu9" v-show="isShow('Demo')">
      <div class="item" @click="clickDevHistory">開發歷史</div>
      <hr />
      <div class="item" @click="clickBufForm">錯誤報告</div>
    </div>
  </div>
</template>

<script lang="ts">
import MenuBooleanItem from "./MenuBooleanItem.vue";

import { Action, Getter } from "vuex-class";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    MenuBooleanItem
  }
})
export default class Menu extends Vue {
  @Action("windowOpen") private windowOpen: any;
  @Action("setProperty") private setProperty: any;
  @Action("doResetWindowLocate") private doResetWindowLocate: any;
  @Action("exportStart") private exportStart: any;
  @Action("addListObj") private addListObj: any;
  @Action("saveChatLogHtml") private saveChatLogHtml: any;
  @Getter("roomName") private roomName: any;
  @Getter("isModal") private isModal: any;
  @Getter("peerId") private peerId: any;
  @Getter("members") private members: any;
  @Getter("isRoomJoined") private isRoomJoined: any;

  private isConnectHover: boolean = false;
  private isSelecting: boolean = false;
  private currentMenu: string = "";

  menuClick(): void {
    this.isSelecting = !this.isSelecting;
  }

  isShow(this: any, ...props: any[]): any {
    return (
      this.isSelecting && props.filter(prop => prop === this.currentMenu)[0]
    );
  }

  menuHover(prop: string): void {
    this.currentMenu = prop;
  }

  hoverConnect(flg: boolean): void {
    this.isConnectHover = flg;
  }

  /** 房間情報鍵押下 */
  clickRoomInfo(): void {
    this.windowOpen("private.display.roomInfoWindow");
  }

  /** 共用筆記鍵押下 */
  clickPublicMemo() {
    this.addListObj({
      propName: "publicMemo",
      kind: "publicMemo",
      targetList: [],
      title: "共用筆記",
      tabList: []
    });
  }

  /** 登出鍵押下 */
  clickLogOut(): void {
    location.href = location.href.replace(/\?.+$/, "");
  }

  /* --------------------
   * 檔案
   * ----------------- */
  /** 儲存 */
  clickExport(): void {
    this.exportStart();
    this.menuClick();
  }

  /** 讀取 */
  clickImport(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "讀取",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /** チャットログ保存 */
  clickChatLog(): void {
    this.saveChatLogHtml();
    this.menuClick();
  }

  /* --------------------
   * 顯示
   * ----------------- */
  /** 字體大小調整 */
  clickSettingFontSize(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "字體大小變更",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /** 視窗配置初期化 */
  clickResetWindowLocate(): void {
    this.doResetWindowLocate();
    this.menuClick();
  }

  /* --------------------
   * 方塊
   * ----------------- */
  /** 角色添加 */
  clickAddCharacter(): void {
    this.windowOpen("private.display.addCharacterSettingWindow");
    this.menuClick();
  }

  /** 範圍添加 */
  clickAddRange(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "範圍添加",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /** チット製作 */
  clickAddChit(): void {
    this.windowOpen("private.display.addChitWindow");
    this.menuClick();
  }

  /** 墓場 */
  clickGraveyard(): void {
    alert("「墓場」由棋子管理盒畫面整合。");
    this.menuClick();
  }

  /** 角色等候室 */
  clickWaitingRoom(): void {
    alert("「角色等候室」由棋子管理盒畫面整合。");
    this.menuClick();
  }

  /* --------------------
   * 地圖
   * ----------------- */
  /** 地圖變更 */
  clickChangeMap(): void {
    this.windowOpen("private.display.editMapWindow");
    this.menuClick();
  }

  /** フロアタイル添加 */
  clickAddFloorTile(): void {
    this.windowOpen("private.display.addFloorTileWindow");
    this.menuClick();
  }

  /** 地圖マスク添加 */
  clickAddMapMask(): void {
    this.windowOpen("private.display.addMapMaskWindow");
    this.menuClick();
  }

  /** 簡易地圖製作 */
  clickCreateEasyMap(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "簡易地圖",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /** 地圖狀態保存 */
  clickSaveMap(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "保存地圖",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /** 地圖切換 */
  clickSwitchMap(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "切換地圖",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /* --------------------
   * 圖片
   * ----------------- */
  /** 檔案アップローダー */
  clickFileUploader(): void {
    this.windowOpen("private.display.fileUploaderWindow");
    this.menuClick();
  }

  /** 標籤編輯 */
  clickTagEdit(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "編輯圖片標籤",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /** 圖片刪除 */
  clickDeleteImage(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "刪除圖片",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /* --------------------
   * 說明
   * ----------------- */
  /** ようこそ */
  clickWelcome(): void {
    this.windowOpen("private.display.welcomeWindow");
    this.menuClick();
  }

  /** バージョン */
  clickVersion(): void {
    this.windowOpen("private.display.versionWindow");
    this.menuClick();
  }

  /** 說明書 */
  clickManual(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "說明書",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.menuClick();
  }

  /** オフィシャルサイトへ */
  clickOfficialSite(): void {
    window.open("http://quoridorn.com/", "_blank");
    this.menuClick();
  }
  clickHKTRPG(): void {
    window.open("https://www.hktrpg.com/", "_blank");
    this.menuClick();
  }

  /* --------------------
   * Demo
   * ----------------- */
  /** 開發歷史 */
  clickDevHistory(): void {
    this.windowOpen("private.display.devLogWindow");
    this.menuClick();
  }

  /** 錯誤報告 */
  clickBufForm(): void {
    window.open("https://9224.teacup.com/quoridorn_bug/bbs", "_blank");
    this.menuClick();
  }

  get menuStyle(): any {
    const result: any = {};
    if (this.isModal) result.filter = "blur(3px)";
    return result;
  }

  get roomInfoTitle(): string {
    return this.isRoomJoined === true
      ? "您可以看到成員列列表並更改房間設定。"
      : "不在房間裡。 \n通過按「連線」鍵來創建一間房間！！";
  }

  get publicMemoTitle(): string {
    return this.isRoomJoined === true
      ? "點擊此處與成員共享資料"
      : "進入房間前做一些準備是個好主意！？\n你是個好人！";
  }

  get logoutTitle(): string {
    return this.isRoomJoined === true
      ? "你確定要離開房間嗎？"
      : "不在房間裡。 \n通過按「連線」鍵來創建一間房間！！";
  }
}
</script>

<style scoped lang="scss">
#menu {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(rgba(247, 248, 249, 1), rgba(0, 0, 0, 0));
  border-bottom: solid gray 1px;
  padding: 0.5em 1em;
  font-size: 10px;
  z-index: 99998;

  > *:not(:first-child) {
    margin-left: 1em;
  }
}
div.isDisconnect {
  background-color: rgba(200, 200, 200, 0.5);

  &:hover {
    background-color: rgba(200, 200, 200, 0.5);
  }
}
span.isDisconnect {
  color: red;
  font-weight: bold;
}
.span-group {
  display: flex;
  flex-direction: row;
  background-color: rgba(250, 250, 250, 0.2);
  border: solid gray 1px;
  box-sizing: border-box;
  padding: 0 1em;
  height: 2em;

  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 1em;
    white-space: nowrap;
  }
}
.span-group span:hover,
.span-group span.isHover {
  background: linear-gradient(rgba(186, 195, 199, 0.6), rgba(247, 248, 249, 1));
}

.menu-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: rgba(250, 250, 250, 0.4);
  border: solid gray 1px;
  padding: 0 1em;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  z-index: 100;
  height: 2em;

  &:hover {
    border: solid #0092ed 1px;
    background: rgba(250, 250, 250, 0.5);
  }
}
.hoverMenu {
  position: fixed;
  top: calc(2.5em - 1px);
  background: white;
  border: solid gray 1px;
  box-sizing: border-box;
  z-index: 200;

  > * {
    padding: 2px 10px;
  }

  > hr {
    padding: 0;
  }

  > .item:hover {
    background: lightblue;
  }
}
.hoverMenu2 {
  left: 1em;
}
.hoverMenu3 {
  left: 7em;
}
.hoverMenu4 {
  left: 11em;
}
.hoverMenu5 {
  left: 15em;
}
.hoverMenu6 {
  left: 20em;
}
.hoverMenu7 {
  left: 24em;
}
.hoverMenu8 {
  left: calc(25em - 1px);
}
.hoverMenu9 {
  left: 29em;
}

.item {
  position: relative;
  white-space: nowrap;

  > * {
    display: inline;
    vertical-align: middle;
  }

  img.check {
    display: inline;
    width: 10px;
    height: 10px;
    min-width: 10px;
    min-height: 10px;
    margin-right: 5px;
    border: none;
  }
}
.triangle {
  position: absolute;
  right: 7px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  border-left: 5px solid black;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}
</style>
