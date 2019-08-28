<template>
  <div class="sidebar"
       :style="sidebarStyle"
       :data-color="backgroundColor"
       :data-image="backgroundImage">
    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="#" class="simple-text logo__container">
            <div class="logo-img">
                <img src="img/vue-logo.png" alt="">
            </div>
          {{title}}
        </a>
      </div>
      <slot name="content"></slot>
      <ul class="nav nav-main__links">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <li v-for="(link, index) in sidebarLinks" :key="link.name + index">
          <n-link class="nav-link" :to="{path: link.path}">
            <i v-if="link.icon" :class="link.icon"></i>
            <p>{{link.name}}</p>
          </n-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'LG CNS'
      },
      backgroundColor: {
        type: String,
        default: 'black',
        validator: (value) => {
          let acceptedValues = ['', 'blue', 'azure', 'green', 'orange', 'red', 'purple', 'black']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      backgroundImage: {
        type: String,
        default: 'img/sidebar-5.jpg'
      },
      activeColor: {
        type: String,
        default: 'success',
        validator: (value) => {
          let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      autoClose: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        sidebarLinks: [{
            name : 'home',
            icon : 'nc-icon nc-alien-33',
            path : '/'
          }
        ]
      }
    },
    provide () {
      return {
        autoClose: this.autoClose
      }
    },
    computed: {
      sidebarStyle () {
        return {
          backgroundImage: `url(${this.backgroundImage})`
        }
      }
    }
  }

</script>
<style>
  .sidebar .sidebar-wrapper {
    display: flex;
    flex-direction: column;
  }
  .sidebar .nav-main__links {
    flex: 1;
  }
  .sidebar .sidebar-wrapper .logo .logo__container {
    padding-left: 10px;
  }
</style>
