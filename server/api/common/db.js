const mariadb = require('mariadb');
const config = require('../../config/database');

const pool = mariadb.createPool(config.dev);

// exports.select = function(query, parameter, success, error){
//     pool.getConnection()
//     .then( conn => {    
//         conn.query(query, parameter)
//         .then((rows) => {
//             console.log(rows); //[ {val: 1}, meta: ... ]
//             success(rows);
//             conn.release();
//         })
//         .catch(err => {
//             //handle error
//             console.log(err); 
//             error(err);
//         })
//     })
//     .catch(err => {
//         //not connected
//         error(err);
//     });
// }
/*pool.query ?
* pool.query는 connection을 얻고 realse 하는 거까지 shortcut으로 만들어 둔 것.
*/

exports.pool = pool

exports.query = async function(query, parameter, success, error){
    // pool.query(qeery,parameter, callback)
    try {
        res = await pool.query(query, parameter)
        success(res)
    }catch (err){
        error(err)
    }

    // pool.query(query, parameter)
    // .then(res =>{
    //     success(res)
    // })
    // .catch(err =>{
    //     error(err)
    // })
}

exports.pool_end = function(){
    pool.end()
}