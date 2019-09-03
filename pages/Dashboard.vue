<template>
    <div class="content">
        <div class="container-fluid p-none">
            <b-row>
                <div class="col-lg-12">
                    <card class="m-b-md">
                        <!-- <h6 slot="header" class="card-title">조회 조건</h6> -->                        
                        <b-row>
                            <div class="col-lg-2">
                                <h5 class="m-b-xs">{{msg.CHATBOT}}</h5>
                                <b-row>
                                    <b-col>
                                        <m-select id="chatbot" placeholder="Search & Select Chatbot"  v-model="selectedChatbot" :options="chatbotList" 
                                        :label="'chatbot_name'" :value="'chatbot_id'" :searchable="true" :track-by="'chatbot_id'" 
                                        select-label=" " deselect-label=" " @input="print()">
                                        <span slot="noResult">{{msg.NO_RESULT}}</span>
                                        </m-select>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="col-lg-5">
                                <h5 class="m-b-xs">{{msg.USER}}</h5>
                                <b-row>
                                    <b-col>
                                        <label for="users" class="m-r-sm">{{msg.SEARCH_BASE}}</label>
                                        <m-select id="users" placeholder="Select"  class="user-select" v-model="selectedUserBase" :options="userSearchBaseList" 
                                        :label="'label'" :value="'value'" :track-by="'value'" :searchable="false"
                                        select-label=" " deselect-label=" " @input="searchDetail()">                                      
                                        </m-select>
                                    </b-col>
                                    <b-col>
                                        <label for="users" class="m-r-sm">{{msg.SEARCH_DETAIL}}</label><!--변경 필요-->
                                        <m-select id="users" placeholder="Select"  class="user-select" v-model="selectedUserBase" :options="userSearchBaseList" 
                                        :label="'label'" :value="'value'" :track-by="'value'" 
                                        select-label=" " deselect-label=" " @input="searchDetail()">                                      
                                        </m-select>
                                    </b-col>                                
                                </b-row>
                            </div>
                            <div class="col-lg-4">
                                <h5 class="m-b-xs">{{msg.DATE}}</h5>
                                <b-row>
                                    <div class="col-lg-5 p-r-none">
                                        <label for="users" class="m-r-sm">{{msg.SEARCH_BASE}}</label>
                                        <m-select id="users" placeholder="Select"  class="user-select" v-model="selectedDateBase" :options="dateSearchBaseList" 
                                        :label="'label'" :value="'value'" :track-by="'value'" :searchable="false"
                                        select-label=" " deselect-label=" " @input="searchDetail()">                          
                                        </m-select>
                                    </div>
                                    <div class="col-lg-7">
                                        <label for="users" class="m-r-sm">{{msg.SEARCH_DATE}}</label>
                                        <v-date-picker class="custom-calendar" mode='single' v-model='selectedDate'>
                                        </v-date-picker>
                                        <!-- <b-row>
                                            <div class= "col-lg-2 min-col p-none"><label for="users" class="m-r-sm">날짜</label></div>
                                            <div class="col-lg-10 max-col p-none"><v-date-picker class="custom-calendar" mode='single' v-model='selectedDate'></v-date-picker></div>
                                        </b-row> -->
                                    </div>                           
                                </b-row>
                            </div>
                            <div class="col-lg-1 t-right" style="margin-top:15px;">
                                <b-button class="m-t-sm" @click="retrieveInformation()">{{msg.SEARCH}}</b-button>                                
                            </div>
                        </b-row>
                    </card>
                </div>
            </b-row>  
            <b-row>
                <div class="col-lg-12">
                    <b-card no-body footer-tag="footer">
                        <b-tabs v-model="tabIndex" small card>
                            <b-tab title="Transaction">
                                <!-- <h5>Transaction</h5> -->
                                <l-table class="table-hover table-striped table-sm"
                                    :columns="tableColumns"
                                    :data="tableData">
                                </l-table>
                            </b-tab>
                            <b-tab title="Ranking">
                                <l-table class="table-hover table-striped table-sm"
                                    :columns="tableColumns"
                                    :data="tableData">
                                </l-table>
                            </b-tab>
                            <b-tab title="ETC">
                                <l-table class="table-hover table-striped table-sm"
                                    :columns="tableColumns"
                                    :data="tableData">
                                </l-table>
                            </b-tab>
                        </b-tabs>
                        <div slot="footer">
                            <b-button class="btn-info btn-sm" @click="excelDownload()">
                                <i class="nc-icon nc-cloud-download-93 m-r-sm"></i><span style="position:relative;top:-1;">{{msg.DOWNLOAD}}</span>
                            </b-button>
                        </div>
                    </b-card>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import { saveAs } from 'file-saver'
