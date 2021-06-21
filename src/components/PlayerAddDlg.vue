<template>
  <Dlg>
    <template #header>
      <h1>新增職稱</h1>
    </template>

    <template #body>
      <main class="flex flex-col space-y-3">
        <DtxInputGroup prepend="職稱-ID" labelWidth="168">
          <el-input placeholder="請輸入職稱-ID"></el-input>
        </DtxInputGroup>
        <DtxInputGroup prepend="職稱" labelWidth="168">
          <el-input placeholder="請輸入職稱"></el-input>
        </DtxInputGroup>
      </main>
    </template>

    <template #footer>
      <div class="flex justify-end space-x-4 w-[500px]">
        <Button>新增職稱</Button>
        <Button class="p-button-secondary">取消變更</Button>
      </div>
    </template>
  </Dlg>
</template>

<script>
import Dlg from "./Dlg.vue";

export default {
  data() {
    return {};
  },
  components: {
    Dlg,
  },
};
</script>

<style lang="scss" scoped></style>
