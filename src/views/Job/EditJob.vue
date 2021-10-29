<template>
  <PageLayout v-if="!isLoading">
    <template #header>
      <div class="text-2xl font-medium flex-grow">
        {{ job.title }}
      </div>
      <!-- end title -->
    </template>
    <!-- end top navigation -->
    <template
      v-if="cloneJob"
      #content
    >
      <div class="block w-full">
        <JobForm :form-data="job" />
        <!-- end job form -->
      </div>
    </template>
    <!-- end content -->
  </PageLayout>
</template>

<script>
import { showJob } from '@/api/job'
import PageLayout from '@/components/Layouts/PageLayout.vue'
import JobForm from './components/JobForm.vue'

export default {
  name: 'EditJob',

  components: {
    PageLayout,
    JobForm
  },

  data () {
    return {
      job: {},
      cloneJob: {},
      errors: {},
      isLoading: false
    }
  },

  watch: {
    '$route': 'fetchData'
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.errors = {}
      this.isLoading = true

      showJob(this.$route.params.uuid)
        .then(({ data }) => (this.job = data))
        .catch((error) => (this.errors = error?.response?.data))
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
