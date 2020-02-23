<template>
  <spec-frame
    property="chatLogSaveSpec"
    label-str="儲存聊天紀錄"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法１">
      <li>畫面上方菜單的「ファイル」選擇</li>
      <li>「チャットログ取得」選擇</li>
    </spec-item>
    <spec-item class-str="operation" label-str="操作方法２">
      <li>
        チャット畫面的アイコン<span class="icon-file-text"></span>をクリック
      </li>
    </spec-item>
    <spec-item class-str="operation" label-str="操作方法３">
      <li>チャットログ刪除を是際、チャットログを保存してから刪除される</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        <b>GM限定機能</b
        >（いずれ閲覧制限などを設けてPLなどでも保存できるようにしたい）
      </li>
      <li>
        単一HTMLファイルをダウン讀取是
      </li>
      <li>
        ダウン讀取したHTML的機能を使って他的形式的ログを生成是<br />（どどんとふHTML,
        どどんとふTXT, JSON）
      </li>
      <li>ログデータは暗号化是</li>
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
      <li>閲覧制限によりPLでも適切なログをダウン讀取できるように是</li>
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
