const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/verify_token');

// Imposta o controller correspondente
const controller = require('../Controllers/question');
router.get('/group/:groupId', controller.retrieveByGroup)

router.get('/',verifyToken, controller.retrieve);
router.get('/:id', verifyToken, controller.retrieveOne);
// router.get('/group/:groupId', verifyToken, controller.retrieveByGroup)
router.get('/group-number/:groupId/:number', verifyToken, controller.retrieveByGroupAndNumber)
router.post('/', verifyToken, controller.create);
router.put('/', verifyToken, controller.update);
router.delete('/', verifyToken, controller.delete);

module.exports = router;
