module.exports = function onOffRelay(socket, data) {

const jwt = require('jsonwebtoken');
const config = require('../config/secret');
var connection = require('../koneksi');
var mysql = require('mysql');

	console.log(data);

	var tokenWhithBearer = data.token;
		//console.log(tokenWhithBearer);
		if(tokenWhithBearer){
			//proses verifikasi token
			var token = data.token.split(' ')[1];

			jwt.verify(tokenWhithBearer, config.secret, function(err, decoded){
				if(err){
					//return res.status(401).send({auth:false, message:'Token tidak terdaftar.!'});
					console.log({status:403, auth:false, message:'Token tidak terdaftar.!'});
					socket.emit('onOff.Balas',{status:403, auth:false, message:'Token tidak terdaftar.!'});
					

				}else{
						//Jika benar gas bor
						//req.auth = decoded;
						var data1 = {
							id_user 	: decoded.rows[0].id,
							id_device	: data.id_device,
							id_relay	: data.id_relay,
							kondisi		: data.kondisi
						} 

						if (data1.id_device && data1.id_relay && data1.kondisi) {

				
							var query = "SELECT * FROM ?? WHERE ??=? AND ??=? AND ??=?";
							var table = ["relay", "id", data1.id_relay, "id_user", data1.id_user, "id_device", data1.id_device];
							query = mysql.format(query,table);

							connection.query(query, function(error, rows){
								if(error){
									console.log(error);
									socket.emit('onOff.Balas',error);
								}else{
									if (rows.length == 1) {
										var query = "UPDATE ?? SET ??=? WHERE ??=?";
										var table = ["relay", "kondisi", data1.kondisi, "id", data1.id_relay];
										query = mysql.format(query,table);

										connection.query(query, function(err, rows){
											if (err) {
												console.log(err);
												socket.emit('onOff.Balas',"error boor");

											}else{
															
												var query = "SELECT * FROM ?? WHERE ??=? AND ??=? AND ??=?";
												var table = ["relay", "id", data1.id_relay, "id_user", data1.id_user, "id_device", data1.id_device];
												query = mysql.format(query,table);

												connection.query(query, function(err, rows){
													if (err) {
														socket.emit('onOff.Balas', err);
													}else{
														var data3 = {
															status:200, 
															auth:true, 
															message:'Data relay udah di ubah borr.!!', 
															dataRelay: rows[0]
														}

														//console.log(data3.dataRelay.id_user);

														if (data3.dataRelay.id_user != 23) {

															socket.emit('onOff.Balas',data3);
															console.log(data3);

														}else{

															if (data1.kondisi != 1) {

																var data4 = {
																	status:200,
																	auth: true,
																	message:'Relay '+data3.dataRelay.nama_relay+ ' Telah dimatikan nih boor',
																	dataRelay: data3.dataRelay
																}

																socket.broadcast.emit('onOff.Balas', data4);
																socket.emit('onOff.Balas', data4);
																

															}else{

																var data5 = {
																	status:200,
																	auth: true,
																	message:'Relay '+data3.dataRelay.nama_relay+ ' Telah dinyalakan nih boor',
																	dataRelay: data3.dataRelay
																}

																socket.broadcast.emit('onOff.Balas', data5);
																socket.emit('onOff.Balas', data5);

															}

															
														}
														
													}
												});
											}
										});
									}else{

										socket.emit('onOff.Balas',{status:403, auth:false, message:'id_relas / id_user / id_device anda ga cocok bor.! '});

									}	
								}
							});
							
						}else{
						console.log({status:403, auth:false, message:'data yg diperlukan kosong'});
						//console.log(data.kondisi);
						//next();
						socket.emit('onOff.Balas',{status:403, auth:false, message:'id_relas / id_user / id_device anda ada yg kosong bor.!'});

					}
				}
			});
		}else{
			//return res.status(401).send({auth:false, message:'Token tidak tersedia.!'});
			console.log({auth:false, message:'Token tidak tersedia.!'});
			socket.emit('onOff.Balas',{status:403, auth:false, message:'Token tidak tersedia bor.!'});
		}
	
};