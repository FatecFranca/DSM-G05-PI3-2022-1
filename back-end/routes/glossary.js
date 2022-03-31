
const express = require('express')
const { route } = require('../app')
const router = express.Router()

// importa o Controller correspondente

const controller = require('../controllers/glossary')

router.post('/', controller.create)
router.get('/, controller.retrieve')

module.exports = router
