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
        畫面上方に最初から顯示されている菜單
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>角丸的鍵と展開型的選擇肢で構成是</li>
      <li>
        項目は今後的機能増強に伴って増減是可能性あり
        <span class="unFixed">[規格未確定項目]</span>
      </li>
      <li>
        菜單項目
        <ol>
          <li>
            展開型的選擇肢
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
                顯示
                <ol>
                  <li>
                    視窗ウ
                    <ol>
                      <li>
                        <spec-link property="chatWindow" title-str="">
                          顯示聊天視窗
                        </spec-link>
                      </li>
                      <li>
                        <spec-link property="settingViewDice" title-str="">
                          顯示骰子
                        </spec-link>
                      </li>
                      <li>
                        <spec-link property="initiativeWindow" title-str="">
                          顯示先攻
                        </spec-link>
                      </li>
                      <li>
                        <spec-link property="resourceWindow" title-str="">
                          顯示先攻
                        </spec-link>
                      </li>
                      <li>
                        <spec-link property="chatPaletteWindow" title-str="">
                          顯示對話組合版
                        </spec-link>
                      </li>
                      <li>
                        <spec-link
                          property="counterRemoteControlWindow"
                          title-str=""
                        >
                          顯示累計遙控器
                        </spec-link>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <spec-link property="changeFontSizeWindow" title-str="">
                      調整字體大小
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="resetAllWindow" title-str="">
                      視窗配置初期化
                    </spec-link>
                  </li>
                </ol>
              </li>
              <li>
                コマ
                <ol>
                  <li>
                    <spec-link property="addCharacterWindow" title-str="">
                      新增角色
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="addRangeWindow" title-str="">
                      範圍新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="addChitWindow" title-str="">
                      新增棋子
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="graveyardWindow" title-str="">
                      墓場
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="waitingRoomWindow" title-str="">
                      角色等候室
                    </spec-link>
                  </li>
                </ol>
              </li>
              <li>
                地圖
                <ol>
                  <li>
                    <spec-link property="editMapWindow" title-str="">
                      地圖變更
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="editFloorTileMode" title-str="">
                      地形新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="addMapMaskWindow" title-str="">
                      地圖迷霧新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="createEasyMapWindow" title-str="">
                      簡易地圖新增
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="saveMapWindow" title-str="">
                      地圖狀態保存
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="loadMapWindow" title-str="">
                      地圖切換
                    </spec-link>
                  </li>
                </ol>
              </li>
              <li>
                圖片
                <ol>
                  <li>
                    <spec-link property="fileUploaderWindow" title-str="">
                      檔案上傳
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
                      歡迎畫面
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="versionWindow" title-str="">
                      版本
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="manualWindow" title-str="">
                      說明書
                    </spec-link>
                  </li>
                  <li>
                    <spec-link property="officialSiteLink" title-str="">
                      官方網站
                    </spec-link>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            <spec-link
              property="roomInfoWindow"
              title-str="「房間情報顯示畫面」的項へ"
            >
              「房間情報顯示」鍵
            </spec-link>
          </li>
          <li>
            <spec-link
              property="addPublicMemoWindow"
              title-str="「共用筆記新增畫面」的項へ"
            >
              「共用筆記」鍵
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
    <spec-item class-str="spec" label-str="展開型的選擇肢的規格">
      <li>
        初期顯示的各項目選擇是と展開モードになる
      </li>
      <li>
        展開モード中はマウス移動に合わせて各選択肢が展開・格納される
      </li>
      <li>
        展開モードが解除される的は初期顯示的各項目を再度選択是か、畫面を起動是選択肢選擇した場合
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
