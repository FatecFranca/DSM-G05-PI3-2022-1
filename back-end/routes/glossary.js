const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/verify_token');

// Imposta o controller correspondente
const controller = require('../Controllers/glossary');

router.get('/', verifyToken, controller.retrieve);
router.get('/:id', verifyToken, controller.retrieveOne);
router.post('/', verifyToken, controller.create);
router.put('/', verifyToken, controller.update);
router.delete('/', verifyToken, controller.delete);

module.exports = router;
