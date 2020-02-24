<template>
  <context-frame displayProperty="private.display.gameTableContext">
    <div class="item" @click.left.prevent="addCharacter">添加角色</div>
    <div class="item" @click.left.prevent="addMapMask">添加地圖迷霧</div>
    <div class="item" @click.left.prevent="addMapMarker">添加地圖標記</div>
    <div class="item" @click.left.prevent="addChit">添加棋子</div>
    <div class="item" @click.left.prevent="addFloorTile">添加地圖版塊</div>
    <hr />
    <div class="item" @click.left.prevent="addDiceSymbol">添加骰子</div>
    <hr />
    <div class="item" @click.left.prevent="changeMap">地圖變更</div>
    <hr />
    <div class="item" @click.left.prevent="createHandCardArea">
      手札置き場的新增(未實裝)
    </div>
    <div class="item" @click.left.prevent="createMessageCard">
      信息卡新增(未實裝)
    </div>
    <hr />
    <div class="item" @click.left.prevent="resetWindowLocate">
      初始化視窗畫面
    </div>
  </context-frame>
</template>

<script lang="ts">
import ContextFrame from "../ContextFrame.vue";
import WindowMixin from "../WindowMixin.vue";
import { qLog } from "../common/Utility";

import { Action } from "vuex-class";
import { Component, Mixins } from "vue-mixin-decorator";

@Component({
  components: { ContextFrame }
})
export default class GameTableContext extends Mixins<WindowMixin>(WindowMixin) {
  @Action("windowOpen") private windowOpen: any;
  @Action("setProperty") private setProperty: any;
  @Action("windowClose") private windowClose: any;
  @Action("doResetWindowLocate") private doResetWindowLocate: any;

  @Getter("activeChatTab") private activeChatTab: any;
  @Getter("playerKey") private playerKey: any;
  @Action("sendChatLog") private sendChatLog: any;
  private addCharacter(): void {
    this.windowOpen("private.display.addCharacterSettingWindow");
    this.windowClose("private.display.gameTableContext");
  }

  private addMapMask(): void {
    this.windowOpen("private.display.addMapMaskWindow");
    this.windowClose("private.display.gameTableContext");
  }

  private addMapMarker(): void {
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "新增地圖標記",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.windowClose("private.display.gameTableContext");
  }

  private addChit(): void {
    this.windowOpen("private.display.addChitWindow");
    this.windowClose("private.display.gameTableContext");
  }

  private addFloorTile(): void {
    this.windowOpen("private.display.addFloorTileWindow");
    this.windowClose("private.display.gameTableContext");
  }

  private addDiceSymbol(): void {
    this.windowOpen("private.display.addDiceSymbolWindow");
    this.windowClose("private.display.gameTableContext");
  }

  private changeMap(): void {
    this.windowOpen("private.display.editMapWindow");
    this.windowClose("private.display.gameTableContext");
  }

  private createHandCardArea(): void {
    qLog(`  [methods] select context => item: GameTable.createHandCardArea`);
    this.sendChatLog({
      actorKey: "HKTRPG",
      text: "未實裝此功能。",
      chatTarget: this.playerKey,
      statusName: "◆",
      outputTab: this.activeChatTab
    });
    // alert("未實裝此功能。");
    this.windowClose("private.display.gameTableContext");
  }

  private createMessageCard(): void {
    qLog(`  [methods] select context => item: GameTable.createMessageCard`);
    this.setProperty({
      property: "private.display.unSupportWindow.title",
      value: "新增新信息卡",
      logOff: true
    });
    this.windowOpen("private.display.unSupportWindow");
    this.windowClose("private.display.gameTableContext");
  }

  private resetWindowLocate(): void {
    qLog(`  [methods] select context => item: GameTable.resetWindowLocate`);
    this.doResetWindowLocate();
    this.windowClose("private.display.gameTableContext");
  }
}
</script>
