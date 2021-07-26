<template>
  <Dlg>
    <template v-slot:header>
      <h1>新增組織單位</h1>
    </template>

    <template v-slot:body>
      <main class="flex flex-col space-y-3">
        <DtxInputGroup prepend="組織單位代號" labelWidth="168">
          <el-input placeholder="請輸入組織單位代號"></el-input>
        </DtxInputGroup>
        <DtxInputGroup prepend="組織單位名稱" labelWidth="168">
          <el-input placeholder="請輸入組織單位名稱"></el-input>
        </DtxInputGroup>
      </main>
    </template>

    <template v-slot:footer>
      <div class="flex justify-end space-x-4 w-[500px]">
        <Button>新增組織單位</Button>
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
