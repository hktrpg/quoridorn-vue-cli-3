<template>
  <fieldset class="root">
    <legend>輸入名稱進入指定房間/創建新房間</legend>

    <div class="description" v-if="!paramRoomName">
      輸入房間名稱，檢查是否已創建房間。
    </div>
    <div class="existMsg" v-if="!!paramRoomName">
      檢查完成：{{ isRoomExist ? "可以進入" : "沒有房間" }} 「{{
        paramRoomName
      }}」
    </div>

    <label class="roomName">
      房間名：
      <input
        ref="roomNameInput"
        type="text"
        v-model="roomName"
        placeholder="必須項目"
        @keypress.enter.stop="commitRoomName"
        @keydown.enter.stop
        @keyup.enter.stop
        @keydown.229.stop
        @keyup.229.stop
      />
      <ctrl-button @click="commitRoomName">確認</ctrl-button>
    </label>

    <!----------------------
     ! 房間ができる的を待つ
    !--------------------->
    <sub-block-title
      @open="openWaitRoom"
      text="等待使用這名稱的房間建立"
      v-if="!isRoomExist"
    />

    <div
      class="indentDescription description"
      v-if="paramRoomName && !isRoomExist"
    >
      創建房間後，您將會自動進入房間。 在那之前，你將會在臨時房間等待。
    </div>
    <div class="subBlock waitRoom" v-if="isViewWait && !isRoomExist">
      <label class="roomPassword">
        房間密碼：
        <input
          type="password"
          v-model="roomPassword"
          @keydown.enter.stop
          @keyup.enter.stop
          @keydown.229.stop
          @keyup.229.stop
        />
      </label>
      <fieldset class="playerInfo">
        <legend>你的情報</legend>
        <div>
          <label>
            <player-type-select v-model="inputPlayerType" />
            <input
              placeholder="請輸入玩家名稱（必須填寫）"
              type="text"
              text="玩家zzz"
              v-model="playerName"
              @keydown.enter.stop
              @keyup.enter.stop
              @keydown.229.stop
              @keyup.229.stop
            />
          </label>
        </div>
        <label class="playerPassword">
          個人密碼：
          <input
            type="password"
            v-model="playerPassword"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          />
        </label>
        <div class="description">用於管理房間。 注意不要忘記密碼！</div>
      </fieldset>
      <ctrl-button @click="doWaitRoom">
        <i class="icon-home3"></i> 臨時房間
      </ctrl-button>
    </div>

    <!----------------------
     ! こ的房間に入る
    !--------------------->
    <sub-block-title
      @open="openNewRoom"
      text="進入這個房間"
      v-if="isRoomExist"
    />
    <div class="subBlock joinRoom isShow" v-if="isRoomExist">
      <label class="roomPassword">
        房間密碼：
        <input
          type="password"
          v-model="roomPassword"
          @keypress.enter="roomProcess(false)"
          @keydown.enter.stop
          @keyup.enter.stop
          @keydown.229.stop
          @keyup.229.stop
        />
      </label>
      <ctrl-button @click="roomProcess(false)">
        <i class="icon-home3"></i> 進入房間
      </ctrl-button>
    </div>

    <!----------------------
     ! 新しい房間をつくる
    !--------------------->
    <sub-block-title @open="openNewRoom" text="新增房間" />
    <div
      class="indentDescription description"
      v-if="paramRoomName && !isRoomExist"
    >
      「可以新增{{ paramRoomName }}房間」。
    </div>
    <div
      class="indentDescription description"
      v-if="paramRoomName && isRoomExist"
    >
      「{{ paramRoomName }}」已經創建。
      <br />一台服務器上只能創建一個同名的房間。
      <br />修改房間名稱，然後再次檢查。
    </div>
    <div class="subBlock newRoom" v-if="isViewNewRoom && !isRoomExist">
      <label class="roomPassword">
        進房密碼：
        <input
          type="password"
          v-model="roomPassword"
          @keydown.enter.stop
          @keyup.enter.stop
          @keydown.229.stop
          @keyup.229.stop
        />
      </label>
      <label class="roomSystem">
        骰組：
        <dice-bot-select :outputFlg="true" v-model="currentSystem" />
      </label>
      <fieldset class="playerInfo">
        <legend>你的資料</legend>
        <div>
          <label>
            <player-type-select v-model="inputPlayerType" />
            <input
              placeholder="輸入你的名字（必須項目）"
              type="text"
              text="玩家z"
              v-model="playerName"
              @keydown.enter.stop
              @keyup.enter.stop
              @keydown.229.stop
              @keyup.229.stop
            />
          </label>
        </div>
        <label class="playerPassword">
          玩家密碼：
          <input
            type="password"
            v-model="playerPassword"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          />
        </label>
        <div class="description">管理房間用。請注意不要忘記！</div>
        <div class="description">
          權限詳情
          <a @click="onClickDescription" href="javascript:void(0);">在這裡</a>
        </div>
      </fieldset>
      <ctrl-button @click="roomProcess(true)">
        <i class="icon-home3"></i> 新增
      </ctrl-button>
    </div>
  </fieldset>
