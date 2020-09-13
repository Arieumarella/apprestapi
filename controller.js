'use strict';

var respon = require('./res');
var connection = require('./koneksi');
const response = require('express');

exports.index = function (req, res) {
    respon.ok("Aplikasi REST Berjalan Bor!", res);
};

//menampilkan semua data relay
exports.tampilsemuarelay = function(req, res){
	connection.query('SELECT * FROM relay', function(error, rows, fileds){
		if(error){
			console.log(error);
		}else{
			respon.ok(rows, res)
		}
	});
};

//Menampilkan data relay berdasarkan id
exports.m_tampilrelayid = function(req, res){
	var id = req.body.id_relay;
	connection.query('SELECT * FROM relay WHERE id = ?',[id],
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				respon.ok(rows, res)
			}
	});
};

//Menambahkan data relay
exports.m_tambahrelay = function(req, res){
	var nama_relay = req.body.nama_relay;
	var kondisi = req.body.kondisi;
	var pin = req.body.pin;
	var id_device = req.body.id_device;
	var id_user = req.body.id_user;

	connection.query('INSERT INTO relay (nama_relay,kondisi,pin,id_device,id_user) VALUES(?,?,?,?,?)',
		[nama_relay, kondisi, pin, id_device, id_user],
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				respon.ok("Berhasil Menambahkan Data.!", res)
			}
		});
};

//Edite data rilay berdasarkan id
exports.m_editerilay = function(req, res){
	var id_relay = req.body.id_relay;
	var nama_relay = req.body.nama_relay;
	var kondisi = req.body.kondisi;
	var pin = req.body.pin;
	var id_device = req.body.id_device;
	var id_user = req.body.id_user;

	connection.query('UPDATE relay SET nama_relay=?, kondisi=?, pin=?, id_device=?, id_user=? WHERE id=?',[nama_relay,kondisi,pin,id_device,id_user,id_relay],
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				respon.ok("Berhasil Mengedit Data.!", res)
			}
		});
};

//Hapus data relay
exports.m_hapusrelay = function(req, res){
	var id_relay = req.body.id_relay;

	connection.query('DELETE FROM relay WHERE id=?', [id_relay],
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				respon.ok("Data berhsil dihapus.!", res)
			}
		});
};

//menampilkan relay_kepunyaan
exports.relay_kepunyaan = function(req, res){
	connection.query('SELECT user.id, user.nama, relay.id, relay.nama_relay FROM relay_kepunyaan JOIN relay JOIN user WHERE relay_kepunyaan.id_relay = relay.id AND relay_kepunyaan.id_user = user.id ORDER BY relay_kepunyaan.id',
		function(error, rows, fileds){
			if(error){
				console.log(error);
			}else{
				respon.oknested(rows, res);
			}
		}
		)
}

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