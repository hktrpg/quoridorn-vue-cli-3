<template>
  <window-frame
    titleText="上傳圖片"
    display-property="private.display.dropImageWindow"
    align="center"
    fixSize="385, 660"
  >
    <div class="contents" @contextmenu.prevent>
      <div v-if="!imageList">圖片讀取中...</div>
      <fieldset v-for="imageObj in imageList" :key="imageObj.key">
        <legend>{{ imageObj.name }}</legend>
        <div>
          <img class="image" v-img="imageObj.image" draggable="false" />
          <ctrl-button class="passwordButton" @click="passwordButtonOnClick"
            >隱藏圖片密碼(未實裝)</ctrl-button
          >
          <label class="passwordLabel"
            >隱藏圖片密碼：{{ imageObj.password !== "" ? "有" : "無" }}</label
          >
          <span class="tagLabel">加上標籤(用半型/全型和空格分隔)</span>
          <input
            class="tagInput"
            type="text"
            @change.stop="changeTag(imageObj.key)"
            v-model="imageObj.currentTag"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          />
          <ctrl-select
            class="tagSelect"
            @input="selectTag(imageObj.key)"
            v-model="imageObj.selectTag"
            :optionInfoList="tagSelectOptionInfoList"
          />
        </div>
      </fieldset>
      <div class="operateArea">
        <ctrl-button @click="commit" :disabled="!imageList">決定</ctrl-button>
        <ctrl-button @click="cancel" :disabled="!imageList">取消</ctrl-button>
      </div>
    </div>
  </window-frame>
</template>

<script lang="ts">
import CtrlButton from "@/components/parts/CtrlButton.vue";
import CtrlSelect from "@/components/parts/CtrlSelect.vue";
import WindowFrame from "../WindowFrame.vue";
import WindowMixin from "../WindowMixin.vue";

import { Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { Component, Mixins } from "vue-mixin-decorator";

@Component({
  components: {
    CtrlSelect,
    CtrlButton,
    WindowFrame
  }
})
export default class DropImageWindow extends Mixins<WindowMixin>(WindowMixin) {
  @Action("imageTagChange") private imageTagChange: any;
  @Action("addImage") private addImage: any;
  @Action("windowClose") private windowClose: any;
  @Action("emptyProperty") private emptyProperty: any;
  @Getter("dropImageList") private dropImageList: any;
  @Getter("imageTagList") private imageTagList: any;
  @Getter("playerKey") private playerKey: any;
  @Getter("activeChatTab") private activeChatTab: any;
  @Action("sendChatLog") private sendChatLog: any;

  private imageList: any[] = [];

  private commit(): void {
    this.imageList.forEach(imageObj => {
      this.addImage({
        name: imageObj.name,
        tag: imageObj.currentTag,
        data: imageObj.image,
        thumbnail: imageObj.thumbnail,
        imageArgList: imageObj.imageArgList,
        owner: this.playerKey
      });
    });
    this.windowClose("private.display.dropImageWindow");
    this.emptyProperty({
      property: "private.display.dropImageWindow.imageDataList"
    });
  }

  private cancel(): void {
    this.windowClose("private.display.dropImageWindow");
    this.emptyProperty({
      property: "private.display.dropImageWindow.imageDataList"
    });
  }

  private getKeyObj(list: any[], key: string): any {
    const filteredList = list.filter(obj => obj.key === key);
    if (filteredList.length === 0) {
      window.console.log(`key:"${key}" is not find.`);
      return null;
    }
    if (filteredList.length > 1) {
      window.console.log(`key:"(${key})" is duplicate.`);
      return null;
    }
    return filteredList[0];
  }

  private passwordButtonOnClick(): void {
    this.sendChatLog({
      actorKey: "HKTRPG",
      text: "未實裝此功能。",
      chatTarget: this.playerKey,
      statusName: "◆",
      outputTab: this.activeChatTab
    });
    //  alert("未實裝此功能。");
  }

  private changeTag(key: string): void {
    // 輸入によって標籤的新增・刪除が発生是可能性がある的で、標籤リストを整理してもらう
    window.console.log("changeTag");
    this.imageTagChange({ key: key, imageList: this.imageList });
  }

  private selectTag(key: string): void {
    const imgObj = this.getKeyObj(this.imageList, key);
    window.console.log(imgObj.currentTag, imgObj.selectTag);
    imgObj.currentTag = imgObj.selectTag;
    // const index = this.imageList.indexOf(imgObj)
    // this.imageList.splice(index, 1, imgObj)
    // 選擇によって標籤的刪除が発生是可能性がある的で、標籤リストを整理してもらう
    this.imageTagChange({ key: key, imageList: this.imageList });
  }

  private get tagSelectOptionInfoList(): any[] {
    return this.imageTagList
      .concat()
      .slice(1)
      .map((imageTag: any) => ({
        key: imageTag.key,
        value: imageTag.name,
        text: imageTag.name,
        disabled: false
      }));
  }

  @Watch("dropImageList")
  private onChangeDropImageList(dropImageList: any[]): void {
    this.imageList = dropImageList.map(imgObj => ({
      key: imgObj.key,
      name: imgObj.name,
      image: imgObj.image,
      thumbnail: imgObj.thumbnail,
      imageArgList: imgObj.imageArgList,
      currentTag: "角色",
      selectTag: "角色",
      password: ""
    }));
  }
}
</script>

<style scoped lang="scss">
.contents {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  font-size: 12px;

  input {
    display: inline;
  }

  .operateArea {
    vertical-align: middle;
    text-align: center;
    margin-top: 10px;
  }
}

fieldset > div {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto 1fr auto auto;
  grid-template-areas:
    "viewImage passwordButton passwordButton"
    "viewImage passwordLabel  passwordLabel"
    "viewImage .............. .............."
    "tagLabel  tagLabel       tagLabel"
    "tagInput  tagInput       tagSelect";
}

button {
  font-size: 11px;
}

.image {
  grid-area: viewImage;
  width: 96px;
  height: 96px;
  border: solid gray 1px;
}

.passwordButton {
  grid-area: passwordButton;
}

.passwordLabel {
  grid-area: passwordLabel;
}

.tagLabel {
  grid-area: tagLabel;
}

.tagInput {
  margin-right: 5px;
  grid-area: tagInput;
}

.tagSelect {
  grid-area: tagSelect;
}
</style>
