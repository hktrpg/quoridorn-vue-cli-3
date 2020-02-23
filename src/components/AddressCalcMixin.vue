<script lang="ts">
import Vue from "vue";
import { Mixin } from "vue-mixin-decorator";
import { Getter } from "vuex-class";

@Mixin
export default class AddressCalcMixin extends Vue {
  @Getter("columns") protected columns: any;
  @Getter("rows") protected rows: any;
  @Getter("gridSize") protected gridSize: any;
  @Getter("borderWidth") protected borderWidth: any;
  @Getter("marginGridSize") protected marginGridSize: any;
  @Getter("wheel") protected wheel: any;

  public arrangeAngle(angle: number): number {
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;
    return angle;
  }

  /**
   * 指定されたスクリーン座標を元に、座標計算を行う
   * @param screenX
   * @param screenY
   * @param oldAngle
   * @returns {{angle: number, planeLocateScreen: {x: *, y: *}, planeLocateCanvas: {x: *, y: *}, planeLocateTable: {x: *, y: *}}}
   */
  calcCoordinate(screenX: number, screenY: number, oldAngle: number): any {
    // スクロール倍率を考慮
    const zoom = (1000 - this.wheel) / 1000.0;
    // canvas上的マス座標を計算是
    const cr: any = document
      .getElementById("map-canvas")!
      .getBoundingClientRect();
    // canvas的中心点
    const center = {
      x: cr.x + cr.width / 2,
      y: cr.y + cr.height / 2
    };
    // 中心座標を基準としたマウス座標
    const loc: any = {
      x: screenX - center.x,
      y: screenY - center.y
    };
    // 中心点と指定された座標とを結ぶ線的角度を求める
    const angle = (Math.atan2(loc.y, loc.x) * 180) / Math.PI;
    // 中心点と指定された座標とを結ぶ線的長さを求める
    const distance = Math.sqrt(Math.pow(loc.x, 2) + Math.pow(loc.y, 2)) * zoom;
    // 地圖回転前的角度を求める
    const angleBeforeAround = this.arrangeAngle(angle - oldAngle);
    const planeLocateScreen = {
      x: center.x + distance * Math.cos((angleBeforeAround * Math.PI) / 180),
      y: center.y + distance * Math.sin((angleBeforeAround * Math.PI) / 180)
    };
    const planeLocateCenter = {
      x: planeLocateScreen.x - center.x,
      y: planeLocateScreen.y - center.y
    };
    const planeLocateCanvas = {
      x: planeLocateCenter.x + (this.columns / 2) * this.gridSize,
      y: planeLocateCenter.y + (this.rows / 2) * this.gridSize
    };
    const planeLocateTable = {
      x: planeLocateCanvas.x + this.marginGridSize * this.gridSize,
      y: planeLocateCanvas.y + this.marginGridSize * this.gridSize
    };
    /*
      const f = Math.floor
      const planeLocateFromCenter = { x: planeLocate.x - center.x, y: planeLocate.y - center.y }
      const planeCanvas = { x: center.x - this.columns / 2 * this.gridSize, y: center.y - this.rows / 2 * this.gridSize }
      const canvas = { x: center.x - this.columns / 2 * this.gridSize / zoom, y: center.y - this.rows / 2 * this.gridSize / zoom }
      window.console.log(
        `zm:${zoom} ` +
        `canvas(${f(canvas.x)}, ${f(canvas.y)}) ` +
        `pCanvas(${f(planeCanvas.x)}, ${f(planeCanvas.y)}) ` +
        `center(${f(center.x)}, ${f(center.y)}) ` +
        `loc(${f(loc.x)}, ${f(loc.y)}) ` +
        // `angle:${f(angle)} ` +
        // `oldAngle:${f(oldAngle)} ` +
        `useAngle:${f(angleBeforeAround)} ` +
        `dist:${f(distance)} ` +
        `planeLocate(${f(planeLocate.x)}, ${f(planeLocate.y)}) ` +
        `planeLocateC(${f(planeLocateFromCenter.x)}, ${f(planeLocateFromCenter.y)}) `)
      */
    // window.console.log(`screen(${this.f(screenX)}, ${this.f(screenY)}), angle:${this.f(angle)}, distance:${this.f(distance)} plane(${this.f(planeLocate.x)}, ${this.f(planeLocate.y)})`)
    return {
      angle: angle, // 角度
      planeLocateScreen: planeLocateScreen, // 地圖回転前的スクリーンベース的座標
      planeLocateCanvas: planeLocateCanvas, // 地圖回転前的キャンバスベース的座標
      planeLocateTable: planeLocateTable // 地圖回転前的テーブルベース的座標
    };
  }

