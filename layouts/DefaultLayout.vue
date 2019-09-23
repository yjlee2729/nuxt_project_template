<template>
  <div class="wrapper">
    <side-bar> </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>
      <div class="hidden">집에갈래... 흙흙흙... 침대밖은 위험해...</div>
      <dashboard-content class="main-contents p-md">
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
.main-panel {
  background-color:rgba(203, 203, 210, 0.1);
}



.hidden {
  position: fixed;
  font-size: 20px;
  top: 508px;
  left: 350px;
  color: rgba(0,0,0,0);
}

</style>