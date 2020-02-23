<template>
  <spec-frame
    property="roomInfoSpec"
    label-str="房間情報"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>
        畫面上方菜單的「共用筆記」的左的鍵選擇
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        房間を建てていない場合は未連接的旨を起動鍵と畫面内部に顯示
      </li>
      <li>ルーム名を標題に顯示</li>
      <li>房間に招待是ため的URLを顯示</li>
      <li>ルームメンバーをすべて顯示</li>
      <li>
        各ルームメンバー的房間復帰用的URLを顯示
      </li>
      <li>ゲーム系統的變更</li>
      <li>觀戰者的可否的選擇</li>
      <li>使用是聊天視窗的分頁設定できる功能</li>
      <li>
        各種初期設定的設定
        <ol>
          <li>聊天視窗顯示</li>
          <li>骰子顯示</li>
          <li>先攻顯示</li>
          <li>先攻顯示</li>
          <li>對話組合版顯示</li>
          <li>累計遙控器顯示</li>
          <li>立繪顯示</li>
          <li>カットイン顯示</li>
          <li>座標顯示</li>
          <li>マス目顯示</li>
          <li>マス目に角色を合わせる</li>
          <li>立繪的大小を自動調整是</li>
          <li>回転マーカーを顯示是</li>
          <li>カードピックアップ視窗ウ顯示</li>
          <li>カード操作ログを顯示</li>
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
      <li>ゲーム系統的變更<br />→ 初回リリースに含める功能。</li>
      <li>
        觀戰者的可否的選擇
        <br />→ 初回リリースには含めない。運用でカバーお願いします。
      </li>
      <li>
        使用是聊天視窗的分頁設定できる功能
        <br />→ 聊天視窗欄から設定できる的で初回リリースには含めない。
      </li>
      <li>各種初期設定的設定<br />→ 初回リリースには含めない功能。</li>
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
