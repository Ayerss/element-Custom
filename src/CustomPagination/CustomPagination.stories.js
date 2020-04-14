import { storiesOf } from '@storybook/vue';

import Vue from 'vue';
import { Pagination, Loading, Input, Button, Dialog } from 'element-ui';
import ShowParams from '../ShowParams';

// case 1
import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/pagination.css';
import 'element-ui/lib/theme-chalk/loading.css';

// case 2
import 'element-ui/lib/theme-chalk/input.css';
import 'element-ui/lib/theme-chalk/button.css';

// case 3
import 'element-ui/lib/theme-chalk/dialog.css';

import CustomPagination from './CustomPagination.vue';

Vue.use(Loading.directive);
Vue.component(Pagination.name, Pagination);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Dialog.name, Dialog);
Vue.component(ShowParams.name, ShowParams);

// test Component
Vue.component('custom-pagination', CustomPagination);

storiesOf('CustomPagination', module)
  .add('default', () => ({
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
          <show-params>{{ JSON.stringify(data, null, 2) }}</show-params>
        </template>
      </custom-pagination>
    `,
  }))
  .add('search', () => ({
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
              <show-params>{{ JSON.stringify(data, null, 2) }}</show-params>
            </template>
          </custom-pagination>
        </div>
    `,
  }))
  .add('model', () => ({
    data() {
      return {
        dialogVisible: false,
        refreshType: 'none',
        searchForm: {
          id: ''
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
      },
      dialogShow() {
        this.refreshType = 'search';
        this.dialogVisible = true;
      }
    },
    template: `
      <div>
        <div style="display: flex">
          <el-input v-model="searchForm.id" placeholder="Id" style="width: 200px"></el-input>
          <el-button @click="dialogShow" type="primary">Dialog Show</el-button>
        </div>


        <el-dialog :visible.sync="dialogVisible">
          <custom-pagination :refresh-type.sync="refreshType" :params.sync="searchForm" :request-fn="requestFn">
            <template v-slot="{data}">
              <show-params>{{ JSON.stringify(data, null, 2) }}</show-params>
            </template>
          </custom-pagination>
        </el-dialog>
      </div>
    `
  }))