import Card from '~/components/Cards/Card.vue'
import LTable from '~/components/Table.vue'
import MSelect from 'vue-multiselect'
import Message from '~/server/util/constantsMsg.js'

const default_chatbot = {chatbot_id : 'all', chatbot_name : 'ALL'}
const user_search_base = [
    {label : '부서', value : '부서'},
    {label : '지점', value : '지점'},
    {label : '직원', value : '직원'},
]

const date_search_base = [
    {label : '시간별', value : 'hour'},
    {label : '일별', value : 'day'},
    {label : '월별', value : 'month'},
]

export default {
  components: { // 현재 template에 추가해서 사용하는 component
    Card,
    LTable,
    MSelect
  },
  layout: 'DefaultLayout',
  data(){
    return {
      tabIndex : 0,
      msg : Message,
      selectedChatbot : default_chatbot,
      userSearchBaseList : user_search_base,
      dateSearchBaseList : date_search_base,
      selectedUserBase : null,
      selectedDateBase : null,
      selected: '',
      options : [
          { value: 1, text: 'Please select an option' },
          { value: 2, text: 'select' },
      ],
      selectedDate: new Date(),
      tableColumns: ['Id', 'Name', 'Salary', 'Country', 'City'],
      tableData: [{
            id: 1,
            name: 'Dakota Rice',
            salary: '$36.738',
            country: 'Niger',
            city: 'Oud-Turnhout'
        },
        {
            id: 2,
            name: 'Minerva Hooper',
            salary: '$23,789',
            country: 'Curaçao',
            city: 'Sinaai-Waas'
        },
        {
            id: 3,
            name: 'Sage Rodriguez',
            salary: '$56,142',
            country: 'Netherlands',
            city: 'Baileux'
        },
        {
            id: 4,
            name: 'Philip Chaney',
            salary: '$38,735',
            country: 'Korea, South',
            city: 'Overland Park'
        },
        {
            id: 5,
            name: 'Doris Greene',
            salary: '$63,542',
            country: 'Malawi',
            city: 'Feldkirchen in Kärnten'
        }]
    }
  },
  async asyncData({ app, query }) {
    try{
        var chatbots = await app.$axios.$get('/api/common/chatbot');
        var chatbotTemps = _.map(chatbots, (chatbot)=>{
            return {chatbot_name : chatbot.chatbot_name , chatbot_id : chatbot.chatbot_id};
        });

        var chatbotList = [default_chatbot].concat(chatbotTemps);
        return { chatbotList }
    }catch(err){
        console.log(err)
    }
  },
  methods : {
    retrieveInformation : function(){
        console.log("click");
    },
    excelDownload : async function(){
      var filename = 'test.xlsx';
      var request_param = {
        url : '/api/common/excelDownload',
        method: 'POST',
        responseType: 'blob',
        data: {
          filename : filename,
          rows : this.tableData,
          header: this.tableColumns
        }
      }
      var result = await this.$axios(request_param);//url , data, config
      var blob = new Blob([result.data], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
      saveAs(blob, filename);
    },
    print : function(){
        console.log(this.selectedChatbot);
    },
    searchDetail : function(){
        //기준에 따른 상세 정보 검색 method
        console.log(this.selectedUserBase);
    }
  }
}
</script>

<style lang="scss">
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

.user-select {
  width: 80%;
  display: inline-block;
}

.custom-select { 
    background : url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 2 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 0h4zm0 6L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px
}

.min-col {
    width:12%;
}

.max-col {
    width:88%;
}

.custom-calendar {
    display:inline-block;
    input {
        border: 1px solid #e8e8e8;
        border-radius: 0.25rem;
        line-height: 1.5;
        padding: 0.75rem 0.65rem; //0.75rem 0.75rem 0.75rem 2rem;
        font: 400 15px Arial;
    }
}

.btn-sm{
    font: 400 13px Arial;
    padding: 6px 12px;
    text-align: center;
    line-height: 17px;
}

footer.card-footer {
    text-align: right;
}
</style>
