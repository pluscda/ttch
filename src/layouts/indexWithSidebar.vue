<template>
  <section class="overflow-x-hidden index-position flex flex-col space-y-12 items-center pt-7">
    <div v-for="(item, i) in icons" @click="showMenu(item)" :key="i" class="heightlight">
      <img :src="item" class="block" width="30" height="27" />
    </div>
  </section>
</template>

<script>
import { leftSideBar$ } from "/@/store";

const icons = ["management.png", "application.png", "mailbox.png", "reviewarea.png", "search.png", "auditstatistics.png"];
export default {
  name: "indexwidthbar2",
  data() {
    return {
      dtcCurrentCmp: "",
      icons,
    };
  },
  components: {},
  mounted() {
    leftSideBar$.subscribe((v) => {
      if (v == 1) {
        this.dtcCurrentCmp = BasicNav;
      } else if (v == 2) {
        this.dtcCurrentCmp = WsNav;
      } else if (v == 3) {
        this.dtcCurrentCmp = StoreNav;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.index-position {
  max-height: calc(100vh - 80px);
  background: #00448c 0% 0% no-repeat padding-box !important;
  min-height: calc(100vh - 80px);
  color: lighten(#10579b, $amount: 55) !important;
  div {
    padding: 4px;
  }
  width: 62px;
}
.dtc-heightlight {
  box-shadow: inset 15em 15em #60a5fa;
  outline: 20px solid #60a5fa;
}

.left-nav {
  max-height: calc(100vh - 80px);
}
</style>
