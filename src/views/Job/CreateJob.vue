<template>
  <PageLayout>
    <template #header>
      <div class="text-2xl font-medium flex-grow">
        Create a new job
      </div>
      <!-- end title -->
    </template>
    <!-- end top navigation -->
    <template #content>
      <div class="block w-full">
        <JobForm :form-data="formMixin" />
        <!-- end job form -->
      </div>
    </template>
    <!-- end content -->
  </PageLayout>
</template>

<script>
import jobFormMixin from '@/mixins/job-form-mixin'
import PageLayout from '@/components/Layouts/PageLayout.vue'
import JobForm from './components/JobForm.vue'

export default {
  name: 'CreateJob',

  components: {
    PageLayout,
    JobForm
  },

  mixins: [jobFormMixin]
}
</script>
