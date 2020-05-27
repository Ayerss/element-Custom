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
    refreshType: {
      type: String,
      default: 'search',
      validator: function (v) {
        return ['refresh', 'search', 'reset', 'none'].includes(v)
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
    refreshType: {
      immediate: true,
      handler(type) {
        if (['refresh', 'search', 'reset'].includes(type)) {
          if (type === 'search') {
            this.search()
          } else if (type === 'refresh') {
            this.searchData()
          } else if (type === 'reset') {
            this.reset()
          }
          setTimeout(() => {
            this.$emit('update:refreshType', 'none')
          }, 100)
        }
      }
    },
  },
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      total: 10,
      pageSize: 10,
      tableData: [],
      searchParams: {},
      originalParams: null
    }
  },
  methods: {
    searchData() {
      const params = Object.assign(this.isPag ? {
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      } : {}, this.searchParams)

      this.isLoading = true
      this.requestFn(params)
        .then(res => {
          this.tableData = res.items || []
          // this.$emit('change', res.items, res)
          this.total = res.total || 0
        })
        .catch(() => {
          this.tableData = []
          this.total = 0
        })
        .finally(() => {
          this.isLoading = false
          this.$emit('update:params', JSON.parse(JSON.stringify(this.searchParams)))
        })
    },
    search() {
      this.currentPage = 1
      this.searchParams = JSON.parse(JSON.stringify(this.params))
      this.searchData()
    },
    reset () {
      this.currentPage = 1
      this.searchParams = JSON.parse(JSON.stringify(this.originalParams))
      this.searchData()
    }
  },
  created() {
    if (this.originalParams === null) {
      this.originalParams = JSON.parse(JSON.stringify(this.params))
    }
  }
}
</script>
