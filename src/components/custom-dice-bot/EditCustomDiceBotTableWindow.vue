<template>
  <window-frame
    titleText="骰子判定表更改"
    display-property="private.display.editCustomDiceBotTableWindow"
    align="center"
    :fixSize="'600, 400'"
    @open="open"
    @reset="open"
    :fontSizeBar="true"
  >
    <div class="contents v-box" @contextmenu.prevent>
      <div class="line-box">
        <label class="commandName h-box">
          指令名稱：
          <input
            type="text"
            class="flex-max"
            v-model="commandName"
            ref="input"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          />
        </label>
        <label class="diceRoll h-box">
          骰子：
          <input
            type="text"
            class="flex-max"
            v-model="diceRoll"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          />
        </label>
        <label class="tableTitle h-box flex-max">
          規則表名稱：
          <input
            type="text"
            class="flex-max"
            v-model="tableTitle"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          />
        </label>
      </div>
      <div class="line-box">
        <label class="tableContentsLabel">表内容</label>
        <label class="diceBotSystem">
          遊戲系統：
          <dice-bot-select v-model="diceBotSystem" />
        </label>
      </div>
      <label class="h-box flex-max tableContents">
        <textarea
          class="flex-max"
          v-model="tableContents"
          @keydown.enter.stop
          @keyup.enter.stop
          @keydown.229.stop
          @keyup.229.stop
        ></textarea>
      </label>
      <div v-if="isRoomSys" style="color: red;">
        ※當房間的骰子bot發生更改時，此表也會發生更改，對其進行初始化。
      </div>
      <div class="h-box buttonArea">
        <ctrl-button @click="commitButtonOnClick">
          變更
        </ctrl-button>
        <ctrl-button @click="cancelButtonOnClick">
          取消
        </ctrl-button>
      </div>
    </div>
  </window-frame>
</template>

<script lang="ts">
import WindowFrame from "../WindowFrame.vue";
import WindowMixin from "../WindowMixin.vue";
import Divider from "../parts/Divider.vue";
import CtrlButton from "@/components/parts/CtrlButton.vue";
import CtrlSelect from "@/components/parts/CtrlSelect.vue";

import { Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { Component, Mixins } from "vue-mixin-decorator";
import DiceBotSelect from "@/components/parts/select/DiceBotSelect.vue";

@Component({
  components: {
    DiceBotSelect,
    CtrlSelect,
    CtrlButton,
    WindowFrame,
    Divider
  }
})
export default class EditCustomDiceBotTableWindow extends Mixins<WindowMixin>(
  WindowMixin
) {
  @Action("windowClose") private windowClose: any;
  @Action("windowOpen") private windowOpen: any;
  @Action("setProperty") private setProperty: any;
  @Action("changeListObj") private changeListObj: any;

  @Getter("customDiceBotList") private customDiceBotList: any;
  @Getter("customDiceBotRoomSysList") private customDiceBotRoomSysList: any;

  private commandName: string = "";
  private diceRoll: string = "";
  private tableTitle: string = "";
  private diceBotSystem: string = "DiceBot";
  private tableContents: string = "";

  private open() {
    this.commandName = this.storeObj.commandName;
    this.diceRoll = this.storeObj.diceRoll;
    this.tableTitle = this.storeObj.tableTitle;
    this.diceBotSystem = this.storeObj.diceBotSystem;
    this.tableContents = this.storeObj.tableContents;

    const input: HTMLInputElement = this.$refs.input as HTMLInputElement;
    input.focus();
  }

  private commitButtonOnClick() {
    this.changeListObj({
      key: this.objKey,
      commandName: this.commandName,
      diceRoll: this.diceRoll,
      tableTitle: this.tableTitle,
      diceBotSystem: this.diceBotSystem,
      tableContents: this.tableContents
    });
    this.windowClose("private.display.editCustomDiceBotTableWindow");
  }

  private cancelButtonOnClick() {
    this.windowClose("private.display.editCustomDiceBotTableWindow");
  }

  private moveDev(event: any) {
    if (this.movingIndex > -1) {
      const diff = event.clientX - this.startX;
      const afterLeftWidth = this.startLeftWidth + diff;
      const afterRightWidth = this.startRightWidth - diff;
      if (afterLeftWidth >= 10 && afterRightWidth >= 10) {
        const paramObj: any = {};
        paramObj[this.movingIndex] = afterLeftWidth;
        paramObj[this.movingIndex + 1] = afterRightWidth;
        this.setProperty({
          property: "private.display.editCustomDiceBotTableWindow.widthList",
          value: paramObj,
          logOff: true
        });
      }
    }
  }

  private moveDevEnd() {
    this.setProperty({
      property: "private.display.editCustomDiceBotTableWindow",
      value: {
        hoverDevIndex: -1,
        movingIndex: -1,
        startX: -1,
        startLeftWidth: -1,
        startRightWidth: -1
      },
      logOff: true
    });
  }

  private selectLine(selectLineKey: string) {
    this.setProperty({
      property: "private.display.editCustomDiceBotTableWindow.selectLineKey",
      value: selectLineKey,
      logOff: true
    });
  }

  private get objKey(): string {
    return this.$store.state.private.display["editCustomDiceBotTableWindow"]
      .objKey;
  }

  private get isRoomSys(): boolean {
    if (!this.objKey) return false;
    return this.objKey.split("-")[0] === "customDiceBotRoomSys";
  }

  private get storeObj() {
    if (!this.objKey) return null;
    const kind: string = this.objKey.split("-")[0];
    let useList =
      kind === "customDiceBotRoomSys"
        ? this.customDiceBotRoomSysList
        : this.customDiceBotList;
    return useList.filter((info: any) => info.key === this.objKey)[0];
  }

  /* Start 列幅可変テーブル的プロパティ */
  private get selectLineKey() {
    return this.$store.state.private.display.editCustomDiceBotTableWindow
      .selectLineKey;
  }

  private get widthList() {
    return this.$store.state.private.display.editCustomDiceBotTableWindow
      .widthList;
  }

  private get movingIndex() {
    return this.$store.state.private.display.editCustomDiceBotTableWindow
      .movingIndex;
  }

  private get startX() {
    return this.$store.state.private.display.editCustomDiceBotTableWindow
      .startX;
  }

  private get startLeftWidth() {
    return this.$store.state.private.display.editCustomDiceBotTableWindow
      .startLeftWidth;
  }

  private get startRightWidth() {
    return this.$store.state.private.display.editCustomDiceBotTableWindow
      .startRightWidth;
  }

  private get colStyle() {
    return (index: number) => ({ width: `${this.widthList[index]}px` });
  }
  /* End 列幅可変テーブル的プロパティ */

  private get windowSize() {
    return this.$store.state.private.display.editCustomDiceBotTableWindow
      .windowSize;
  }
}
</script>

<style scoped lang="scss">
@import "../common.scss";

$margin-size: 0.5rem;
.contents {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  > *:first-child {
    margin-bottom: $margin-size;
  }
}

.buttonArea {
  @include flex-box(row, center, center);
  margin-top: $margin-size;
  font-size: 12px;

  > * {
    margin: 0 $margin-size;
  }
}

.line-box {
  @include flex-box(row, space-between, flex-end);
  font-size: 12px;
}

.commandName {
  margin-right: $margin-size;

  input {
    width: 6em;
  }
}

.diceRoll {
  input {
    width: 4em;
  }
}

.tableTitle {
  margin-left: $margin-size;
}

textarea {
  resize: none;
  font: inherit;
}
</style>
