<template>
  <button
    type="button"
    v-on="$listeners"
    :class="className"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    className: {
      type: String,
      default: 'py-2 px-6 w-full rounded font-bold'
    }
  }
}
</script>
