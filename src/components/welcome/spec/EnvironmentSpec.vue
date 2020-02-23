<template>
  <spec-frame
    property="environmentSpec"
    label-str="運作環境"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 現在的推薦環境
     !--------------------->
    <spec-item class-str="spec" label-str="現在的推薦環境">
      <li>
        <i class="icon-windows8"></i>
        Windows10 -
        <i class="icon-chrome"></i>
        Google Chrome最新版
      </li>
      <li>
        <i class="icon-appleinc"></i>
        Macintosh -
        <i class="icon-chrome"></i>
        Google Chrome最新版
      </li>
    </spec-item>
    <!----------------------
     ! 理想的推薦環境
     !--------------------->
    <spec-item class-str="spec" label-str="理想的推薦環境">
      <li>
        <i class="icon-appleinc"></i>
        Macintosh -
        <i class="icon-safari"></i>
        Safari
      </li>
      <li>
        <i class="icon-appleinc"></i>
        Macintosh -
        <i class="icon-chrome"></i>
        Google Chrome最新版
      </li>
      <li>
        <i class="icon-windows8"></i>
        Windows10 -
        <i class="icon-chrome"></i>
        Google Chrome最新版
      </li>
      <li>
        <i class="icon-windows8"></i>
        Windows10 -
        <i class="icon-firefox"></i>
        Fire Fox最新版
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>
        <i class="icon-appleinc"></i>
        Macintosh (-
        <i class="icon-safari"></i>
        Safari)
      </li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>
        <i class="icon-windows"></i>
        Windows10 -
        <i class="icon-firefox"></i>
        Fire Fox最新版
        <br />→ 初回リリースには含めない。
      </li>
      <li>
        <i class="icon-appleinc"></i>
        Macintosh
        <br />→ 自分へ的クリスマスプレゼント兼ねてMac買いました！<br />→
        対応決定な的で順次気になった所は直していきます。
      </li>
    </spec-item>
  </spec-frame>
</template>

<script>
import SpecMixin from "./SpecMixin";
export default { mixins: [SpecMixin] };
</script>

<style scoped src="./spec.css"></style>
