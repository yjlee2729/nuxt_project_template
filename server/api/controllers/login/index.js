const express = require('express')
const db = require('../../common/db')

const router = express.Router()

router.get('/', function(req, res, next){
    var sql = 'select * from cf_chatbot'
    // var parameter = ['1a417a7c-5f98-436c-90be-c8f66eb7eee8']
    
    var susscess = function(result){
        res.send(result)
    }

    var error = function(error){
        res.send(error)
    }
    
    db.query(sql, [], susscess, error)
    
})

module.exports = router