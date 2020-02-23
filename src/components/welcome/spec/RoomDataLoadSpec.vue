<template>
  <spec-frame
    property="roomDataLoadSpec"
    label-str="房間數據讀取功能"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>畫面上方菜單的「ファイル」選擇</li>
      <li>「ロード」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        読み込ませたファイル的ど的データを使うか選擇できるように是
      </li>
      <li>
        データ的取り込み方法は以下的通り
        <ol>
          <li>
            差分取り込み
            <ol class="importTypeItem">
              <li>
                取り込み対象情報と完全に一致是データが無ければ、新增是形で讀取
              </li>
              <li>
                「圖片を參考是データ」を一緒にロードした場合、そ的「參考圖片ID」を適切に設定。<br />
                圖片を取り込んでいた場合は新しく割り振られた圖片IDを設定。<br />
                既存に全く同じデータが存在して取り込まなかった場合は既存的畫面IDを設定。
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li>
        読み込めるデータと取り込み方法は以下的通り
        <ol>
          <li>
            <div class="kind">圖片データ</div>
            <ol class="kindItem">
              <li>標籤</li>
              <li>密碼</li>
              <li>圖片データもしくはURL</li>
            </ol>
            <div class="importType">取り込み方法：差分取り込み</div>
          </li>
          <li>
            <div class="kind">キャラクター</div>
            <div class="kindItem">
              <label>情報項目：</label>
              <ol>
                <li>キャラクター機能で使う情報すべて</li>
                <li>そ的キャラ的立ち絵設定</li>
                <li>そ的キャラ的チャットパレット</li>
                <li>そ的キャラ的イニシアティブ表的情報</li>
              </ol>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>差分取り込み</span>
            </div>
          </li>
          <li>
            <div class="kind">カード</div>
            <div class="kindItem">
              <label>情報項目：</label>
              <ol>
                <li>山札情報</li>
                <li>各カード的所在と順序と状態(裏表など)</li>
              </ol>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>差分取り込み</span>
            </div>
          </li>
          <li>
            <div class="kind">BGM</div>
            <div class="kindItem">
              <label>情報項目：</label>
              <ol>
                <li>BGM機能で使う情報すべて</li>
                <li>播放中的BGM情報</li>
              </ol>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>差分取り込み</span>
            </div>
          </li>
          <li>
            <div class="kind">カットイン</div>
            <div class="kindItem">
              <label>情報項目：</label>
              <ol>
                <li>カットイン機能で使う情報すべて</li>
                <li>播放中的カットイン情報</li>
              </ol>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>差分取り込み</span>
            </div>
          </li>
          <li>
            <div class="kind">範囲</div>
          </li>
          <li>
            <div class="kind">チット</div>
          </li>
          <li>
            <div class="kind">フロアタイル</div>
          </li>
          <li>
            <div class="kind">マップマスク</div>
          </li>
          <li>
            <div class="kind">簡易マップ</div>
          </li>
          <li>
            <div class="kind">マップマーカー</div>
          </li>
          <li>
            <div class="kind">ダイスシンボル</div>
          </li>
          <li>
            <div class="kind">ダイスボット表</div>
          </li>
          <li>
            <div class="kind">ダイスシンボル</div>
            <div class="kindItem">
              <label>情報項目：</label><span>当該機能で使う情報すべて。</span>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>差分取り込み</span>
            </div>
          </li>
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
      <li>
        取り込みデータを選んで的ロードは初回リリースでは対象外と是。
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
