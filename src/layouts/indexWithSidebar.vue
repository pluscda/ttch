<template>
  <nav class="left-right-sec pr-1">
    <section class="overflow-x-hidden index-position flex flex-col space-y-12 items-center pt-7" @mouseover.stop="showMenu(-1)">
      <div v-for="(item, i) in icons" @mouseover.stop="showMenu(i)" :key="i" :ref="'myref' + i" class="cursor-pointer">
        <img :src="item" class="block" width="30" height="27" />
      </div>
      <nav class="left-fixed-menu hidden" ref="fixedMenu" @mouseover="showMenu(-1)">
        <div v-for="(item, i) in topMenuu" :key="i" class="mb-4 relative" :class="activeTab === i ? 'dtc-line' : ''">
          <h4 class="">
            <h5 style="cursor: pointer" @click.stop="showMenu(i)" class="">
              {{ item }}
              <i class="el-icon-arrow-right float-right transform translate-x-4" v-if="activeTab !== i"></i>
              <i class="el-icon-arrow-down float-right transform translate-x-4 translate-y-1" v-if="activeTab === i"></i>
            </h5>
            <section class="" :class="activeTab != i ? 'ani-menu' : 'show-menu'">
              <div @click.stop="clickItem(row)" v-for="(row, j) in rows[i].split(',')" :key="'row' + j" style="background: #d3dceb" class="sub-menu !py-2 cursor-pointer">
                <p class="ml-6" v-html="row"></p>
              </div>
            </section>
          </h4>
        </div>
      </nav>
    </section>
    <main ref="mainRef" class="main-sec">
      <suspense>
        <template #default>
          <transition name="mode-fade" mode="out-in">
            <component :is="myCmp"></component>
          </transition>
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </suspense>
    </main>
  </nav>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { fromEvent } from "rxjs";
import { closeDlg$ } from "/@/store";
import { ElMessage } from "element-plus";
import { find, repeatWhen, mapTo, startWith, filter, tap } from "rxjs/operators";
const icons = ["management.png", "application.png", "mailbox.png", "reviewarea.png", "search.png", "auditstatistics.png"];
const topMenuu = ["系統管理", "電子表單申請", "個人資料區", "審核資料區", "電子表單查詢", "稽核統計作業"];
const row0 = `帳號管理,組織單位管理,職稱管理,角色管理,系統功能管理,電子表單設定,簽核片語設定`;
const row1 = `生物安全等級實驗室證明書,教育訓練證明書,送審證明書,基因重組實驗申請書,生物材料申請書`;
const row2 = `申請資料匣`;
const row3 = `待審核資料匣,已審核資料匣`;
const row4 = `電子表單通用查詢作業`;
const row5 = `交易歷程,一般統計查詢`;
const rows = [row0, row1, row2, row3, row4, row5];
let sub1 = "",
  sub2 = "";
