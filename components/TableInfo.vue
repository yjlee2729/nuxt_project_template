<template>
    <div>
        <div>
            <b-row v-if="tables.length > 0">
                <b-col v-for="(t,idx) in tables" :key="idx">
                    <h5 class="m-t-sm m-b-sm table-title" v-if="t.title">
                        <i class="nc-icon nc-align-left-2 m-r-xs m-l-xs"></i>
                        <span class="title-text">{{t.title.toUpperCase()}}</span>
                    </h5>
                    <l-table class="table-hover table-striped table-sm"
                        :columns="t.columns"
                        :data="t.datas"
                        :add-index="t.addIndex">
                    </l-table>
                    <div class="empty-wrapper" v-if="t.datas.length == 0">
                        <div class="empty-info multi-table">
                            <v-icon class="m-r-sm" name="exclamation-circle" scale="2"/>{{msg.SEARCH_NO_RESULT}}
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>
        <div v-if="tables.length == 0">
            <div v-if="isFirst">
                <div class="item-center margin-auto">
                    <div class="empty-info"><v-icon class="m-r-sm" name="info-circle" scale="2"/>{{msg.SEARCH_CLICK}}</div>
                </div>
            </div>
            <div v-if="!isFirst">
                <div class="item-center margin-auto">
                    <div class="empty-info"><v-icon class="m-r-sm" name="exclamation-circle" scale="2"/>{{msg.SEARCH_NO_RESULT}}</div>
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
import LTable from '~/components/Table.vue'
import Message from '~/server/util/constantsMsg.js'
import 'vue-awesome/icons/exclamation-circle'
import 'vue-awesome/icons/info-circle'
import VIcon from 'vue-awesome/components/Icon'

export default {
    components: { // 현재 template에 추가해서 사용하는 component
        LTable,
        VIcon
    },
    name: 'table-info',
    props: {
        // columns : {
        //     type: Array,
        //     default : []
        // },
        // datas: {
        //     type: Array,
        //     default : []
        // },
        isFirst: {
            type: Boolean,
            default : true
        },
        // addIndex: {
        //     type: Boolean,
        //     default : true
        // },
        tables : {
            type: Array,
            default : []
        }
    },
    data() {
        return {
            msg : Message
        }
    },
    methods: {
        hasValue (item, column) {
            return item[column.toLowerCase()] !== 'undefined'
        },
        itemValue (item, column) {
            return item[column.toLowerCase()]
        }
    }
  }
</script>
<style lang="scss">
.table-title {
    font-weight: 700;
    color: rgba(23, 162, 184, 0.8) !important;
    font-size: 16px;
    .title-text {
        position: relative;
        top: -1;
    }
}
.empty-wrapper {
    height: 100%;
    text-align: center;
    margin-top: -45px;
    &:before {
        content: ""; 
        display: inline-block;
        width: 1px; 
        height: 100%;
        margin-right: 0; 
        vertical-align: middle;
    }
}
.empty-info {
    font-weight: 900;
    color: #8a8a8a;
    font-size: 28px;
    &.multi-table {
        vertical-align: middle;
        display: inline-block;
        margin: 50px auto;
    }
}
</style>