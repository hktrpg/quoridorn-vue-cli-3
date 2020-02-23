<template>
  <window-frame
    titleText="新增角色"
    display-property="private.display.addCharacterSettingWindow"
    align="center"
    fixSize="653, 377"
    message="按下新增按鈕並拖放到桌面"
    @open="open"
    @reset="open"
  >
    <div class="container v-box">
      <div class="h-box flex-max" @contextmenu.prevent>
        <div class="viewImage">
          <img
            v-img="currentImage"
            draggable="false"
            :class="{ isReverse: isReverse }"
          />
        </div>

        <div class="v-box flex-max">
          <image-selector
            v-model="selectImage"
            :imageTag.sync="currentImageTag"
            class="imageSelector flex-max"
          />

          <div class="switchImageArea">
            <ctrl-button
              v-show="!isOpenSwitch"
              @click="isOpenSwitch = true"
              class="switchButton"
            >
              圖片切換設定
            </ctrl-button>
            <span v-show="isOpenSwitch" class="switchImage">
              <img
                v-for="switchObj in switchImageList"
                :class="{
                  active: switchObj.key === switchCurrentKey,
                  isReverse: switchObj.isReverse
                }"
                :key="switchObj.key"
                v-img="getImage(switchObj.imgKey)"
                @click="selectSwitchImage(switchObj.key)"
                tabindex="0"
                draggable="false"
              />
            </span>
            <ctrl-button v-show="isOpenSwitch" @click.prevent="addSwitch">
              新增
            </ctrl-button>
            <ctrl-button
              v-show="isOpenSwitch"
              @click.prevent="deleteSwitch"
              :disabled="!isCanSwitchDelete"
            >
              刪除
            </ctrl-button>
          </div>
        </div>
      </div>

      <div class="initiativeTable" @contextmenu.prevent></div>

      <div class="h-box">
        <div class="v-box">
          <div class="nameArea">
            <label>
              <span @contextmenu.prevent>名字：</span>
              <input
                type="text"
                class="name"
                placeholder="必須輸入"
                v-model="name"
                ref="input"
                @keydown.enter.stop
                @keyup.enter.stop
                @keydown.229.stop
                @keyup.229.stop
              />
            </label>
          </div>
          <div class="pieceOptions">
            <label>
              <span @contextmenu.prevent>大小：</span>
              <input
                type="number"
                class="size"
                min="1"
                v-model="size"
                @keydown.enter.stop
                @keyup.enter.stop
                @keydown.229.stop
                @keyup.229.stop
              />
            </label>
            <label @contextmenu.prevent>
              <input
                type="checkbox"
                class="hide"
                v-model="isHide"
                @keydown.enter.stop
                @keyup.enter.stop
                @keydown.229.stop
                @keyup.229.stop
              />
              <span>
                隱藏在地圖迷霧下方
                <br />(在先攻表中隱藏)
              </span>
            </label>
          </div>
          <div class="urlArea">
            <label>
              <span @contextmenu.prevent>參考URL：</span>
              <input
                type="text"
                v-model="url"
                placeholder="角色シート的URL"
                @keydown.enter.stop
                @keyup.enter.stop
                @keydown.229.stop
                @keyup.229.stop
              />
            </label>
          </div>
        </div>

        <label class="v-box flex-max">
          <span @contextmenu.prevent>其他</span>
          <textarea
            class="otherText flex-max"
            v-model="text"
            @keydown.enter.stop
            @keyup.enter.stop
            @keydown.229.stop
            @keyup.229.stop
          ></textarea>
        </label>
      </div>

      <div class="buttonArea" @contextmenu.prevent>
        <div>
          <ctrl-button @click="commit">新增</ctrl-button>
          <ctrl-button @click="cancel">取消</ctrl-button>
        </div>
      </div>
    </div>
  </window-frame>
</template>

<script lang="ts">
import WindowFrame from "../../WindowFrame.vue";
import WindowMixin from "../../WindowMixin.vue";
import CtrlButton from "@/components/parts/CtrlButton.vue";
import ImageSelector from "@/components/parts/ImageSelector.vue";

import { Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { Component, Mixins } from "vue-mixin-decorator";

@Component({
  components: {
    CtrlButton,
    WindowFrame,
    ImageSelector
  }
})
export default class AddCharacterSettingWindow extends Mixins<WindowMixin>(
  WindowMixin
) {
  @Action("setProperty") private setProperty: any;
  @Action("windowOpen") private windowOpen: any;
  @Action("windowClose") private windowClose: any;
  @Getter("imageList") private imageList: any;

  private selectImage: string = "image-2";

  @Watch("selectImage")
  onChangeSelectImage(selectImage: string) {
    const index = this.switchImageList.findIndex(
      image => image.key === this.switchCurrentKey
    );
    const switchImageObj = this.switchImageList[index];

    switchImageObj.imgKey = selectImage.replace(":R", "");
    switchImageObj.isReverse = /:R/.test(selectImage);
    this.switchImageList.splice(index, 1, switchImageObj);
  }

  private isOpenSwitch: boolean = false;
  private currentImageTag: string = "imgTag-2";
  private switchImageList: any[] = [
    { key: 0, imgKey: "image-2", isReverse: false }
  ];
  private switchCurrentKey: number = 0;
  private name: string = "";
  private size: number = 1;
  private isHide: boolean = false;
  private url: string = "";
  private text: string = "";

  private addSwitch(): void {
    const nextKey: number =
      Math.max.apply(
        null,
        this.switchImageList.map(image => image.key)
      ) + 1;

    this.switchImageList.push({
      key: nextKey,
      imgKey: this.selectImage.replace(":R", ""),
      isReverse: false
    });
    this.switchCurrentKey = nextKey;
  }

  private doReverse(): void {
    const index = this.switchImageList.findIndex(
      image => image.key === this.switchCurrentKey
    );
    const switchImageObj = this.switchImageList[index];
    switchImageObj.isReverse = !switchImageObj.isReverse;
    this.switchImageList.splice(index, 1, switchImageObj);
  }

  private getImage(key: number | string): string | null {
    const imageObj = this.imageList.filter(
      (image: any) => image.key === key
    )[0];
    return imageObj ? imageObj.data : null;
  }

  private getKeyObj(list: any[], key: number | string): any | null {
    return list.filter(obj => obj.key === key)[0];
  }

  private selectSwitchImage(key: number): void {
    this.switchCurrentKey = key;
  }

  private selectTagImage(key: number): void {
    const index = this.switchImageList.findIndex(
      image => image.key === this.switchCurrentKey
    );
    const switchImageObj = this.switchImageList[index];
    switchImageObj.imgKey = key;
    switchImageObj.isReverse = false;
    this.switchImageList.splice(index, 1, switchImageObj);
  }

  private deleteSwitch(): void {
    const index = this.switchImageList.findIndex(
      image => image.key === this.switchCurrentKey
    );
    const switchImageObj = this.switchImageList[index];
    // 刪除
    this.switchImageList.splice(index, 1);
    this.switchCurrentKey = this.switchImageList[
      index < this.switchImageList.length
        ? index
        : this.switchImageList.length - 1
    ].key;
  }

  private commit(): void {
    this.name = this.name.trim();
    if (!this.name) {
      alert(`請輸入你的名字。`);
      return;
    }

    const useImageList = this.switchImageList
      .map(imgObj => `${imgObj.imgKey}${imgObj.isReverse ? ":R" : ""}`)
      .join("|");

    const obj = {
      name: this.name,
      size: this.size,
      useImageList: useImageList,
      isHide: this.isHide,
      url: this.url,
      text: this.text,
      useImageIndex: this.switchCurrentKey,
      currentImageTag: this.currentImageTag
    };
    this.setProperty({
      property: `private.display.addCharacterWindow`,
      value: obj,
      logOff: true
    });
    this.windowOpen("private.display.addCharacterWindow");
  }

  private cancel(): void {
    this.windowClose("private.display.addCharacterSettingWindow");
  }

  private open(): void {
    this.isOpenSwitch = false;
    this.currentImageTag = "imgTag-2";
    this.switchImageList.splice(0, this.switchImageList.length);
    this.switchImageList.push({
      key: 0,
      imgKey: "image-2",
      isReverse: false
    });
    this.switchCurrentKey = 0;
    this.name = "";
    this.size = 1;
    this.isHide = false;
    this.url = "";
    this.text = "";
    this.windowClose("private.display.addCharacterWindow");

    const input: HTMLInputElement = this.$refs.input as HTMLInputElement;
    input.focus();
  }

  private get isReverse(): boolean {
    return this.getKeyObj(this.switchImageList, this.switchCurrentKey)
      .isReverse;
  }

  private get isCanSwitchDelete(): boolean {
    return this.switchImageList.length > 1;
  }

  private get currentImage(): string | null {
    return this.getImage(this.currentImageKey);
  }

  private get currentImageKey(): string {
    return this.getKeyObj(this.switchImageList, this.switchCurrentKey).imgKey;
  }
}
</script>

<style scoped lang="scss">
@import "../../common.scss";

.container {
  width: 100%;
  height: 100%;
  font-size: 12px;

  > * {
    padding: 1px 0;
  }
}

.isReverse {
  transform: scale(-1, 1);
}
.viewImage {
  img {
    display: inline-block;
    width: 200px;
    height: 200px;
  }
}
.imageSelector {
  max-height: 199px;
}
.switchImageArea {
  display: flex;

  .switchImage {
    display: inline-block;
    flex: 1;
    height: 50px;

    img {
      width: 50px;
      height: 50px;
      border: solid rgba(0, 0, 0, 0) 1px;

      &.active {
        border: solid blue 1px;
      }
    }
  }

  button {
    &.switchButton {
      height: 26px;
    }

    &:not(.switchButton) {
      height: 50px;
      display: inline-block;
      margin-left: 10px;
    }
  }
}
.initiativeTable {
}
.nameArea label {
  @include flex-box(row, center, center);

  input {
    flex: 1;
  }
}
.viewImage {
}
.pieceOptions {
  input[type="number"] {
    width: 35px;
  }
}
.pieceOptions span {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.otherText {
  resize: none;
  box-sizing: border-box;
}
.urlArea label {
  @include flex-box(row, center, center);

  input {
    flex: 1;
  }
}
.urlArea input {
  flex: 1;
}
.buttonArea {
  text-align: center;
  padding-top: 0.5em;
  /*padding-bottom: 10px;*/

  > div {
    display: inline-block;

    > * {
      margin: 0 0.5em;
    }
  }
}
input {
  padding: 2px;
}
</style>
