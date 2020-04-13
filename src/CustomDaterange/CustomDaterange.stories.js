import Vue from 'vue';
import { DatePicker, Button } from 'element-ui';

import 'element-ui/lib/theme-chalk/icon.css';
import 'element-ui/lib/theme-chalk/date-picker.css';
import 'element-ui/lib/theme-chalk/button.css';

import CustomDaterange from './CustomDaterange.vue';

Vue.component(DatePicker.name, DatePicker);
Vue.component(Button.name, Button);


export default {
  title: 'CustomDaterange',
};

export function toStorybook() {
  return {
    components: {
      CustomDaterange,
    },
    data() {
      return {
        search: {
          startTime: '',
          endTime: '',
        },
      }
    },
    template: `
        <div>
          <custom-daterange :start-time.sync="search.startTime" :end-time.sync="search.endTime"></custom-daterange>
          <pre style="background-color: black;color: white;padding: 20px">{{ JSON.stringify(search, null, 2) }}</pre>
        </div>
    `
  };
}

toStorybook.story = {
  name: 'default',
};
