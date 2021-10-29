<template>
  <div class="relative">
    <BaseButton
      @click="isActive = !isActive"
      class-name="border-2 border-red-400 bg-red-400 font-bold py-2 px-6 rounded text-xs text-white"
      :disabled="isActive"
    >
      Delete
    </BaseButton>
    <!-- end base button -->
    <BaseModalForm
      v-model="isActive"
      title="Delete Job"
      :on-submit="onSubmit"
    >
      <template #modal-body>
        <p class="text-gray-500 mb-6 mt-4 tracking-wider">
          Are you sure to delete this job? this action cannot be undone once this action is performed.
        </p>
      </template>
      <!-- end modal body -->
      <template #modal-footer>
        <BaseButton
          type="submit"
          class-name="w-auto bg-gray-500 text-white px-8 py-2 rounded"
          :disabled="isLoading"
        >
          <span class="flex justify-center items-center">
            <SVGAnimateSpin v-if="isLoading" />
            <span v-else>Delete</span>
          </span>
        </BaseButton>
      </template>
    </BaseModalForm>
    <!-- end base modal form -->
  </div>
</template>

<script>
import { deleteJob } from '@/api/job'
import { mapActions } from 'vuex'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseModalForm from '@/components/Base/BaseModalForm.vue'
import SVGAnimateSpin from '@/components/SVG/SVGAnimateSpin.vue'

export default {
  name: 'JobDeleteModal',

  components: {
    BaseButton,
    BaseModalForm,
    SVGAnimateSpin
  },

  props: {
    job: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      isActive: false,
      isLoading: false
    }
  },

  methods: {
    ...mapActions({
      pushNotification: 'ui/pushNotification',
      jobDeleted: 'job/deleteJob'
    }),
    onSubmit () {
      this.isLoading = true

      deleteJob(this.job.uuid)
        .then(() => {
          this.isActive = false
          const message = {
            type: 'danger',
            message: `The ${this.job.title} has been deleted!`
          }
          this.pushNotification(message)
          this.$nextTick(() => {
            this.jobDeleted(this.job.uuid)
          })
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
