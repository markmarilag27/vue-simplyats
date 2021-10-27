<template>
  <div
    id="dashboard-layout"
    class="flex"
  >
    <Sidebar ref="sidebar" />
    <!-- end sidebar -->
    <div
      class="content"
      :style="contentStyle"
    >
      <slot />
      <!-- end slot -->
    </div>
    <!-- end content -->
  </div>
  <!-- end dashboard layout -->
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'DashboardLayout',

  components: {
    Sidebar
  },

  data() {
    return {
      sidebarWidth: null
    }
  },

  computed: {
    contentStyle () {
      return {
        '--sidebar-width': `${this.sidebarWidth}px`
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', () => (this.setSidebarWidth()))
      this.setSidebarWidth()
    })
  },

  destroyed () {
    window.removeEventListener('resize', () => {
      this.sidebarWidth = null
    })
  },

  methods: {
    setSidebarWidth () {
      this.$nextTick(() => {
        this.sidebarWidth = this.$refs.sidebar.$el.offsetWidth
      })
    }
  }
}
</script>

<style scoped>
.content {
  margin-left: var(--sidebar-width);
  color: rgba(0, 0, 0, 0.65);
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
