<template>
  <spec-frame
    property="counterRemoconSpec"
    label-str="カウンターリモコン"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>畫面上方菜單的「表示」選擇</li>
      <li>「ウィンドウ」にカーソルをあてる</li>
      <li>「カウンターリモコン表示」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        イニシアティブ表的カウンター（数値）を変更是ため的鍵
      </li>
      <li>数値的変更をチャットに出力是</li>
      <li>鍵を右クリックで内容を変更</li>
      <li>
        セーブ・ロードで個別にデータを扱う（どどんとふと互換性あり）
      </li>
      <li>
        修正値にはダイスロール（「2D8+2」など）が利用可能
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>チャット出力先的タブを設定したい</li>
      <li>
        人数が多い時にキャラクター選択が畫面からはみ出す
        <br />→ リモコンにキャラクターを設定できるように是ことで対応
      </li>
      <li>
        マップにカウンターリモコン鍵を配置したい
      </li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>
        チャット出力先的タブを設定したい
        <br />→ 対応是が優先度低。初回リリースには含めない。
      </li>
      <li>
        マップにカウンターリモコン鍵を配置したい
        <br />→ 対応是が優先度低。初回リリースには含めない。
      </li>
      <li>
        セーブ・ロードで個別にデータを扱う（どどんとふと互換性あり）
        <br />→ 初回リリースには含めない。
      </li>
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
