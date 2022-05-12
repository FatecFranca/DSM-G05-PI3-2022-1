const express = require('express')
const { verify } = require('jsonwebtoken')
const router = express.Router()
const verifyToken = require ('..lib') // completar essa linha


// Importa o controller correspondente
const controller = require('../controllers/answer')

router.post('/', verifyToken, controller.create)
router.get('/assessment/:id', verifyToken controller.retrieve)
router.get('/:id', verifyToken, controller.retrieveOne)
router.put('/', verifyToken, controller.update)
router.delete('/', verifyToken, controller.delete)

module.exports = router
