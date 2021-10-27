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
        target="_self"
        class="text-blue-500"
        download
      >
        Download
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
    <td class="text-right border-b my-3 py-3 align-middle">
      actions
    </td>
    <!-- end table data -->
  </tr>
</template>

<script>

export default {
  name: 'ApplicantTableRow',

  props: {
    applicant: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
