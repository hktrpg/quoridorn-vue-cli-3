<template>
  <spec-frame
    property="menuBar"
    label-str="主菜單"
    lastVersion="1.0.0"
    :isSpecFixed="false"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>
        畫面上方に最初から表示されている菜單
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>角丸的鍵と展開型的選択肢で構成是</li>
      <li>
        項目は今後的機能増強に伴って増減是可能性あり
        <span class="unFixed">[規格未確定項目]</span>
      </li>
      <li>
        菜單項目
        <ol>
          <li>
            展開型的選択肢
            <ol>
              <li>
                ファイル
                <ol>
                  <li>
                    <spec-link property="export" title-str="">儲存</spec-link>
                  </li>
                  <li>
                    <spec-link property="import" title-str="">讀取</spec-link>
                  </li>
                </ol>
              </li>
              <li>
                表示
                <ol>
                  <li>
                    ウィンドウ
                    <ol>
                      <li>
                        <spec-link property="chatWindow" title-str="">
                          チャット表示
                        </spec-link>
                      </li>
                      <li>
                        <spec-link property="settingViewDice" title-str="">
                          ダイス表示
                        </spec-link>
                      </li>
                      <li>
                        <spec-link property="initiativeWindow" title-str="">
                          先攻表示
                        </spec-link>
                      </li>
                      <li>
                        <spec-link property="resourceWindow" title-str="">
                          先攻表示
                        </spec-link>
                      </li>
                      <li>
                        <spec-link property="chatPaletteWindow" title-str="">
                          對話組合版表示
                        </spec-link>
                      </li>
                      <li>
                        <spec-link
                          property="counterRemoteControlWindow"
                          title-str=""
                        >
                          累計遙控器表示
                        </spec-link>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <spec-link property="changeFontSizeWindow" title-str="">
                      フォント大小調整
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="resetAllWindow" title-str="">
                      ウィンド配置初期化
                    </spec-link>
                  </li>
                </ol>
              </li>
              <li>
                コマ
                <ol>
                  <li>
                    <spec-link property="addCharacterWindow" title-str="">
                      キャラクター新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="addRangeWindow" title-str="">
                      範囲新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="addChitWindow" title-str="">
                      チット新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="graveyardWindow" title-str="">
                      墓場
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="waitingRoomWindow" title-str="">
                      キャラクター待合室
                    </spec-link>
                  </li>
                </ol>
              </li>
              <li>
                マップ
                <ol>
                  <li>
                    <spec-link property="editMapWindow" title-str="">
                      マップ変更
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="editFloorTileMode" title-str="">
                      フロアタイル新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="addMapMaskWindow" title-str="">
                      マップマスク新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="createEasyMapWindow" title-str="">
                      簡易マップ新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="saveMapWindow" title-str="">
                      マップ狀態保存
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="loadMapWindow" title-str="">
                      マップ切り替え
                    </spec-link>
                  </li>
                </ol>
              </li>
              <li>
                圖片
                <ol>
                  <li>
                    <spec-link property="fileUploaderWindow" title-str="">
                      ファイルアップローダー
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="editImageTagWindow" title-str="">
                      標籤編輯
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="deleteImageWindow" title-str="">
                      圖片刪除
                    </spec-link>
                  </li>
                </ol>
              </li>
              <li>
                ヘルプ
                <ol>
                  <li>
                    <spec-link property="welcomeWindowSpec" title-str="">
                      ようこそ畫面
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="versionWindow" title-str="">
                      バージョン
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="manualWindow" title-str="">
                      マニュアル
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="officialSiteLink" title-str="">
                      オフィシャルサイトへ
                    </spec-link>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            <spec-link
              property="roomInfoWindow"
              title-str="「プレイルーム情報表示畫面」的項へ"
            >
              「プレイルーム情報表示」鍵
            </spec-link>
          </li>
          <li>
            <spec-link
              property="addPublicMemoWindow"
              title-str="「共有メモ新增畫面」的項へ"
            >
              「共有メモ」鍵
            </spec-link>
          </li>
          <li>
            <spec-link property="logout" title-str="「登出」的項へ">
              「登出」鍵
            </spec-link>
          </li>
        </ol>
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="展開型的選択肢的規格">
      <li>
        初期表示的各項目選擇是と展開モードになる
      </li>
      <li>
        展開モード中はマウス移動に合わせて各選択肢が展開・格納される
      </li>
      <li>
        展開モードが解除される的は初期表示的各項目を再度選択是か、畫面を起動是選択肢選擇した場合
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
  </spec-frame>
</template>

<script>
import SpecMixin from "./SpecMixin";
export default { mixins: [SpecMixin] };
</script>

<style scoped src="./spec.css"></style>
