<template>
  <PageLayout>
    <template #header>
      <div class="text-2xl font-semibold flex-grow">
        Applicants
      </div>
      <!-- end title -->
      <div class="flex-grow max-w-xs">
        <BaseInput
          v-model="filter.name"
          type="text"
          placeholder="Type in applicant name..."
        />
        <!-- end search -->
      </div>
    </template>
    <!-- end top navigation -->
    <template #content>
      <div
        v-if="isLoading"
        class="relative"
      >
        <LoadingRow
          v-for="i in 10"
          :key="i"
        />
        <!-- end loading row -->
      </div>
      <!-- end loading -->
      <!-- end -->
      <div v-else>
        <ApplicantTable>
          <tr v-if="list.length === 0">
            <td colspan="10">
              <NoDataFound class="text-center my-16" />
              <!-- end no data found -->
            </td>
          </tr>
          <!-- end no data -->
          <template v-else>
            <ApplicantTableRow
              v-for="applicant in list"
              :key="applicant.uuid"
              :applicant="applicant"
              @update-applicant="updateApplicant"
            />
            <!-- end applicant table row -->
          </template>
        </ApplicantTable>
        <!-- end table list -->
        <div class="flex justify-end items-center my-8">
          <ButtonLoadMore
            v-if="links.next"
            @fetch="loadMore"
            :is-loading="isLoading"
          />
          <!-- end button load more -->
        </div>
        <!-- end flex -->
      </div>
      <!-- end result -->
    </template>
    <!-- end content -->
  </PageLayout>
</template>

<script>
import debounce from 'lodash.debounce'
import { getApplicants } from '@/api/applicant'
import PageLayout from '@/components/Layouts/PageLayout.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import ApplicantTable from './components/ApplicantTable.vue'
import ApplicantTableRow from './components/ApplicantTableRow.vue'
import ButtonLoadMore from '@/components/ButtonLoadMore.vue'
import LoadingRow from '@/components/Loading/LoadingRow.vue'
import NoDataFound from '@/components/NoDataFound.vue'

export default {
  name: 'Applicant',

  components: {
    PageLayout,
    BaseInput,
    ApplicantTable,
    ApplicantTableRow,
    ButtonLoadMore,
    LoadingRow,
    NoDataFound
  },

  data () {
    return {
      isLoading: false,
      list: [],
      links: {},
      meta: {},
      errors: {},
      filter: {
        page: 1,
        per_page: 15,
        name: null,
        status: 'all',
        sort: 'desc'
      }
    }
  },

  computed: {
    querySearchParams () {
      const filter = Object.entries(this.filter).reduce((acc, [key, value]) => {
        if (value) {
          acc[key] = value
        }
        return acc
      }, {})
      return new URLSearchParams(filter)
    }
  },

  watch: {
    'filter.name' () {
      this.loadMore(true)
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData (isSearch) {
      this.errors = {}
      this.isLoading = true

      getApplicants(this.querySearchParams)
        .then((response) => {
          const clonedList = [...this.list]
          let list = []
          if (isSearch) {
            list = response.data
          } else {
            list = [...clonedList, ...response.data]
          }
          this.list = list
          this.links = response.links
          this.meta = response.meta
        })
        .catch((error) => (this.errors = error?.response?.data))
        .finally(() => (this.isLoading = false))
    },
    loadMore: debounce(function (isSearch) {
      if (isSearch) {
        this.filter.page = 1
      } else {
        this.filter.page++
      }
      this.fetchData(isSearch)
    }, 500),
    updateApplicant (event) {
      const clonedList = [...this.list]
      const newList = clonedList.filter(applicant => event.uuid !== applicant.uuid)
      this.list = newList
    }
  }
}
</script>
