<template>
  <Dlg>
    <template v-slot:header>
      <h1>新增帳號</h1>
    </template>

    <template v-slot:body>
      <main class="grid grid-cols-[400px,400px] gap-[10px]">
        <div class="w-full text-left space-y-2">
          <header class="bg-[#D5E3EA] h-[35px] color-[#0A2548] leading-[35px] pl-2">帳號資料</header>
          <DtxInputGroup prepend="帳號編號">
            <el-input placeholder="請輸入帳號編號"></el-input>
          </DtxInputGroup>
          <DtxInputGroup prepend="帳號編號">
            <el-input placeholder="請輸入帳號編號"></el-input>
          </DtxInputGroup>
          <DtxInputGroup prepend="帳號編號">
            <el-input placeholder="請輸入帳號編號"></el-input>
          </DtxInputGroup>
          <DtxInputGroup prepend="帳號編號">
            <el-input placeholder="請輸入帳號編號"></el-input>
          </DtxInputGroup>
          <DtxInputGroup prepend="帳號編號">
            <el-input placeholder="請輸入帳號編號"></el-input>
          </DtxInputGroup>
          <DtxInputGroup prepend="帳號編號">
            <el-input placeholder="請輸入帳號編號"></el-input>
          </DtxInputGroup>
        </div>
        <div class="w-full text-left space-y-2">
          <header class="bg-[#D5E3EA] h-[35px] color-[#0A2548] leading-[35px] pl-2">授權角色</header>
          <div v-for="(item, i) in roles" :key="i" class="grid grid-cols-[100px,1fr] pl-2 border-b-[1px] border-b-gray-100">
            <Checkbox :id="'role' + i" :value="item" />
            <label :for="'role' + i">{{ item }}</label>
          </div>
        </div>
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
const roles = ["系統管理者", "系統管理者", "系統管理者", "系統管理者", "系統管理者", "系統管理者", "系統管理者", "系統管理者"];
export default {
  data() {
    return {
      closeDlg$,
      roles,
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
