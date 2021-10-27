<template>
  <PageLayout>
    <template #header>
      <div class="text-2xl font-semibold flex-grow">
        Applicants
      </div>
      <!-- end title -->
      <div class="flex-grow max-w-xs">
        <BaseInput
          v-model="search"
          type="text"
          placeholder="Type in applicant name..."
        />
        <!-- end search -->
      </div>
    </template>
    <!-- end top navigation -->
    <template #content>
      Foo
    </template>
    <!-- end content -->
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/Layouts/PageLayout.vue'
import BaseInput from '@/components/Base/BaseInput.vue'

export default {
  name: 'Applicant',

  components: {
    PageLayout,
    BaseInput
  },

  data () {
    return {
      search: ''
    }
  }
}
</script>
