<template>
  <spec-frame
    property="characterSpec"
    label-str="角色"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法１">
      <li>畫面上方菜單的「コマ」選擇</li>
      <li>「新增角色」選擇</li>
    </spec-item>
    <spec-item class-str="operation" label-str="操作方法２">
      <li>地圖を右クリック</li>
      <li>
        顯示された菜單的「新增角色」選擇
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        圖片選擇 → 後述的「圖片選擇」的項參考
      </li>
      <li>
        圖片切換設定（コマダブルクリックで圖片を切換えるため的設定）
      </li>
      <li>名字輸入</li>
      <li>大小設定</li>
      <li>參考URL的指定</li>
      <li>隱藏在地圖迷霧下方設定</li>
      <li>其他情報的指定</li>
      <li>先攻表的情報的輸入</li>
      <li>
        「射界」的設定 → 後述的「射界」的項參考
      </li>
      <li>新增後に編輯可能</li>
      <li>新增後に刪除可能</li>
      <li>新增後にGMは擁有者權限を變更可</li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>
        圖片指定時に回転させたい（圖片を用意是枚数削減）
        <br />→ いずれ作りたい
      </li>
      <li>
        キャラに「ステータス」を持たせて、それをコマに顯示させたい
        <br />→ いずれ作りたい
      </li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>先攻表的情報的輸入<br />→ いずれ作りたい</li>
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
