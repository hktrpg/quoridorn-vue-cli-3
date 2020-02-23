<template>
  <spec-frame
    property="customDiceBotSpec"
    label-str="獨立設定骰組"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>チャット畫面的アイコン<span class="icon-dice"></span>をクリック</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格 - 操作">
      <li>
        新的新增鍵でサンプルダイスボットを新增して編輯畫面を開く
      </li>
      <li>
        複製新增鍵で表的選択中的ダイスボットを表末尾に複製して、それを編輯是編輯畫面を開く
      </li>
      <li>
        変更鍵で表的選択中的ダイスボットを編輯是編輯畫面を開く
      </li>
      <li>
        刪除鍵で表的選択中的ダイスボットを刪除
      </li>
      <li>↑鍵で選択した行を上に移動</li>
      <li>↓鍵で選択した行を下に移動</li>
      <li>閉じる鍵でそ的畫面を閉じる</li>
      <li>
        チャットされたら、独自ダイスボット表的上から順に一致（全角半角大文字小文字的違いは無視）是も的を探して利用是
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格 - 自鯖設定">
      <li>
        設定ファイル「conf/system/[ダイスボット的key]/customDiceBot.yaml」を設置しておく。
      </li>
      <li>
        房間的ダイスボット」（チャット欄ではない）で、設置した設定ファイルに対応是ダイスボット選擇是。
      </li>
      <li>
        表的区切り線的下にそ的設定ファイルに記載されているダイスボットが登録される。
      </li>
      <li>
        設定ファイル由来的ダイスボットは編輯しても、房間的ダイスボットが変更される度に初期化される（設定ファイル的内容を改めて利用是）
      </li>
      <li>
        房間的ダイスボットが変更されても設定ファイル由来的ダイスボットが初期化されないデータを作るには、そ的ダイスボット的複製を新增是こと。
      </li>
      <li>
        設定ファイルに対応したダイスボットが「房間的ダイスボット」（チャット欄ではない）に設定されると、表的区切り線的下にそ的設定ファイルに記載されているダイスボットが登録される。
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
      <li>↑鍵で選択した行を上に移動</li>
      <li>↓鍵で選択した行を下に移動</li>
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
        <spec-link property="editCustomDiceBotTableWindowSpec" title-str=""
          >ダイスボット表変更</spec-link
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
