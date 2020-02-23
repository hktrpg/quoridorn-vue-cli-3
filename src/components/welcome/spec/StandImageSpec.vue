<template>
  <spec-frame
    property="standImageSpec"
    label-str="立ち絵"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>
        チャット畫面的アイコン<span class="icon-accessibility"></span>をクリック
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格 - 操作">
      <li>
        アクター選擇是
      </li>
      <li>状態選擇(既存) or 入力(新的)是</li>
      <li>
        データを個別設定に是と立ち絵データを設定できるようになる。<br />
        （状態「◆」は必要最低限的設定的ため編輯不可）
      </li>
      <li>「ベース」的圖片枠をクリックし、圖片選擇是。</li>
      <li>「差分新增」鍵をクリックし、差分圖片的枠を新增是</li>
      <li>新增された差分圖片的枠をクリックし、差分圖片を設定是</li>
      <li>
        アニメーション全体にかかる秒数や、差分圖片を表示是時間を設定是
      </li>
      <li>
        対象的アクターで該当的状態でチャット是と、立ち絵が表示される。
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格 - 詳細">
      <li>
        圖片ファイル名を<br />
        ベース圖片：ファイル名.拡張子<br />
        差分圖片：ファイル名__圖片処理方法(0: 重ねる,
        1:置換)_X座標(通常)_Y座標(通常)_X座標(反転時)_Y座標(反転時)_表示時間(開始%)
        0~100_表示時間(完結%) 0~100.拡張子<br />
        としておくと、ベース圖片選択時に自動的に差分圖片も設定される。<br /><br />
        例）ベース圖片_0_12_24_78_24_30_80.png<br />
        → 未反転状態では座標(12, 24)的位置に30%~80%的周期で重ねて表示是設定
      </li>
      <li>
        上記的ようなファイル名で的指定は、image.yaml的記述でも設定可能（フォーマットはimage.yaml參考）
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
      <li>無</li>
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
        <spec-link property="chatWindowSpec" title-str=""
          >チャット畫面</spec-link
        >
      </li>
    </spec-item>
  </spec-frame>
</template>

<script>
import SpecMixin from "./SpecMixin";
export default { mixins: [SpecMixin] };
</script>

<style scoped src="./spec.css"></style>
