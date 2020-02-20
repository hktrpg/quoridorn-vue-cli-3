<template>
  <window-frame
    titleText="先攻表設定"
    display-property="private.display.initiativeSettingWindow"
    align="center"
    fixSize="510, 210"
    @open="open"
    @reset="open"
  >
    <div class="contents">
      <div class="message" @contextmenu.prevent>
        請以空白鍵區隔計數裡使用的狀態名稱。 <br />
        在前頭輸入 ＊（全形、半形皆可）將會變為勾選欄位。 <br />
        可用（最小）＜數值名＜（最大）設定上下限。指定為「？」則可個別設定。<br />
        例）-15＜HP＜? ?＜MP＜99 AC 侵蝕率 可能性 *毒 ＊翻倒<br />
      </div>
      <div class="message example">
        <span @contextmenu.prevent>例）</span>
        <span class="selectable">
          -15&lt;HP&lt;?&#12288;?&lt;MP&lt;99&#12288;AC&#12288;侵食率&#12288;ポシビリティ&#12288;*毒&#12288;＊転倒
        </span>
        <br />
      </div>
      <div class="message" @contextmenu.prevent>
        (註)此設定會影響同遊戲室的所有人。。
      </div>
      <label @contextmenu.prevent>
        計數名稱列表：
        <input
          type="text"
          v-model="format"
          @keydown.enter.stop
          @keyup.enter.stop
          @keydown.229.stop
          @keyup.229.stop
          ref="input"
        />
      </label>
      <hr />
      <div class="operationArea" @contextmenu.prevent>
        <ctrl-button @click="commit">決定</ctrl-button>
        <ctrl-button @click="cancel">取消</ctrl-button>
      </div>
    </div>
  </window-frame>
</template>

<script lang="ts">
import WindowMixin from "../WindowMixin.vue";
import WindowFrame from "../WindowFrame.vue";
import CtrlButton from "@/components/parts/CtrlButton.vue";

import { Action, Getter } from "vuex-class";
import { Component, Mixins } from "vue-mixin-decorator";

@Component({
  components: {
    CtrlButton,
    WindowFrame
  }
})
export default class InitiativeSettingWindow extends Mixins<WindowMixin>(
  WindowMixin
) {
  @Action("setProperty") private setProperty: any;
  @Action("windowClose") private windowClose: any;
  @Action("setInitiativeParams") private setInitiativeParams: any;
  @Getter("rowStr") private rowStr: any;

  private format: string = "";

  open() {
    this.format = this.value;

    const input: HTMLInputElement = this.$refs.input as HTMLInputElement;
    input.focus();
  }

  commit() {
    this.setProperty({
      property: "public.initiative.rowStr",
      value: this.format,
      isNotice: true,
      logOff: true
    });
    this.windowClose("private.display.initiativeSettingWindow");
    this.setInitiativeParams({ format: this.format.trim() });
  }

  cancel() {
    this.windowClose("private.display.initiativeSettingWindow");
  }

  get value(): string {
    return this.rowStr;
  }
}
</script>

<style scoped lang="scss">
@import "../common.scss";

.contents {
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  .message {
    line-height: 1.7em;

    &.example {
      text-align: center;
    }
  }

  label {
    display: flex;
    flex-direction: row;

    input {
      flex: 1;
    }
  }

  .operationArea {
    display: flex;
    flex-direction: row;
  }
}
</style>