</template>

<script lang="ts">
import SubBlockTitle from "./SubBlockTitle.vue";
import CtrlButton from "@/components/parts/CtrlButton.vue";
import DiceBotSelect from "@/components/parts/select/DiceBotSelect.vue";
import PlayerTypeSelect from "@/components/parts/select/PlayerTypeSelect.vue";

import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";

@Component({
  components: {
    CtrlButton,
    SubBlockTitle,
    DiceBotSelect,
    PlayerTypeSelect
  }
})
export default class CreateNewRoom extends Vue {
  @Action("setProperty") private setProperty: any;
  @Action("checkRoomName") private checkRoomName: any;
  @Action("windowClose") private windowClose: any;
  @Action("windowOpen") private windowOpen: any;
  @Action("loading") private loading: any;
  @Action("simpleJoinRoom") private simpleJoinRoom: any;
  @Action("doNewRoom") private doNewRoom: any;
  @Action("doJoinRoom") private doJoinRoom: any;
  @Mutation("updateIsWait") private updateIsWait: any;
  @Mutation("updateIsModal") private updateIsModal: any;
  @Mutation("updateIsJoined") private updateIsJoined: any;
  @Getter("paramRoomName") private paramRoomName: any;
  @Getter("paramRoomPassword") private paramRoomPassword: any;
  @Getter("paramPlayerName") private paramPlayerName: any;
  @Getter("paramPlayerPassword") private paramPlayerPassword: any;
  @Getter("paramPlayerType") private paramPlayerType: any;
  @Getter("isRoomExist") private isRoomExist: any;
  @Getter("peerId") private peerId: any;
  @Getter("roles") private roles: any;

  /*
   * data
   */
  static ENTRANCE_ROOM_NAME = "的等待房間";
  private roomName: string = "";
  private roomPassword: string = "";
  private playerName: string = "";
  private playerPassword: string = "";
  private playerType: string = "";
  private inputPlayerType: string = "";
  private currentSystem: string = "DiceBot";
  private isViewWait: boolean = false;
  private isViewNewRoom: boolean = false;

  /** ====================================================================================================
   * ライフサイクルメソッド
   */
  created() {
    this.roomName = this.paramRoomName;
    this.roomPassword = this.paramRoomPassword;
    this.playerName = this.paramPlayerName;
    this.playerPassword = this.paramPlayerPassword;
    this.inputPlayerType = this.paramPlayerType || "PL";
    setTimeout(() => {
      this.playerType = this.paramPlayerType;
    });
  }

  /** ====================================================================================================
   * ライフサイクルメソッド
   */
  mounted(this: any) {
    // TODO 本質的にはここじゃダメ
    this.$refs.roomNameInput["focus"]();
  }

  @Watch("inputPlayerType")
  onChangeInputPlayerType(inputPlayerType: string) {
    this.playerType = inputPlayerType;
  }

  openWaitRoom() {
    this.isViewWait = !this.isViewWait;
    this.isViewNewRoom = false;
  }

  openNewRoom() {
    this.isViewNewRoom = !this.isViewNewRoom;
    this.isViewWait = false;
  }

