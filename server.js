const express = require('express');
const bodyParser = require('body-parser');
var connection = require('./koneksi');
var morgan = require('morgan');
const app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http);

var onOffRelay = require('./middleware/onOffRelay');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req,res,next){
    req.io = io;
    next();
});
app.use(bodyParser.json());
app.use(morgan('dev'));

// memanggil routes

var routes = require('./routes');
routes(app);

//manggil routes baru yaitu rotes auth
app.use('/auth', require('./middleware'));

//rootes cilent test ws
app.get('/client1', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/client2', function(req, res){
    res.sendFile(__dirname+'/client2.html');
});

// koneksi socket
io.on('connection', function(socket){

	console.log('user baru terkoneksi dengan id socket = ' +socket.id);

    socket.on('fws.test', function(data){
    	console.log(data.someData);
    	if (data){
    		socket.emit('fws.test.res', 'oke dehs');
    	}else{
    		socket.emit('fws.test.res', 'data lu ksosng onta');
    	}
    });

    //fungsi on/off relay
    socket.on('onOffRelay', function(data){
    	//console.log(auth);
    	onOffRelay(socket, data);
    	
    });

	socket.on('disconnect',function(){
	console.log('user dengan id socket = '+socket.id +' telah disconnect');
	});
});





//memanggil routes relay

http.listen(2000, () => {
    console.log(`Server started on port`);
});





