<template>
  <spec-frame
    property="chitSpec"
    label-str="新增聊天"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法1">
      <li>畫面上方菜單的「コマ」選擇</li>
      <li>「棋子新增」選擇</li>
    </spec-item>
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法2">
      <li>地圖を右クリック</li>
      <li>
        顯示された菜單的「棋子新增」選擇
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>地圖オブジェクト的一種</li>
      <li>
        圖片とマウスオーバー時に顯示される説明文的みが設定できる
      </li>
      <li>
        圖片選擇 → 後述的「圖片選擇」的項參考
      </li>
      <li>
        「射界」的設定 → 後述的「射界」的項參考
      </li>
      <li>
        新增後に編輯可能（どどんとふでは棋子的編輯不可）
      </li>
      <li>新增後に刪除可能</li>
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
        <br />→ 棋子へ的反映は優先度低め。余裕があれば初回リリースに含める。
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
