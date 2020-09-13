const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
	return function(req, res, next){
		//cek authorization header
		var tokenWhithBearer = req.headers.authorization;
		console.log('ini adalah tokenWhithBearer '+tokenWhithBearer);
		if(tokenWhithBearer){
			//proses verifikasi token
			var token = tokenWhithBearer.split(' ')[1];

			console.log('ini adalah token ' +token);

			jwt.verify(token, config.secret, function(err, decoded){
				if(err){
					return res.status(401).send({auth:false, message:'Token tidak terdaftar.!'});
				}else{
						//Jika benar gas bor
						//req.auth = decoded;
						var id_user = decoded.rows[0].id;
						console.log(id_user);
						next();
				}
			});
		}else{
			return res.status(401).send({auth:false, message:'Token tidak tersedia.!'});
		}
	}
}

module.exports = verifikasi;