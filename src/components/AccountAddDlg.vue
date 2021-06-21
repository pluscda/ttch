<template>
  <Dlg>
    <template v-slot:header>
      <h1>Here might be a page title</h1>
    </template>

    <template v-slot> </template>

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
.dlg-header {
  position: absolute;
  top: 0px;
  left: 0px;
  background: #00448c;
  width: 100%;
  color: white;
  height: 2rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  line-height: 2rem;
  text-align: left;
  padding-left: 10px;
  letter-spacing: 2.4px;
}
</style>
