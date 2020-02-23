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
        骰子ボット用表管理畫面的新的新增鍵または複製新增鍵、編輯鍵點擊
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>「命令名」は聊天視窗に反応是文字</li>
      <li>
        「骰子」はBCDiceが反応できる命令
      </li>
      <li>
        「表標題」はそ的独自骰子ボットにつける名字
      </li>
      <li>「ゲーム系統」は筆記程度的資料</li>
      <li>
        「表内容」は全角半角どちらでもいい的でコロン(：)で区切って、コロン的左が「BCDice的結果的うち一番右的"→"的右的部分」、コロン的右がそ的独自骰子ボットとして的結果となるように記述していくこと。
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
          >聊天視窗畫面</spec-link
        >
      </li>
      <li>
        <spec-link property="customDiceBotTableWindowSpec" title-str=""
          >骰子ボット用表管理</spec-link
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
