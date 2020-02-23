<template>
  <spec-frame
    property="welcomeWindowSpec"
    label-str="歡迎畫面"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <div>※ こ的畫面的規格です</div>
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>畫面上方菜單的「ヘルプ」選擇</li>
      <li>「ようこそ畫面」選擇</li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>表示文字大小調整機能</li>
      <li>
        ログイン処理（ログインタブ）
        <ol>
          <li>
            ログイン情報<br />
            ログインに必要な的は以下的５項目で、事前にURLパラメータに含めておけば畫面で的入力を省略是ことが可能<br />
            上記５項目は畫面操作で進房すればURLに勝手に付与される的で、進房後に畫面再読み込みをすれば同じ房間、同じ玩家で的再進房が自動で行われる
            <ul>
              <li>
                房間名（roomName）文字列（※1）
              </li>
              <li>
                房間密碼（roomPassword）文字列（※1）
              </li>
              <li>
                玩家名（playerName）文字列（※1）
              </li>
              <li>
                玩家密碼（playerPassword）文字列（※1）
              </li>
              <li>
                玩家權限（playerType）（※2）
              </li>
              <li>
                (※1):空白文字は「%20」で指定是こと。URLに空白文字がそ的まま入るとそこで途切れてしまう為
              </li>
              <li>
                (※2):以下的いずれかを指定是。誤った場合は無指定として扱う。
                <ol>
                  <li>PL：玩家を指す</li>
                  <li>GM：ゲームマスターを指す</li>
                  <li>副GM</li>
                  <li>觀戰者</li>
                </ol>
              </li>
            </ul>
          </li>
          <li>
            房間データから房間をつくる
            <ol>
              <li>
                保存したQuoridorn的房間データを読み込ませることで、データから房間を復元し、継続卓ができるようにします。
              </li>
            </ol>
          </li>
          <li>
            房間を指定して進房是／新しい房間をつくる
            <ol>
              <li>
                房間名を入力して「檢查」鍵を押すことで目的的房間が存在是か檢查します。
              </li>
              <li>
                「檢查」鍵を押した結果、房間が存在した場合
                <ol>
                  <li>房間密碼的入力を求めます。</li>
                  <li>
                    房間密碼が合っていたら玩家情報を入力してもらい、進房完了です。
                  </li>
                  <li>
                    入力是玩家名は再進房や継続卓を考慮し、進房履歴的ある玩家的名前が選択肢として表示されます。
                  </li>
                </ol>
              </li>
              <li>
                「檢查」鍵を押した結果、房間が存在しなかった場合
                <ol>
                  <li>２つ的選択肢があります。</li>
                  <li>
                    房間ができる的を待つ
                    <ol>
                      <li>
                        これを選んだ場合は玩家情報まで入力してもらい、待機房間に進房してもらいます。
                      </li>
                      <li>
                        こ的房間では同様に待機房間に進房した人と通常的操作を試しながら、目的的房間ができるまで待機是ことができます。
                      </li>
                      <li>
                        目的的房間が作成されたらメッセージが表示され、目的的房間に移動是ことになります。
                      </li>
                      <li>
                        ※
                        こ的房間で作成されたデータは目的的房間には引き継がれません。
                      </li>
                    </ol>
                  </li>
                  <li>
                    新しい房間をつくる
                    <ol>
                      <li>
                        房間密碼と玩家情報を入力してもらい、進房となります。
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                「檢查」鍵を押してから進房まで的間に目的的房間的存在的有無が変わっていた場合は進まず、改めて「檢查」鍵を押した後的振る舞いとなって、畫面が切り替わります。
              </li>
            </ol>
          </li>
          <li>
            房間をつくらずQuoridornをつかう
            <ol>
              <li>
                卓でつかうデータ的作成・保存を是ため的作業場所です。
              </li>
              <li>
                通常的房間と的違いは通信機能が使えないだけ的劣化版です。
              </li>
            </ol>
          </li>
        </ol>
      </li>
      <li>規格的表示（規格列表タブ）</li>
      <li>出典元情報的表示（出典元情報タブ）</li>
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
      <li>内容は順次更新</li>
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
