const express = require('express')
const router = express.Router()

// Importa o controller correspondente
const controller = require('../controllers/assessment')

router.post('/', controller.create)
router.get('/', controller.retrieve)
router.get('/:id', controller.retrieveOne)
router.put('/', controller.update)
router.delete('/', controller.delete)

module.exports = router
