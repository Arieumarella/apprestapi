'user strict';

exports.ok = function (values, res) {
    var data = {
        'status': 200,
        'massage': values
    };

    res.json(data);
    res.end();
};

exports.no = function (values, res) {
    var data = {
        'status': 403,
        'massage': values
    };

    res.json(data);
    res.end();
};


exports.yak = function (values, res) {
    var data = {
        'status': 200,
        'massage': values
    };

    res.json(data);
    res.end();
};

// respond untuk relay kepunyaan
exports.oknested = function (values, res){
	const hasil = values.reduce((akumulasikan, item)=>{
		if(akumulasikan[item.nama]){
			const group = akumulasikan[item.nama];
			if(Array.isArray(group.nama_relay)){
				group.nama_relay.push(item.nama_relay);
			}else{
				group.nama_relay = [group.nama_relay, item.nama_relay];
			}
		}else{
			akumulasikan[item.nama] = item;
		}
		return akumulasikan;
	}, {});

	    var data = {
        'status': 200,
        'values': hasil
    };

    res.json(data);
    res.end();
}