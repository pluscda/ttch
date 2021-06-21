<template>
  <Dlg>
    <template #header>
      <h1>新增角色</h1>
    </template>

    <template #body>
      <main class="flex flex-col space-y-3">
        <DtxInputGroup prepend="角色代碼" labelWidth="128">
          <el-input placeholder="請輸入角色代碼"></el-input>
        </DtxInputGroup>
        <DtxInputGroup prepend="角色名稱" labelWidth="128">
          <el-input placeholder="請輸入角色名稱"></el-input>
        </DtxInputGroup>
        <DtxInputGroup prepend="啟用狀態" labelWidth="128">
          <InputSwitch></InputSwitch>
          <label for="binary" class="inline-block tran -translate-y-2 translate-x-2">啟用</label>
        </DtxInputGroup>
      </main>
    </template>

    <template #footer>
      <div class="flex justify-end space-x-4 w-[500px]">
        <Button>新增角色</Button>
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
