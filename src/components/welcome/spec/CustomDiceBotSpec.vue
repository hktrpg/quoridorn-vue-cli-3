<template>
  <spec-frame
    property="customDiceBotSpec"
    label-str="設定獨立骰組"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>聊天視窗畫面的圖示<span class="icon-dice"></span>點擊</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格 - 操作">
      <li>
        新的新增鍵でサンプル骰子ボットを新增して編輯畫面を開く
      </li>
      <li>
        複製新增鍵で表的選擇中的骰子ボットを表末尾に複製して、それを編輯是編輯畫面を開く
      </li>
      <li>
        變更鍵で表的選擇中的骰子ボットを編輯是編輯畫面を開く
      </li>
      <li>
        刪除鍵で表的選擇中的骰子ボットを刪除
      </li>
      <li>↑鍵で選擇した行を上に移動</li>
      <li>↓鍵で選擇した行を下に移動</li>
      <li>關閉鍵でそ的畫面を關閉</li>
      <li>
        聊天視窗されたら、独自骰子ボット表的上から順に一致（全角半角大文字小文字的違いは無視）是も的を探して利用是
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格 - 自鯖設定">
      <li>
        設定ファイル「conf/system/[骰子ボット的key]/customDiceBot.yaml」を設置しておく。
      </li>
      <li>
        房間的骰子ボット」（聊天視窗欄ではない）で、設置した設定ファイルに支援是骰子ボット選擇是。
      </li>
      <li>
        表的区切り線的下にそ的設定ファイルに記載されている骰子ボットが登録される。
      </li>
      <li>
        設定ファイル由来的骰子ボットは編輯しても、房間的骰子ボットが變更される度に初期化される（設定ファイル的内容を改めて利用是）
      </li>
      <li>
        房間的骰子ボットが變更されても設定ファイル由来的骰子ボットが初期化されない資料を作るには、そ的骰子ボット的複製を新增是こと。
      </li>
      <li>
        設定ファイルに支援した骰子ボットが「房間的骰子ボット」（聊天視窗欄ではない）に設定されると、表的区切り線的下にそ的設定ファイルに記載されている骰子ボットが登録される。
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
      <li>↑鍵で選擇した行を上に移動</li>
      <li>↓鍵で選擇した行を下に移動</li>
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
        <spec-link property="editCustomDiceBotTableWindowSpec" title-str=""
          >骰子ボット表變更</spec-link
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
