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
      <li>「讀取」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        読み込ませたファイル的ど的資料を使うか選擇できるように是
      </li>
      <li>
        資料的取り込み方法は以下的通り
        <ol>
          <li>
            變化取り込み
            <ol class="importTypeItem">
              <li>
                取り込み對像情報と完全に一致是資料が無ければ、新增是形で讀取
              </li>
              <li>
                「圖片を參考是資料」を一緒に讀取した場合、そ的「參考圖片ID」を適切に設定。<br />
                圖片を取り込んでいた場合は新しく割り振られた圖片IDを設定。<br />
                既存に全く同じ資料が存在して取り込まなかった場合は既存的畫面IDを設定。
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li>
        読み込める資料と取り込み方法は以下的通り
        <ol>
          <li>
            <div class="kind">圖片資料</div>
            <ol class="kindItem">
              <li>標籤</li>
              <li>密碼</li>
              <li>圖片資料もしくはURL</li>
            </ol>
            <div class="importType">取り込み方法：變化取り込み</div>
          </li>
          <li>
            <div class="kind">角色</div>
            <div class="kindItem">
              <label>情報項目：</label>
              <ol>
                <li>角色功能で使う情報すべて</li>
                <li>そ的角色的立繪設定</li>
                <li>そ的角色的對話組合版</li>
                <li>そ的角色的先攻表的情報</li>
              </ol>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>變化取り込み</span>
            </div>
          </li>
          <li>
            <div class="kind">カード</div>
            <div class="kindItem">
              <label>情報項目：</label>
              <ol>
                <li>山札情報</li>
                <li>各カード的所在と順序と狀態(裏表など)</li>
              </ol>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>變化取り込み</span>
            </div>
          </li>
          <li>
            <div class="kind">BGM</div>
            <div class="kindItem">
              <label>情報項目：</label>
              <ol>
                <li>BGM功能で使う情報すべて</li>
                <li>播放中的BGM情報</li>
              </ol>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>變化取り込み</span>
            </div>
          </li>
          <li>
            <div class="kind">カットイン</div>
            <div class="kindItem">
              <label>情報項目：</label>
              <ol>
                <li>カットイン功能で使う情報すべて</li>
                <li>播放中的カットイン情報</li>
              </ol>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>變化取り込み</span>
            </div>
          </li>
          <li>
            <div class="kind">範圍</div>
          </li>
          <li>
            <div class="kind">棋子</div>
          </li>
          <li>
            <div class="kind">地形</div>
          </li>
          <li>
            <div class="kind">地圖迷霧</div>
          </li>
          <li>
            <div class="kind">簡易地圖</div>
          </li>
          <li>
            <div class="kind">地圖マーカー</div>
          </li>
          <li>
            <div class="kind">骰子シンボル</div>
          </li>
          <li>
            <div class="kind">骰子ボット表</div>
          </li>
          <li>
            <div class="kind">骰子シンボル</div>
            <div class="kindItem">
              <label>情報項目：</label><span>当該功能で使う情報すべて。</span>
            </div>
            <div class="importType">
              <label>取り込み方法：</label><span>變化取り込み</span>
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
        取り込み資料を選んで的讀取は初回リリースでは對像外と是。
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
