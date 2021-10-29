<template>
  <div class="relative w-full my-2 py-2">
    <select
      v-model="selected"
      class="appearance-none bg-white w-full py-3 px-3 border-gray-600 rounded border-2 cursor-pointer"
      :class="[className, error ? 'border-red-500' : '', selected !== '' ? 'capitalize' : '']"
      v-bind="$attrs"
    >
      <option
        value=""
        :selected="value === ''"
        hidden
        disabled
      >
        {{ $attrs.placeholder }}
      </option>
      <!-- end empty -->
      <option
        v-for="(listItem, listIndex) in list"
        :key="listIndex"
        class="appearance-none capitalize bg-gray-500 text-white text-md"
        :disabled="setCondition(disableSelected, listItem)"
        :hidden="setCondition(hideSelected, listItem)"
        :value="setOption(listItem, objectValue)"
        v-text="setOption(listItem, objectText)"
      />
      <!-- end option -->
    </select>
    <!-- end select -->
    <div
      v-if="error"
      class="text-red-500 mt-2"
      v-text="error[0]"
    />
    <!-- end error -->
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',

  inheritAttrs: false,

  props: {
    value: {
      type: [String, Object],
      default: ''
    },
    className: {
      type: [String, undefined],
      default: undefined
    },
    error: {
      type: [Array, undefined],
      default: undefined
    },
    list: {
      type: Array,
      default: () => ({})
    },
    objectText: {
      type: String,
      default: ''
    },
    objectValue: {
      type: String,
      default: ''
    },
    hideSelected: {
      type: Boolean,
      default: false
    },
    disableSelected: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    selected: {
      get () {
        return this.value
      },
      set (value) {
        this.emitChange(value)
      }
    }
  },

  methods: {
    emitChange (event) {
      this.$emit('input', event)
      if (typeof this.error !== 'undefined') {
        this.$emit('clear')
      }
    },
    setOption (listItem, target) {
      if (typeof listItem === 'object') {
        return listItem[target]
      }
      return listItem
    },
    setCondition (conditionBy, listItem) {
      if (conditionBy) {
        if (typeof listItem === 'object') {
          return listItem[this.objectValue] === this.value[this.objectValue]
        }
        return listItem === this.value
      }
      return
    }
  }
}
</script>
