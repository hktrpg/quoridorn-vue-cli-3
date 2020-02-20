<template>
  <window-frame
    titleText="房間資料輸入畫面"
    display-property="private.display.inputPlayerInfoWindow"
    align="center"
    fixSize="375, 210"
    @open="initWindow"
    :isBanClose="true"
  >
    <div class="contents">
      <div class="welcomeMessage">
        房間「{{ useRoomName }}」歡迎你！<br />輸入玩家信息。
      </div>
      <fieldset class="playerInfo">
        <legend>你的資料</legend>
        <label>
          <player-type-select v-model="inputPlayerType" v-if="!isPlayerExist" />
          <input
            ref="playerInput"
            placeholder="輸入你的名字（必須填寫）"
            type="text"
            v-model="inputPlayerName"
            list="input-player-info-window-players"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          />
          <datalist id="input-player-info-window-players">
            <option
              v-for="player in playerList"
              :key="player.key"
              :value="player.name"
              >{{ player.name }}</option
            >
          </datalist>
        </label>
        <label class="playerPassword"
          >密碼：<input
            type="password"
            v-model="inputPlayerPassword"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          />
        </label>
        <div class="description" v-if="!isPlayerExist">
          管理房間用。請小心不要忘記！
        </div>
        <div class="description" v-if="!isPlayerExist">
          權限詳情<a @click="onClickDescription" href="javascript:void(0);"
            >這裡</a
          >
        </div>
        <div class="description" v-if="isPlayerExist">
          歡迎回來。<br />指定要驗證的密碼。
        </div>
      </fieldset>
      <div class="buttonArea">
        <ctrl-button @click="commit"
          ><i class="icon-home3"></i> 参加</ctrl-button
        >
      </div>
    </div>
  </window-frame>
</template>

<script lang="ts">
import WindowFrame from "../../WindowFrame.vue";
import WindowMixin from "../../WindowMixin.vue";
import PlayerTypeSelect from "@/components/parts/select/PlayerTypeSelect.vue";
import CtrlButton from "@/components/parts/CtrlButton.vue";

import { Action, Getter, Mutation } from "vuex-class";
import { Watch } from "vue-property-decorator";
import { Component, Mixins } from "vue-mixin-decorator";

@Component({
  components: {
    CtrlButton,
    WindowFrame,
    PlayerTypeSelect: PlayerTypeSelect
  }
})
export default class InputPlayerInfoWindow extends Mixins<WindowMixin>(
  WindowMixin
) {
  @Action("setProperty") private setProperty: any;
  @Action("windowClose") private windowClose: any;
  @Action("loading") private loading: any;
  @Mutation("updateIsModal") private updateIsModal: any;
  @Getter("getObj") private getObj: any;
  @Getter("playerList") private playerList: any;
  @Getter("roles") private roles: any;
  @Getter("volatileRoomName") private volatileRoomName: any;
  @Getter("volatilePlayerName") private volatilePlayerName: any;
  @Getter("volatilePlayerPassword") private volatilePlayerPassword: any;
  @Getter("volatilePlayerType") private volatilePlayerType: any;
  @Getter("volatileFontColor") private volatileFontColor: any;
  @Getter("volatileResolve") private volatileResolve: any;

  private inputPlayerName: string = "";
  private inputPlayerPassword: string = "";
  private inputPlayerType: string = "";
  private inputPlayerTypeSave: string = "";
  private useRoomName: string = "";

  private isPlayerExist: boolean = false;

  initWindow(this: any): void {
    this.useRoomName = this.volatileRoomName;
    this.inputPlayerName = this.volatilePlayerName;
    this.inputPlayerPassword = this.volatilePlayerPassword;
    this.inputPlayerType = this.volatilePlayerType;
    this.loading(false);
    this.updateIsModal(true);
    this.$refs.playerInput["focus"]();
  }

  @Watch("inputPlayerType")
  onChangeInputPlayerType(value: string) {
    if (!this.isPlayerExist) this.inputPlayerTypeSave = value;
  }

  @Watch("inputPlayerName")
  onChangeInputPlayerName(value: string) {
    const player: any = this.playerList.filter(
      (player: any) => player.name === value
    )[0];
    this.isPlayerExist = !!player;
    this.inputPlayerType = player ? player.type : this.inputPlayerTypeSave;
  }

  commit() {
    // 輸入チェック
    const errorMsg = [];
    this.inputPlayerName = this.inputPlayerName.trim();
    if (!this.inputPlayerName) errorMsg.push("・玩家名");
    if (errorMsg.length > 0) {
      alert(`未輸入必須填寫的資料\n${errorMsg.join("\n")}\n請輸入。`);
      return;
    }
    const player = this.playerList.filter(
      (p: any) => p.name === this.inputPlayerName
    )[0];
    if (player && player.password !== this.inputPlayerPassword) {
      alert("密碼錯誤。\n重新輸入你的密碼或以其他身份加入。");
      return;
    }
    this.windowClose("private.display.inputPlayerInfoWindow");

    this.loading(true);
    this.volatileResolve({
      playerName: this.inputPlayerName,
      playerPassword: this.inputPlayerPassword,
      playerType: this.inputPlayerType,
      fontColor: this.volatileFontColor
    });
  }

  /**
   * ====================================================================================================
   * 権限に関する説明リンクをクリックした際の処理
   */
  onClickDescription(): void {
    alert(
      this.roles.filter(
        (role: any) => role.value === this.volatilePlayerType
      )[0].description
    );
  }
}
</script>

<style scoped lang="scss">
.contents {
  position: absolute;
  height: 100%;
  width: 100%;

  font-size: 12px;
}
.welcomeMessage {
  color: #e1312c;
}
.playerInfo {
  display: flex;
  flex-direction: row;
}
label {
  display: flex;
}
input {
  /*height: 1.5em;*/
  flex: 1;
}
fieldset {
  padding: 0 0.5rem 0.5rem;
}
.description {
  font-size: 10px;
  color: #444444;
}
.buttonArea {
  margin-top: 0.5em;
  text-align: center;
}
</style>
