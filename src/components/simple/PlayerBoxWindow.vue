<template>
  <window-frame
    titleText="プレイヤーボックス画面"
    display-property="private.display.playerBoxWindow"
    align="center"
    fixSize="300, 400"
  >
    <div class="contents" @contextmenu.prevent>
      <label class="playerSelect">
        <player-select v-model="currentPlayerKey" />のプレイヤーボックス
      </label>
      <label class="playerFontColor">
        チャット文字色
        <input
          type="color"
          :value="getPlayer ? getPlayer.fontColor : ''"
          @change.stop="event => changePlayerFontColor(event.target.value)"
          @keydown.enter.stop
          @keyup.enter.stop
        />
      </label>
      <!-----------------
       ! マップ
       !---------------->
      <fieldset class="field map">
        <legend>マップにいる</legend>
        <ul class="objList">
          <li
            v-for="character in getMapObjectList({
              kind: 'character',
              place: 'field',
              playerKey: currentPlayerKey
            })"
            :key="character.key"
          >
            <character-chip :type="character.kind" :objKey="character.key" />
            <fieldset class="fontColorArea">
              <legend>チャット文字色</legend>
              <label>
                <ctrl-select
                  :value="character.fontColorType"
                  @input="value => changeFontColorType(character.key, value)"
                  :optionInfoList="fontColorTypeOptionInfoList"
                />
                <input
                  type="color"
                  :value="
                    character.fontColorType === '0'
                      ? getPlayer
                        ? getPlayer.fontColor
                        : ''
                      : character.fontColor
                  "
                  @change.stop="
                    event =>
                      changeCharacterFontColor(
                        character.key,
                        event.target.value
                      )
                  "
                  :disabled="character.fontColorType === '0'"
                  @keydown.enter.stop
                  @keyup.enter.stop
                />
              </label>
            </fieldset>
          </li>
          <!--
          <li v-for="mapMask in getMapObjectList({ kind: 'mapMask', place: 'field', playerKey: currentPlayerKey })" :key="mapMask.key">
            <MapMaskChip :type="mapMask.kind" :objKey="mapMask.key" />
          </li>
          -->
          <!--
          <li v-for="chit in getMapObjectList({ kind: 'chit', place: 'field', playerKey: currentPlayerKey })" :key="chit.key">
            <ChitChip :type="chit.kind" :objKey="chit.key" />
          </li>
          -->
        </ul>
      </fieldset>
      <!-----------------
       ! キャラクター待合室
       !---------------->
      <fieldset class="field waiting" v-if="currentPlayerKey === playerKey">
        <legend>キャラクター待合室にいる</legend>
        <ul class="objList">
          <li
            v-for="character in getMapObjectList({
              kind: 'character',
              place: 'waiting',
              playerKey: currentPlayerKey
            })"
            :key="character.key"
          >
            <character-chip :type="character.kind" :objKey="character.key" />
          </li>
        </ul>
      </fieldset>
      <!-----------------
       ! 墓場
       !---------------->
      <fieldset class="field graveyard" v-if="currentPlayerKey === playerKey">
        <legend>墓場にいる</legend>
        <ul class="objList">
          <li
            v-for="character in getMapObjectList({
              kind: 'character',
              place: 'graveyard',
              playerKey: currentPlayerKey
            })"
            :key="character.key"
          >
            <character-chip :type="character.kind" :objKey="character.key" />
          </li>
          <!--
          <li v-for="mapMask in getMapObjectList({ kind: 'mapMask', place: 'graveyard', playerKey: currentPlayerKey })" :key="mapMask.key">
            <MapMaskChip :type="mapMask.kind" :objKey="mapMask.key" />
          </li>
          -->
          <!--
          <li v-for="chit in getMapObjectList({ kind: 'chit', place: 'graveyard', playerKey: currentPlayerKey })" :key="chit.key">
            <ChitChip :type="chit.kind" :objKey="chit.key" />
          </li>
          -->
        </ul>
      </fieldset>
    </div>
  </window-frame>
</template>