export default {
  name: "indexwidthbar2",
  data() {
    return {
      icons,
      topMenuu,
      rows,
      activeTab: -1,
      myCmp: defineAsyncComponent(() => import("cps/FolderApply.vue")),
    };
  },
  components: {},
  methods: {
    updatePage(item) {
      //系統管理;`帳號管理, 組織單位管理, 職稱管理,角色管理,系統功能管理,電子表單設定,簽核片語設定`
      switch (item.trim()) {
        case "帳號管理":
          this.myCmp = defineAsyncComponent(() => import("cps/Account.vue"));
          break;
        case "組織單位管理":
          this.myCmp = defineAsyncComponent(() => import("cps/BusinessUnit.vue"));
          break;
        case "職稱管理":
          this.myCmp = defineAsyncComponent(() => import("cps/Player.vue"));
          break;
        case "角色管理":
          this.myCmp = defineAsyncComponent(() => import("cps/Role.vue"));
          break;
        case "系統功能管理":
          this.myCmp = defineAsyncComponent(() => import("cps/SysCtrl.vue"));
          break;
        case "電子表單設定":
          this.myCmp = defineAsyncComponent(() => import("cps/DigitForm.vue"));
          break;
        case "簽核片語設定":
          this.myCmp = defineAsyncComponent(() => import("cps/SingPhrase.vue"));
          break;
      }
      //電子表單申請:生物安全等級實驗室證明, 教育訓練證明書, 送審證明書,基因重組實驗申請書,生物材料申請書
      switch (item.trim()) {
        case "生物安全等級實驗室證明書":
          this.myCmp = defineAsyncComponent(() => import("cps/BioSafeLab.vue"));
          break;
        case "教育訓練證明書":
          this.myCmp = defineAsyncComponent(() => import("cps/Education.vue"));
          break;
        case "送審證明書":
          this.myCmp = defineAsyncComponent(() => import("cps/BackgroundCheck.vue"));
          break;
        case "基因重組實驗申請書":
          this.myCmp = defineAsyncComponent(() => import("cps/DnaLab.vue"));
          break;
        case "生物材料申請書":
          this.myCmp = defineAsyncComponent(() => import("cps/BioApply.vue"));
          break;
      }
      if (item.trim() == "申請資料匣") {
        this.myCmp = defineAsyncComponent(() => import("cps/FolderApply.vue"));
      }
      //審核資料區: 待審核資料匣,已審核資料匣
      switch (item.trim()) {
        case "待審核資料匣":
          this.myCmp = defineAsyncComponent(() => import("cps/FolderInspectWait.vue"));
          break;
        case "已審核資料匣":
          this.myCmp = defineAsyncComponent(() => import("cps/FolderInsepctDone.vue"));
          break;
      }
      if (item.trim() == "電子表單通用查詢作業") {
        this.myCmp = defineAsyncComponent(() => import("cps/DigiFormInquery.vue"));
      }
      //稽核統計作業: 交易歷程,一般統計查詢
      switch (item.trim()) {
        case "交易歷程":
          this.myCmp = defineAsyncComponent(() => import("cps/Transection.vue"));
          break;
        case "一般統計查詢":
          this.myCmp = defineAsyncComponent(() => import("cps/StatInquery.vue"));
          break;
      }
    },
    clickItem(item) {
      this.updatePage(item);
    },
    showMenu(idx) {
      this.$refs.fixedMenu.classList.remove("hidden");
      this.$refs.mainRef.style = `transform: translate3d(250px, 0, 0)`;
      if (this.activeTab === idx || +idx < 0) return;
      const el = document.querySelector(".dtc-heightlight-tab");
      el ? el.classList.remove("dtc-heightlight-tab") : "";
      this.activeTab = idx;
      this.$refs[`myref${idx}`]?.classList.add("dtc-heightlight-tab");
    },
    showHideMenu() {
      this.$refs.fixedMenu.classList.add("hidden");
      const el = document.querySelector(".dtc-heightlight-tab");
      el ? el.classList.remove("dtc-heightlight-tab") : "";
      this.activeTab = -1;
      this.$refs.mainRef.style = `transform: translate3d(0, 0, 0)`;
      closeDlg$.next("");
    },
  },
  mounted() {
    sub1 = fromEvent(document, "click").pipe(tap(this.showHideMenu)).subscribe();
  },
  beforeUnmount() {
    sub1.unsubscribe();
  },
};
</script>

<style lang="scss" scoped>
.left-right-sec {
  display: grid;
  grid-template-columns: 62px 1fr;
  gap: 2px;
  color: black;
}
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
  transition: all 0.2s ease-in;
}
.sub-menu {
  box-shadow: 20px 0px 0 #d3dceb, -20px 0px 0 #d3dceb;
}
.dtc-line::before {
  content: "";
  position: absolute;
  left: -10px;
  top: 3px;
  width: 5px;
  height: 20px;
  background: #00448c 0% 0% no-repeat padding-box;
  border-radius: 2px;
}
.ani-menu {
  opacity: 0;
  height: 0px;
  transform: translate3d(0, 100px, 0);
}
.show-menu {
  transition: all 0.17s ease-in-out;
}
.hidden {
  transform: translate3d(-400px, 0, 0);
  opacity: 0;
}
.main-sec {
  transition: all 0.3s ease-in-out;
  max-width: calc(100vw - 63px);
}
.mode-fade-enter-active,
.mode-fade-leave-active {
  transition: opacity 0.3s ease;
}

.mode-fade-enter-from,
.mode-fade-leave-to {
  opacity: 0;
}
</style>
