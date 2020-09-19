var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./token_verifikasi');

//regis dan login user
router.post('/api/pogung/register', auth.registrasi);
router.post('/api/pogung/login', auth.login);
router.put('/api/pogung/edite_user',verifikasi(), auth.edite_user);
router.delete('/api/pogung/delete_user',verifikasi(), auth.delete_user);



//regis dan login device
router.post('/api/pogung/device/register', auth.registerDevice);
router.post('/api/pogung/device/login', auth.loginDevice);
router.put('/api/pogung/device/edite_mc',verifikasi(), auth.edite_mc);
router.delete('/api/pogung/device/delete_mc',verifikasi(), auth.delete_mc);





module.exports = router;