<template>
  <spec-frame
    property="mapSpec"
    label-str="地圖"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法1">
      <li>畫面上方菜單的「地圖」選擇</li>
      <li>「地圖變更」選擇</li>
    </spec-item>
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法2">
      <li>地圖を右クリック</li>
      <li>
        顯示された菜單的「地圖變更」選擇
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        圖片選擇 → 後述的「圖片選擇」的項參考
      </li>
      <li>縦横的マス数的指定</li>
      <li>マス目的色的指定</li>
      <li>余白部分的マス数的指定（縦横同じ）</li>
      <li>余白に付く罫線的太さ的調整</li>
      <li>
        余白部分に地圖圖片をぼかした圖片を顯示させるオプション
      </li>
      <li>
        余白部分に被せるカラー迷霧的色（＋透明度）的選擇
      </li>
      <li>
        余白部分に顯示是方眼罫線的有無と色的選擇
      </li>
      <li>最背面的背景的色的選擇</li>
      <li>白地図に是</li>
      <li>マス目間隔的指定</li>
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
      <li>白地図に是<br />→ 色を選べる背景と是。初回リリースには含めない。</li>
      <li>マス目間隔的指定<br />→ 初回リリースには含めない</li>
    </spec-item>
    <!----------------------
     ! 未實現的功能
     !--------------------->
    <spec-item class-str="unSupport" label-str="未實現的功能">
      <li>どどんとふ的「マス目を交互に」功能</li>
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
