<template>
  <nav class="navbar top-navbar navbar-expand-lg">
    <div class="container-fluid">
      <div class="navbar-brand">{{ routeName }}</div>
      <div class="collapse navbar-collapse justify-content-end">
        <!-- <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
            <div class="m-t-sm m-l-xs">
              <i class="nc-icon nc-palette"></i>
            </div>
          </li>
        </ul> -->
        <ul class="navbar-nav ml-auto">
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">
              Account
            </a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" @click="logout()">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import BaseDropdown from '~/components/BaseDropdown.vue'

  export default {
    components: {
      BaseDropdown
    },
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      async logout (){
        try {
          await this.$store.dispatch('logout')
          this.$router.push('/');
        } catch (e) {
          
        }
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      // toggleSidebar () {
      //   this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      // },
      // hideSidebar () {
      //   this.$sidebar.displaySidebar(false)
      // }
    }
  }
</script>
<style lang="scss">
.nav-item {
  a {
    cursor: pointer;
  }
}
</style>
