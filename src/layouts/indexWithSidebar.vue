<template>
  <section class="overflow-x-hidden index-position flex flex-col space-y-12 items-center pt-7">
    <div v-for="(item, i) in icons" @click="showMenu($event, item)" :key="i" class="dtc-tab">
      <img :src="item" class="block" width="30" height="27" />
    </div>
  </section>
</template>

<script>
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
  methods: {
    showMenu(evt, item) {
      [...document.querySelectorAll(".dtc-heightlight-tab")].forEach((s) => {
        s.classList.remove("dtc-heightlight-tab");
      });
      evt.target.classList.add("dtc-heightlight-tab");
    },
  },
  mounted() {},
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
.dtc-heightlight-tab {
  box-shadow: inset 15em 15em #60a5fa;
  outline: 20px solid #60a5fa;
}

.left-nav {
  max-height: calc(100vh - 80px);
}
</style>
