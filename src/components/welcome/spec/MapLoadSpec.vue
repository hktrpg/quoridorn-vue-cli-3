<template>
  <spec-frame
    property="mapLoadSpec"
    label-str="地圖切換功能"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>畫面上方菜單的「地圖」選擇</li>
      <li>「地圖切換」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        地圖狀態保存功能で保存した資料を參考させることで、地圖狀態を復元是
      </li>
      <li>
        復元時に、復元前に配置されていた以下的資料を刪除是か選擇是
        <ol>
          <li>地形</li>
          <li>地圖迷霧</li>
          <li>簡易地圖</li>
        </ol>
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
      <li>
        本功能自体が未實裝
        <br />→ 初回リリースには含めない。しばらくは運用でカバーをお願いします。
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
