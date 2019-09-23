<template>
    <div class="custom_result content">
        <loading :can-cancel="false" :active.sync="isLoading" :is-full-page="true"></loading> 
        <div class="container-fluid p-none">
            <b-row>
                <div class="col-lg-6">
                    <b-card class="m-b-md" footer-tag="footer" title="Custom Query">
                        <div class="p-sm">
                            <b-form-textarea
                                id="textarea"
                                v-model="customQuery"
                                placeholder="Write qeury, please..."
                                rows="9"
                                max-rows="9"
                            ></b-form-textarea>
                        </div>
                        <div slot="footer">
                            <b-button class="btn-sm" @click="retrieveInformation()" :disabled="!customQuery">
                                <i class="nc-icon nc-zoom-split m-r-sm"></i><span style="position:relative;top:-1;">{{msg.SEARCH}}</span>
                            </b-button>
                        </div>
                    </b-card>
                </div>
                <div class="col-lg-6">
                    <b-card class="param_card">
                        <h4 class="card-title">Parameters<i class="m-l-xs question" id="i_param"><v-icon name="question-circle"/></i></h4>
                        <b-tooltip target="i_param" placement="right" :no-fade="true">챗봇 ID를 parameter로 넘길 수 있습니다. parameter 사용 시 'chatbot_id in ?' 형태로 적어주세요.</b-tooltip>
                        <b-row class="search-box">
                            <b-col>
                                <h5 class="m-b-xs">{{msg.CHATBOT}}</h5>
                                <b-row>
                                    <b-col>
                                        <m-select id="chatbot" placeholder="Search & Select"  v-model="selected.chatbot" :allow-empty="true" :options="chatbotList" 
                                        :label="'chatbot_name'" :value="'chatbot_id'" :searchable="true" :track-by="'chatbot_id'" :multiple="true" :close-on-select="false"
                                        :clear-on-select="false" :preserve-search="true" :taggable="false"
                                        select-label="" deselect-label="">
                                            <span slot="noResult">{{msg.NO_RESULT}}</span>
                                            <template slot="selection" slot-scope="{ values }">
                                                <span class="multiselect__single" v-if="values.length">{{ values.length }} options selected</span>
                                            </template>
                                        </m-select>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col>
                                <h5 class="m-b-xs">{{msg.USER}}</h5>
                                <b-row>
                                    <b-col>
                                        <m-select id="chatbot" placeholder="Search & Select"  v-model="selected.user" :allow-empty="true" :options="chatbotList" 
                                        :label="'chatbot_name'" :value="'chatbot_id'" :searchable="true" :track-by="'chatbot_id'" 
                                        select-label="" deselect-label="">
                                        <span slot="noResult">{{msg.NO_RESULT}}</span>
                                        </m-select>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <h4 class="card-title">Reference<i class="m-l-xs question" id="i_ref"><v-icon name="question-circle"/></i></h4>
                        <b-tooltip target="i_ref" placement="right" :no-fade="true">버튼을 클릭하면 참고할 수 있는 qeury를 가져옵니다.</b-tooltip>
                        <b-row class="search-box">
                            <b-button class="border-btn m-xs">NLU Ranking</b-button>
                            <b-button class="border-btn m-xs">Chatflow Ranking</b-button>
                            <b-button class="border-btn m-xs">Transaction</b-button>
                            <b-button class="border-btn m-xs">Session</b-button>
                        </b-row>
                    </b-card>
                </div>
            </b-row>
            <b-row>
                <div class="col-lg-12">
                    <b-card footer-tag="footer">
                        <div class="custom_content p-sm">
                            <div v-if="!isError">
                                <table-info :tables="tables" :is-first="isFirst"></table-info>
                            </div>
                            <div v-else>
                                <client-only>
                                    <vue-json-pretty :data="errorObj" :deep="deep"></vue-json-pretty>
                                </client-only>
                            </div>
                        </div>
                        <div slot="footer">
                            <b-button class="btn-info btn-sm" :disabled="tables.length == 0" @click="excelDownload()">
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
import MSelect from 'vue-multiselect'
import Loading from 'vue-loading-overlay'
import VueMonthlyPicker from '~/components/VueMonthlyPicker.vue'
import TableInfo from '~/components/TableInfo.vue'
import Message from '~/server/util/constantsMsg.js'
import 'vue-awesome/icons/question-circle'
import VIcon from 'vue-awesome/components/Icon'

const default_chatbot = { chatbot_id : 'all', chatbot_name : '전체' };

export default {
  components: {
    MSelect,
    TableInfo,
    VueMonthlyPicker,
    Loading,
    VIcon
  },
//   middleware : 'auth',
  layout: 'DefaultLayout',
  data(){
    return {
      isFirst : true,
      isLoading : false,
      customQuery : '',
      msg : Message,      
      tables : [],
      isError : false,
      errorObj : '',
      selected : {
          chatbot : [],
          user : []
      }
    }
  },
  async asyncData({ app }) {
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
    retrieveInformation : async function(){
        this.isLoading = true;
        
        var url = 'api/statistics/custom'

        var params = {
            query : this.customQuery,
            params : []
        }
        
        var result = await this.$axios.post(url, params);
        this.isFirst = false;
        
        this.tables = [];
        
        var data = result.data;
        if(data.error){
            this.tables = [];
            this.isError = true;
            this.errorObj = data;
        }else{
            this.isError = false;
            var tableInfo = {};
            tableInfo.datas = data;
            tableInfo.columns = data.length > 0 ? Object.keys(data[0]) : [];
            tableInfo.title = 'Result';
            
            this.tables.push(tableInfo);
        }
        this.isLoading = false;
    },
    excelDownload : async function(){
        var now = moment().format('_YYYYMMDD_HHmmss')
        var filename = 'custom_query_result'+now+'.xlsx';
        var request_param = {
            url : '/api/common/excelDownload',
            method: 'POST',
            responseType: 'blob',
            data: {
                filename : filename,
                rows : this.tables[0].datas,
                header: this.tables[0].columns
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
.custom_result {
    .custom_content {
        min-height: 160px;
    }
    .multiselect__placeholder{
        padding-top:0px !important;
    }
    .multiselect__content-wrapper {
        max-height: 200px !important;
    }

    .search-box {
        border: 1px solid #e3e3e3;
        margin: 10px !important;
        padding: 10px !important;
    }

    .card {
        .card-title {
            color: #17a2b8;
            font-weight: 600;
            font-size: 18px;
        }
        .card-header {
            background-color:#f5f5f5;
        }
        .card-body {
            max-height: 600px;
            overflow: auto;
        }
        footer.card-footer {
            text-align: right;
            padding-top: 10px;
            background-color:#f5f5f5;
        }
        &.param_card {
            height: calc(100% - 20px);
            .card-body {
                overflow: hidden;
            }
        }
    }
}

.btn-sm {
    font: 400 13px Arial;
    padding: 6px 12px;
    text-align: center;
    line-height: 17px;
}

i {
    &.question {
        cursor: pointer;
        :hover {
            color: #0e6471;
        }
    }
}

</style>
