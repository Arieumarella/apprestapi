'use strict';

var respon = require('./res');
var connection = require('./koneksi');
const response = require('express');

exports.index = function (req, res) {
    respon.ok("Aplikasi REST Berjalan Bor!", res);
};

//menampilkan semua data relay
exports.tampilsemuarelay = function(req, res){
	connection.query('SELECT * FROM iot_relays', function(error, rows, fileds){
		if(error){
			console.log(error);
		}else{
			respon.ok(rows, res)
		}
	});
};

//Menampilkan data relay berdasarkan id
exports.m_tampilrelayid = function(req, res){
	var id = req.body.id;
	connection.query('SELECT * FROM iot_relays WHERE id = ?',[id],
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				if (rows.length == 0) {
					respon.no('Relay Not Found..!', res);
				}else{
				respon.ok(rows, res);
			}
			}
	});
};

//Menambahkan data relay
exports.m_tambahrelay = function(req, res){
	var iot_relay_name = req.body.iot_relay_name;
	var iot_relay_condition = req.body.iot_relay_condition;
	var iot_relay_pin = req.body.iot_relay_pin;
	var iot_mc_id = req.body.iot_mc_id;
	var iot_user_id = req.body.iot_user_id;

	if (iot_relay_name && iot_relay_condition && iot_relay_pin && iot_mc_id && iot_user_id) {

		connection.query('SELECT * FROM `iot_relays` WHERE iot_mc_id=? AND iot_relay_pin=?',
				[iot_mc_id, iot_relay_pin],
				function(error, rows, fileds){
					if(error){
						console.log(error);
					}else{
						if (rows.length) {
							respon.no("the microcontroller is already using this pin please input another pin.!", res);
						}else{
							connection.query('SELECT * FROM `iot_relays` WHERE iot_relay_name= ? OR iot_relay_pin= ?', [iot_relay_name, iot_relay_pin],
							function(error, rows, fileds){
								if (rows.length == 0) {

									connection.query('INSERT INTO iot_relays (iot_relay_name,iot_relay_condition,iot_relay_pin,iot_mc_id,iot_user_id) VALUES(?,?,?,?,?)',
									[iot_relay_name, iot_relay_condition, iot_relay_pin, iot_mc_id, iot_user_id],
									function(error, rows, fileds){
										if(error){
											console.log(error);
										}else{
											respon.ok("Successfully Adding Relay Data.!", res);
										}
									});
								}else{
									respon.no("username or pin already exists.!", res);
								}
							});
						}
					}
				});
	}else{
		respon.no("The parameter you creased is empty \ missing. !", res);
	}
};

//Edite data rilay berdasarkan id
exports.m_editerilay = function(req, res){
	var id = req.body.id;
	var iot_relay_name = req.body.iot_relay_name;
	var iot_relay_condition = req.body.iot_relay_condition;
	var iot_relay_pin = req.body.iot_relay_pin;
	var iot_mc_id = req.body.iot_mc_id;
	var iot_user_id = req.body.iot_user_id;

	if (id && iot_relay_name && iot_relay_condition && iot_relay_pin && iot_mc_id && iot_user_id) {

	connection.query('SELECT * FROM `iot_relays` WHERE id=? AND iot_mc_id=? AND iot_user_id=?',
		[id, iot_mc_id, iot_user_id],
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				if (rows.length) {

					connection.query('SELECT * FROM `iot_relays` WHERE id=? AND iot_mc_id=? AND iot_relay_pin=?',
						[id,iot_mc_id,iot_relay_pin],
					function(error, rows, fileds){
						if(error){
							console.log(error);
						}else{
							if (rows.length) {
								respon.no("The pin has been used, please change to another pin.!", res);
							}else{

								connection.query('UPDATE iot_relays SET iot_relay_name=?, iot_relay_condition=?, iot_relay_pin=?, iot_mc_id=?, iot_user_id=? WHERE id=?',
								[iot_relay_name,iot_relay_condition,iot_relay_pin,iot_mc_id,iot_user_id,id],
								function(error, rows, fileds){
									if(error){
										console.log(error);
									}else{
										respon.ok("Successfully Editing Data.!", res)
									}
								});
							}
						}
					});
				}else{
					respon.no('id & id_mcd & id_user parameters dont match ..!', res);
				}
			}
		});	
	}else{
		respon.no('The parameter you creased is empty \ missing. !', res);
	}
};

//Hapus data relay
exports.m_hapusrelay = function(req, res){
	var id = req.body.id;

	if (id) {
	connection.query('SELECT * FROM `iot_relays` WHERE id=?', [id],
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				if (rows.length) {
					connection.query('DELETE FROM iot_relays WHERE id=?', [id],
					function(error, rows, fileds){
						if(error){
							console.log(error);
						}else{
							respon.ok("Data has been deleted.!", res);
						}
					});
				}else{
					respon.no("the microcontroller with the id does not exist.!", res);
				}
			}
		});
	}else{
		respon.no("the parameter passed is less \ empty.!", res);
	}
};


//on off data relay
exports.kondisirelay = function(req, res){
	var id = req.body.id;
	var kondisi = req.body.kondisi;

	connection.query('UPDATE relay SET kondisi=? WHERE id=?',[kondisi,id],
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				respon.ok("Berhasil Bor.!", res)
			}
		});
};

//get relay
exports.m_mikrogetrelay = function(req, res){
	connection.query('SELECT * FROM relay', function(error, rows, fileds){
		if(error){
			console.log(error);
		}else{
			respon.ok(rows, res)
		}
	});
};