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
					console.log({status:403, auth:false, message:'Token not registered.!'});
					socket.emit('onOff.Balas',{status:403, auth:false, message:'Token not registered.!'});
					

				}else{
						//Jika benar gas bor
						//req.auth = decoded;
						//console.log(decoded);
						var data1 = {
							iot_user_id 			: decoded.rows[0].id,
							iot_mc_id				: data.iot_mc_id,
							iot_id_relay			: data.iot_id_relay,
							iot_relay_condition		: data.iot_relay_condition	
						} 

						//console.log(data1);

						if (data1.iot_mc_id && data1.iot_id_relay && data1.iot_relay_condition) {

				
							var query = "SELECT * FROM ?? WHERE ??=? AND ??=? AND ??=?";
							var table = ["iot_relays", "id", data1.iot_id_relay, "iot_user_id", data1.iot_user_id, "iot_mc_id", data1.iot_mc_id];
							query = mysql.format(query,table);

							connection.query(query, function(error, rows){
								if(error){
									console.log(error);
									socket.emit('onOff.Balas',error);
								}else{
									if (rows.length == 1) {
										var query = "UPDATE ?? SET ??=? WHERE ??=?";
										var table = ["iot_relays", "iot_relay_condition", data1.iot_relay_condition, "id", data1.iot_id_relay];
										query = mysql.format(query,table);

										connection.query(query, function(err, rows){
											if (err) {
												console.log(err);
												socket.emit('onOff.Balas',"error boor");

											}else{
															
												var query = "SELECT * FROM ?? WHERE ??=? AND ??=? AND ??=?";
												var table = ["iot_relays", "id", data1.iot_id_relay, "iot_user_id", data1.iot_user_id, "iot_mc_id", data1.iot_mc_id];
												query = mysql.format(query,table);

												connection.query(query, function(err, rows){
													if (err) {
														socket.emit('onOff.Balas', err);
														console.log(err);
													}else{

														//console.log('ini adalah data 1' +data1);

														var data3 = {
															status:200, 
															auth:true, 
															message:'relay ' +rows[0].iot_relay_name+ ' has been turned on.!', 
															dataRelay: rows[0]
														}

														//jika id_user bukan id_user default maka kirim socket private 
														if (data3.dataRelay.iot_user_id != 1) {

															//jika relay dinyalakan
															if (data3.dataRelay.iot_relay_condition == 1) {

															socket.emit('onOff.Balas',data3);
															console.log(data3);

														}else{
															var data6 = {
															status:200, 
															auth:true, 
															message:'relay ' +rows[0].iot_relay_name+ ' has been turned Off.!', 
															dataRelay: rows[0]
															}

															socket.emit('onOff.Balas',data6);
														}

														}else{

															if (data1.iot_relay_condition != 1) {

																var data4 = {
																	status:200,
																	auth: true,
																	message:'Relay '+data3.dataRelay.iot_relay_name+ ' has been turned Off.!',
																	dataRelay: data3.dataRelay
																}

																socket.broadcast.emit('onOff.Balas', data4);
																socket.emit('onOff.Balas', data4);
																

															}else{

																var data5 = {
																	status:200,
																	auth: true,
																	message:'Relay '+data3.dataRelay.iot_relay_name+ ' has been turned on.!',
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

										socket.emit('onOff.Balas',{status:403, auth:false, message:'Your id_relas / id_user / id_device doesnt match the drill.! '});

									}	
								}
							});
							
						}else{
						console.log({status:403, auth:false, message:'the required data is empty'});
						//console.log(data.kondisi);
						//next();
						socket.emit('onOff.Balas',{status:403, auth:false, message:'id_relas / id_user / id_device you have an empty one.!'});

					}
				}
			});
		}else{
			//return res.status(401).send({auth:false, message:'Token tidak tersedia.!'});
			console.log({auth:false, message:'Token not available.!'});
			socket.emit('onOff.Balas',{status:403, auth:false, message:'Token not available.!'});
		}
	
};