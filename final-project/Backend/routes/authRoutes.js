const express = require('express');
const router = express.Router();
const authctrl = require('../controller/authController');

router.post('/register', authctrl.register);
router.post('/login', authctrl.login);

module.exports = router;
