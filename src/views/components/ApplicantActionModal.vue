<template>
  <div class="relative">
    <BaseButton
      @click="isActive = !isActive"
      :class-name="className"
      :disabled="isActive"
    >
      {{ approve ? 'Approve' : 'Reject' }}
    </BaseButton>
    <!-- end base button -->
    <BaseModalForm
      v-model="isActive"
      :title="title"
      :on-submit="onSubmit"
    >
      <template #modal-body>
        <p class="text-gray-500 mb-6 mt-4 tracking-wider">
          We will be sending the {{ approve ? 'approve' : 'reject' }} email notification so that the applied applicant is aware of your action.
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
            <span v-else>{{ approve ? 'Approve' : 'Reject' }}</span>
          </span>
        </BaseButton>
      </template>
    </BaseModalForm>
    <!-- end base modal form -->
  </div>
</template>

<script>
import { postApplicantAction } from '@/api/applicant'
import { mapActions } from 'vuex'
import BaseButton from '@/components/Base/BaseButton.vue'
import BaseModalForm from '@/components/Base/BaseModalForm.vue'
import SVGAnimateSpin from '@/components/SVG/SVGAnimateSpin.vue'

export default {
  name: 'ApplicantActionModal',

  components: {
    BaseButton,
    BaseModalForm,
    SVGAnimateSpin
  },

  props: {
    uuid: {
      type: String,
      default: ''
    },
    approve: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isActive: false,
      isLoading: false
    }
  },

  computed: {
    className () {
      return this.approve ? 'border-2 border-green-400 bg-green-400 font-bold py-2 px-6 rounded text-xs text-white'
      : 'border-2 border-red-400 bg-red-400 font-bold py-2 px-6 rounded text-xs text-white'
    },
    title () {
      return this.approve ? 'Approve Applicant' : 'Reject Applicant'
    }
  },

  methods: {
    ...mapActions({
      pushNotification: 'ui/pushNotification'
    }),
    onSubmit () {
      this.isLoading = true

      const status = this.approve ? 'approve' : 'reject'

      const message = {
        type: this.approve ? 'success' : 'danger',
        message: `The applicant will be notified as you ${status} its application.`
      }

      postApplicantAction(this.uuid, { status })
        .then(({ data }) => {
          this.isActive = false
          this.$nextTick(() => {
            this.$emit('update-applicant-table-row', data)
            this.pushNotification(message)
          })
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
