<template>
  <spec-frame
    property="diceSpec"
    label-str="骰子"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 起動操作
     !--------------------->
    <spec-item class-str="operation" label-str="起動操作">
      <li>画面上部メニューの「表示」を選択</li>
      <li>「ウィンドウ」にカーソルをあてる</li>
      <li>「骰子表示」を選択</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        以下の骰子を表示し、選択するとそれを画面に追加。<br />
        追加された骰子を選択することでアニメーション付きで骰子ロールを行う。<br />
        骰子ロール結果はチャットに反映する。
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
     ! ユーザ要望
     !--------------------->
    <spec-item class-str="request" label-str="ユーザ要望">
      <li>なし</li>
    </spec-item>
    <!----------------------
     ! 未実装事項
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未実装事項">
      <li>
        本機能自体が未実装<br />→ 優先順位低め。初回リリースには含めない。
      </li>
    </spec-item>
    <!----------------------
     ! 実装しない機能
     !--------------------->
    <spec-item class-str="unSupport" label-str="実装しない機能">
      <li>なし</li>
    </spec-item>
    <!----------------------
     ! 関連項目
     !--------------------->
    <spec-item class-str="ref" label-str="関連項目">
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
