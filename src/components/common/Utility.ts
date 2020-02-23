import { all, create } from "mathjs";

const config = {};
const math = create(all, config);

/**
 * URLパラメータ取得処理
 *
 * @param name
 * @param url
 */
export function getUrlParam(
  name: string,
  url: string = window.location.href
): any {
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  let results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/(\+)|(¥%20)/g, " "));
}

/**
 * 極彩ログ処理
 *
 * @param a
 */
export function qLog(...a: any): void {
  // window.console.log(...arguments)

  let format = "";
  const logs = [];

  format += "%c%s";
  logs.push("color:blue; font-weight: bold;");
  logs.push("[System]");

  const args: any[] = [];
  let str = "";
  Array.prototype.slice.call(arguments).forEach(arg => {
    if (toString.call(arg) === "[object String]") {
      str += ` ${arg}`;
    } else {
      args.push(str.trim());
      str = "";
      args.push(arg);
    }
  });
  if (str !== "") {
    args.push(str.trim());
  }

  args.forEach((arg: any) => {
    const indent = "        ";
    const toString = Object.prototype.toString;
    if (toString.call(arg) === "[object String]") {
      const m1 = arg.match(/^(\[[^\]]+])(.+)$/);
      if (m1) {
        format += `%c${format.endsWith("\n") ? indent : ""}${m1[1]}`;
        logs.push("color:blue; font-weight: bold;");
        arg = m1[2];
      }
      const m2 = arg.match(/^ *(.+) +=> *(.*)$/);
      if (m2) {
        format += `%c${m2[1]}`;
        logs.push(
          "color:magenta; font-size: 120%; margin-left: 0.5em; font-weight: bold; border-radius: 3px; border: 1px solid magenta; padding: 1px 4px;"
        );
        format += `%c=>`;
        logs.push("margin: 0 0.5em;");
        arg = m2[2];
      }
      let m3;
      while (
        arg &&
        (m3 = arg.match(
          /^( *[^:]* +)?(([^ ]+) *: *((\([^)]+\))|([^ ,]*)))([ ,]+.+)?$/
        ))
      ) {
        // (\([^)]+\))|
        // window.console.log(arg)
        // window.console.log(m3)
        if (m3[1]) {
          format += `%c${format.endsWith("\n") ? indent : ""}${m3[1]}`;
          logs.push("");
        }
        format += `%c${format.endsWith("\n") ? indent : ""}${m3[3]}:`;
        logs.push(
          "color:white; background-color: green; font-weight: bold; padding: 1px 4px; border-radius: 0px; border: 1px solid green; border-right: none;"
        );
        format += `%c${m3[4] || m3[5] || ""}`;
        logs.push(
          "color:green; background-color: white; font-weight: bold; padding: 1px 4px; border-radius: 0px; border: 1px solid green; border-left: none;"
        );
        arg = m3[7];
      }
      if (arg) {
        format += `%c${format.endsWith("\n") ? indent : ""}${arg}`;
        logs.push("");
      }
    } else if (toString.call(arg) === "[object Array]") {
      format += "%c%s";
      logs.push("color: blue;");
      logs.push(`[ ${arg.join(", ")} ]`);
    } else if (toString.call(arg) === "[object Undefined]") {
      format += "%s";
      logs.push(arg);
    } else {
      const jsonStr = JSON.stringify(arg, undefined, 2)
        .split("\n")
        .map(line => `${indent}${line}`)
        .join("\n");

      // Objectを整形して出力是かそ的まま出力是か
      if (jsonStr.length > 0) {
        format += "%O";
        logs.push(arg);
      } else {
        format += "%c\n%s\n";
        logs.push("color: blue;");
        logs.push(jsonStr);
      }
    }
  });
  window.console.log(format, ...logs);
}

