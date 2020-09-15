var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./token_verifikasi');

//regis dan login user
router.post('/api/pogung/register', auth.registrasi);
router.post('/api/pogung/login', auth.login);



//regis dan login device
router.post('/api/pogung/device/register', auth.registerDevice);
router.post('/api/pogung/device/login', auth.loginDevice);



module.exports = router;