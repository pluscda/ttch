<template>
  <section class="management">
    <header class="dtc-page-header grid dtc-page-header__grid pr-2">
      <div>採購單管理</div>
    </header>
    <nav class="ml-1 dtc-search-filters mt-2" style="margin-bottom: 1.5rem !important">
      <DtxInputGroup prepend="採購日期">
        <Calendar class="h-10" v-model="time1" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <div class="mx-1 pt-2 dtc-text">至</div>
      <Calendar class="h-10" v-model="time2" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      <DtxInputGroup prepend="採購單號">
        <el-input placeholder="搜尋採購單號" v-model="searchOrderId" />
      </DtxInputGroup>

      <Button label="進行查詢" icon="pi pi-search" @click.stop="search" />
      <Button label="清除查詢" class="p-button-secondary" icon="pi pi-undo" @click.stop="cleanFilter" />
    </nav>
    <nav class="ml-1 dtc-search-filters" style="margin-top: -10px">
      <DtxInputGroup prepend="採購人員">
        <el-input placeholder="搜尋採購人員" v-model="searchOrderId" />
      </DtxInputGroup>
      <DtxInputGroup prepend="訂單狀態">
        <el-input placeholder="搜尋訂單狀態" v-model="searchOrderId" />
      </DtxInputGroup>
    </nav>

    <header class="my-title relative dtc-grid-grumanagement-header dtc-grid-header dtc-grid-header__divs dtc-template-columns mx-1">
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
      class="dtc-grid-header dtc-grid-body dtc-template-columns text-black ml-1 mx-1"
      v-for="(item, k) in list"
      :key="k"
      :style="k % 2 == 0 ? 'background-color: white;' : 'background-color: #F2F7FF;'"
    >
      <div class="flex flex-none space-x-2">
        <Button label="採購單明細" class="p-button-sm" @click="editItem(item)" />
      </div>

      <div>{{ item.chDrgPurchaseId || "暫無資料" }}</div>
      <div>{{ "暫無資料" }}</div>
      <div>{{ item.status || "暫無資料" }}</div>
      <div>{{ item.chDrgPurchasePerson || "暫無資料" }}</div>
      <div>{{ item.intDrugApplyNum || "暫無資料" }}</div>
    </main>
    <!-- 分頁 -->
    <pagination v-show="total > 0" :total="total" v-model:page="listQuery.page" v-model:limit="listQuery.limit" @pagination="getList"></pagination>
  </section>
</template>

<script>
import { toRefs, ref, reactive, inject, computed } from "vue";
import Pagination from "cps/Pagination.vue";
import { useList } from "/@/hooks/useHis.js";
import { isEmpty } from "ramda";
import queryString from "qs";
import dayjs from "dayjs";
import { useRouter } from "vue-router";

let headers = [
  { name: "採購單號", key: "chDrgPurchaseId", sortDesc: null },
  { name: "採購日期", key: "tiDrgPurchaseDate", sortDesc: null },
  { name: "訂單狀態", key: "status", sortDesc: null },
  { name: "申請人員", key: "chDrgPurchasePerson", sortDesc: null },
  { name: "轉單類別", key: "intDrugApplyNum", sortDesc: null },
];

export default {
  name: "inquerylistdtdee03383773",
  components: {
    Pagination,
  },
  setup() {
    const global = inject("global");
    const router = useRouter();
    const searchOrderId = ref("");
    const searchOrderPerson = ref("");
    const searchStatus = ref("");
    const time1 = ref("");
    const time2 = ref("");

    //Options
    const caseClosedOptions = reactive([
      {
        value: null,
        text: "全部",
      },
      { value: "closed", text: "已結案" },
      { value: "unclosed", text: "未結案" },
    ]);

    // 列表數據
    headers = ref(headers);
    const { state, getList, sort, clearFilters, removeItem, getItemDetail, twTime } = useList("drg-warehouse-order-adds");

    const cleanFilter = () => {
      searchOrderId.value = searchOrderPerson.value = searchStatus.value = time1.value = time2.value = "";
      clearFilters();
    };
    const search = () => {
      let filters = {};
      let s,
        e,
        dateQuery = "";
      if (time1.value && time2.value) {
        s = dayjs(time1.value).format("YYYY-MM-DDT00:00:00");
        e = dayjs(time2.value).format("YYYY-MM-DDT23:59:59");
        dateQuery = queryString.stringify({
          _where: [{ tiDrgPurchaseDate_gte: s }, { tiDrgPurchaseDate_lt: e }],
        });
      }
      if (searchOrderId.value) {
        filters.chDrgPurchaseId_contains = searchOrderId.value;
      }
      if (searchOrderPerson.value) {
        filters.chDrgPurchasePerson_contains = searchOrderPerson.value;
      }
      filters = isEmpty(filters) ? "" : "&" + queryString.stringify(filters);
      state.listQuery.filter = dateQuery + filters;
      getList();
    };
    const editItem = async (item) => {
      const detail = await getItemDetail(item);
      global.editItem = { ...detail };
      router.push("/pharmacy/modifyDrgWarehousePOrder");
    };

    return {
      ...toRefs(state),
      getList,
      headers,
      searchOrderId,
      searchOrderPerson,
      searchStatus,
      time1,
      time2,
      caseClosedOptions,
      sort,
      clearFilters,
      removeItem,
      getItemDetail,
      search,
      twTime,
      cleanFilter,
      editItem,
    };
  },
  mounted() {
    this.$primevue.config.locale = primeVueDateFormat;
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  width: calc(100vw - 162px) !important;
  max-width: calc(100vw - 162px) !important;
  // grid-template-columns: 100px 120px 150px repeat(9, minmax(90px, 1fr));
  grid-template-columns: 100px repeat(4, 180px) 1fr;
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
