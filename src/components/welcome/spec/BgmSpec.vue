<template>
  <spec-frame
    property="bgmSpec"
    label-str="BGM"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 開始運作
     !--------------------->
    <spec-item class-str="operation" label-str="開始運作">
      <li>聊天視窗Icon<span class="icon-music"></span>點擊</li>
    </spec-item>
    <!----------------------
     ! 方法
     !--------------------->
    <spec-item class-str="spec" label-str="方法">
      <li>使用按鈕添加歌曲</li>
      <li>通過更改按鈕更改歌曲信息</li>
      <li>
        コピーボタンで選択した行の曲の情報をコピーして末尾に追加
      </li>
      <li>削除ボタンで選択した行を削除</li>
      <li>↑ボタンで選択した行を上に移動</li>
      <li>↓ボタンで選択した行を下に移動</li>
      <li>
        送信ボタンで再生（ルームメイトにも反映）
      </li>
      <li>
        プレビュー（自分のみ）ボタンで再生（ルームメイトには反映しない）
      </li>
      <li>
        選択した行をダブルクリックで再生（ルームメイトにも反映）
      </li>
      <li>
        この画面上の操作はルームメイトに即反映される
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
      <li>なし</li>
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
        <spec-link property="chatWindowSpec" title-str="">
          チャット画面
        </spec-link>
      </li>
      <li>
        <spec-link property="addEditBgmWindowSpec" title-str="">
          BGM追加・編輯画面
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
