<template>
  <div class="flex flex-col relative">
    <i class="el-icon-close text-xl text-white block w-[16px] h-[16px] absolute right-2 top-2 z-10 cursor-pointer" @click="closeDlg$.next('')"></i>
    <header class="dlg-header z-9">
      <slot name="header">Header goes here ...</slot>
    </header>
    <section class="modal-body" id="modal-body">
      <slot name="body">Body goes here ...</slot>
    </section>

    <footer class="modal-footer">
      <slot name="footer">Footer goes here ...</slot>
    </footer>
  </div>
</template>

<script>
import { closeDlg$ } from "/@/store";
export default {
  data() {
    return {
      closeDlg$,
    };
  },
};
</script>

<style lang="scss" scoped>
.dlg-header {
  position: absolute;
  top: 0px;
  left: 0px;
  background: blue;
  width: 100%;
  color: white;
  height: 2rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  line-height: 2rem;
  text-align: left;
  padding-left: 10px;
  display: grid;
}
</style>
