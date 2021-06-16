<template>
  <section class="overflow-x-hidden index-position flex flex-col space-y-12 items-center pt-7">
    <div v-for="(item, i) in icons" @click="showMenu(i)" :key="i" :ref="'myref' + i">
      <img :src="item" class="block cursor-pointer" width="30" height="27" />
    </div>
    <nav class="left-fixed-menu hidden" ref="fixedMenu">
      <div v-for="(item, i) in topMenuu" :key="i">
        <h4>
          <h5 style="cursor: pointer" @click="showMenu(i)">
            {{ item }}
            <i class="el-icon-arrow-right float-right transform translate-x-4" v-if="activeTab !== i"></i>
            <i class="el-icon-arrow-down float-right transform translate-x-4" v-if="activeTab === i"></i>
          </h5>
          <section v-if="activeTab == i">
            <div v-for="(row, j) in rows[i].split(',')" :key="'row' + j" style="background: #d3dceb" class="sub-menu !py-2">
              <p style="cursor: pointer" class="ml-6" v-html="row"></p>
            </div>
          </section>
        </h4>
      </div>
    </nav>
  </section>
</template>

<script>
const icons = ["management.png", "application.png", "mailbox.png", "reviewarea.png", "search.png", "auditstatistics.png"];
const topMenuu = ["系統管理", "電子表單申請", "個人資料區", "審核資料區", "電子表單查詢", "稽核統計作業"];
const row0 = `帳號管理, 組織單位管理, 職稱管理,角色管理,系統功能管理,電子表單設定,簽核片語設定`;
const row1 = `生物安全等級實驗室證明, 教育訓練證明書, 送審證明書,基因重組實驗申請書,生物材料申請書</span>`;
const row2 = `申請資料匣`;
const row3 = `待審核資料匣,已審核資料匣`;
const row4 = `電子表單通用查詢作業`;
const row5 = `交易歷程,一般統計查詢`;
const rows = [row0, row1, row2, row3, row4, row5];
export default {
  name: "indexwidthbar2",
  data() {
    return {
      icons,
      topMenuu,
      rows,
      activeTab: -1,
    };
  },
  components: {},
  methods: {
    showMenu(idx) {
      [...document.querySelectorAll(".dtc-heightlight-tab")].forEach((s) => {
        s.classList.remove("dtc-heightlight-tab");
      });
      this.$refs[`myref${idx}`].classList.add("dtc-heightlight-tab");
      this.activeTab = idx;
      this.$refs.fixedMenu.classList.remove("hidden");
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

.left-fixed-menu {
  position: fixed !important;
  height: calc(100vh - 80px) !important;
  top: 32px;
  left: 63px;
  width: 251px;
  background: #eff7ff;
  display: block;
  flex-direction: column;
  z-index: 9999999;
  text-align: left;
  font: normal normal medium 24px/35px Source Han Sans TW;
  letter-spacing: 2.4px;
  color: #0d2868;
  padding: 15px;
  overflow-y: auto;
}
.sub-menu {
  box-shadow: 20px 0px 0 #d3dceb, -20px 0px 0 #d3dceb;
}
</style>