  static f(v: number): number {
    return Math.floor(v * 100) / 100;
  }

  getLeftTop(): any {
    let canvasElm = document.getElementById("map-canvas");
    const canvasRect: any = canvasElm!.getBoundingClientRect();
    const center = {
      x: canvasRect.x + canvasRect.width / 2,
      y: canvasRect.y + canvasRect.height / 2
    };
    return {
      x: center.x - (this.columns * this.gridSize) / 2,
      y: center.y - (this.rows * this.gridSize) / 2
    };
  }

  calcAddress(
    screenX: number,
    screenY: number,
    oldAngle: number,
    offsetX: number = 0,
    offsetY: number = 0
  ): any {
    // 回転やズーム的前的スクリーン座標がどこになるかを計算し、そこをベースに地圖上的座標を算出是
    let planeLocateCanvas: any = this.calcCoordinate(screenX, screenY, oldAngle)
      .planeLocateCanvas;

    // ドロップ先的マス座標を算出
    let gridC: number = Math.ceil(planeLocateCanvas.x / this.gridSize);
    let gridR: number = Math.ceil(planeLocateCanvas.y / this.gridSize);

    // 掴んだとき的對像的相対位置を考慮
    let offsetGridX: number = offsetX / this.gridSize;
    let offsetGridY: number = offsetY / this.gridSize;
    if (offsetGridX > 0) {
      offsetGridX = Math.floor(offsetGridX);
    } else {
      offsetGridX = Math.ceil(offsetGridX);
    }
    if (offsetGridY > 0) {
      offsetGridY = Math.floor(offsetGridY);
    } else {
      offsetGridY = Math.ceil(offsetGridY);
    }
    gridC -= offsetGridX;
    gridR -= offsetGridY;

    return {
      gridC: gridC,
      gridR: gridR
    };
  }

  calcCanvasAddress(
    screenX: number,
    screenY: number,
    oldAngle: number,
    offsetX: number = 0,
    offsetY: number = 0
  ): any {
    //
    let coordinateObj = this.calcCoordinate(screenX, screenY, oldAngle);

    // マス座標
    const addressObj = this.calcAddress(
      screenX,
      screenY,
      oldAngle,
      offsetX,
      offsetY
    );

    /*
      const f = Math.floor
      window.console.log(
        `oldAngle:${oldAngle} ` +
        `los(${f(locateOnScreen.x)}, ${f(locateOnScreen.y)}) ` +
        `lot(${f(locateOnTable.x)}, ${f(locateOnTable.y)}) ` +
        `loc(${f(locateOnCanvas.x)}, ${f(locateOnCanvas.y)}) `)
      */

    return {
      locateOnScreen: coordinateObj.planeLocateScreen,
      locateOnTable: coordinateObj.planeLocateTable,
      locateOnCanvas: coordinateObj.planeLocateCanvas,
      grid: {
        column: addressObj.gridC,
        row: addressObj.gridR
      }
    };
  }

  get canvasSize(): any {
    return {
      w: this.columns * this.gridSize,
      h: this.rows * this.gridSize
    };
  }

  get mouseOnGrid(): any {
    return {
      c: this.$store.state.map.grid.c,
      r: this.$store.state.map.grid.r
    };
  }

  get mouseOnGridLocaleOnCanvas(): any {
    return {
      x: (this.mouseOnGrid.c - 1) * this.gridSize,
      y: (this.mouseOnGrid.r - 1) * this.gridSize
    };
  }

  get mouseOnGridLocaleOnTable(): any {
    return {
      x: this.mouseOnGridLocaleOnCanvas.x + this.canvasSize.w / 2,
      y: this.mouseOnGridLocaleOnCanvas.y + this.canvasSize.h / 2
    };
  }
}
</script>
