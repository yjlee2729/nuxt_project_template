const express = require('express')
const consola = require('consola')
const _ = require('lodash')

const db = require('@util/db')
const dashboard = require('@models/dashboard')

const router = express.Router()

router.post('/transaction', async (req, res, next)=>{
    var keys = ['transaction', 'session', 'tps'];

    var result = {};
    var error = {};

    var body = req.body;
    var chatbot_ids = body.chatbot_id;
    var date_format = '';
    var compare_format = '';
    var substring_index = 1;
    switch(body.date.base){
        case 'hour':
        date_format = '%Y%m%d';
        compare_format = '%Y%m%d%H';
        substring_index = 10;
        break;
        case 'day':
        date_format = '%Y%m%d';
        compare_format = '%Y%m%d';
        substring_index = 8;
        break;
        case 'month':
        date_format = '%Y%m';
        compare_format = '%Y%m';
        substring_index = 6;
        break;
    }
    var start_date = body.date.start;
    var end_date = body.date.end;
    var user_ids = null;
    var has_users = user_ids ? true : false;

    var params = [compare_format, chatbot_ids, date_format, start_date, end_date];
    if(has_users) params.push(user_ids);
    params.push(compare_format);

    //parameter setting-----------------------------

    var promises = keys.map(async (key)=>{
        var sql = dashboard.retrieveUsage[key](has_users);
        
        try{
            var modiParams = _.clone(params);
            if(key == 'tps'){
                modiParams[0] = substring_index;
                modiParams[params.length -1] = substring_index;
            }
            var tempResult = await db.pool.query(sql, modiParams)
            result[key] = tempResult;
        }catch(e){
            error[key] = e;
            console.log(e);
        }
    })
    
    try{
        await Promise.all(promises);
        res.send(result);//error가 setting되어 있을 시 문제상황 처리
    }catch(e){
        res.status(500).send(error);
    }
})

router.post('/ranking', async (req, res, next)=>{
    var result = {
        intent : [],
        chatflow : []    
    }
    var error = {
        intent : null,
        chatflow : null
    }

    var body = req.body;
    var chatbot_ids = body.chatbot_id;
    var date_format = body.date.base == 'month' ? '%Y%m' : '%Y%m%d'
    var start_date = body.date.start;
    var end_date = body.date.end;
    var user_ids = null;
    var has_users = user_ids ? true : false;

    var params = [chatbot_ids, date_format, start_date, end_date];
    if(has_users) params.push(user_ids);

    //parameter setting-----------------------------
    var keys = ['intent','chatflow'];

    //map은 promise를 반환하지만 forEach는 반환값이 없음. 전체 await를 걸고 싶으면 map을 사용할 것.
    var promises = keys.map(async (key)=>{
        var sql = dashboard.retrieveRanking[key](has_users);     
        try{
            var tempResult = await db.pool.query(sql, params)
            result[key] = tempResult;
        }catch(e){
            error[key] = e;
        }
    })

    try{
        await Promise.all(promises);
        res.send(result);//error가 setting되어 있을 시 문제상황 처리
    }catch(e){
        res.status(500).send(error);
    }
})

router.post('/custom', (req, res, next)=>{
    var body = req.body;
    var query = body.query || '';
    var params = body.params || [];

    var success = function(result){
        res.send(result)
    }

    var error = function(error){
        res.send({error : error})
    }
    
    db.query(query, params, success, error);
})

module.exports = router