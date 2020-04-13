import { storiesOf } from '@storybook/vue';

import Vue from 'vue';
import { Pagination, Loading, Input, Button } from 'element-ui';

import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/pagination.css';
import 'element-ui/lib/theme-chalk/loading.css';

import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/button.css';

import CustomPagination from './CustomPagination.vue';

Vue.use(Loading.directive);
Vue.component(Pagination.name, Pagination);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);


storiesOf('CustomPagination', module)
  .add('default', () => ({
    components: {
      CustomPagination,
    },
    data() {
      return {
        refreshType: 'none'
      }
    },
    methods: {
      requestFn(params) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve({
              total: 43,
              items: Array(10).fill(params)
            })
          }, 1000)
        })
      }
    },
    template: `
      <custom-pagination :refresh-type.sync="refreshType" :request-fn="requestFn">
        <template v-slot="{data}">
          <pre style="background-color: black;color: white;padding: 20px;max-height: 300px;overflow: auto">{{ JSON.stringify(data, null, 2) }}</pre>
        </template>
      </custom-pagination>
    `,
  }))
  .add('search', () => ({
    components: {
      CustomPagination,
    },
    data() {
      return {
        refreshType: 'none',
        searchForm: {
          name: '',
        }
      }
    },
    methods: {
      requestFn(params) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve({
              total: 43,
              items: Array(10).fill(params)
            })
          }, 1000)
        })
      }
    },
    template: `
        <div>
          <div style="display: flex">
            <el-input v-model="searchForm.name" placeholder="Name" style="width: 200px"></el-input>
            <el-button @click="refreshType = 'search'" type="primary"  style="margin: 0 5px 0 10px">Search</el-button>
            <el-button @click="refreshType = 'refresh'" >Refresh</el-button>
          </div>

          <custom-pagination :refresh-type.sync="refreshType" :params.sync="searchForm" :request-fn="requestFn">
            <template v-slot="{data}">
              <pre style="background-color: black;color: white;padding: 20px;max-height: 300px;overflow: auto">{{ JSON.stringify(data, null, 2) }}</pre>
            </template>
          </custom-pagination>
        </div>
    `,
  }))
