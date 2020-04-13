<template>
  <section>
    <section v-loading="isLoading">
      <slot :data="tableData"></slot>
    </section>
    <div v-if="isPag" style="margin-top: 30px">
      <el-pagination
        @size-change="searchData"
        @current-change="searchData"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        background>
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomPagination',
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    isRequest: {
      type: Boolean,
      default: true
    },
    refreshType: {
      type: String,
      default: 'none',
      validator: function (v) {
        return ['refresh', 'search', 'none'].includes(v)
      }
    },
    isPag: {
      type: Boolean,
      default: true
    },
    requestFn: {
      type: Function,
      default: () => Promise.resolve()
    }
  },
  watch: {
    refreshType(type) {
      if (['refresh', 'search'].includes(type)) {
        if (type === 'refresh') {
          this.searchData()
        } else {
          this.search()
        }
        this.$emit('update:refreshType', 'none')
      }
    }
  },
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      total: 10,
      pageSize: 10,
      tableData: [],
      searchParams: {}
    }
  },
  methods: {
    searchData() {
      let params = Object.assign(this.isPag ? {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      } : {}, this.searchParams)

      this.isLoading = true
      this.requestFn(params).then(res => {
        this.tableData = res.items
        // this.$emit('change', res.items, res)
        this.total = res.total
      }).finally(() => {
        this.isLoading = false
        this.$emit('update:params', JSON.parse(JSON.stringify(this.searchParams)))
      })
    },
    search() {
      this.currentPage = 1
      this.searchParams = JSON.parse(JSON.stringify(this.params))
      this.searchData()
    }
  },
  created() {
    if (this.refreshType === 'none') {
      this.isRequest && this.search()
    } else {
      this.search()
      this.$emit('update:refreshType', 'none')
    }
  }
}
</script>
