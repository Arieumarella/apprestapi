var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var ip = require('ip');
var jwt = require('jsonwebtoken');
var config = require('../config/secretAdmin');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


//controler registrasi admin
exports.registerAdmin = async function (req, res){

	var pas  = req.body.usr_password;
	var	hash1 = await bcrypt.hash(pas, salt);
	var date = new Date();

	var post = {
		usr_name 			: req.body.usr_name,
		usr_username 		: req.body.usr_username,
		usr_email			: req.body.usr_email,
		usr_password 		: hash1,
		usr_picture 		: 'mimin.png',
		usr_role_code		: req.body.usr_role_code,
		usr_status			: req.body.usr_status,
		created_at			: date.getFullYear() +  "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
	}

	console.log(post);

	

	if(post.usr_name && post.usr_username && post.usr_email && post.usr_password && post.usr_role_code && post.usr_status){

	var query = "SELECT * FROM users WHERE usr_username=? OR usr_email=?";
	var table = [post.usr_username, post.usr_email];

	query = mysql.format(query,table);

	connection.query(query, function(error, rows){
		if(error){
			console.log(error);
		}else{
			if(rows.length == 0){


				var query = "INSERT INTO ?? SET ?";
				var table = ["users"];

				query = mysql.format(query,table);
				connection.query(query, post, function(error, rows){
					if(error){
						console.log(error);
					}else{
						response.ok("registration was successful.!", res);
					}
				});
			}else{
				response.no("username / email already exists.!",res);
			}
		}
	})

	}else{
		return res.status(401).send({status: 401, message:'the parameter submitted is empty / insufficient.!'});
		console.log(error);
	}
	
}

exports.loginAdmin = async function(req, response){
	var post = {
		usr_username : req.body.usr_username,
		usr_password : req.body.usr_password
	};

	if (post.usr_username && post.usr_password) {

	

	//var cek = bcrypt.compareSync(iniSaya, hash);

	var query = "SELECT * FROM ?? WHERE ??=?";
	var table = ["users", "usr_username", post.usr_username];

	query = mysql.format(query,table);
	connection.query(query, function(error, rows){
		if(error){
			console.log(error);
		}else{
			if(rows.length == 1){

			var	id = rows[0].id;
			//var hash = post.password;
			console.log(post.usr_password);

			 bcrypt.compare(post.usr_password, rows[0].usr_password,async function(err, res) {

				if (err) {
					console.log(err);
					
				}else{
					if (res) {
						console.log(rows);
						var token = jwt.sign({rows}, config.secret,{
						expiresIn: '24h'
					});

					

					var data = {
						iot_user_id_admin: id,
						iot_at_access_token: token,

						iot_at_ip: ip.address()
					}

					var query ="INSERT INTO ?? SET ?";
					var table = ["iot_access_token"];

					query = mysql.format(query,table);
					connection.query(query, data, function(error, rows){
						if(error){
							console.log(error);
						}else{	
									return response.status(200).send({status: 200, success:true, message:'JWT created successfully.!', id_user: data.iot_user_id_admin, token:token });	
								}
							
							});
					}else{
						response.json({
								"error": true,
								"massage": "password wrong .!.!"
							});
					}
				}

			});
			
			}else{
				response.json({
					"error": true,
					"massage": "username not found.!"
				});
			}
		}
	});

	}else{
		response.json({
			"status"  	: 401,
			"auth"	  	: false,
			"massage"	: "parameter is missing / empty.!"

		});
	}
}

exports.editeAdmin = function(req, res){
	var post = {
		id 					: req.body.id,
		usr_name 			: req.body.usr_name,
		usr_username 		: req.body.usr_username,
		usr_email	 		: req.body.usr_email,
		usr_picture			: req.body.usr_picture,
		usr_role_code		: req.body.usr_role_code,
		usr_status			: 'active',


	}

	if (post.id && post.usr_name && post.usr_username && post.usr_email && post.usr_picture && post.usr_role_code) {

		var query = "SELECT * FROM ?? WHERE ??=?";
		var table = ["users", "id", post.id];

		query = mysql.format(query,table);
		connection.query(query, function(error, rows){
			if (error) {
				console.log(error);
			}else{

				if (rows.length) {

					var password = rows[0].usr_password; 

					var query = "UPDATE ?? SET usr_name=?, usr_username=?, usr_email=?,usr_password=?, usr_picture=?, usr_role_code=?, usr_status=? WHERE id=?";
					var table = ["users", post.usr_name, post.usr_username, post.usr_email, password, post.usr_picture, post.usr_role_code, post.usr_status, post.id];

					query = mysql.format(query,table);
					connection.query(query, function(error, rows){
						if (error) {
							res.json({
									"status"	: 403,
									"auth"		: false,
									"massage"	: "Admin id  not found.!"
									});
							console.log(error);
						}else{
							res.json({
									"status"	: 200,
									"auth"		: true,
									"massage"	: "admin data changed successfully.!"
									});
						}

					});


				}else{
					res.json({
					"status"	: 401,
					"auth"		: false,
					"massage"	: "admin id not found.!"
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


exports.deleteAdmin =function(req, res){

	var post = {
		id 	: req.body.id
	}

	if (post.id) {

	var query = "SELECT * FROM ?? WHERE ??=?";
	var table = ["users", "id", post.id];

	query = mysql.format(query,table);
	connection.query(query, function(error, rows){
		if (error) {
			console.log(error);
		}else{
			if (rows.length){

				var query = "DELETE FROM ?? WHERE ??=?";
				var table = ["users", "id", post.id];

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

exports.dataadmin = function(req, res){
	var query = "SELECT * FROM ?? ";
	var table = ["users"];

	query = mysql.format(query,table);
	connection.query(query, function(error, rows){
		if (error) {
			console.log(error);
			res.json({
						"status"	: 401,
						"auth"		: true,
						"massage"	: error
						});
		}else{
			res.json({
						"status"	: 200,
						"auth"		: true,
						"massage"	: "successfully.!",
						"dataAdmin" : rows
						});
		}

	});
}
