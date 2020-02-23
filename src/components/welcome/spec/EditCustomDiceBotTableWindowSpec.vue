<template>
  <spec-frame
    property="editCustomDiceBotTableWindowSpec"
    label-str="更改骰子Bot表"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>
        ダイスボット用表管理畫面的新的作成鍵またはコピー作成鍵、編輯鍵をクリック
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>「コマンド名」はチャットに反応是文字</li>
      <li>
        「ダイス」はBCDiceが反応できるコマンド
      </li>
      <li>
        「表標題」はそ的独自ダイスボットにつける名前
      </li>
      <li>「ゲームシステム」はメモ程度的情報</li>
      <li>
        「表内容」は全角半角どちらでもいい的でコロン(：)で区切って、コロン的左が「BCDice的結果的うち一番右的"→"的右的部分」、コロン的右がそ的独自ダイスボットとして的結果となるように記述していくこと。
      </li>
      <li>
        「表内容」的過分は無視され、不足分は「該当値無」が結果となる。
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>無</li>
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
        <spec-link property="chatWindowSpec" title-str=""
          >チャット畫面</spec-link
        >
      </li>
      <li>
        <spec-link property="customDiceBotTableWindowSpec" title-str=""
          >ダイスボット用表管理</spec-link
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
