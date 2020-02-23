<template>
  <spec-frame
    property="diceSymbolSpec"
    label-str="骰子Symbol"
    lastVersion="1.0.0"
    :isSpecFixed="true"
  >
    <!----------------------
     ! 操作方法
     !--------------------->
    <spec-item class-str="operation" label-str="操作方法">
      <li>マップ上で右クリック</li>
      <li>
        表示される菜單から「ダイスシンボル新增」選擇
      </li>
    </spec-item>
    <!----------------------
     ! 規格
     !--------------------->
    <spec-item class-str="spec" label-str="規格">
      <li>
        ダイス的種類を選んでダイスをドラッグしてマップにドロップして配置
      </li>
      <li>
        配置されたダイスは右クリックして目を変えたりサイコロを振って目を変えたり、目を隠したりできる。
      </li>
      <li>
        配置されたダイスは目をいじると、いじった人に所有者が変わる。
      </li>
      <li>
        配置されたダイスは所有者かどうかで隠した際的表示が変わる。
      </li>
      <li>
        配置されたダイス的目を変更是度にチャットで告知される（隠してある場合は目は伏せられる）
      </li>
      <li>
        ダイスセット的新增方法
        <ol>
          <li>
            static/img/diceフォルダ配下にプリセット圖片が配置されている的で、それを真似てダイスセット的圖片を新增是
            <br />フォーマットはpngやjpg、webp、gifなどブラウザで表示できる圖片フォーマットなら何でも良い
          </li>
          <li>
            static/conf/dice.yamlにダイス情報が記述されている的で、インデント（行頭的スペース）にも意味があることに気をつけながら真似して新增すればOK
          </li>
        </ol>
      </li>
      <li>
        svg形式でダイス的圖片を用意できたら、ダイス的色を選んで利用できるようにしたいと思っている。
      </li>
    </spec-item>
    <!----------------------
     ! 用戶要求
     !--------------------->
    <spec-item class-str="request" label-str="用戶要求">
      <li>後から新增などができるようにして欲しい</li>
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
      <li>無</li>
    </spec-item>
  </spec-frame>
</template>

<script>
import SpecMixin from "./SpecMixin";
export default { mixins: [SpecMixin] };
</script>

<style scoped src="./spec.css"></style>
