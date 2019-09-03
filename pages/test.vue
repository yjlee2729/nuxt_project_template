<template>
  <div>
    <div>
      <!-- <logo /> -->
      <h1 class="title">
        {{test}}
      </h1>
      <h2 class="subtitle">
        template test
      </h2>
      
      <b-button @click="excelDownload()">download from server</b-button>
      <b-button variant="danger">button</b-button>
      <b-button variant="success">Button</b-button>
      <b-button variant="outline-primary">Button</b-button>
      <!-- <pulse-loader :loading="true" :color="'blue'"></pulse-loader> -->
      <div class="links">     
        <loading :can-cancel="true" :active.sync="isLoading" :is-full-page="false"></loading> 
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <div class="m-sm">
        <input type='text' v-model="test"/>
      </div>
      <div>
        <button value="temp" @click="getClickTest($event)">eventTest</button>
        <button value="temp" @click="getChangeData()">dataChangeTest</button>
      </div>
      <div>
        {{ res }}
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import _ from 'lodash'
import $ from 'jquery'
import { saveAs } from 'file-saver'
import PulseLoader from '~/components/Spinner/PulseLoader.vue'
import Loading from 'vue-loading-overlay'
import config from '~/server/config/url.js'

export default {
  components: { // 현재 template에 추가해서 사용하는 component
    Logo,
    PulseLoader,
    Loading
  },
  layout: 'DefaultLayout',
  data(){
    return {
      test : 'NUXT test project',
      isLoading : false
    }
  },
  async asyncData({ app, query }) {
    // rendering 전에 가지고올 데이터
    try{
      const res = await app.$axios.$get('/api/login');
      console.log(config);
      return { res }
    }catch(err){
      console.log(err)
    }
  },
  methods : {
    getClickTest : function(e){
      this.res = e.target.value;
    },
    getChangeData : async function(){
      const tempInfo = await this.$axios.$get('/api/login');
      _.forEach(tempInfo, (info)=>{
          if (info.chatbot_id == '1a417a7c-5f98-436c-90be-c8f66eb7eee8'){
              this.res = info;
          }
      })
    },
    excelDownload : async function(){
      this.isLoading = true;
      var filename = 'test.xlsx';
      var request_param = {
        url : '/api/statistics/excelDownload',
        method: 'POST',
        responseType: 'blob',
        data: {
          filename : filename,
          rows : this.res
        }
      }
      var result = await this.$axios(request_param);//url , data, config
      var blob = new Blob([result.data], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
      saveAs(blob, filename);
      this.isLoading = false;
    }
  }
}
</script>

<style>
.container {
  margin: 50px auto 0px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
