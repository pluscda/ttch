<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>電子表單申請 / 教育訓練證明書</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-4">
      <DtxInputGroup prepend="表單狀態">
        <el-select filterable v-model="status" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in []" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="表單類別">
        <el-select filterable v-model="status" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in []" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="申請單號">
        <el-select filterable v-model="status" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in []" :key="item.value" :label="item.text" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="申請日期">
        <Calendar class="h-10" v-model="time1" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <!-- <Button label="進行查詢" icon="pi pi-search" @click="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click="cleanFilter" /> -->
    </nav>
    <nav class="ml-1 dtc-search-filters">
      <DtxInputGroup prepend="結案日期">
        <Calendar class="h-10" v-model="time1" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <DtxInputGroup prepend="最新簽核日期">
        <Calendar class="h-10" v-model="time1" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <Button label="進行查詢" icon="pi pi-search" @click="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click="cleanFilter" />
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
      :style="i % 2 == 0 ? `animation-duration:${(i + 1) * 0.1}s ;background-color: #F5F5F5;` : `animation-duration:${(i + 1) * 0.1}s;background-color: #E0E0E0;`"
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
      <div :title="item.chDrgCnName">{{ item.chDrgCnName || "暫無資料" }}</div>
      <div :title="item.chDrgEnName">{{ item.chDrgEnName || "暫無資料" }}</div>
      <div>{{ item.chDrgAlias || "暫無資料" }}</div>
      <div>{{ item.chDrgMakerName || "暫無資料" }}</div>
      <div :title="item.chDrgCnName">{{ item.chDrgCnName || "暫無資料" }}</div>
      <div :title="item.chDrgEnName">{{ item.chDrgEnName || "暫無資料" }}</div>
      <div>{{ item.chDrgAlias || "暫無資料" }}</div>
      <div>{{ item.chDrgMakerName || "暫無資料" }}</div>
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
import { pharmacyTab$ } from "/@/store";

let headers = [
  { name: "表單類別", key: "chDrgId", sortDesc: null },
  { name: "申請單號", key: "chHospitalId", sortDesc: null },
  { name: "狀態", key: "chDrgCnName", sortDesc: null },
  { name: "證明書", key: "chDrgEnName", sortDesc: null },
  { name: "同意書", key: "chDrgAlias", sortDesc: null },
  { name: "附件", key: "chDrgMakerName", sortDesc: null },
  { name: "申請人", key: "chDrgCnName2", sortDesc: null },
  { name: "申請日期", key: "chDrgEnName2", sortDesc: null },
  { name: "簽核日期", key: "chDrgAlias2", sortDesc: null },
  { name: "結案日期", key: "chDrgMakerName2", sortDesc: null },
];

export default {
  name: "drugmanagementaddlist",
  components: {
    Pagination,
  },
  setup() {
    const router = useRouter();
    const searchHospitalId = ref("");
    const searchDrugName = ref("");
    const searchDrgMaker = ref("");
    const global = inject("global");
    pharmacyTab$.next("0");

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
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 150px repeat(9, 120px) 1fr;
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
