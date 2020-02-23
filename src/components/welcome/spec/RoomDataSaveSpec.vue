<template>
  <spec-frame
    property="roomDataSaveSpec"
    label-str="房間數據存儲功能"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法１">
      <li>畫面上方菜單的「ファイル」選擇</li>
      <li>「儲存」選擇</li>
    </spec-item>
    <spec-item class-str="operation" label-str="操作方法２">
      <li>
        ショートカットで起動
        <ul>
          <li>Windows的場合：Ctrl + s</li>
          <li>Mac的場合：Command + s</li>
        </ul>
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        そ的時点で的Quoridorn的狀態をzipファイルでダウン讀取
      </li>
      <li>
        菜單から選択できるオプション
        <a href="#ref_menuOption_selectSaveData">「儲存データ的選択」</a>
        が有効的場合、zipファイルに含めるデータを選ぶ畫面
        <a href="#ref_selectSaveDataWindow">「儲存データ選択畫面」</a>
        を表示是
      </li>
      <li>
        儲存データ選擇否場合、すべて的狀態をzipファイルとしてダウン讀取是
      </li>
      <li>
        圖片や音楽的データ部分、秘匿チャット的内容については暗号化を施す
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
      <li>Mac的場合的ショートカット<br />→ Macが買えたら實裝是</li>
      <li>
        <a href="#ref_selectSaveDataWindow">「儲存データ選択畫面」</a>
        が未實裝的ため、畫面表示機能がない
        <br />→ 初回リリースには含めない機能。
      </li>
      <li>データ的暗号化<br />→ 初回リリースに含める機能。</li>
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
