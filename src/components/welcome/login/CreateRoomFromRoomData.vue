<template>
  <fieldset class="root">
    <legend>使用備份檔案新增房間</legend>
    <div class="input-room-data">
      房間檔案：
      <ctrl-button @click="chooseFile">選擇檔案</ctrl-button>
      <div class="description">
        {{ files.length ? "" : "未選擇" }}
        <span v-for="file in files" :key="file.name">{{ file.name }}</span>
      </div>
      <input
        ref="fileChooser"
        type="file"
        style="display: none;"
        accept=".zip"
        multiple
        @change="selectFile"
        @keydown.enter.stop
        @keyup.enter.stop
        @keydown.229.stop
        @keyup.229.stop
      />
    </div>
    <ctrl-button @click="commit"><i class="icon-home3"></i> 新增</ctrl-button>
  </fieldset>
</template>

<script lang="ts">
import CtrlButton from "@/components/parts/CtrlButton.vue";
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component({ components: { CtrlButton } })
export default class CreateRoomFromRoomData extends Vue {
  @Action("importStart") private importStart: any;

  private files: File[] = [];

  chooseFile(this: any): void {
    const fileChooser: HTMLElement = this.$refs.fileChooser;
    fileChooser.click();
  }

  selectFile(event: any) {
    if (event.target.files.length === 0) return;
    this.files = [];
    Array.prototype.push.apply(this.files, event.target.files);
  }

  /**
   * 確定ボタン押下時
   */
  commit(): void {
    if (!this.files.length) {
      alert("請選擇一個文件。");
      return;
    }
    this.importStart({ zipFiles: this.files, isRoomCreate: true });
  }
}
</script>

<style scoped src="./login.css"></style>

<style scoped lang="scss">
fieldset.root,
fieldset.root > legend {
  background-color: #cceeee;
}

.input-room-data {
  display: flex;

  > * {
    display: flex;
    align-items: center;

    &:last-child {
      flex: 1;
    }
  }
}

.description {
  padding-left: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
