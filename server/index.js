const express = require('express')
const session = require('express-session')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const moduleAlias = require('module-alias')

moduleAlias.addAliases({
  "@server"  : __dirname,
  "@api" : __dirname + "/api",
  "@controllers" : __dirname + "/api/controllers",
  "@models" : __dirname + "/api/models",
  "@config" : __dirname + "/config",
  "@util" : __dirname + "/util"
})


const api = require('@api')
const { info } = require('@config')

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// req.session을 만들기 위한 session 
// app.use -> nuxt.config에 serverMiddleware로 등록 가능
app.use(session({
  secret: info.session_key,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: info.session_max }
}))

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  //batch job start area
  
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
