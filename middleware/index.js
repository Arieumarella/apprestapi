var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./token_verifikasi');

//regis dan login user
router.post('/api/pogung/register', auth.registrasi);
router.post('/api/pogung/login', auth.login);



module.exports = router;