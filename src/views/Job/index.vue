<template>
  <PageLayout v-if="$route.name === 'jobs'">
    <template #header>
      <div class="text-2xl font-semibold flex-grow">
        Jobs
      </div>
      <!-- end title -->
      <div class="flex-grow flex xl:flex-nowrap flex-wrap gap-4 items-center max-w-xl">
        <BaseInput
          v-model="search"
          type="text"
          placeholder="Type in job title..."
          class="flex-auto"
        />
        <!-- end search -->
        <BaseButton
          @click="routeToCreateJob"
          class-name="w-64 bg-gray-500 text-white py-3 px-4 rounded font-medium"
        >
          Create a new job
        </BaseButton>
        <!-- end create a new job button -->
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
      <div v-else>
        <JobTable>
          <tr v-if="list.length === 0">
            <td colspan="10">
              <NoDataFound class="text-center my-16" />
              <!-- end no data found -->
            </td>
          </tr>
          <!-- end no data -->
          <template v-else>
            <JobTableRow
              v-for="job in list"
              :key="job.uuid"
              :job="job"
            />
            <!-- end applicant table row -->
          </template>
        </JobTable>
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
  <!-- end index jobs page -->
  <router-view v-else />
  <!-- end child page -->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import debounce from 'lodash.debounce'
import { getJobs } from '@/api/job'
import PageLayout from '@/components/Layouts/PageLayout.vue'
import BaseInput from '@/components/Base/BaseInput.vue'
import ButtonLoadMore from '@/components/ButtonLoadMore.vue'
import LoadingRow from '@/components/Loading/LoadingRow.vue'
import JobTable from './components/JobTable.vue'
import JobTableRow from './components/JobTableRow.vue'
import NoDataFound from '@/components/NoDataFound.vue'
import BaseButton from '@/components/Base/BaseButton.vue'

export default {
  name: 'Job',

  components: {
    PageLayout,
    BaseInput,
    ButtonLoadMore,
    LoadingRow,
    JobTable,
    JobTableRow,
    NoDataFound,
    BaseButton
  },

  computed: {
    ...mapState({
      isLoading: state => state.job.isLoading,
      list: state => state.job.list,
      links: state => state.job.links,
      meta: state => state.job.meta,
      errors: state => state.job.errors,
      filter: state => state.job.filter
    }),
    ...mapGetters({
      querySearchParams: 'job/querySearchParams'
    }),
    search: {
      get () {
        return this.filter.title
      },
      set: debounce (function (value) {
        const cloneFilter = {...this.filter}
        const newFilter = {...cloneFilter, title: value}
        this.setFilter(newFilter)
      }, 500)
    }
  },

  watch: {
    'filter.title' () {
      this.loadMore(true)
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions({
      setJob: 'job/setJob',
      setFilter: 'job/setFilter',
      setErrors: 'job/setErrors',
      setLoading: 'job/setLoading',
    }),
    fetchData (isSearch) {
      this.setErrors({})
      this.setLoading(true)

      getJobs(this.querySearchParams)
        .then((response) => {
          if (isSearch) {
            response = {...response, isSearch: true}
          }
          this.setJob(response)
        })
        .catch((error) => (this.errors = error?.response?.data))
        .finally(() => (this.setLoading(false)))
    },
    loadMore: debounce(function (isSearch) {
      if (isSearch) {
        const cloneFilter = {...this.filter}
        const newFilter = {...cloneFilter, page: 1}
        this.setFilter(newFilter)
      } else {
        const cloneFilter = {...this.filter}
        const newFilter = {...cloneFilter, page: (cloneFilter.page += 1)}
        this.setFilter(newFilter)
      }
      this.fetchData(isSearch)
    }, 500),
    routeToCreateJob () {
      this.$router.push({ name: 'jobs.create' })
    }
  }
}
</script>
