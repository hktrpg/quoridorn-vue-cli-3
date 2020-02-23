<template>
  <fieldset class="root">
    <legend>房間資料</legend>
    <label>
      房間名：
      <span>{{ roomName }}</span>
    </label>
    <label>
      密碼：
      <span>{{ roomPassword || "沒有密碼" }}</span>
    </label>
    <label>
      系統：
      <span>{{ systemName }}</span>
    </label>
    <div style="color: darkgreen;">
      ※ 尚未加密登錄信息，預定將來會增加這功能。
    </div>
    <label v-if="!isWait">
      招待用URL：
      <input
        class="inviteUrl"
        type="text"
        readonly="readonly"
        :value="inviteUrl"
        @keydown.enter.stop
        @keyup.enter.stop
        @keydown.229.stop
        @keyup.229.stop
      />
      <ctrl-button class="copy" @click="doCopy">複製</ctrl-button>
    </label>
    <div class="description" v-if="isWait">
      這是一個臨時房間，一直保留到指定房間新增為止。
      <br />目標的房間新增的信息出現後，將會自動在房間進行移動。
      <br />數據將不會傳送到目標房間。
    </div>
  </fieldset>
</template>

<script lang="ts">
import CtrlButton from "@/components/parts/CtrlButton.vue";

import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { execCopy } from "../../common/Utility";

@Component({ components: { CtrlButton } })
export default class RoomInfo extends Vue {
  @Action("getBcdiceSystemInfo") private getBcdiceSystemInfo: any;
  @Getter("roomName") private roomName: any;
  @Getter("roomPassword") private roomPassword: any;
  @Getter("inviteUrl") private inviteUrl: any;
  @Getter("isWait") private isWait: any;
  @Getter("roomSystem") private roomSystem: any;

  private systemName: string = "";

  @Watch("roomSystem", { immediate: true })
  onChangeRoomSystem(roomSystem: string) {
    this.getBcdiceSystemInfo(roomSystem)
      .then((info: any) => {
        this.systemName = info.name;
      })
      .catch((err: any) => {
        window.console.error(err);
        this.systemName = "無法獲得骰子bot的名稱。";
      });
  }

  /**
   * 文字內容をクリップボードに複製是
   * @param event
   */
  doCopy(event: any): void {
    const text = event.target.parentNode.previousElementSibling.value;
    if (!execCopy(text)) {
      alert("無法複製文字。\n" + text);
    }
    alert(text);
  }
}
</script>

<style scoped src="./login.css"></style>

<style scoped lang="scss">
fieldset.root,
fieldset.root > legend {
  background-color: #eeeecc;
}
.description {
  text-align: left;
  color: red;
}
label {
  display: flex;
  > input {
    flex: 1;
  }
}
</style>
