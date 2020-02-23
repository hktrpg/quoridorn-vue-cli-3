<template>
  <context-frame displayProperty="private.display.cardContext">
    <div class="item" @click.left.prevent="draw">抽一張</div>
    <div class="item" @click.left.prevent="choice">選擇</div>
    <div class="item" @click.left.prevent="reverse">反轉</div>
    <div class="item" @click.left.prevent="shuffle">隨機</div>
  </context-frame>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ContextFrame from "../../ContextFrame";
import WindowMixin from "../../WindowMixin";

export default {
  mixins: [WindowMixin],
  components: {
    ContextFrame
  },
  methods: {
    ...mapActions(["windowOpen", "setProperty", "windowClose"]),
    draw() {
      if (this.viewMode !== "normal") {
        this.setProperty({
          property: "deck.command",
          value: { type: "changeViewMode", value: "normal" },
          logOff: true
        });
        setTimeout(() => {
          this.setProperty({
            property: "deck.command",
            value: { type: "draw" },
            logOff: true
          });
        }, 200);
      } else {
        this.setProperty({
          property: "deck.command",
          value: { type: "draw" },
          logOff: true
        });
      }
      this.windowClose("private.display.cardContext");
    },
    choice() {
      this.setProperty({
        property: "deck.command",
        value: { type: "changeViewMode", value: "choice" },
        logOff: true
      });
      this.windowClose("private.display.cardContext");
    },
    reverse() {
      this.setProperty({
        property: "deck.isReverse",
        value: !this.isReverse,
        logOff: true
      });
      this.windowClose("private.display.cardContext");
    },
    shuffle() {
      if (this.viewMode !== "normal") {
        this.setProperty({
          property: "deck.command",
          value: { type: "changeViewMode", value: "normal" },
          logOff: true
        });
        setTimeout(() => {
          this.setProperty({
            property: "deck.command",
            value: { type: "shuffle" },
            logOff: true
          });
        }, 1000);
      } else {
        this.setProperty({
          property: "deck.command",
          value: { type: "shuffle" },
          logOff: true
        });
      }
      this.windowClose("private.display.cardContext");
    }
  },
  computed: mapState({
    ...mapGetters(["getObj"]),
    objKey: state => state.private.display["chitContext"].key,
    storeObj() {
      const key = this.objKey;
      // window.console.log(`key:${key}`)
      return this.getObj(key);
    },
    isReverse: state => state.deck.isReverse,
    viewMode: state => state.deck.viewMode
  })
};
</script>
