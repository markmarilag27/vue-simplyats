<template>
  <BaseButton
    @click="$emit('fetch')"
    class-name="w-auto"
    :disabled="isLoading"
  >
    <span class="flex justify-center px-16 py-3 rounded outline-none bg-gray-500 items-center font-bold text-white">
      <SVGAnimateSpin v-if="isLoading" />
      <span :class="{ 'ml-3': isLoading }">
        {{ isLoading ? 'Fetching data...' : 'Load more' }}
      </span>
    </span>
  </BaseButton>
</template>

<script>
import BaseButton from '@/components/Base/BaseButton.vue'
import SVGAnimateSpin from './SVG/SVGAnimateSpin.vue'

export default {
  name: 'ButtonLoadMore',

  components: {
    BaseButton,
    SVGAnimateSpin
  },

  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
