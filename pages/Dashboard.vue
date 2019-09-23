<template>
    <div class="dashboard content">
        <loading :can-cancel="false" :active.sync="isLoading" :is-full-page="true"></loading> 
        <div class="container-fluid p-none">
            <b-row class="search-box">
                <div class="col-lg-12">
                    <card class="m-b-md">
                        <b-row>
                            <div class="col-lg-2 right-line">
                                <h5 class="m-b-xs">{{msg.CHATBOT}}</h5>
                                <b-row>
                                    <b-col>
                                        <m-select id="chatbot" placeholder="Search & Select Chatbot"  v-model="selectedParam.chatbot" :allow-empty="false" :options="chatbotList" 
                                        :label="'chatbot_name'" :value="'chatbot_id'" :searchable="true" :track-by="'chatbot_id'" 
                                        select-label="" deselect-label="">
                                        <span slot="noResult">{{msg.NO_RESULT}}</span>
                                        </m-select>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="col-lg-5 right-line">
                                <h5 class="m-b-xs">{{msg.USER}}</h5>
                                <b-row>
                                    <div class="label-padding">
                                        <label for="users" class="m-r-sm">{{msg.SEARCH_BASE}}</label>
                                    </div>
                                    <div class="col-lg-5 p-l-none">
                                        <m-select id="users" placeholder="Select" v-model="selectedParam.user.base" :options="searchCriteriaList.user" 
                                        :label="'label'" :value="'value'" :track-by="'value'" :searchable="false"
                                        select-label="" deselect-label=""><!-- 변경 method binding : @input="searchDetail()"-->                                
                                        </m-select>
                                    </div>
                                    <div class="label-padding">
                                        <label for="users" class="m-r-sm">{{msg.SEARCH_DETAIL}}</label>
                                    </div>
                                    <div class="col-lg-5 p-l-none">
                                        <div v-if="selectedParam.user.base.value != 'all'">
                                            <m-select id="users" placeholder="Select" v-model="selectedParam.user.detail" :options="userList" 
                                            :label="'label'" :value="'value'" :track-by="'value'" 
                                            select-label="" deselect-label="">                                      
                                            </m-select>
                                        </div>
                                        <div v-if="selectedParam.user.base.value == 'all'" class="custom-calendar">
                                            <input type="text" value="N/A" disabled style="width:264px;"/>
                                        </div>
                                    </div>
                                </b-row>
                            </div>
                            <div class="col-lg-4">
                                <h5 class="m-b-xs">{{msg.DATE}}</h5>
                                <b-row>
                                    <div class="label-padding">
                                        <label for="date" class="m-r-sm">{{msg.SEARCH_BASE}}</label>
                                    </div>
                                    <div class="col-lg-4 p-l-none">
                                        <m-select id="date" placeholder="Select" v-model="selectedParam.date.base" :allow-empty="false" :options="searchCriteriaList.date" 
                                        :label="'label'" :value="'value'" :track-by="'value'" :searchable="false"
                                        select-label="" deselect-label="">
                                        </m-select>
                                    </div>
                                    <div class="label-padding">
                                        <label for="date_detail" class="m-r-sm">{{msg.SEARCH_DATE}}</label>
                                    </div>
                                    <div id="date_detail" class="col-lg-5 p-l-none">
                                        <client-only>
                                            <v-date-picker class="custom-calendar flex-grow" v-show="selectedParam.date.base.value == 'hour'" :mode="'single'" :min-date="dateOptions.daily.min" :max-date="dateOptions.daily.max" v-model="selectedParam.date.daily.day"></v-date-picker>
                                            <v-date-picker class="custom-calendar flex-grow" v-show="selectedParam.date.base.value == 'day'" :mode="'range'" :min-date="dateOptions.daily.min" :max-date="dateOptions.daily.max" v-model="selectedParam.date.daily.range"></v-date-picker>
                                            <b-row v-show="selectedParam.date.base.value == 'month'">
                                                <div class="col-lg-5 p-r-none">
                                                    <vue-monthly-picker class="custom-calendar" v-model="selectedParam.date.monthly.start" :min="dateOptions.monthly.min" :max="selectedParam.date.monthly.end"></vue-monthly-picker>
                                                </div>
                                                <span class="m-sm m-b-none">~</span>
                                                <div class="col-lg-5 p-l-none">
                                                    <vue-monthly-picker class="custom-calendar" v-model="selectedParam.date.monthly.end" :min="selectedParam.date.monthly.start" :max="dateOptions.monthly.max"></vue-monthly-picker>
                                                </div>
                                            </b-row>
                                        </client-only>
                                    </div>
                                </b-row>
                            </div>
                            <div class="col-lg-1 t-right" style="margin-top:15px;">
                                <b-button class="m-t-sm btn-custom-lg" @click="retrieveInformation()">{{msg.SEARCH}}</b-button>                                
                            </div>
                        </b-row>
                    </card>
                </div>
            </b-row>
            <b-row>
                <div class="col-lg-12">
                    <b-card no-body footer-tag="footer">
                        <b-tabs v-model="tabIndex" small card>
                            <b-tab title="Transaction" @click="tabChange()"> <!-- table body component로 빼내기 -->
                                <table-info :tables="tabTables[0]" :is-first="isFirst"></table-info>
                            </b-tab>
                            <b-tab title="Ranking" @click="tabChange()">
                                <table-info :tables="tabTables[1]" :is-first="isFirst"></table-info>
                            </b-tab>
                            <!-- <b-tab title="ETC" @click="tabChange()">
                                <table-info :tables="tabTables[2]" :is-first="isFirst"></table-info>
                            </b-tab> -->
                        </b-tabs>
                        <div slot="footer">
                            <b-button class="btn-info btn-sm" :disabled="tabTables[tabIndex].length == 0" @click="excelDownload()">
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
import moment from 'moment'
import { saveAs } from 'file-saver'

