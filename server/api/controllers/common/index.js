const express = require('express')
const consola = require('consola')

const db = require('../../../util/db')
const chatbot = require('../../models/chatbot')
const excelUtil = require('../../../util/exportExcel')

const router = express.Router()

router.get('/chatbot', (req, res, next)=>{
    var sql = chatbot.retreiveChatbotList;
    
    var susscess = function(result){
        res.send(result)
    }

    var error = function(error){
        res.send(error)
    }
    
    db.query(sql, [], susscess, error)
});

router.post('/excelDownload', (req, res, next)=>{
    var body = req.body;

    var filename = body.filename + '.xlsx' || 'untitle.xlsx';
    var header = body.header || [];
    var rows = body.rows || [];

    var workbook = excelUtil.makeExcel(header, rows);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
    
    return workbook.xlsx.write(res)
    .then(function() {        
        res.end();
    });
});

module.exports = router;