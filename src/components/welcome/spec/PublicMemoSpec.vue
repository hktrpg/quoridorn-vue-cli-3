<template>
  <spec-frame
    property="publicMemoSpec"
    label-str="共有メモ"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="新增・設定方法">
      <li>
        畫面上方菜單的「共有メモ」選擇是ことで畫面上に１つ新增
      </li>
      <li>
        表示されたチップを右クリックして「編輯」選擇
      </li>
      <li>
        「新增タブ的名前」欄にタブ的名前を入力してタブを新增
      </li>
      <li>
        赤背景に黒い歯車的鍵をクリックして新增是項目を新增
      </li>
      <li>
        閲覧許可を出すアクター（玩家、もしくはキャラクター）選擇（誰も選択しなければ全員閲覧可能）
        <br />キャラクターだけ選べば、そ的所有者は自動的に閲覧可能。
        <br />玩家が選べる的はGMや觀戰者へ的配慮
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>タブを新增可能</li>
      <li>表裏がある</li>
      <li>表裏に閲覧權限を付与</li>
      <li>
        内容として以下的項目を新增できる
        <ul>
          <li>大見出し</li>
          <li>小見出し</li>
          <li>テキスト</li>
          <li>檢查ボックス</li>
          <li>区切り線</li>
          <li>圖片欄</li>
        </ul>
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>表裏をつけてほしい</li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>無</li>
    </spec-item>
    <!----------------------
     ! 未實現的功能
     !--------------------->
    <spec-item class-str="unSupport" label-str="未實現的功能">
      <li>無</li>
    </spec-item>
    <!----------------------
     ! 相關項目
     !--------------------->
    <spec-item class-str="ref" label-str="相關項目">
      <li>
        <spec-link property="menuBar" title-str="">主菜單</spec-link>
      </li>
    </spec-item>
  </spec-frame>
</template>

<script>
import SpecMixin from "./SpecMixin";
export default { mixins: [SpecMixin] };
</script>

<style scoped src="./spec.css"></style>
