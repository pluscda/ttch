<template>
  <Dlg>
    <template v-slot:header>
      <h1>新增帳號</h1>
    </template>

    <template v-slot:body>
      <main class="grid grid-cols-[400px,400px] gap-[10px]">
        <div class="w-full text-left space-y-2">
          <header class="bg-[#D5E3EA] h-[35px] color-[#0A2548] leading-[35px] pl-2">帳號資料</header>
          <DtxInputGroup prepend="帳號編號" labelWidth="98">
            <el-input placeholder="請輸入帳號編號"></el-input>
          </DtxInputGroup>
          <DtxInputGroup prepend="帳號姓名" labelWidth="98">
            <el-input placeholder="請輸入帳號姓名"></el-input>
          </DtxInputGroup>
          <DtxInputGroup prepend="單位" labelWidth="98">
            <el-select filterable v-model="status" placeholder="請選擇" class="border-l-0">
              <el-option v-for="item in []" :key="item.value" :label="item.text" :value="item.value"> </el-option>
            </el-select>
          </DtxInputGroup>
          <DtxInputGroup prepend="職務" labelWidth="98">
            <el-select filterable v-model="status" placeholder="請選擇" class="border-l-0">
              <el-option v-for="item in []" :key="item.value" :label="item.text" :value="item.value"> </el-option>
            </el-select>
          </DtxInputGroup>
          <DtxInputGroup prepend="電子郵件" labelWidth="98">
            <el-input placeholder="請輸入電子郵件"></el-input>
          </DtxInputGroup>
          <DtxInputGroup prepend="帳號狀態" labelWidth="98">
            <el-select filterable v-model="status" placeholder="請選擇" class="border-l-0">
              <el-option v-for="item in []" :key="item.value" :label="item.text" :value="item.value"> </el-option>
            </el-select>
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
      <div class="flex justify-end space-x-4 w-[800px]">
        <Button>新增帳號</Button>
        <Button class="p-button-secondary">取消變更</Button>
      </div>
    </template>
  </Dlg>
</template>

<script>
import Dlg from "./Dlg.vue";
const roles = ["系統管理者", "系統管理者", "系統管理者", "系統管理者", "系統管理者", "系統管理者", "系統管理者", "系統管理者"];
export default {
  data() {
    return {
      roles,
    };
  },
  components: {
    Dlg,
  },
};
</script>

<style lang="scss" scoped></style>
