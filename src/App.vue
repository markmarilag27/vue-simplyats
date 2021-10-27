<template>
  <div
    v-if="!isAuthenticated"
    class="bg-gray-100 h-auto min-h-screen flex justify-center items-center"
  >
    <router-view />
    <!-- end router view -->
  </div>
  <!-- end login page -->
  <DashboardLayout v-else>
    <Notification />
    <!-- end notification -->
    <router-view />
    <!-- end router view -->
  </DashboardLayout>
  <!-- end dashboard layout -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getAuthUserData } from './api/auth'
import Notification from '@/components/Notification/Notification.vue'
import DashboardLayout from '@/components/Layouts/DashboardLayout.vue'

export default {
  name: 'App',

  components: {
    DashboardLayout,
    Notification
  },

  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },

  watch: {
    $route: 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapMutations({
      setAuthUser: 'auth/SET_AUTH_USER'
    }),
    fetchData () {
      if (this.isAuthenticated) {
        getAuthUserData().then(({data}) => {
          // clone data
          const payload = { user: data }
          this.setAuthUser(payload)
        })
      }
    }
  }
}
</script>
