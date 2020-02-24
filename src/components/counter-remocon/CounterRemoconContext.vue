<template>
  <context-frame displayProperty="private.display.counterRemoconContext">
    <div class="item" @click.left.prevent="changeOnClick">變更按鈕</div>
    <hr />
    <div class="item" @click.left.prevent="deleteOnClick">刪除按鈕</div>
    <hr />
    <div class="item" @click.left.prevent="copyOnClick">複製按鈕</div>
    <hr />
    <div class="item" @click.left.prevent="moveRightOnClick">
      按鈕【&emsp;&emsp;右→】
    </div>
    <div class="item" @click.left.prevent="moveLeftOnClick">
      按鈕【←左&emsp;&emsp;】
    </div>
  </context-frame>
</template>

<script lang="ts">
import ContextFrame from "../ContextFrame.vue";
import WindowMixin from "../WindowMixin.vue";

import { Action, Getter } from "vuex-class";
import { Component, Mixins } from "vue-mixin-decorator";

@Component({ components: { ContextFrame } })
export default class CounterRemoconContext extends Mixins<WindowMixin>(
  WindowMixin
) {
  @Getter("activeChatTab") private activeChatTab: any;
  @Getter("playerKey") private playerKey: any;
  @Action("sendChatLog") private sendChatLog: any;
  @Action("windowOpen") private windowOpen: any;
  @Action("setProperty") private setProperty: any;
  @Action("windowClose") private windowClose: any;
  @Action("deleteListObj") private deleteListObj: any;
  @Action("copyListObj") private copyListObj: any;
  @Getter("getObj") private getObj: any;
  @Getter("remoconContextKey") private remoconContextKey: any;

  private changeOnClick(): void {
    this.setProperty({
      property: `private.display.counterRemoconEditorWindow.objKey`,
      value: this.remoconContextKey,
      isNotice: false,
      logOff: true
    });
    this.windowClose("private.display.counterRemoconContext");
    this.windowOpen("private.display.counterRemoconEditorWindow");
  }

  private deleteOnClick(): void {
    this.deleteListObj({
      propName: "counterRemocon",
      key: this.remoconContextKey,
      isNotice: true
    });
    this.windowClose("private.display.counterRemoconContext");
  }

  private copyOnClick(): void {
    this.copyListObj({
      key: this.remoconContextKey
    });
    this.windowClose("private.display.counterRemoconContext");
  }

  private moveRightOnClick(): void {
    // TODO
    window.console.log("moveRightOnClick");
    this.sendChatLog({
      actorKey: "HKTRPG",
      text: "未實裝此功能",
      chatTarget: this.playerKey,
      statusName: "◆",
      outputTab: this.activeChatTab
    });
    //alert("未實裝");
    this.windowClose("private.display.counterRemoconContext");
  }

  private moveLeftOnClick(): void {
    // TODO
    window.console.log("moveLeftOnClick");
    this.sendChatLog({
      actorKey: "HKTRPG",
      text: "未實裝此功能",
      chatTarget: this.playerKey,
      statusName: "◆",
      outputTab: this.activeChatTab
    });
    // alert("未實裝");
    this.windowClose("private.display.counterRemoconContext");
  }
}
</script>
