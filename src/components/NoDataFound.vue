<template>
  <div class="px-6 py-8 rounded">
    <h1 class="text-5xl font-bold mb-4">
      No Data has been found.
    </h1>
    <p class="text-xl tracking-wider">
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  name: 'NoDataFound'
}
</script>
