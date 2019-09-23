const mariadb = require('mariadb');
const config = require('@config');

const pool = mariadb.createPool(config.db);

// exports.select = function(query, parameter, success, error){
//     pool.getConnection()
//     .then( conn => {    
//         conn.query(query, parameter)
//         .then((rows) => {
//             success(rows);
//             conn.release();
//         })
//         .catch(err => {
//             //handle error
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
        return success(res)
    }catch (err){
        return error(err)
    }
}

exports.pool_end = function(){
    pool.end()
}