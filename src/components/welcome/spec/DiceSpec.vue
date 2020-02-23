<template>
  <spec-frame
    property="diceSpec"
    label-str="骰子"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>畫面上方菜單的「表示」選擇</li>
      <li>「ウィンドウ」にカーソルをあてる</li>
      <li>「骰子表示」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        以下的骰子を表示し、選択是とそれを畫面に新增。<br />
        新增された骰子選擇是ことでアニメーション付きで骰子ロールを行う。<br />
        骰子ロール結果はチャットに反映是。
        <ol>
          <li>４面骰子</li>
          <li>６面骰子</li>
          <li>８面骰子</li>
          <li>１０面骰子</li>
          <li>２０面骰子</li>
          <li>１００面骰子</li>
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
        本機能自体が未實裝<br />→ 優先順位低め。初回リリースには含めない。
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
