<template>
  <spec-frame
    property="counterRemoconSpec"
    label-str="累計遙控器"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>畫面上方菜單的「顯示」選擇</li>
      <li>「視窗ウ」にカーソルをあてる</li>
      <li>「累計遙控器顯示」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        先攻表的計數器（数値）を變更是ため的鍵
      </li>
      <li>数値的變更を聊天視窗に出力是</li>
      <li>鍵を右クリックで内容を變更</li>
      <li>
        儲存・讀取で個別に資料を扱う（どどんとふと互換性有）
      </li>
      <li>
        修正値には骰子ロール（「2D8+2」など）が利用可能
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>聊天視窗出力先的分頁設定したい</li>
      <li>
        人数が多い時に角色選擇が畫面からはみ出す
        <br />→ リモコンに角色を設定できるように是ことで支援
      </li>
      <li>
        地圖に累計遙控器鍵を配置したい
      </li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>
        聊天視窗出力先的分頁設定したい
        <br />→ 支援是が優先度低。初回リリースには含めない。
      </li>
      <li>
        地圖に累計遙控器鍵を配置したい
        <br />→ 支援是が優先度低。初回リリースには含めない。
      </li>
      <li>
        儲存・讀取で個別に資料を扱う（どどんとふと互換性有）
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
