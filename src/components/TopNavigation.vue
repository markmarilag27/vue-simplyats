<template>
  <nav class="bg-black fixed top-0 left-0 right-0 flex justify-between py-3 px-4">
    <h1 class="font-bold text-white">
      <router-link to="/">
        SimpleATS
      </router-link>
    </h1>
    <!-- end title -->
    <div class="flex items-center gap-4">
      <form @submit.prevent="onSubmit">
        <BaseButton
          type="submit"
          class="py-1 text-white"
          :disabled="isLoading"
        >
          <span class="flex justify-center items-center">
            <SVGAnimateSpin v-if="isLoading" />
            <span :class="{ 'ml-3': isLoading }">Logout</span>
          </span>
        </BaseButton>
      </form>
      <!-- end form -->
    </div>
  </nav>
  <!-- end navigation -->
</template>

<script>
import { postLogout } from '@/api/auth'
import { mapActions } from 'vuex'
import BaseButton from './Base/BaseButton.vue'
import SVGAnimateSpin from './SVG/SVGAnimateSpin.vue'

export default {
  name: 'TopNavigation',

  components: {
    BaseButton,
    SVGAnimateSpin
  },

  data: () => ({
    isLoading: false
  }),

  methods: {
    ...mapActions({
      resetAuthUser: 'auth/resetAuthUser'
    }),
    onSubmit () {
      this.isLoading = true

      postLogout()
        .then(() => {
          this.resetAuthUser()
          this.$nextTick(() => {
            this.$router.push({ name: 'login' })
          })
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style scoped>
.fixed {
  z-index: 1023;
}
</style>
