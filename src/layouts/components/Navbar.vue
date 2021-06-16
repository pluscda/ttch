<template>
  <nav class="text-blue-20 !bg-gray-400 dtc-nav-bar2">
    <img src="logo.png" class="object-cover block mt-1" width="250" height="68" />
    <img src="systemtitle.png" class="object-cover block mt-3 ml-10" width="490" height="58" />
  </nav>
</template>

<script>
import { logout$, leftSideBar$ } from "/@/store";
export default {
  name: "navbar2",
  inject: ["mutations"],
  methods: {
    logout() {
      logout$.next("logout");
      this.$router.push("/login");
    },
    updatePharmacyRouter(url, tabNum) {
      leftSideBar$.next(tabNum);
      this.$router.push(url);
    },
  },
  created() {
    if (location.href.includes("/pharmacy")) {
      this.$router.push("/pharmacy/drugmanagement");
    }
  },
};
</script>

<script setup>
import { ref, inject, watch } from "vue";
import CurrentTime from "cps/CurrentTime.vue";
import { tryOnMounted } from "@vueuse/shared";
const bgPanel = ref(null);
const avatarPanel = ref(null);
const bgColor = ref("dark");

const toggleAvatar = (event) => avatarPanel.value.toggle(event);
const global = inject("global");

watch(bgColor, (v) => {
  document.querySelector("#app").className = v ? "dark" : "light";
  global.userDefaultBgColor = v;
});
tryOnMounted(() => {
  document.querySelector("#app").className = bgColor.value;
});
</script>

<style lang="scss" scoped>
.dtc-nav-bar2 {
  width: 100vw;
  height: 70px;
  display: grid;
  padding: 0 1rem;
  line-height: 70px;
  font-size: 1rem;
  grid-template-columns: max-content 320px 1fr max-content max-content;
}
</style>