  /**
   * ====================================================================================================
   * 房間名を入力して檢查鍵を押下した際的処理
   */
  commitRoomName() {
    /* ------------------------------
     * 入力檢查
     */
    const errorMsg = [];
    if (!this.roomName) errorMsg.push("・房間名");
    if (errorMsg.length > 0) {
      alert(`必要的資料未輸入\n${errorMsg.join("\n")}\n請輸入。`);
      return;
    }

    /* ------------------------------
     * URLを書き換える（リロード無）
     */
    const paramList: string[] = [];
    paramList.push(`roomName=${this.roomName}`);
    if (this.roomPassword !== null)
      paramList.push(`roomPassword=${this.roomPassword}`);
    if (this.currentSystem !== null)
      paramList.push(`system=${this.currentSystem}`);
    if (this.playerName !== null)
      paramList.push(`playerName=${this.playerName}`);
    if (this.playerPassword !== null)
      paramList.push(`playerPassword=${this.playerPassword}`);
    if (this.playerType !== null)
      paramList.push(`playerType=${this.playerType}`);
    const newUrl = `?${paramList.join("&")}`;
    window.history.replaceState("", "", newUrl);

    // パラメータ更新
    this.setProperty({
      property: `param.roomName`,
      value: this.roomName,
      logOff: true
    });

    /* ------------------------------
     * 房間存在檢查
     */
    this.loading(true);
    Promise.resolve()
      .then(() => this.simpleJoinRoom({ roomName: this.roomName }))
      .then((peerId: string) => {
        // const logTexts = [];
        // logTexts.push(`create room by peer:"${peerId}"`);
        // logTexts.push(`本番: ${this.peerId(false)}`);
        // logTexts.push(`待ち: ${this.peerId(true)}`);
        // window.console.log(logTexts.join(", "));
        return this.checkRoomName({ roomName: this.roomName });
      })
      .then(isExist => {
        if (!this.playerName) return null;
        const baseArg: any = {
          roomName: this.roomName,
          roomPassword: this.roomPassword,
          playerName: this.playerName,
          playerPassword: this.playerPassword,
          playerType: this.playerType,
          fontColor: "#000000",
          system: this.currentSystem
        };
        if (!isExist && this.roomPassword !== null) {
          baseArg.system = undefined;
          return this.doNewRoom(baseArg);
        }
        if (isExist) {
          baseArg.useWindow = true;
          baseArg.useAlert = true;
          return this.doJoinRoom(baseArg);
        }
        return null;
      })
      .then(() => this.loading(false))
      .catch(() => this.loading(false));
    // end of 房間存在檢查
  }

  /**
   * ====================================================================================================
   * 房間建て・進房振り分け
   */
  roomProcess(isNewRoom: boolean) {
    // 入力檢查
    const errorMsg = [];
    if (!this.roomName) errorMsg.push("・房間名");
    if (isNewRoom && !this.playerName) errorMsg.push("・用戶名");
    if (errorMsg.length > 0) {
      alert(`必要的資料未輸入\n${errorMsg.join("\n")}\n請輸入。`);
      return;
    }

    // 存在檢查してから決める
    this.loading(true);
    Promise.resolve()
      .then(() => this.checkRoomName({ roomName: this.roomName }))
      .then((isExist: boolean) => {
        const baseArg: any = {
          roomName: this.roomName,
          roomPassword: this.roomPassword || "",
          playerName: this.playerName,
          playerPassword: this.playerPassword,
          playerType: this.playerType,
          fontColor: "#000000",
          system: this.currentSystem
        };
        if (!isExist && isNewRoom) {
          baseArg.system = this.currentSystem;
          baseArg.playerPassword = baseArg.playerPassword || "";
          baseArg.playerType = baseArg.playerType || "PL";
          return this.doNewRoom(baseArg);
        }
        if (isExist && !isNewRoom) {
          baseArg.useWindow = true;
          baseArg.useAlert = true;
          return this.doJoinRoom(baseArg);
        }
        return null;
      })
      .then(() => this.loading(false))
      .catch(() => this.loading(false));
  }

