const login = require('@controllers/account')
const statistics = require('@controllers/statistics')
const common = require('@controllers/common')
const express = require('express')

const app = express()

// Add USERS Routes
app.use('/account',login)
app.use('/statistics', statistics)
app.use('/common', common)

module.exports = {
  path: '/api',
  handler: app
}