const info = require('./baseInfo')
const db = require('./database')

const env = process.env.NODE_ENV;

module.exports = {
    info : info[env],
    db : db[env]
}