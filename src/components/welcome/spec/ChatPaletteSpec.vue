<template>
  <spec-frame
    property="chatPaletteSpec"
    label-str="聊天面版"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>チャット畫面的アイコン<span class="icon-list2"></span>をクリック</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格 - 操作">
      <li>
        表示是パレット数を選ぶ
      </li>
      <li>
        アクター選擇是
      </li>
      <li>編輯鍵や儲存・讀取をして利用是文を設定是</li>
      <li>
        表示されている行をダブルクリックでチャットに即反映
      </li>
      <li>（ワンクリックで畫面上方的入力欄で編輯可能狀態になる）</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格 - 詳細">
      <li>
        讀取できるフォーマット<br />
        ・Quoridornで儲存したチャパレデータ(jsonファイル)<br />
        ・どどんとふで儲存したチャパレデータ(cpdファイル)<br />
        ・文字內容データ(txtファイル)<br />
      </li>
      <li>
        どどんとふと同じ変数処理が可能
      </li>
      <li>
        自動連投機能<br />
        1つ的タブとして實裝し、各行を一定時間おきに自動でチャットに流す機能
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>複数的チャパレを同時に使いたい</li>
      <li>タブは斜め表示可能にして欲しい</li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>どどんとふと同じ変数処理<br />→ いずれ實裝</li>
      <li>自動連投機能<br />→ いずれ實裝</li>
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
        <spec-link property="chatWindowSpec" title-str=""
          >チャット畫面</spec-link
        >
      </li>
    </spec-item>
  </spec-frame>
</template>

<script>
import SpecMixin from "./SpecMixin";
export default { mixins: [SpecMixin] };
</script>

<style scoped src="./spec.css"></style>
