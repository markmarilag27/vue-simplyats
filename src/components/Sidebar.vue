<template>
  <aside class="bg-gray-50 fixed top-0 left-0 bottom-0 min-h-screen h-full">
    <div class="p-8">
      <div class="truncate max-w-xs text-gray-500">
        Welcome,
        <span
          class="inline-block"
          v-text="user.name"
        />
      </div>
      <!-- end user name -->
      <div class="truncate text-gray-500">
        <span
          class="inline-block text-sm"
          v-text="user.email"
        />
      </div>
      <!-- end user email -->
      <LogoutAction />
      <!-- end logout action -->
    </div>
    <!-- end authenticated user -->
    <ul class="menu">
      <li
        v-for="(link, linkIndex) in links"
        :key="linkIndex"
        class="block"
      >
        <router-link
          :to="link.to"
          class="block py-3 px-8"
          :class="{ 'is-active': isActiveLink(link.name) }"
        >
          {{ link.text }}
        </router-link>
      </li>
    </ul>
    <!-- end menu -->
  </aside>
  <!-- end sidebar -->
</template>

<script>
import { mapState } from 'vuex'
import LogoutAction from './LogoutAction.vue'

export default {
  name: 'Sidebar',

  components: {
    LogoutAction
  },

  data() {
    return {
      links: [
        {
          text: 'Applicant',
          to: '/',
          name: 'home'
        },
        {
          text: 'Jobs',
          to: '/jobs',
          name: 'jobs'
        },
      ]
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },

  methods: {
    isActiveLink (name) {
      return this.$route?.name?.includes(name)
    }
  }
}
</script>

<style scoped>
.fixed {
  z-index: 1024;
  width: 100%;
  max-width: 17.5rem;
}
.menu > li > a {
  color: rgba(0, 0, 0, 0.45);
}
.menu > li > a:hover {
  color: rgba(0, 0, 0, 0.65);
}
.menu > li > a.is-active {
  color: rgba(0, 0, 0, 0.45);
  font-weight: 500;
  background-color: rgb(229, 231, 235);
}
@media only screen and (max-width: 767px) {
  .fixed {
    width: 0px;
    opacity: 0;
    z-index: -1;
  }
}
</style>
