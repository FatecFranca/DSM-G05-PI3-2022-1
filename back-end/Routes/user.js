const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/verify_token');
// Imposta o controller correspondente
const controller = require('../Controllers/user');

router.get('/', verifyToken, controller.retrieve);
router.get('/:id', controller.retrieveOne);
router.post('/', controller.create);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/validate', controller.verify_token);
router.put('/', verifyToken, controller.update);
router.delete('/', verifyToken, controller.delete);

module.exports = router;
