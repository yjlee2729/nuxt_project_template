<template>
  <div class="wrapper">
    <side-bar> </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content class="main-contents p-lg">
      </dashboard-content>

      <!-- <content-footer></content-footer> -->
    </div>
  </div>
</template>
<script>
  import TopNavbar from '~/components/TopNavbar.vue'
  import ContentFooter from '~/components/ContentFooter.vue'
  import DashboardContent from '~/components/Content.vue'
  import SideBar from '~/components/Sidebar.vue'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      SideBar
    }
  }

</script>
<style lang="scss">

</style>