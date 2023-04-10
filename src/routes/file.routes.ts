import {Express} from 'express'
const { commonAuth } = require('../middleware/auth')

module.exports = (app: Express) => {
  const files = require('../controller/file.controller')
  var router = require('express').Router()
  router.post('/', files.SingleUpload)
  router.get('/:imageName', files.getFile)

  app.use('/api/file', commonAuth, router)
}
