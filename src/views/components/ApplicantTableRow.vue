<template>
  <tr>
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      {{ applicant.name }}
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      {{ applicant.location }}
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      <a
        v-if="applicant.cv"
        :href="applicant.cv.url"
        target="_blank"
        class="text-blue-500"
        download
      >
        Browse
      </a>
      <span v-else>Not Available</span>
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      {{ applicant.job.title }}
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      {{ applicant.created_at_from_now }}
    </td>
    <!-- end table data -->
    <td class="border-b my-3 py-3 align-middle">
      <div class="flex justify-end gap-4">
        <ApplicantActionModal
          :uuid="applicant.uuid"
          :approve="true"
          @update-applicant-table-row="$emit('update-applicant', $event)"
        />
        <!-- end applicant action -->
        <ApplicantActionModal
          :uuid="applicant.uuid"
          :approve="false"
          @update-applicant-table-row="$emit('update-applicant', $event)"
        />
      <!-- end applicant action -->
      </div>
    </td>
    <!-- end table data -->
  </tr>
</template>

<script>
import ApplicantActionModal from './ApplicantActionModal.vue'

export default {
  name: 'ApplicantTableRow',

  components: {
    ApplicantActionModal
  },

  props: {
    applicant: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
