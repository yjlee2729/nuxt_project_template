// import login from './controllers/login/login'
// import statistics from './controllers/statistics/statistics'
// import { Router } from 'express'
const login = require('./controllers/login')
const statistics = require('./controllers/statistics')
const common = require('./controllers/common')
const express = require('express')

const app = express()

// Add USERS Routes
app.use('/login',login)
app.use('/statistics', statistics)
app.use('/common', common)

module.exports = {
  path: '/api',
  handler: app
}