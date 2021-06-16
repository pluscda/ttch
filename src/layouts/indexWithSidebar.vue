<template>
  <section class="overflow-x-hidden index-position flex flex-col space-y-12 items-center pt-7">
    <img v-for="(item, i) in icons" :src="item" class="block" :key="i" width="30" height="27" />
  </section>
</template>

<script>
import BasicNav from "/@/layouts/components/basicDrugNav.vue";
import WsNav from "/@/layouts/components/drugWarehouseNav.vue";
import StoreNav from "./components/drugStoreNav.vue";
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
  components: {
    BasicNav,
    WsNav,
    StoreNav,
  },
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

.left-nav {
  max-height: calc(100vh - 80px);
}
</style>
