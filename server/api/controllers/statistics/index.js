const express = require('express')
const consola = require('consola')
const excelUtil = require('../../common/exportExcel')

const router = express.Router()

router.get('/transaction', (req, res, next)=>{
    
})


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
})

module.exports = router