module.exports = function cekToken(socket, data) {

const jwt = require('jsonwebtoken');
const config = require('../config/secret');

	console.log(data);

	var tokenWhithBearer = data.token;
		console.log(tokenWhithBearer);
		if(tokenWhithBearer){
			//proses verifikasi token
			var token = data.token.split(' ')[1];

			jwt.verify(tokenWhithBearer, config.secret, function(err, decoded){
				if(err){
					//return res.status(401).send({auth:false, message:'Token tidak terdaftar.!'});
					console.log({auth:false, message:'Token tidak terdaftar.!'});
				}else{
						//Jika benar gas bor
						//req.auth = decoded;
						var id_user = decoded.rows[0].id;
						console.log(decoded);
						//next();
				}
			});
		}else{
			//return res.status(401).send({auth:false, message:'Token tidak tersedia.!'});
			console.log({auth:false, message:'Token tidak tersedia.!'});
		}
	
};