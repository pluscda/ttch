<template>
  <Dlg>
    <template v-slot:header>
      <h1>新增帳號</h1>
    </template>

    <template v-slot:body>
      <main class="grid grid-cols-[400px,400px] gap-[10px]">
        <div class="w-full"></div>
        <div class="w-full"></div>
      </main>
    </template>

    <template v-slot:footer>
      <p>H22ere's some contact info</p>
    </template>
  </Dlg>
</template>

<script>
import { closeDlg$ } from "/@/store";
import Dlg from "./Dlg.vue";
export default {
  data() {
    return {
      closeDlg$,
    };
  },
  components: {
    Dlg,
  },
};
</script>

<style lang="scss" scoped>
.main-body {
}
</style>
