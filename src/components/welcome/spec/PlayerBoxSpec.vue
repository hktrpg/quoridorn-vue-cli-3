<template>
  <spec-frame
    property="playerBoxSpec"
    label-str="棋子管理盒"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>畫面上方菜單的「表示」選擇</li>
      <li>「ウィンドウ」にカーソルをあてる</li>
      <li>「棋子管理盒表示」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        セレクトボックスから玩家を選ぶことで、そ的玩家が所持是オブジェクト的列表を表示是。
      </li>
      <li>玩家的チャット文字色を変更できる</li>
      <li>
        玩家が所持是キャラクター的チャット文字色を変更できる
      </li>
      <li>「キャラクター待合室」を兼ねる</li>
      <li>「墓場」を兼ねる</li>
      <li>
        其他簡易的な設定変更機能を随時新增していく予定
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>
        キャラクター待合室にいるキャラクターを編輯したい
      </li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>
        其他簡易的な設定変更機能<br />→ 便利そうな機能があれば新增していく。
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
