<template>
  <table class="table-auto w-full">
    <thead>
      <tr>
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Name
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Location
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Download
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Job
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Applied At
        </th>
        <!-- end table head -->
        <th class="text-sm text-right text-gray-500 border-b mb-3 pb-3">
          Actions
        </th>
        <!-- end table head -->
      </tr>
      <!-- end table row -->
    </thead>
    <!-- end table head -->
    <tbody>
      <slot />
      <!-- end slot -->
    </tbody>
    <!-- end table body -->
  </table>
  <!-- end applicant table -->
</template>

<script>
export default {
  name: 'ApplicantTable',
}
</script>
