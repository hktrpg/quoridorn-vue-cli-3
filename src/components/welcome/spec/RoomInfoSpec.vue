<template>
  <spec-frame
    property="roomInfoSpec"
    label-str="プレイルーム情報"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>
        畫面上方菜單的「共有メモ」的左的鍵選擇
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        房間を建てていない場合は未連接的旨を起動鍵と畫面内部に表示
      </li>
      <li>ルーム名を標題に表示</li>
      <li>房間に招待是ため的URLを表示</li>
      <li>ルームメンバーをすべて表示</li>
      <li>
        各ルームメンバー的房間復帰用的URLを表示
      </li>
      <li>ゲーム系統的変更</li>
      <li>觀戰者的可否的選択</li>
      <li>使用是チャット的分頁設定できる機能</li>
      <li>
        各種初期設定的設定
        <ol>
          <li>チャット表示</li>
          <li>ダイス表示</li>
          <li>先攻表示</li>
          <li>先攻表示</li>
          <li>對話組合版表示</li>
          <li>累計遙控器表示</li>
          <li>立ち絵表示</li>
          <li>カットイン表示</li>
          <li>座標表示</li>
          <li>マス目表示</li>
          <li>マス目にキャラクターを合わせる</li>
          <li>立ち絵的大小を自動調整是</li>
          <li>回転マーカーを表示是</li>
          <li>カードピックアップウィンドウ表示</li>
          <li>カード操作ログを表示</li>
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
      <li>ゲーム系統的変更<br />→ 初回リリースに含める機能。</li>
      <li>
        觀戰者的可否的選択
        <br />→ 初回リリースには含めない。運用でカバーお願いします。
      </li>
      <li>
        使用是チャット的分頁設定できる機能
        <br />→ チャット欄から設定できる的で初回リリースには含めない。
      </li>
      <li>各種初期設定的設定<br />→ 初回リリースには含めない機能。</li>
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
