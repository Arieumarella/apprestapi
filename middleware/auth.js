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
		iot_usr_name: req.body.iot_usr_name,
		iot_usr_username: req.body.iot_usr_username,
		iot_usr_password: md5(md5(req.body.iot_usr_password)),
		iot_mc_id: req.body.iot_mc_id,
		created_at: new Date()
	}

	if(post.iot_usr_name && post.iot_usr_username && post.iot_usr_password){

	var query = "SELECT iot_usr_username FROM ?? WHERE ??=?";
	var table = ["iot_users", "iot_usr_username", post.iot_usr_username];

	query = mysql.format(query,table);

	connection.query(query, function(error, rows){
		if(error){
			console.log(error);
		}else{
			if(rows.length == 0){
				var query = "INSERT INTO ?? SET ?";
				var table = ["iot_users"];

				query = mysql.format(query,table);
				connection.query(query, post, function(error, rows){
					if(error){
						console.log(error);
					}else{
						response.ok("berhasil menambahkan data bor.!", res);
					}
				});
			}else{
				response.ok("username sudah ada bor.!",res);
			}
		}
	})

	}else{
		return res.status(401).send({status: 401, message:'Data Kosong.!'});
		console.log(error);
	}
}


//controler login user
exports.login = function(req, res){
	var post = {
		iot_usr_password: req.body.iot_usr_password,
		iot_usr_username: req.body.iot_usr_username
	};

	var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
	var table = ["iot_users", "iot_usr_password", md5(md5(post.	iot_usr_password)), "iot_usr_username", post.iot_usr_username];

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
					iot_user_id: id_user,
					iot_at_access_token: token,
					//iot_user_id_admin:'1',
					iot_at_ip: ip.address()
				}

				var query ="INSERT INTO ?? SET ?";
				var table = ["iot_access_token"];

				query = mysql.format(query,table);
				connection.query(query, data, function(error, rows){
					if(error){
						console.log(error);
					}else{


						var query ="SELECT * FROM ?? WHERE ??=? OR ??=?";
						var table =["iot_relays", "iot_user_id", data.iot_user_id, "iot_user_id",1];

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
								id_user: data.iot_user_id,
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
exports.createDevice = function(req, res){
	var post = {
		iot_mc_device_key: req.body.iot_mc_device_key,
		iot_mc_device_name: req.body.iot_mc_device_name,
		created_at: new Date()
	}

	if(post.iot_mc_device_key && post.iot_mc_device_name){

	var query = "SELECT iot_mc_device_name FROM ?? WHERE ??=?";
	var table = ["iot_microcontrollers", "iot_mc_device_name", post.iot_mc_device_name];

	query = mysql.format(query,table);

	connection.query(query, function(error, rows){
		if(error){
			console.log(error);
		}else{
			if(rows.length == 0){
				var query = "INSERT INTO ?? SET ?";
				var table = ["iot_microcontrollers"];

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
		iot_mc_device_key: req.body.iot_mc_device_key
	};

	var query = "SELECT * FROM ?? WHERE ??=?";
	var table = ["iot_microcontrollers", "iot_mc_device_key", post.iot_mc_device_key];

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
					iot_at_access_token: token,
					iot_at_ip: ip.address()
				}				

				var query ="INSERT INTO ?? SET ?";
				var table = ["iot_access_token"];

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

exports.edite_user = function(req, res){
	var post = {
		id 					: req.body.id,
		iot_mc_id 			: req.body.iot_mc_id,
		iot_usr_name 		: req.body.iot_usr_name,
		iot_usr_username	: req.body.iot_usr_username
	}

	if (post.id && post.iot_mc_id && post.iot_usr_name && post.iot_usr_username) {

		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ["iot_users", "id", post.id];

		query = mysql.format(query,table);
		connection.query(query, function(error, rows){
			if (error) {
				console.log(error);
			}else{

				if (rows.length) {

					var password = rows[0].iot_usr_password; 

					var query = "UPDATE ?? SET iot_mc_id=?, iot_usr_name=?, iot_usr_username=?,iot_usr_password=? WHERE id=?";
					var table = ["iot_users", post.iot_mc_id, post.iot_usr_name, post.iot_usr_username, password, post.id];

					query = mysql.format(query,table);
					connection.query(query, function(error, rows){
						if (error) {
							res.json({
									"status"	: 403,
									"auth"		: false,
									"massage"	: "microcontroller id not found.!"
									});
						}else{
							res.json({
									"status"	: 200,
									"auth"		: true,
									"massage"	: "user data changed successfully.!"
									});
						}

					});


				}else{
					res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "user id not found.!"
					});
				}
				
			}

		});


	}else{
		res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "the parameter you submitted is missing / empty.!"
				});
	}
}

exports.delete_user =function(req, res){

	var post = {
		id 	: req.body.id
	}

	if (post.id) {

	var query = "SELECT * FROM ?? WHERE ??=?";
	var table = ["iot_users", "id", post.id];

	query = mysql.format(query,table);
	connection.query(query, function(error, rows){
		if (error) {
			console.log(error);
		}else{
			if (rows.length){

				var query = "DELETE FROM ?? WHERE ??=?";
				var table = ["iot_users", "id", post.id];

				query = mysql.format(query,table);
				connection.query(query, function(error, rows){
					if (error) {

						res.json({
						"status"	: 401,
						"auth"		: false,
						"massage"	: error
						});

						console.log(error);

					}else{
						res.json({
						"status"	: 200,
						"auth"		: true,
						"massage"	: "user deleted successfully.!"
						});
					}

				});

			}else{
				res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "user id not found.!"
				});
			}
		}

	});

	}else{
				res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "the parameter passed is empty.!!"
					});
	}


}

