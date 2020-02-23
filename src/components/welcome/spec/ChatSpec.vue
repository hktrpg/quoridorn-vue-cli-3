<template>
  <spec-frame
    property="chatSpec"
    label-str="聊天視窗"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>從視窗頂部的菜單中選擇“表示”</li>
      <li>「ウィンドウ」にカーソルをあてる</li>
      <li>「チャット表示」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>名前的入力</li>
      <li>発言是タブ的選択</li>
      <li>タブ的編輯</li>
      <li>発言内容的入力</li>
      <li>
        機能菜單
        <ol>
          <li>ボイスチャット</li>
          <li>秘匿チャット</li>
          <li>グループチャット</li>
          <li>
            簡易コマンド<br />列表に一致是名前的入力で絞り込みが可能<br />ESCキー押下で選択取消
            <ol>
              <li>「!」または「！」<br />→ 発言者的選択</li>
              <li>
                「>」または「＞」<br />→
                グループチャットまたは秘匿チャット先(個人)的選択
              </li>
              <li>「#」または「＃」<br />→ 出力先タブ的選択</li>
              <li>「&」または「＆」<br />→ 臨時チャット装飾指定的選択・挿入</li>
            </ol>
          </li>
          <li>使用是ダイスボット的選択</li>
          <li>ダイスボット的ヘルプを子畫面で表示</li>
          <li>独自ダイスボット的登録</li>
          <li>ノベルゲーム風表示</li>
          <li>チャットログ全刪除</li>
          <li>
            チャット文字設定
            <ol>
              <li>文字色</li>
              <li>背景色</li>
              <li>文字大小</li>
              <li>フォーマット（「時：分」表示）</li>
              <li>別タブメッセージ表示有無</li>
              <li>タブ的色分け</li>
            </ol>
          </li>
          <li>点呼／投票</li>
          <li>卓時計</li>
          <li>目覚ましアラーム</li>
          <li>カットイン設定</li>
          <li>BGM設定</li>
          <li>立ち絵設定</li>
          <li>
            ログ保存
            <ol>
              <li>
                HTML形式<br />→
                出力されたHTML上で様々な見え方的制御ができるように是。
              </li>
              <li>テキスト形式</li>
              <li>json形式</li>
            </ol>
          </li>
        </ol>
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>複数人を相手にした秘匿チャット</li>
      <li>大量的タブを表示できるようにしてほしい</li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>ボイスチャット</li>
      <li>ダイスボット的ヘルプを子畫面で表示</li>
      <li>独自ダイスボット的登録</li>
      <li>ノベルゲーム風表示</li>
      <li>チャットログ全刪除</li>
      <li>
        チャット文字設定
        <ol>
          <li>背景色</li>
          <li>文字大小</li>
          <li>フォーマット（「時：分」表示）</li>
          <li>別タブメッセージ表示有無</li>
          <li>タブ的色分け</li>
        </ol>
      </li>
      <li>点呼／投票</li>
      <li>卓時計</li>
      <li>目覚ましアラーム</li>
      <li>カットイン設定</li>
      <li><del>立ち絵設定</del> - 實裝済(Ver1.0.0b5)</li>
      <li>
        ログ保存
        <ol>
          <li>HTML形式</li>
          <li>テキスト形式</li>
          <li>json形式</li>
        </ol>
      </li>
    </spec-item>
    <!----------------------
     ! 未實現的功能
     !--------------------->
    <spec-item class-str="unSupport" label-str="未實現的功能">
      <li>機能菜單的「音音声」<br />→ マスターボリューム調整機能で代用可能</li>
      <li>簡易ファイルアップローダー<br />→ 不要と判断</li>
      <li>
        テキスト読み上げ<br />→
        實裝方法がすぐに思いつかない。どうしても欲しいという意見があれば考える
      </li>
    </spec-item>
    <!----------------------
     ! 相關項目
     !--------------------->
    <spec-item class-str="ref" label-str="相關項目">
      <li>
        <spec-link property="menuBar" title-str="">主菜單</spec-link>
      </li>
      <li>
        <spec-link property="customDiceBotTableWindowSpec" title-str="">
          ダイスボット用表管理
        </spec-link>
      </li>
      <li>
        <spec-link property="settingBgmWindowSpec" title-str="">
          BGM設定畫面
        </spec-link>
      </li>
      <li>
        <spec-link property="standImageSettingWindowSpec" title-str="">
          立ち絵設定
        </spec-link>
      </li>
    </spec-item>
  </spec-frame>
</template>

<script>
import SpecMixin from "./SpecMixin";
export default { mixins: [SpecMixin] };
</script>

<style scoped src="./spec.css"></style>