<script lang="ts">
import WindowFrame from "../WindowFrame.vue";
import WindowMixin from "../WindowMixin.vue";
import CharacterChip from "../map/character/CharacterChip.vue";
import PlayerSelect from "@/components/parts/select/PlayerSelect.vue";
import CtrlSelect from "@/components/parts/CtrlSelect.vue";

import { Action, Getter } from "vuex-class";
import { Watch } from "vue-property-decorator";
import { Component, Mixins } from "vue-mixin-decorator";

@Component({
  components: {
    CtrlSelect,
    PlayerSelect,
    WindowFrame,
    CharacterChip
  }
})
export default class PlayerBoxWindow extends Mixins<WindowMixin>(WindowMixin) {
  @Action("setProperty") private setProperty: any;
  @Action("changeChatFontColor") private changeChatFontColor: any;
  @Action("changeListObj") private changeListObj: any;
  @Getter("getObj") private getObj: any;
  @Getter("playerKey") private playerKey: any;
  @Getter("getMapObjectList") private getMapObjectList: any;

  private currentPlayerKey: string = "aaa";

  changeFontColorType(this: any, key: string, value: string): void {
    const characterList = this.getMapObjectList({ kind: "character" });
    const targetCharacter = characterList.filter(
      (character: any) => character.key === key
    )[0];
    if (!targetCharacter) return;
    const index = characterList.indexOf(targetCharacter);
    this.setProperty({
      property: `public.character.list.${index}.fontColorType`,
      value: value,
      isNotice: true,
      logOff: true
    });
  }
  changeCharacterFontColor(this: any, key: string, value: boolean): void {
    this.changeChatFontColor({ key: key, color: value });
  }
  changePlayerFontColor(this: any, value: string): void {
    const targetPlayer = this.getPlayer;
    this.changeChatFontColor({ key: targetPlayer.key, color: value });
  }
  getPlayerName(this: any, playerKey: string): string {
    const player = this.getObj(playerKey);
    if (!player) return "";
    return player.name;
  }

  @Watch("currentPlayerKey")
  onChangeCurrentPlayerKey(currentPlayerKey: string) {
    // window.console.log("%%%%%%%%%%%%%%", currentPlayerKey);
  }

  @Watch("playerKey")
  onChangePlayerKey(playerKey: string) {
    // window.console.error(playerKey);
    this.currentPlayerKey = playerKey;
  }

  get getPlayer(): any {
    return this.getObj(this.currentPlayerKey);
  }

  private get fontColorTypeOptionInfoList(): any[] {
    const resultList: any[] = [];
    resultList.push({
      key: 0,
      value: "0",
      text: "主と同じ",
      disabled: false
    });
    resultList.push({
      key: 1,
      value: "1",
      text: "個別",
      disabled: false
    });
    return resultList;
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
}
fieldset {
  padding: 0 0.5rem 0.5rem;

  &.field {
    border-width: 2px;
    border-style: solid;
    &.map {
      border-color: blue;
    }
    &.waiting {
      border-color: green;
    }
    &.graveyard {
      border-color: magenta;
    }
  }
  legend {
    font-weight: bold;
  }

  &.fontColorArea {
    border: none;
    padding: 0;

    label {
      display: flex;
      flex-direction: row;
    }
  }
}
.playerSelect {
  display: block;
}
.playerFontColor {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: baseline;
  margin-bottom: 0.5rem;
}
li {
  position: relative;
}
input[type="color"] {
  width: 2rem;
  height: 1.5rem;
  padding: 0 0.2rem;
  box-sizing: border-box;
}
select {
  height: 1.5rem;
}
button {
  border-radius: 5px;
}
ul {
  margin: 0;
  list-style: none;
  padding: 0 0.5rem 0 0;

  &.objList > li {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: flex-end;

    &:not(:last-child) {
      border-bottom: 1px dashed black;
      padding-bottom: 0.5em;
      margin-bottom: 0.2em;
    }

    > *:not(:last-child) {
      margin-right: 1em;
    }

    .moveButtons {
      display: flex;
      flex-direction: column;

      button:not(:last-child) {
        margin-bottom: 0.5em;
      }
    }

    .character {
      margin-top: 1em;
      margin-right: 0.5rem;
    }
  }
}
</style>
