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
      <li>畫面上方菜單的「マップ」選擇</li>
      <li>「マップマスク新增」選擇</li>
    </spec-item>
    <spec-item class-str="operation" label-str="操作方法２">
      <li>マップを右クリック</li>
      <li>
        表示された菜單的「マップマスク新增」選擇
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>中に表示是文字的入力</li>
      <li>表示色（＋透明度）的選択</li>
      <li>大小指定</li>
      <li>
        「射界」的設定 → 後述的「射界」的項參考
      </li>
      <li>
        マップマスクはすべて的マップオブジェクト的中で最も下に表示される
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
        「射界」機能
        <br />→
        マップマスクへ的反映は優先度低め。余裕があれば初回リリースに含める。
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