  /**
   * ====================================================================================================
   * 房間ができる的を待つ
   */
  doWaitRoom() {
    // 入力檢查
    const errorMsg = [];
    if (!this.roomName) errorMsg.push("・房間名");
    if (errorMsg.length > 0) {
      alert(`必要的資料未輸入\n${errorMsg.join("\n")}\n請輸入。`);
      return;
    }

    // まず目的的房間的存在檢查是
    Promise.resolve()
      .then(() => this.checkRoomName({ roomName: this.roomName }))
      .then((isExist: boolean) => {
        window.console.log(`房間${this.roomName}的存在檢查完成`);
        const joinArg = {
          roomName: this.roomName,
          roomPassword: this.roomPassword,
          playerName: this.playerName,
          playerPassword: this.playerPassword || "",
          playerType: this.playerType,
          fontColor: "#000000",
          useWindow: true,
          useAlert: true
        };
        if (isExist) {
          // 存在したら普通に進房是
          alert(`房間${this.roomName}剛剛已經新增了\n請進入。`);
          this.loading(true);
          return this.doJoinRoom(joinArg);
        } else {
          // 存在しなかったら待合室に入りつつ、目的的房間ができる的を檢查しながら待つ

          // 再帰呼び出しで檢查し続け、房間ができたら進房是
          const checkFunc = () => {
            Promise.resolve()
              .then(() => this.checkRoomName({ roomName: this.roomName }))
              .then((isExist: boolean) => {
                if (isExist) {
                  alert(`房間${this.roomName}已新增\n請進入。`);

                  const endFunc = () => {
                    this.loading(false);
                    this.updateIsWait(false);
                  };

                  this.loading(true);
                  this.updateIsJoined(false);
                  this.doJoinRoom(joinArg)
                    .then(endFunc)
                    .catch(endFunc);
                  return;
                }
                setTimeout(() => {
                  checkFunc();
                }, 5000);
              });
          };
          checkFunc();

          // モーダル状態的解除
          this.updateIsModal(false);

          // エントランス房間に連接是
          this.loading(true);
          const entranceRoomName =
            this.roomName + CreateNewRoom.ENTRANCE_ROOM_NAME;
          Promise.resolve()
            .then(() =>
              this.simpleJoinRoom({ roomName: entranceRoomName, isWait: true })
            )
            .then((peerId: string) => {
              // const logTexts = [];
              // logTexts.push(`create room by peer:"${peerId}"`);
              // logTexts.push(`本番: ${this.peerId(false)}`);
              // logTexts.push(`待ち: ${this.peerId(true)}`);
              // window.console.log(logTexts.join(", "));
              return this.checkRoomName({
                roomName: entranceRoomName,
                isWait: true
              });
            })
            .then((isExist: boolean) => {
              const baseArg: any = {
                roomName: entranceRoomName,
                roomPassword: "",
                playerName: this.playerName,
                playerPassword: this.playerPassword,
                playerType: this.playerType,
                fontColor: "#000000",
                isWait: true,
                system: this.currentSystem
              };
              const loadingEnd = this.loading.bind(this, false);
              this.updateIsWait(true);
              if (!isExist) {
                baseArg.system = this.currentSystem;
                return this.doNewRoom(baseArg);
              } else {
                baseArg.useWindow = true;
                baseArg.useAlert = true;
                return this.doJoinRoom(baseArg);
              }
            })
            .then(() => this.loading(false))
            .catch(() => this.loading(false));
        }
      });
  }

  /**
   * ====================================================================================================
   * 權限に関是説明リンクをクリックした際的処理
   */
  onClickDescription(): void {
    alert(
      this.roles.filter((role: any) => role.value === this.playerType)[0]
        .description
    );
  }
}
</script>

<style scoped src="./login.css"></style>

<style scoped lang="scss">
fieldset.root,
fieldset.root > legend {
  background-color: #cceecc;
}

.roomName {
  margin: 0.5rem 0;
}

.subBlock {
  overflow: hidden;
  transition-timing-function: linear;
  transition-delay: 0s;
  text-align: center !important;
  margin-bottom: 0.5em;

  > .ctrl-button-wrapper {
    margin-top: 0.5rem;
  }

  > *:not(.ctrl-button-wrapper) {
    text-align: left;
    margin-left: 4rem;
  }
}

.indentDescription {
  margin-left: 4rem;
}

.roomPassword input {
  width: 15em;
}

.existMsg {
  word-wrap: break-word;
  white-space: normal;
  padding: 0 1em;
  color: #e1312c;
}

label {
  &.roomPassword {
    display: block;
  }

  &:not(.roomPassword):not(.ctrl-button-wrapper) {
    display: flex;

    > input {
      flex: 1;
    }
  }

  .ctrl-button-wrapper {
    padding: 0 5px;
    font-size: 11px;
  }
}
</style>