exports.edite_mc = function(req, res){
	var post = {
		id 						: req.body.id,
		iot_mc_device_key 		: req.body.iot_mc_device_key,
		iot_mc_device_name 		: req.body.	iot_mc_device_name,
	}

	if (post.id && post.iot_mc_device_key && post.iot_mc_device_name) {

		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ["iot_microcontrollers", "id", post.id];

		query = mysql.format(query,table);
		connection.query(query, function(error, rows){
			if (error) {
				console.log(error);
			}else{

				if (rows.length) {

					var password = rows[0].iot_usr_password; 

					var query = "UPDATE ?? SET iot_mc_device_key=?, iot_mc_device_name=? WHERE id=?";
					var table = ["iot_microcontrollers", post.iot_mc_device_key, post.iot_mc_device_name, post.id];

					query = mysql.format(query,table);
					connection.query(query, function(error, rows){
						if (error) {
							res.json({
									"status"	: 403,
									"auth"		: false,
									"massage"	: "microcontroller id not found.!"
									});
						}else{
							res.json({
									"status"	: 200,
									"auth"		: true,
									"massage"	: "microcontroller data changed successfully.!"
									});
						}

					});


				}else{
					res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "microcontroller id not found.!"
					});
				}
				
			}

		});


	}else{
		res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "the parameter you submitted is missing / empty.!"
				});
	}
}

exports.delete_mc =function(req, res){

	var post = {
		id 	: req.body.id
	}

	if (post.id) {

	var query = "SELECT * FROM ?? WHERE ??=?";
	var table = ["iot_microcontrollers", "id", post.id];

	query = mysql.format(query,table);
	connection.query(query, function(error, rows){
		if (error) {
			console.log(error);
		}else{
			if (rows.length){

				var query = "DELETE FROM ?? WHERE ??=?";
				var table = ["iot_microcontrollers", "id", post.id];

				query = mysql.format(query,table);
				connection.query(query, function(error, rows){
					if (error) {

						res.json({
						"status"	: 401,
						"auth"		: false,
						"massage"	: "can't delete MC because it's still used by the user.!"
						});

						console.log(error);

					}else{
						res.json({
						"status"	: 200,
						"auth"		: true,
						"massage"	: "microcontrollers deleted successfully.!"
						});
					}

				});

			}else{
				res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "microcontrollers id not found.!"
				});
			}
		}

	});

	}else{
				res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "the parameter passed is empty.!!"
					});
	}


}

exports.allUser = function(req, res){

				var query = "SELECT * FROM ??";
				var table = ["iot_users"];

				query = mysql.format(query,table);
				connection.query(query, function(error, rows){
					if (error) {

						res.json({
						"status"	: 401,
						"auth"		: false,
						"massage"	: error
						});

						console.log(error);

					}else{
						res.json({
						"status"	: 200,
						"auth"		: true,
						"massage"	: "successfully.!",
						"allUser"   : rows
						});

					}

				});
}

exports.byId = function(req, res){

var	post = {
		id : req.body.id
	}

				if (post.id) {

				var query = "SELECT * FROM ?? WHERE id=?";
				var table = ["iot_users", post.id];

				query = mysql.format(query,table);
				connection.query(query, function(error, rows){
					if (error) {

						res.json({
						"status"	: 401,
						"auth"		: false,
						"massage"	: error
						});

						console.log(error);

					}else{
						if (rows.length) {
						res.json({
						"status"	: 200,
						"auth"		: true,
						"massage"	: "successfully.!",
						"allUser"   : rows
						});
						}else{
							res.json({
							"status"	: 401,
							"auth"		: false,
							"massage"	: 'user not found.!'
							});
						}

					}

				});

			}else{
				res.json({
						"status"	: 401,
						"auth"		: false,
						"massage"	: "empty / insufficient parameter.!"
						});
			}
}

exports.allMC = function(req, res){

				var query = "SELECT * FROM ??";
				var table = ["iot_microcontrollers"];

				query = mysql.format(query,table);
				connection.query(query, function(error, rows){
					if (error) {

						res.json({
						"status"	: 401,
						"auth"		: false,
						"massage"	: error
						});

						console.log(error);

					}else{
						res.json({
						"status"	: 200,
						"auth"		: true,
						"massage"	: "successfully.!",
						"allUser"   : rows
						});

					}

				});
}

exports.MCbyID= function(req, res){

var	post = {
		id : req.body.id
	}

				if (post.id) {

				var query = "SELECT * FROM ?? WHERE id=?";
				var table = ["iot_microcontrollers", post.id];

				query = mysql.format(query,table);
				connection.query(query, function(error, rows){
					if (error) {

						res.json({
						"status"	: 401,
						"auth"		: false,
						"massage"	: error
						});

						console.log(error);

					}else{
						if (rows.length) {
						res.json({
						"status"	: 200,
						"auth"		: true,
						"massage"	: "successfully.!",
						"allUser"   : rows
						});
						}else{
							res.json({
							"status"	: 401,
							"auth"		: false,
							"massage"	: 'MC not found.!'
							});
						}

					}

				});

			}else{
				res.json({
						"status"	: 401,
						"auth"		: false,
						"massage"	: "empty / insufficient parameter.!"
						});
			}
}