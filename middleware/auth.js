var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var config1 = require('../config/secretDevice');
var ip = require('ip');

//controler registrasi user
exports.registrasi = function(req, res){
	var post = {
		nama: req.body.nama,
		username: req.body.username,
		password: md5(req.body.password),
		id_device: req.body.id_device,
		tanggal_daftar: new Date()
	}

	if(post.nama && post.username && post.password){

	var query = "SELECT username FROM ?? WHERE ??=?";
	var table = ["user", "username", post.username];

	query = mysql.format(query,table);

	connection.query(query, function(error, rows){
		if(error){
			console.log(error);
		}else{
			if(rows.length == 0){
				var query = "INSERT INTO ?? SET ?";
				var table = ["user"];

				query = mysql.format(query,table);
				connection.query(query, post, function(error, rows){
					if(error){
						console.log(error);
					}else{
						response.ok("berhasil menambahkan data.!", res);
					}
				});
			}else{
				response.ok("username sudah ada.!",res);
			}
		}
	})

	}else{
		return res.status(401).send({status: 401, message:'Data Kosong.!'});
	}
}


//controler login user
exports.login = function(req, res){
	var post = {
		password: req.body.password,
		username: req.body.username
	};

	var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
	var table = ["user", "password", md5(post.password), "username", post.username];

	query = mysql.format(query,table);
	connection.query(query, function(error, rows){
		if(error){
			console.log(error);
		}else{
			if(rows.length == 1){
				
				id_user = rows[0].id;


				var token = jwt.sign({rows}, config.secret,{
					expiresIn: '24h'
				});

				

				var data = {
					id_user: id_user,
					access_token: token,
					ip_address: ip.address()
				}

				var query ="INSERT INTO ?? SET ?";
				var table = ["akses_token"];

				query = mysql.format(query,table);
				connection.query(query, data, function(error, rows){
					if(error){
						console.log(error);
					}else{


						var query ="SELECT * FROM ?? WHERE ??=? OR ??=?";
						var table =["relay", "id_user", data.id_user, "id_user",23];

						query = mysql.format(query,table);
						connection.query(query, data, function(error, rows){
							if(error){
								console.log(error);
							}else{

							var data3 = {
								relay: rows,res
							}

								res.json({
								success: true,
								massage: "token JWT berhasil di buat nih bor.!",
								token: token,
								id_user: data.id_user,
								data_relay: data3.relay
								
								});
							}
						});

					}
				});
			}else{
				res.json({
					"error": true,
					"massage": "username / password salah.!"
				});
			}
		}
	});
}


//registrasi device
exports.registerDevice = function(req, res){
	var post = {
		device_key: req.body.device_key,
		nama_device: req.body.nama_device,
		tanggal_daftar: new Date()
	}

	if(post.device_key && post.nama_device){

	var query = "SELECT nama_device FROM ?? WHERE ??=?";
	var table = ["device", "nama_device", post.nama_device];

	query = mysql.format(query,table);

	connection.query(query, function(error, rows){
		if(error){
			console.log(error);
		}else{
			if(rows.length == 0){
				var query = "INSERT INTO ?? SET ?";
				var table = ["device"];

				query = mysql.format(query,table);
				connection.query(query, post, function(error, rows){
					if(error){
						console.log(error);
					}else{
						response.yak("Data device berhasil ditambahkan.!", res);
					}
				});
			}else{
				response.yak("nama device sudah ada boor.!",res);
			}
		}
	})

	}else{
		return res.status(401).send({status: 401, message:'Data Kosong \ parameter yang ente kirim kurang bor.!'});
	}
}


//login Device
exports.loginDevice = function(req, res){
	var post = {
		device_key: req.body.device_key
	};

	var query = "SELECT * FROM ?? WHERE ??=?";
	var table = ["device", "device_key", post.device_key];

	query = mysql.format(query,table);
	connection.query(query, function(error, rows){
		if(error){
			console.log('error borr');
		}else{
			if(rows.length == 1){
				
				id = rows[0].id;
				var token = jwt.sign({rows}, config1.secret,{
					expiresIn: '24h'
				});

				var data1 = {
					access_token: token,
					ip_address: ip.address()
				}				

				var query ="INSERT INTO ?? SET ?";
				var table = ["akses_token"];

				query = mysql.format(query,table);
				connection.query(query, data1, function(error, rows){
					if(error){
						console.log(error);
					}else{
							res.json({

								status		: 200,
								auth		: true,
								massage		: "token JWT berhasil di buat nih bor.!",
								akses_token	: token

								});
						}
				});
			}else{
				res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "device_key salah bor.!"
				});
			}
		}
	});
}