import Card from '~/components/Cards/Card.vue'
import MSelect from 'vue-multiselect'
import Message from '~/server/util/constantsMsg.js'
import TableInfo from '~/components/TableInfo.vue'
import VueMonthlyPicker from '~/components/VueMonthlyPicker.vue'
import Loading from 'vue-loading-overlay'

const user_search_base = [
    { label : '전체', value : 'all' },
    { label : '부서', value : '부서' },
    { label : '지점', value : '지점' },
    { label : '직원', value : '직원' },
]

const date_search_base = [
    { label : '시간별', value : 'hour' },
    { label : '일별', value : 'day' },
    { label : '월별', value : 'month' },
]

const default_chatbot = { chatbot_id : 'all', chatbot_name : '전체' };
const detaul_user_base = user_search_base[0];
const default_date_base = date_search_base[1];

const max_day = 30;
const max_month = 12;

const today = new Date();

const lastweek = new Date();
const lastMonth = new Date();
lastweek.setDate(today.getDate() - max_day);
lastMonth.setMonth(today.getMonth() - max_month);

export default {
  components: { // 현재 template에 추가해서 사용하는 component
    Card,
    MSelect,
    TableInfo,
    VueMonthlyPicker,
    Loading
  },
//   middleware : 'auth',
  layout: 'DefaultLayout',
  data(){
    return {
      isFirst : true,
      isLoading : false,
      tabIndex : 0, // 0 : transaction , 1 : ranking , 2 : etc
      msg : Message,
      searchParam : { //실질적으로 검색 시 사용하는 전체 조건
        chatbot_id : '',
        user : {
            base: '',
            detail : []
        },
        date : {
            base : '',
            start : '',
            end : ''
        }
      },
      prevSearchParam : [{},{},{}],
      searchCriteriaList : {
        user : user_search_base,
        date : date_search_base
      },
      selectedParam : {
        chatbot : default_chatbot,
        user : {
            base: detaul_user_base,
            detail : []
        },
        date : {
            base : default_date_base,
            daily : {
                day : today,
                range : {
                    start : lastweek,
                    end : today
                }
            },
            monthly : {
                start : moment(today),
                end : moment(today)
            }
        }
      },
      dateOptions : {
        daily : {
            max : today,
            min : lastweek
        },
        monthly : {
            max : moment(today),
            min : moment(lastMonth)
        }
      },
      userList : [],
      tabTables : {
        0: [],
        1: [],
        2: []
      }
    }
  },
  async asyncData({ app, query }) {
    var chatbotList = [default_chatbot];
    var isLoading = true;
    var allChatbotIds = [];
    try{        
        var chatbots = await app.$axios.$get('/api/common/chatbot');
        var chatbotTemps = _.map(chatbots, (chatbot)=>{
            allChatbotIds.push(chatbot.chatbot_id);
            return {chatbot_name : chatbot.chatbot_name , chatbot_id : chatbot.chatbot_id};
        });
        chatbotList = chatbotList.concat(chatbotTemps);
        isLoading = false
        return { chatbotList , isLoading, allChatbotIds }
    }catch(err){
        return { chatbotList , isLoading, allChatbotIds }
    }
  },
  methods : {
    tabChange : async function (idx){
        await this.$nextTick(); //event 발생 시 변화가 끝남을 기다림.
        //table이 비어있거나 search했던 조건이 현재 비교 조건과 다를 때
        var condition = _.isEmpty(this.tabTables[this.tabIndex]) || !_.isEqual(this.prevSearchParam[this.tabIndex] , this.searchParam); 

        if( !this.isFirst && condition ){
            this.retrieveInformation();
        }
    },
    retrieveInformation : async function(){
        this.isLoading = true;
        
        this.makeSearchParamObj();
        var url = 'api/statistics/'
        
        switch(this.tabIndex){
            case 0:
                url += 'transaction'
            break;
            case 1:
                url += 'ranking'
            break;
            case 2:
                url += 'etc'
            break;
        }

        var result = await this.$axios.post(url, this.searchParam);
        this.isFirst = false;
        
        var keys = Object.keys(result.data);
        keys = _.sortBy(keys);

        var tables = [];
        _.forEach(keys, (key)=>{
            var data = result.data[key];
            var tableInfo = {};
            tableInfo.datas = data;
            tableInfo.columns = data.length > 0 ? Object.keys(data[0]) : [];
            tableInfo.title = key;
            tableInfo.addIndex = (this.tabIndex == 1);

            tables.push(tableInfo);
        })

        this.tabTables[this.tabIndex] = tables;

        this.isLoading = false;
    },
    makeSearchParamObj : function(){
        this.searchParam.chatbot_id = this.selectedParam.chatbot.chatbot_id == 'all' ? this.allChatbotIds : [this.selectedParam.chatbot.chatbot_id];
        // this.searchParam.search_info = this.tabIndex; //상황에 따라 변경
        this.searchParam.user.base = this.selectedParam.user.base.value;
        this.searchParam.user.detail = this.selectedParam.user.detail.value; //상황에 따라 변경 가능
        this.searchParam.date.base = this.selectedParam.date.base.value;

        //date start ~ end 형태 변경 필요
        switch(this.searchParam.date.base){
            case 'hour':
                var daystr =  moment(this.selectedParam.date.daily.day).format('YYYYMMDD');
                this.searchParam.date.start = daystr;
                this.searchParam.date.end = daystr;
            break;
            case 'day':
                this.searchParam.date.start = moment(this.selectedParam.date.daily.range.start).format('YYYYMMDD');
                this.searchParam.date.end = moment(this.selectedParam.date.daily.range.end).format('YYYYMMDD');
            break;
            case 'month':
                this.searchParam.date.start = moment(this.selectedParam.date.monthly.start).format('YYYYMM');
                this.searchParam.date.end = moment(this.selectedParam.date.monthly.end).format('YYYYMM');
            break;
        }
        
        this.prevSearchParam[this.tabIndex] = _.cloneDeep(this.searchParam);
    },
    excelDownload : async function(){
      var filename = 'test.xlsx';
       var request_param = {
        url : '/api/common/excelMultiSheetDownload',
        method: 'POST',
        responseType: 'blob',
        data: {
          filename : filename,
          datas : this.tabTables[this.tabIndex]
        }
      }
      var result = await this.$axios(request_param);//url , data, config
      var blob = new Blob([result.data], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
      saveAs(blob, filename);
    }
  }
}
</script>

<style lang="scss">
.dashboard {
    .custom-select { 
        background : url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 2 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 0h4zm0 6L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px
    }

    .min-col {
        width:12%;
    }

    .max-col {
        width:88%;
    }

    .tab-content {
        min-height: 160px;
    }
    .multiselect__placeholder{
        padding-top:0px !important;
    }

    .card {
        .card-header {
            background-color:#f5f5f5;
        }
        footer.card-footer {
            text-align: right;
            padding-top: 10px;
            background-color:#f5f5f5;
        }
    }

    .nav {
        .nav-item {
            .nav-link {
            &:hover {
                background-color : #fff;
            }
            &:focus {
                background-color : #fff;
            }
            }
        }
        a {
            font-weight:600;
        }
    }
}

.custom-calendar {
    display:inline-block;
    .month-year-display {
        border: 1px solid #e8e8e8;
        border-radius: 0.25rem;
        line-height: 1.5;
        padding: 10.5px;
        background-color: white;
        box-shadow: none;
        font: 400 15px Arial;
        height: 40px;
        width: 80px;
    }
    input {
        border: 1px solid #e8e8e8;
        border-radius: 0.25rem;
        line-height: 1.5;
        padding: 10.5px; //0.75rem 0.75rem 0.75rem 2rem;
        font: 400 15px Arial;
        width: 225px;
    }
}

.search-box {
    h5 {
        font-weight: 600;
        color: #8a8a8a;
    }
}

.btn-sm {
    font: 400 13px Arial;
    padding: 6px 12px;
    text-align: center;
    line-height: 17px;
}

.btn-custom-lg {
    padding: 7px 16px;
    font-weight: 600;
}

.label-padding{
    padding : 5px 0px 5px 15px;
}



.right-line {
    border-right: 1px solid rgba(0, 0, 0, 0.125);
}

.multiselect {
    .multiselect__element{
        .multiselect__option--highlight{
            background : #6cb9c5;
            &.multiselect__option--selected {
                background:#ff935e;
            }
        }
    }
}

</style>
