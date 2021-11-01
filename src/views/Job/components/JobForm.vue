<template>
  <form
    @submit.prevent="onSubmit"
    class="block relative mb-16"
  >
    <div class="flex flex-wrap gap-8">
      <div
        ref="left_block"
        class="flex-grow xl:max-w-lg"
      >
        <div class="flex-grow w-full">
          <label
            for="title"
            class="font-medium text-gray-500"
          >
            Job Title
          </label>
          <!-- end label -->
          <BaseInput
            v-model="form.title"
            type="text"
            placeholder="Type in..."
            id="title"
            name="title"
            :error="errors.title"
            @clear="errors.title = undefined"
          />
          <!-- end title -->
        </div>
        <!-- end column -->
        <div class="flex-grow w-full">
          <label
            for="location"
            class="font-medium text-gray-500"
          >
            Job Location
          </label>
          <!-- end label -->
          <BaseInput
            v-model="form.location"
            type="text"
            placeholder="Type in..."
            id="location"
            name="location"
            :error="errors.location"
            @clear="errors.location = undefined"
          />
          <!-- end title -->
        </div>
        <!-- end column -->
        <div class="flex-grow w-full">
          <label
            for="location"
            class="font-medium text-gray-500"
          >
            Job Environment
          </label>
          <!-- end label -->
          <BaseSelect
            v-model="form.environment"
            :list="environmentListMixin"
            placeholder="Select job environment"
            id="environment"
            name="environment"
            :error="errors.environment"
            @clear="errors.environment = undefined"
          />
          <!-- end environment -->
        </div>
        <!-- end column -->
        <div class="flex-grow w-full">
          <label
            for="type"
            class="font-medium text-gray-500"
          >
            Job Type
          </label>
          <!-- end label -->
          <BaseSelect
            v-model="form.type"
            :list="typeListMixin"
            placeholder="Select job type"
            id="type"
            name="type"
            :error="errors.type"
            @clear="errors.type = undefined"
          />
          <!-- end type -->
        </div>
        <!-- end column -->
        <div class="flex-grow w-full">
          <label
            for="experience"
            class="font-medium text-gray-500"
          >
            Job Experience
          </label>
          <!-- end label -->
          <BaseSelect
            v-model="form.experience"
            :list="experienceListMixin"
            placeholder="Select job experience"
            id="experience"
            name="experience"
            :error="errors.experience"
            @clear="errors.experience = undefined"
          />
          <!-- end type -->
        </div>
        <!-- end column -->
        <div class="flex-grow w-full">
          <label
            for="status"
            class="font-medium text-gray-500"
          >
            Job Status
          </label>
          <!-- end label -->
          <BaseSelect
            v-model="form.status"
            :list="statusListMixin"
            placeholder="Select hiring status"
            id="status"
            name="satus"
            :error="errors.status"
            @clear="errors.status = undefined"
          />
          <!-- end type -->
        </div>
        <!-- end column -->
      </div>
      <!-- end left block -->
      <div class="flex-grow xl:max-w-4xl">
        <Tiptap
          v-model="form.description"
          label="Job Description"
          :initial-height="leftBlockHeight"
          :error="errors.description"
          @clear="errors.description= undefined"
        />
        <!-- end tiptap -->
        <BaseButton
          type="submit"
          :disabled="isLoading"
          class-name="bg-gray-500 text-white rounded w-full py-4 px-8 font-medium mt-4"
        >
          <span class="flex justify-center items-center">
            <SVGAnimateSpin v-if="isLoading" />
            <span :class="{ 'ml-3': isLoading }">
              {{ form.uuid ? 'Update' : 'Create a new job' }}
            </span>
          </span>
        </BaseButton>
        <!-- end button -->
      </div>
      <!-- end right block -->
    </div>
    <!-- end wrapper -->
  </form>
  <!-- end form -->
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import { createJob, updateJob } from '@/api/job'
import { mapActions } from 'vuex'
import jobSelectListMixin from '@/mixins/job-select-list-mixin'
import BaseInput from '@/components/Base/BaseInput.vue'
import BaseSelect from '@/components/Base/BaseSelect.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import SVGAnimateSpin from '@/components/SVG/SVGAnimateSpin.vue'
import Tiptap from '@/components/Tiptap/Tiptap.vue'

export default {
  name: 'JobForm',

  components: {
    BaseInput,
    BaseSelect,
    BaseButton,
    SVGAnimateSpin,
    Tiptap
  },

  mixins: [jobSelectListMixin],

  props: {
    formData: {
      type: Object,
      default: () => ({})
    },
  },

  data() {
    return {
      form: {},
      errors: {},
      isLoading: false,
      leftBlockHeight: null
    }
  },

  created () {
    this.init()
  },

  mounted () {
    this.leftBlockHeight = this.$refs.left_block.offsetHeight
  },

  beforeDestroy () {
    this.init()
  },

  methods: {
    ...mapActions({
      pushNotification: 'ui/pushNotification',
      setJob: 'job/setJob',
      updateJob: 'job/updateJob'
    }),
    init () {
      this.form = cloneDeep(this.formData)
    },
    onSubmit () {
      this.errors = {}
      this.isLoading = true

      let response = null

      if (this.form.uuid) {
        response = updateJob(this.form.uuid, this.form)
          .then(({ data }) => {
            const message = {
              type: 'success',
              message: `The ${data.title} job has been updated!`
            }
            this.pushNotification(message)
            this.$nextTick(() => {
              this.updateJob(data)
            })
          })
      } else {
        response = createJob(this.form)
        .then(({ data }) => {
          const message = {
            type: 'success',
            message: `The ${data.title} job has been created!`
          }
          this.pushNotification(message)
          this.$nextTick(() => {
            this.setJob(data)
            this.$router.push({ name: 'jobs' })
          })
        })
      }

      response.catch((error) => (this.errors = error.response?.data?.errors)).finally(() => (this.isLoading = false))
    }
  }
}
</script>
