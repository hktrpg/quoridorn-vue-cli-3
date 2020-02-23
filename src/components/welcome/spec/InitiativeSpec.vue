<template>
  <spec-frame
    property="initiativeSpec"
    label-str="先攻表"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 起動操作
     !--------------------->
    <spec-item class-str="operation" label-str="起動操作">
      <li>畫面上方菜單の「顯示」選擇</li>
      <li>「視窗ウ」にカーソルをあてる</li>
      <li>「イニシアティブ顯示」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        角色１体に関するパラメータを表形式で顯示する
      </li>
      <li>
        パラメータ名は「設定」ボタンを押下して「イニシアティブ表設定」畫面で指定する
      </li>
      <li>
        列の区切り線をドラッグすることで列幅を調整可能
      </li>
      <li>
        「戦闘開始」ボタンを押下することでラウンド／手番の管理の開始
      </li>
      <li>
        「戻る」「次へ」ボタンを押下することでラウンド／手番の操作
      </li>
      <li>
        選擇した行に支援する角色の操作（「變更」ボタン）
      </li>
      <li>
        行の選擇時に支援する角色のコマを強調顯示
      </li>
      <li>パラメータの状態をコマに反映</li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>
        列をダブルクリックで幅を自動調整したい
        <br />→ 列と列の間の仕切り線をダブルクリックで自動調整とする
      </li>
      <li>
        縮小版／全体顯示とを切換たらどうか
        <br />→ 切換るボタンを用意
      </li>
      <li>
        選擇した角色に関する顯示を下につけたらどうか
        <br />→ 實裝してみたい
      </li>
      <li>「手番」を観点とした見た目が欲しい<br />→ いずれ必ず實裝したい</li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>
        選擇した行に支援する角色の操作（「變更」ボタン）
      </li>
      <li>
        選擇した角色に関する顯示を下につけたらどうか
      </li>
      <li>「手番」を観点とした見た目が欲しい</li>
    </spec-item>
    <!----------------------
     ! 實裝しない功能
     !--------------------->
    <spec-item class-str="unSupport" label-str="實裝しない功能">
      <li>
        行をダブルクリックで支援する角色を畫面中央に顯示する功能
      </li>
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