export function saveJson(name: string, data: any): void {
  const blob = new Blob([JSON.stringify(data, null, "  ")], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.download = `${name}.json`;
  anchor.href = url;
  anchor.click();
}

export function saveHTML(name: string, text: string): void {
  const blob = new Blob([text], {
    type: "text/html"
  });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.download = `${name}.html`;
  anchor.href = url;
  anchor.click();
}

export function saveText(name: string, text: string): void {
  const blob = new Blob([text], {
    type: "text/plain"
  });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.download = `${name}.txt`;
  anchor.href = url;
  anchor.click();
}

export function conversion(num: number, unitName: string): any {
  const convertTable = [
    {
      name: ["mm", "mm","毫米", "millimeter", "㍉", "㍉㍍", "ミリメートル"],
      base: "Length"
    },
    {
      name: ["cm", "cm","厘米", "centimeter", "㌢", "㌢㍍", "センチメートル"],
      base: "Length"
    },
    { name: ["m", "m", "meter", "㍍", "メートル","米"], base: "Length" },
    { name: ["km", "km", "kilometer", "㌔㍍", "キロメートル","公里"], base: "Length" },
    { name: ["in", "in", "inch", "㌅", "インチ","吋"], base: "Length" },
    { name: ["ft", "ft", "foot", "㌳", "フィート","英呎"], base: "Length" },
    { name: ["yd", "yd", "yard", "㍎", "ヤード","碼"], base: "Length" },
    { name: ["mi", "mi", "mile", "マイル","英里"], base: "Length" },
    { name: ["li", "li", "link", "リンク"], base: "Length" },
    { name: ["rd", "rd", "rod", "ロッド"], base: "Length" },
    { name: ["ch", "ch", "chain", "チェーン"], base: "Length" },
    { name: ["angstrom", "Å", "オングストローム","埃"], base: "Length" },
    { name: ["mil", "mil", "ミル"], base: "Length" },
    // { name: ["寸"], base: "Length" },
    // { name: ["尺"], base: "Length" },
    // { name: ["里"], base: "Length" },
    {
      name: ["mm2", "mm²", "㎟", "平方㍉㍍", "平方ミリメートル","平方毫米"],
      base: "Surface area"
    },
    {
      name: ["cm2", "cm²", "㎠", "平方㌢㍍", "平方メートル","平方厘米"],
      base: "Surface area"
    },
    {
      name: ["m2", "m²", "㎡", "平方㍍", "平方メートル","平方米"],
      base: "Surface area"
    },
    {
      name: ["km2", "km²", "㎢", "平方㌔㍍", "平方キロメートル","平方公里"],
      base: "Surface area"
    },
    {
      name: ["sqin", "in²", "sq in", "平方㌅", "平方インチ"],
      base: "Surface area"
    },
    {
      name: ["sqft", "ft²", "sq ft", "平方㌳", "平方フィート"],
      base: "Surface area"
    },
    {
      name: ["sqyd", "yd²", "sq yd", "平方㍎", "平方ヤード"],
      base: "Surface area"
    },
    { name: ["sqmi", "mi²", "sq mi", "平方マイル"], base: "Surface area" },
    { name: ["sqrd", "rd²", "sq rd", "平方ロッド"], base: "Surface area" },
    { name: ["sqch", "ch²", "sq ch", "平方チェイン"], base: "Surface area" },
    { name: ["sqmil", "mil²", "sq mil", "平方ミル"], base: "Surface area" },
    { name: ["acre", "ac", "エーカー"], base: "Surface area" },
    { name: ["hectare", "ha", "㌶", "ヘクタール"], base: "Surface area" },
    // { name: ["a", "アール"], base: "Surface area" },
    // { name: ["坪", "歩"], base: "Surface area" },
    // { name: ["畝"], base: "Surface area" },
    // { name: ["反"], base: "Surface area" },
    // { name: ["町"], base: "Surface area" },
    { name: ["mm3", "mm³", "平方㍉㍍", "立方ミリメートル"], base: "Volume" },
    {
      name: ["cm3", "cm³", "平方㌢㍍", "平方㌢", "立方センチメートル"],
      base: "Volume"
    },
    { name: ["m3", "m³", "㎥", "平方㍍", "立方メートル"], base: "Volume" },
    {
      name: ["km3", "km³", "平方㌖", "平方㌔㍍", "立方キロメートル"],
      base: "Volume"
    },
    {
      name: ["l", "L", "ℓ", "lt", "liter", "litre", "㍑", "リットル"],
      base: "Volume"
    },
    { name: ["cc", "cc", "㏄", "シーシー"], base: "Volume" },
    { name: ["cuin", "in³", "cu in", "平方㌅", "立方インチ"], base: "Volume" },
    {
      name: ["cuft", "ft³", "cu ft", "平方㌳", "立方フィート"],
      base: "Volume"
    },
    { name: ["cuyd", "yd³", "cu yd", "平方㍎", "立方ヤード"], base: "Volume" },
    { name: ["teaspoon", "tsp", "小さじ"], base: "Volume" },
    { name: ["tablespoon", "tbsp", "大さじ"], base: "Volume" },
    { name: ["minim", "min", "ミニム"], base: "Volume" },
    {
      name: ["fldr", "fldr", "fluiddram", "fl dr", "液量ドラム"],
      base: "Volume"
    },
    {
      name: ["floz", "floz", "fluidounce", "fl oz", "液量オンス"],
      base: "Volume"
    },
    { name: ["gi", "gi", "gill", "ジル"], base: "Volume" },
    { name: ["cp", "cp", "cup", "カップ"], base: "Volume" },
    { name: ["pt", "pt", "pint", "パイント"], base: "Volume" },
    { name: ["qt", "qt", "quart", "クォート"], base: "Volume" },
    { name: ["gal", "gal", "gallon", "ガロン"], base: "Volume" },
    {
      name: ["bbl", "bbl", "beerbarrel", "バレル", "米液量バレル"],
      base: "Volume"
    },
    { name: ["obl", "obl", "oilbarrel", "石油用バレル"], base: "Volume" },
    { name: ["hogshead", "hogshead", "ホッグスヘッド"], base: "Volume" },
    { name: ["gtt", "gtt", "drop", "ドロップ"], base: "Volume" },
    // { name: ["pk", "peck", "ペック"], base: "Volume" },
    // { name: ["升"], base: "Volume" },
    // { name: ["合"], base: "Volume" },
    // { name: ["斗"], base: "Volume" },
    // { name: ["石"], base: "Volume" },
    { name: ["mg", "mg", "milligram", "㍉㌘", "ミリグラム","毫克"], base: "Mass" },
    { name: ["g", "g", "gram", "㌘", "グラム","克"], base: "Mass" },
    {
      name: ["kg", "kg", "kilogram", "㌔㌘", "㌕", "キログラム","公斤"],
      base: "Mass"
    },
    { name: ["ton", "t", "tonne", "㌧", "トン"], base: "Mass" },
    { name: ["gr", "gr", "grain", "グレーン"], base: "Mass" },
    { name: ["dr", "dr", "dram", "ドラム"], base: "Mass" },
    { name: ["oz", "oz", "ounce", "オンス","安士"], base: "Mass" },
    { name: ["lb", "lb", "lbm", "lbs", "poundmass", "ポンド","磅"], base: "Mass" },
    {
      name: ["cwt", "cwt", "hundredweight", "ハンドレッドウェイト"],
      base: "Mass"
    }
  ];

  const getUnit: Function = (unitName: string): any => {
    return convertTable.filter(
      (unit: any) => unit.name.filter((name: string) => name === unitName)[0]
    )[0];
  };
  const filteredUnit = getUnit(unitName);
  if (!filteredUnit) return null;

  const base = filteredUnit.base;
  const name = filteredUnit.name[0];

  // window.console.log(num, unitName, base, name);

  return (
    convertTable
      .filter((unit: any) => unit.base === base && unit.name[0] !== name)
      .map((targetUnit: any) => targetUnit.name[0])
      .map((unit: string) => `${num}${name} to ${unit}`)
      // .map((unit: string) => {
      //   window.console.log(unit);
      //   return unit;
      // })
      .map((unit: string) => math.eval(unit).format())
      .map((result: string) => {
        // window.console.log(result);
        const mr: any = result.match(/([^ ]+) (.+)/);
        const floatValue: number = parseFloat(mr[1]);
        const unitStr: string = mr[2];
        const unit: any = getUnit(unitStr);
        return {
          value: floatValue,
          name: unit.name[unit.name.length - 1],
          unit: unit.name[1]
        };
      })
  );
}

/**
 * 文字列をクリップボードに複製是
 *
 * @param text
 */
export function execCopy(text: string): boolean {
  const temp = document.createElement("div");

  temp.appendChild(document.createElement("pre")).textContent = text;

  const s = temp.style;
  s.position = "fixed";
  s.left = "-100%";

  document.body.appendChild(temp);
  document.getSelection()!.selectAllChildren(temp);

  const result = document.execCommand("copy");

  document.body.removeChild(temp);
  // true なら実行できている falseなら失敗か対応していないか
  return result;
}

/**
 * 拡張子を除去是
 *
 * @param fileName
 */
export function removeExt(fileName: string): string {
  const matchExt: string[] | null = fileName.match(/(.*)(?:\.([^.]+$))/);
  return matchExt ? matchExt[1] : fileName;
}

/**
 * ファイル名から情報を取得是
 *
 * @param fileName
 */
export function getFileNameArgList(fileName: string): (string | number)[] {
  const matchExt: string[] | null = fileName.match(/(.*)(?:\.([^.]+$))/);

  const useFileName: string = matchExt ? matchExt[1] : fileName;
  const index: number = useFileName.indexOf("__");

  if (index < 0) return [];

  const argStr: string = useFileName.substring(index + 2).trim();

  return argStr
    ? argStr.split("_").map(str => {
        const num: number = parseInt(str, 10);
        return isNaN(num) ? str : num;
      })
    : [];
}

export function toInitiativeObjList(
  format: string
): {
  property: string;
  min: number | string | null;
  max: number | string | null;
  type: string;
}[] {
  const absoluteTrans = (list: any[], index: number): boolean => {
    // 全角文字を半角に変換
    if (/^(ー?[０-９]+|？)$/.test(list[index])) {
      window.console.log(list[index]);
      list[index] = list[index].replace(/[ー０-９？]/g, (s: string) => {
        if (s === "ー") return "-";
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      });
      window.console.log(list[index]);
    }
    if (list[index] === "?") return true;
    if (/^-?[0-9]+$/.test(list[index])) {
      list[index] = parseInt(list[index], 10);
      return true;
    }
    return false;
  };
  const check = (list: any[], index: number): number => {
    if (/^(-?[0-9]+|\?)$/.test(list[index])) return 1;
    if (/^(ー?[０-９]+|？)$/.test(list[index])) return 2;
    return 0;
  };
  const resultList: any = [];

  let colorPickIndex: number = 0;
  const colorList: string[] = [
    "#D40044",
    "#99CF30",
    "#0D2189",
    "#FF7F15",
    "#008679",
    "#56017B",
    "#FE411A",
    "#33A244",
    "#271383",
    "#FFE62F",
    "#035D86",
    "#AF0063"
  ];

  /* eslint no-irregular-whitespace: ["error", {"skipRegExps": true}] */
  if (format === "") return resultList;
  format.split(/[ 　]+/).forEach(str => {
    const fs: any[] = str.split(/[<＜]/);

    const obj: any = {
      type: "number",
      property: str,
      fromProperty: null,
      refStr: str,
      min: null,
      max: null,
      color: "#000000"
    };

    // 想定外的多さ
    if (fs.length > 3) {
      resultList.push(obj);
      return;
    }

    // min＜item＜max
    if (fs.length === 3) {
      if (!absoluteTrans(fs, 0)) {
        resultList.push(obj);
        return;
      }
      if (!absoluteTrans(fs, 2)) {
        resultList.push(obj);
        return;
      }
      if (fs[0] === "?") {
        resultList.push({
          type: "min",
          property: fs[1] + "的最小值",
          fromProperty: fs[1],
          refStr: fs[1] + "-min",
          min: null,
          max: null
        });
      } else {
        obj.min = fs[0];
      }

      obj.property = fs[1];
      obj.refStr = fs[1];

      if (fs[2] !== "?") {
        obj.max = fs[2];
      }
      resultList.push(obj);
      if (fs[2] === "?") {
        resultList.push({
          type: "max",
          property: fs[1] + "的最大值",
          fromProperty: fs[1],
          refStr: fs[1] + "-max",
          min: null,
          max: null
        });
      }
    }

    // min<item or item<max
    if (fs.length === 2) {
      const check0 = check(fs, 0);
      const check1 = check(fs, 1);
      if ((check0 === 0 && check1 === 0) || (check0 > 0 && check1 > 0)) {
        resultList.push(obj);
        return;
      }
      if (check0 === 2) absoluteTrans(fs, 0);
      if (check1 === 2) absoluteTrans(fs, 1);
      if (check0 > 0) {
        if (fs[0] === "?") {
          resultList.push({
            type: "min",
            property: fs[1] + "的最小值",
            fromProperty: fs[1],
            refStr: fs[1] + "-min",
            min: null,
            max: null
          });
        } else {
          obj.min = fs[0];
        }

        obj.property = fs[1];
        obj.refStr = fs[1];

        resultList.push(obj);
      }
      if (check1 > 0) {
        obj.property = fs[0];
        obj.refStr = fs[0];

        if (fs[1] !== "?") obj.max = fs[1];
        resultList.push(obj);
        if (fs[1] === "?") {
          resultList.push({
            type: "max",
            property: fs[0] + "的最大值",
            fromProperty: fs[0],
            refStr: fs[0] + "-max",
            min: null,
            max: null
          });
        }
      }
    }

    // item
    if (fs.length === 1) {
      const checkMatchResult = fs[0].match(/^[*＊](.+)$/);
      if (checkMatchResult) {
        obj.type = "checkbox";

        obj.property = checkMatchResult[1];
        obj.refStr = checkMatchResult[1];

        // TODO 色的設定
        const color: string = colorList[colorPickIndex++];
        if (colorPickIndex >= colorList.length) colorPickIndex = 0;
        obj.color = color;
      }
      resultList.push(obj);
    }
  });
  return resultList;
}

/**
 * 合計值を算出是
 *
 * @param list
 */
export function sum(list: number[]): number {
  return list.reduce((accumlator, current) => accumlator + current);
}

/**
 *
 * @param widthList
 * @param formatObjList
 */
export function arrangeInitiativeWidthList(
  widthList: number[],
  formatObjList: any[]
): number[] {
  const contentWidth = sum(widthList);
  const orderWidth = 20;
  const baseWidth = 30;
  const newWidthList = [
    orderWidth,
    baseWidth,
    baseWidth,
    baseWidth,
    ...formatObjList.map(() => baseWidth),
    0
  ];
  const textColumnWidth =
    contentWidth +
    (widthList.length - 1) -
    (newWidthList.length - 1) -
    sum(newWidthList);
  newWidthList[newWidthList.length - 1] = textColumnWidth;
  if (textColumnWidth < baseWidth) {
    newWidthList[newWidthList.length - 1] = baseWidth;
    const diffSum = baseWidth - textColumnWidth;
    const diff = Math.ceil(diffSum / newWidthList.length);
    const useDiffSum = diffSum - diff * newWidthList.length;
    newWidthList.forEach((val, index) => (newWidthList[index] -= diff));
    newWidthList[newWidthList.length - 1] -= useDiffSum;
  }
  return newWidthList;
}

/**
 * リストから特定的要素を刪除是
 *
 * @param list
 * @param filterFunc
 */
export function listDelete(
  list: any[],
  filterFunc: (item: any, index: number) => {}
) {
  const deleteList: any[] = list.filter(filterFunc);
  const deleteIndexList: number[] = deleteList.map(deleteItem =>
    list.indexOf(deleteItem)
  );
  deleteIndexList.sort((n1: number, n2: number) => {
    if (n1 > n2) return -1;
    if (n1 < n2) return 1;
    return 0;
  });
  deleteIndexList.forEach(deleteIndex => list.splice(deleteIndex, 1));
}

export function fileToBase64(imageFiles: File[]): PromiseLike<any> {
  const promiseList: PromiseLike<any>[] = imageFiles.map(file =>
    createBase64DataSet(file, { w: 96, h: 96 })
  );
  return Promise.all(promiseList);
}

function createBase64DataSet(
  imageFile: any,
  { w, h }: { w: number; h: number }
): any {
  // 圖片的読み込み処理
  const normalLoad = new Promise<String>(
    (resolve: Function, reject: Function) => {
      try {
        const reader: any = new FileReader();
        reader.onload = () => {
          // サムネイル圖片でない場合はプレーンな圖片データからBase64データを取得是
          resolve(reader.result);
        };
        reader.readAsDataURL(imageFile);
      } catch (error) {
        reject(error);
      }
    }
  );
  // サムネイル圖片的読み込み処理
  const thumbnailLoad = new Promise<String>(
    (resolve: Function, reject: Function) => {
      // 圖片的読み込み処理
      try {
        const reader: any = new FileReader();
        reader.onload = function(event: any) {
          // サムネイル圖片新增的場合は小さくて決まった大小的圖片データに加工是（アニメGIFも最初的１コマ的静止画になる）

          const image = new Image();
          image.onload = function() {
            const useSize = {
              w: image.width,
              h: image.height
            };

            // 大きい場合は、比率を保ったまま縮小是
            if (useSize.w > w || useSize.h > h) {
              const scale = Math.min(w / useSize.w, h / useSize.h);
              useSize.w = useSize.w * scale;
              useSize.h = useSize.h * scale;
            }

            // 圖片を描画してデータを取り出す（Base64変換的實裝）
            const canvas: HTMLCanvasElement = document.createElement(
              "canvas"
            ) as HTMLCanvasElement;
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
            canvas.width = w;
            canvas.height = h;
            const locate = {
              x: (canvas.width - useSize.w) / 2,
              y: (canvas.height - useSize.h) / 2
            };
            ctx.drawImage(image, locate.x, locate.y, useSize.w, useSize.h);

            // 非同期で返却
            resolve(canvas.toDataURL());
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(imageFile);
      } catch (error) {
        reject(error);
      }
    }
  );
  return Promise.all<String>([normalLoad, thumbnailLoad]).then(
    (values: String[]) => ({
      name: imageFile.name,
      imageArgList: getFileNameArgList(imageFile.name),
      image: values[0],
      thumbnail: values[1]
    })
  );
}
