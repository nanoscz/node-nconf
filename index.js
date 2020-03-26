'use strict'

const express =  require('express')
const nconf = require('nconf')
const proxyFile = JSON.stringify(require('./proxy.conf'))
const httpProxyMiddleware = require('http-proxy-middleware')

const app = express()
const settings = nconf.argv()
     .env()
     .defaults({ proxies: proxyFile, PORT: 5000 })
     .get()

const proxies = JSON.parse(settings.proxies)
Object.keys(proxies).forEach(key => {
  app.use(key, httpProxyMiddleware(key, proxies[key]))
})

app.listen(settings.PORT, () => {
  console.log(`server listening on port http://localhost:${settings.PORT}`)
})
