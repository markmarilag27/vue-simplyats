<template>
  <tr>
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      <div class="inline-block w-64 truncate">
        {{ job.title }}
      </div>
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle capitalize">
      {{ job.environment }}
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle capitalize">
      {{ job.type }}
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle capitalize">
      <span :class="statusColor"> {{ job.status }} </span>
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      <div class="inline-block w-36 truncate">
        {{ job.author.name }}
      </div>
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      {{ job.applicants_total }}
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      {{ job.created_at_from_now }}
    </td>
    <!-- end table data -->
    <td class="text-left text-gray-500 border-b my-3 py-3 align-middle">
      <div class="flex flex-wrap justify-end items-center">
        <BaseButton
          @click="routeToEditJob"
          class-name="border-2 border-blue-400 bg-blue-400 font-bold py-2 px-6 rounded text-xs text-white"
        >
          Edit
        </BaseButton>
        <!-- end edit button -->
      </div>
      <!-- end wrapper -->
    </td>
    <!-- end table data -->
  </tr>
</template>

<script>
import BaseButton from '@/components/Base/BaseButton.vue'

export default {
  name: 'JobTableRow',

  components: {
    BaseButton
  },

  props: {
    job: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    statusColor () {
      const status = this.job.status
      if (status === 'active') {
        return 'text-green-400'
      }

      if (status === 'pending') {
        return 'text-gray-400'
      }

      return 'text-red-400'
    }
  },

  methods: {
    routeToEditJob () {
      this.$router.push({
        name: 'jobs.edit',
        params: {
          uuid: this.job.uuid
        }
      })
    }
  }
}
</script>
