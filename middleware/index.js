var express = require('express');
var auth = require('./auth');
var authAdmin = require('./authAdmin');
var router = express.Router();
var verifikasi = require('./token_verifikasi');
var verifikasi1 = require('./token_verifikasiAdmin');
var verifikasi2 = require('./token_verifikasiDevice');

// user
router.post('/api/pogung/register', auth.registrasi);
router.post('/api/pogung/login', auth.login);
router.put('/api/pogung/edite_user',verifikasi1(), auth.edite_user);
router.delete('/api/pogung/delete_user',verifikasi1(), auth.delete_user);
router.get('/api/pogung/user',verifikasi1(), auth.allUser);
router.get('/api/pogung/byId',verifikasi1(), auth.byId);


// device
router.post('/api/pogung/device/create',verifikasi1(), auth.createDevice);
router.put('/api/pogung/device/edite_mc',verifikasi1(), auth.edite_mc);
router.delete('/api/pogung/device/delete_mc',verifikasi1(), auth.delete_mc);
router.get('/api/pogung/device/allMC',verifikasi1(), auth.allMC);
router.get('/api/pogung/device/MCbyID',verifikasi1(), auth.MCbyID);


// MC 
router.post('/api/pogung/device/login', auth.loginDevice);

// admin
router.post('/api/qdev/admin/register', authAdmin.registerAdmin);
router.get('/api/qdev/admin/dataAdmin',verifikasi1(), authAdmin.dataadmin);
router.post('/api/qdev/admin/login', authAdmin.loginAdmin);
router.put('/api/qdev/admin/edite',verifikasi1(), authAdmin.editeAdmin);
router.delete('/api/qdev/admin/delete',verifikasi1(), authAdmin.deleteAdmin);






module.exports = router;