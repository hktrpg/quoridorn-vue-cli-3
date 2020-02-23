<template>
  <window-frame
    titleText="讀取房間ZIP"
    display-property="private.display.dropZipWindow"
    align="center"
    fixSize="300, 100"
  >
    <div class="contents" @contextmenu.prevent>
      <div v-if="!saveDataList">載入房間資料中...</div>
      <!-- TODO 初回リリース支援としては部分讀取は否
      <div v-if="saveDataList">複数的儲存資料有同樣的數據的情況下、各儲存資料將按順序覆蓋。</div>
      <fieldset v-for="(saveDataObj, index) in saveDataList" :key="index">
        <legend>{{saveDataObj.fileName}}</legend>
        <ctrl-ctrl-button @click="allSelect(index)">全部對像</button><ctrl-button @click="allDisSelect(index)">全部除外</ctrl-button>
        <div class="useCheckList">
          <label v-for="propObj in saveDataObj.useList" :key="propObj.label">
            <input type="checkbox" v-model="propObj.isUse" />
            {{propObj.label}}
          </label>
        </div>
      </fieldset>
      -->
      <div v-if="saveDataList">
        在此階段無法部分讀取。 <br />將讀取所有資料。
      </div>
      <div class="operateArea">
        <ctrl-button @click="commit" :disabled="!saveDataList">
          決定
        </ctrl-button>
        <ctrl-button @click="cancel" :disabled="!saveDataList">
          取消
        </ctrl-button>
      </div>
    </div>
  </window-frame>
</template>

<script lang="ts">
import CtrlButton from "@/components/parts/CtrlButton.vue";
import WindowFrame from "../WindowFrame.vue";
import WindowMixin from "../WindowMixin.vue";

import { Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { Component, Mixins } from "vue-mixin-decorator";

@Component({
  components: {
    CtrlButton,
    WindowFrame
  }
})
export default class DropZipWindow extends Mixins<WindowMixin>(WindowMixin) {
  @Action("windowClose") private windowClose: any;
  @Action("windowOpen") private windowOpen: any;
  @Action("doImport") private doImport: any;
  @Getter("dropZipList") private dropZipList: any;
  @Getter("dropZipRoomCreate") private dropZipRoomCreate: any;

  private saveDataList: any[] = [];

  commit(): void {
    // zip資料的配列的マージ先
    const importData: any = {
      publicData: null,
      delKeyList: [],
      addObjList: [],
      dropZipRoomCreate: this.dropZipRoomCreate
    };

    // zip資料をマージ是
    // TODO とりあえず、インポート是資料的取捨選擇は考慮否（第一リリース規格）
    this.dropZipList.forEach(
      ({ fileName, saveData }: { fileName: string; saveData: any }) => {
        const publicData: any = saveData.public;
        const dataVersion: string = saveData.dataVersion;

        // const delKeyList: string[] = saveData.delKeyList;
        // const addObjList: any[] = saveData.addObjList;

        // TODO 儲存資料的互換性的処理

        // public資料的マージ（先勝ち）
        if (!importData.publicData) {
          // TODO 本当はもっと細かい単位で処理したい
          importData.publicData = publicData;
        }

        // // 刪除リスト的マージ
        // delKeyList.forEach(delKey => {
        //   if (importData.delKeyList.indexOf(delKey) !== -1) return;
        //   importData.delKeyList.push(delKey);
        // });
        //
        // // 新增リスト的マージ
        // addObjList.forEach(addObj => {
        //   const index = importData.addObjList.findIndex((impAddObj: any) => {
        //     return JSON.stringify(addObj) === JSON.stringify(impAddObj);
        //   });
        //   if (index !== -1) return;
        //   importData.addObjList.push(addObj);
        // });
      }
    );
    this.doImport(importData);
    this.windowClose("private.display.dropZipWindow");
  }
  cancel(): void {
    this.windowClose("private.display.dropZipWindow");
  }
  allSelect(index: number): void {
    const useList: any[] = this.saveDataList[index].useList;
    useList.forEach((useObj, index: number) => {
      useObj.isUse = true;
      useList.splice(index, 1, useObj);
    });
  }
  allDisSelect(index: number): void {
    const useList: any[] = this.saveDataList[index].useList;
    useList.forEach((useObj, index: number) => {
      useObj.isUse = false;
      useList.splice(index, 1, useObj);
    });
  }

  @Watch("dropZipList")
  onChangeStoreZipList(dropZipList: any[]) {
    this.saveDataList = [];
    if (!dropZipList) {
      return;
    }
    dropZipList.forEach(saveDataObj => {
      const useList = [];
      const publicData = saveDataObj.saveData.public;
      if (publicData.setting) {
        useList.push({
          label: "設定資料(方格、旋轉標記顯示)",
          isUse: true,
          target: "setting"
        });
      }
      if (publicData.room) {
        useList.push({
          label: "房間資料(續團必須有)",
          isUse: true,
          target: "room"
        });
      }
      if (publicData.chat) {
        useList.push({
          label: "聊天視窗履歴(房間資料集合)",
          isUse: true,
          target: "chat"
        });
      }
      if (publicData.image) {
        useList.push({ label: "圖片資料", isUse: true, target: "image" });
      }
      if (publicData.map) {
        useList.push({
          label: "地圖資料(圖片資料集合)",
          isUse: true,
          target: "map"
        });
      }
      if (publicData.mapMask) {
        useList.push({
          label: "地圖迷霧資料",
          isUse: true,
          target: "mapMask"
        });
      }
      if (publicData.character) {
        useList.push({
          label: "角色資料(圖片資料集合)",
          isUse: true,
          target: "character"
        });
      }
      if (publicData.chit) {
        useList.push({
          label: "棋子資料(圖片資料集合)",
          isUse: true,
          target: "chit"
        });
      }
      if (publicData.publicMemo) {
        useList.push({
          label: "共用筆記",
          isUse: true,
          target: "publicMemo"
        });
      }
      this.saveDataList.push({
        fileName: saveDataObj.fileName,
        useList: useList,
        saveData: saveDataObj.saveData
      });
    });
  }
}
</script>

<style scoped lang="scss">
.contents {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  font-size: 12px;
}

fieldset > div {
  display: grid;
  width: 100%;
  height: 100%;
}
</style>
