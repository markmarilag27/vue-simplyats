<template>
  <div class="relative">
    <nav
      ref="nav"
      class="fixed bg-white top-0 left-0 right-0 px-4 py-4 md:px-8 flex flex-wrap justify-between items-center"
    >
      <slot name="header" />
    </nav>
    <!-- end page top navigation -->
    <div
      class="px-4 md:px-8 w-full block relative"
      :style="contentStyle"
    >
      <slot name="content" />
    </div>
    <!-- end page content -->
  </div>
  <!-- end page layout -->
</template>

<script>
export default {
  name: 'PageLayout',

  data () {
    return {
      navHeight: null
    }
  },

  computed: {
    contentStyle () {
      return {
        'margin-top': `${this.navHeight + 32}px`
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.navHeight = this.$refs.nav.offsetHeight
    })
  }
}
</script>

<style scoped>
.fixed {
  margin-left: var(--sidebar-width);
  z-index: 1024;
}
</style>
