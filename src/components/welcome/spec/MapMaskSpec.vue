<template>
  <spec-frame
    property="mapMaskSpec"
    label-str="地圖迷霧"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法１">
      <li>畫面上方菜單的「地圖」選擇</li>
      <li>「地圖迷霧新增」選擇</li>
    </spec-item>
    <spec-item class-str="operation" label-str="操作方法２">
      <li>地圖を右クリック</li>
      <li>
        顯示された菜單的「地圖迷霧新增」選擇
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>中に顯示是文字的輸入</li>
      <li>顯示色（＋透明度）的選擇</li>
      <li>大小指定</li>
      <li>
        「射界」的設定 → 後述的「射界」的項參考
      </li>
      <li>
        地圖迷霧はすべて的地圖オブジェクト的中で最も下に顯示される
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
        「射界」功能
        <br />→ 地圖迷霧へ的反映は優先度低め。余裕があれば初回リリースに含める。
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
