<template>
  <div
    v-if="!isAuthenticated"
    id="app"
    class="bg-gray-100 h-auto min-h-screen flex justify-center items-center"
  >
    <router-view />
    <!-- end router view -->
  </div>
  <!-- end login page -->
  <div
    v-else
    id="app"
  >
    <TopNavigation />
    <!-- end top navigation -->
    <Notification />
    <!-- end notification -->
    <router-view class="max-w-screen-sm mx-auto px-4 py-8" />
    <!-- end router view -->
  </div>
  <!-- end authenticated -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getAuthUserData } from './api/auth'
import TopNavigation from '@/components/TopNavigation.vue'
import Notification from '@/components/Notification/Notification.vue'

export default {
  name: 'App',

  components: {
    TopNavigation,
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
