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
        複製鍵で選択した行的曲的情報を複製して末尾に新增
      </li>
      <li>刪除鍵で選択した行を刪除</li>
      <li>↑鍵で選択した行を上に移動</li>
      <li>↓鍵で選択した行を下に移動</li>
      <li>
        送信鍵で播放（ルームメイトにも反映）
      </li>
      <li>
        プレビュー（自分的み）鍵で播放（ルームメイトには反映否）
      </li>
      <li>
        選択した行をダブルクリックで播放（ルームメイトにも反映）
      </li>
      <li>
        こ的畫面上的操作はルームメイトに即反映される
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
        <spec-link property="chatWindowSpec" title-str="">
          チャット畫面
        </spec-link>
      </li>
      <li>
        <spec-link property="addEditBgmWindowSpec" title-str="">
          BGM新增・編輯畫面
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
