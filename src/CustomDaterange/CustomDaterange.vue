<template>
  <el-date-picker
    v-model="val"
    @change="dateChange"
    :type="type"
    :value-format="format"
    :format="format"
    :default-time="['00:00:00', '23:59:59']"
    range-separator="~"
    start-placeholder="开始日期"
    end-placeholder="结束日期">
  </el-date-picker>
</template>

<script>
export default {
  name: 'CustomDaterange',
  props: {
    type: {
      type: String,
      default: 'datetimerange'
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm'
    },
    startTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      val: Array(2).fill('')
    }
  },
  watch: {
    startTime () {
      this.val = [this.startTime, this.endTime]
    }
  },
  methods: {
    dateChange (e) {
      const d = Array.isArray(e) ? e : ['', '']
      this.$emit('update:startTime', d[0])
      this.$emit('update:endTime', d[1])
    }
  },
  created () {
    if (this.startTime || this.endTime) {
      this.val = [this.startTime, this.endTime]
    }
  }
}
</script>
