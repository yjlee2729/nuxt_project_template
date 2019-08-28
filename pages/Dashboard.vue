<template>
    <div class="content">
        <div class="container-fluid p-none">
            <div class="row">
                <div class="col-lg-12">
                    <card class="m-b-md">
                        <!-- <h6 slot="header" class="card-title">조회 조건</h6> -->
                        
                        <div class="row">
                            <div class="col-lg-2">
                                <h5>CHATBOT</h5>
                            </div>
                            <div class="col-lg-4">
                                <h5>USER</h5>
                                
                            </div>
                            <div class="col-lg-5">
                                <h5>DATE</h5>
                                
                            </div>
                            <div class="col-lg-1 t-right">
                                <b-button @click="retrieveInformation()">조회</b-button>                                
                            </div>
                        </div>
                    </card>
                </div>
            </div>  
            <div class="row">
                <div class="col-lg-12">
                    <b-card no-body>
                        <b-tabs v-model="tabIndex" small card>
                            <b-tab title="Transaction">I'm the first fading tab</b-tab>
                            <b-tab title="Ranking">
                            I'm the second tab
                            <b-card>I'm the card in tab</b-card>
                            </b-tab>
                            <b-tab title="ETC">Sibzamini!</b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import { saveAs } from 'file-saver'
import Card from '~/components/Cards/Card.vue'

export default {
  components: { // 현재 template에 추가해서 사용하는 component
    Card
  },
  layout: 'DefaultLayout',
  data(){
    return {
      
    }
  },
  async asyncData({ app, query }) {
    // rendering 전에 가지고올 데이터
    // try{
    //   const res = await app.$axios.$get('/api/login');
    //   return { res }
    // }catch(err){
    //   console.log(err)
    // }
  },
  methods : {
    retrieveInformation : function(){
        console.log("click");
    },
    excelDownload : async function(){
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
