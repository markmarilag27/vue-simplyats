<template>
  <table class="table-auto w-full">
    <thead>
      <tr>
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Title
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Environment
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Type
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Status
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Author
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Applicants
        </th>
        <!-- end table head -->
        <th class="text-sm text-left text-gray-500 border-b mb-3 pb-3">
          Created At
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
  name: 'JobTable',
}
</script>
