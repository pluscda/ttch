<template>
  <section class="management">
    <teleport to="#ttModal">
      <div v-if="modalOpen" class="tt-modal">
        <PlayerAddDlg @click.stop=""> </PlayerAddDlg>
      </div>
    </teleport>
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>系統管理 / 職稱管理</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4">
      <DtxInputGroup prepend="職稱-ID" labelWidth="138">
        <el-input placeholder="請輸入職稱-ID"></el-input>
      </DtxInputGroup>
      <DtxInputGroup prepend="職稱" labelWidth="138">
        <el-input placeholder="請輸入職稱"></el-input>
      </DtxInputGroup>

      <Button label="進行查詢" icon="pi pi-search" @click="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click="cleanFilter" />
    </nav>
    <nav class="ml-2 dtc-search-filters">
      <Button class="p-button" label="新增職稱" icon="pi pi-plus" @click.stop="modalOpen = true" />
    </nav>

    <header data-msg="" class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
      <!-- <div title="" class="title-word1">採購單(註1)</div> -->
      <div>操作</div>
      <div v-for="(item, i) in headers" :key="i" @click="sort(headers, item)" :title="item.name">
        {{ item.name }}
        <span v-show="item.sortDesc === null">
          <i-typcn:arrow-unsorted></i-typcn:arrow-unsorted>
        </span>
        <span v-show="item.sortDesc === false">
          <i-typcn:arrow-sorted-down></i-typcn:arrow-sorted-down>
        </span>
        <span v-show="item.sortDesc">
          <i-typcn:arrow-sorted-up></i-typcn:arrow-sorted-up>
        </span>
      </div>
    </header>
    <main
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black ml-1 mx-1 animate__fadeInUp"
      v-for="(item, i) in list"
      :key="i"
      style="animation-duration: 0.3s"
      :style="i % 2 == 0 ? `animation-duration:${(i + 1) * 0.1}s ;background-color: white;` : `animation-duration:${(i + 1) * 0.1}s;background-color: #F2F7FF;`"
    >
      <div class="flex flex-none space-x-2">
        <Button label="編輯" class="p-button-sm" @click.stop="editItem(item)" />
        <el-popconfirm title="確定刪除嗎？" confirmButtonText="好的" cancelButtonText="不用了" @confirm="removeItem(item)">
          <template #reference>
            <Button label="刪除" class="p-button-sm p-button-warning" />
          </template>
        </el-popconfirm>
      </div>
      <div>{{ item.chDrgId || "暫無資料" }}</div>
      <div>{{ item.chHospitalId || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import queryString from "qs";
import { isEmpty } from "ramda";
import { toRefs, ref, inject } from "vue";
import { useRouter } from "vue-router";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
import PlayerAddDlg from "./PlayerAddDlg.vue";
import { closeDlg$ } from "/@/store";
let headers = [
  { name: "職稱-ID", key: "chDrgId", sortDesc: null },
  { name: "職稱", key: "chHospitalId", sortDesc: null },
];

export default {
  components: {
    Pagination,
    PlayerAddDlg,
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  setup() {
    const router = useRouter();
    const searchHospitalId = ref("");
    const searchDrugName = ref("");
    const searchDrgMaker = ref("");
    const global = inject("global");
    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail } = useList("drg-infos");

    const cleanFilter = () => {
      searchHospitalId.value = searchDrugName.value = searchDrgMaker.value = "";
      clearFilters();
    };
    const search = () => {
      let filters = {};
      if (searchHospitalId.value) {
        filters.chHospitalId_contains = searchHospitalId.value;
      }
      if (searchDrugName.value) {
        filters.chDrgEnName_contains = searchDrugName.value;
      }
      if (searchDrgMaker.value) {
        filters.chDrgMakerName_contains = searchDrgMaker.value;
      }
      filters = isEmpty(filters) ? "" : queryString.stringify(filters);
      state.listQuery.filter = filters;
      getList();
    };

    const editItem = async (item) => {
      const detail = await getItemDetail(item);
      global.editItem = { ...detail };
      router.push("/pharmacy/modifydrug");
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      searchHospitalId,
      searchDrugName,
      searchDrgMaker,
      sort,
      cleanFilter,
      search,
      removeItem,
      editItem,
    };
  },
  mounted() {
    this.$primevue.config.locale = this.zh;
    closeDlg$.subscribe(() => (this.modalOpen = false));
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 150px repeat(1, 160px) 1fr;
}
.management {
  position: relative;
  .comment {
    position: absolute;
    bottom: 70px;
    left: 0;
  }
}
.my-title::before {
  content: attr(data-msg);
  position: absolute;
  top: -20px;
  left: -20px;
  width: 210px;
  font-size: 13px;
}
</style>
