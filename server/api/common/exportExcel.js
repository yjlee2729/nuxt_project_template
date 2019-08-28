const Excel = require('exceljs');
const consola = require('consola');
const _ = require('lodash');

exports.makeExcel = function(header, rows){
    
    var workbook = new Excel.Workbook();
    workbook.created = new Date();
       
    var worksheet = workbook.addWorksheet('Sheet1');

    if (!Array.isArray(rows)) rows = [rows];

    if(rows.length == 0){
        consola.warn({message : 'There is no data for making excel.', badge: true});
        return workbook;
    }

    var columns = getHeaderColumns(header, rows[0]);
    worksheet.columns = columns;

    if (columns.length != 0) changeHeaderStyle(worksheet, columns.length);
    
    worksheet.addRows(rows);

    //----------------------------------------------------
    consola.info({message : 'Success making excel file'});
    return workbook;
}

var getHeaderColumns = function(header, rowObj){
    if (typeof rowObj !== 'object') return [];

    var keys = Object.keys(rowObj);
    var columns = [];
    var headerLength = header.length;
    
    for(var idx = 0 ; idx < keys.length ; idx++){
        var key = keys[idx];
        var colObj = {};

        colObj.key = key;
        colObj.header = idx < headerLength ? header[idx] : key;
        colObj.width = 15;
        columns.push(colObj);
    };
    return columns;
}

var changeHeaderStyle = function(worksheet, length){
    const cellArr = ['A1','B1','C1','D1','E1','F1','G1','H1','I1','J1','K1','L1','N1','M1','O1','P1','Q1','R1','S1','T1','U1','V1','W1','X1','Y1','Z1'];

    if(length < cellArr.length){
        for(var i = 0 ; i < length ; i++){
            var cell = worksheet.getCell(cellArr[i]);
            changeTargetStyle(cell);
        }
    }else{
        var row = worksheet.getRow(1);
        changeTargetStyle(row);
    }
    
}

var changeTargetStyle = function(target){
    var style = getStyle();
    var styleKey = Object.keys(style)
    _.forEach(styleKey, (key)=>{
        target[key] = style[key];
    });
}

var getStyle = function(){
    var fillStyle = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{ argb:'565656' }
    };

    var fontStyle = {
        bold : true,
        color : { argb: 'ffffff' }
    };

    var borderStyle = {};
    var direction = ['top', 'bottom','left','right'];
    _.forEach(direction, (d)=>{
        borderStyle[d] = {
            style : 'thin',
            color : { argb: '000000'}
        }
    })

    var alignmentStyle = {
        horizontal : 'center'
    };

    return {
        fill : fillStyle,
        font : fontStyle,
        border : borderStyle,
        alignment : alignmentStyle
    }
}