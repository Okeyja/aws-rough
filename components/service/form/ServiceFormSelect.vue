<template>
  <div class="form-select">
    <select
      @change="e => update({ serviceKey, index, columnKey, value: e.target.value })"
      :aria-label="label"
      :data-test="columnKey"
      :value="value"
    >
      <option
        v-for="option in options"
        :key="`select-${option}`"
        :value="option"
      >{{ option }}</option>
    </select>
  </div>
</template>

<script>
import serviceConfig from '@/config/service'
import { getDefaultColumnValue } from '@/lib/service'

export default {
  name: 'ServiceFormSelect',
  props: {
    serviceKey: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    columnKey: {
      type: String,
      required: true
    },
    value: {
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  watch: {
    options(newOptions, oldOptions) {
      if (JSON.stringify(newOptions) === JSON.stringify(oldOptions)) {
        return
      }

      if (newOptions.indexOf(this.value) === -1) {
        this.$store.commit('UPDATE', {
          serviceKey: this.serviceKey,
          index: this.index,
          columnKey: this.columnKey,
          value: getDefaultColumnValue(this.serviceKey, this.columnKey, serviceConfig)
        })
      }
    }
  },
  methods: {
    update(params) {
      this.$store.commit('UPDATE', params)
    }
  }
}
</script>
