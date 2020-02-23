<template>
  <spec-frame
    property="bgmSpec2"
    label-str="BGM2"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>
        BGM設定畫面的新增鍵または編輯鍵をクリック
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        「URL」と「標題」と「標籤」を入力して「確定」鍵を押せばOK
      </li>
      <li>
        指定できる形式
        <ol>
          <li>
            Youtube動画的播放
            <ul>
              <li>
                Youtube動画的URLをそ的ままURLに指定すればOK
              </li>
              <li>
                利用している「YoutubeAPI」的利用規約として、Youtubeコントローラー（Youtube的畫面）を非表示にはできない
              </li>
            </ul>
          </li>
          <li>
            Quoridornを設置したサーバ内に配置したmp3ファイル的播放
            <ul>
              <li>
                mp3ファイル的絶対パスを指定是か、Quoridorn的index.htmlから的相対パスを指定すればOK
              </li>
              <li>
                同じサーバ内的mp3でないと、クロスオリジン制約で播放できない
              </li>
            </ul>
          </li>
          <li>
            DropBoxに設置したmp3ファイル的播放
            <ul>
              <li>
                DropBox的操作で「共有」的「リンク」を作成し、そ的URLを指定してすればOK<br />例）https://www.dropbox.com/s/vc7os1os5uyneac/Fade.mp3?dl=0
              </li>
            </ul>
          </li>
        </ol>
      </li>
      <li>
        CreditURL
        <ol>
          <li>
            Youtube動画でないURLを指定した場合に的み設定可能
          </li>
          <li>
            播放中BGM列表畫面的サムネイルをクリックした際に、指定された「URL」より優先的に使われるURL<br />著作者的URLなどをこ的項目にちゃんと指定否と、サムネイルをクリックした時に「URL」が他的人に分かる規格。
          </li>
        </ol>
      </li>
      <li>
        播放開始
        <ol>
          <li>
            0.1秒単位で播放開始的時点を指定是（最大10000：1000秒）
          </li>
        </ol>
      </li>
      <li>
        播放完結
        <ol>
          <li>
            0.1秒単位で播放開始的時点を指定是（最大10000：1000秒）
          </li>
          <li>マイナスを指定是と末尾から的時間指定</li>
        </ol>
      </li>
      <li>
        fadeIn
        <ol>
          <li>
            0.1秒単位でフェードインにかける時間を指定是（最大2000：200秒）
          </li>
          <li>
            時間をかけて音量0から播放前に指定されていた音量まで上がる
          </li>
        </ol>
      </li>
      <li>
        fadeOut
        <ol>
          <li>
            0.1秒単位でフェードアウトにかける時間を指定是（最大2000：200秒）
          </li>
          <li>
            時間をかけて元的音量から音量0まで下がる
          </li>
        </ol>
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>
        畫面にドロップインでmp3を播放したい
        <br />→
        技術検証が多く必要。かなり大変そう。WebRTCでできる方法知っている人は教えてほしい。
      </li>
    </spec-item>
    <!----------------------
     ! 未實裝項目
     !--------------------->
    <spec-item class-str="unImplemented" label-str="未實裝項目">
      <li>畫面にドロップインでmp3を播放したい</li>
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
        <spec-link property="settingBgmWindowSpec" title-str="">
          BGM設定畫面
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
