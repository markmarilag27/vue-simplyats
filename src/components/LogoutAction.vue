<template>
  <form @submit.prevent="onSubmit">
    <BaseButton
      type="submit"
      class-name="p-0 my-1 w-full"
      :disabled="isLoading"
    >
      <span class="flex justify-center px-4 py-1 rounded outline-none bg-gray-500 items-center text-white">
        <SVGAnimateSpin v-if="isLoading" />
        <span :class="{ 'ml-3': isLoading }">Logout</span>
      </span>
    </BaseButton>
  </form>
  <!-- end form -->
</template>

<script>
import { postLogout } from '@/api/auth'
import { mapActions } from 'vuex'
import BaseButton from './Base/BaseButton.vue'
import SVGAnimateSpin from './SVG/SVGAnimateSpin.vue'

export default {
  name: 'LogoutAction',

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
