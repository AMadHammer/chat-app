var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/helloworld', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    socket.broadcast.emit('new user connected');
    console.log('a user connected');


    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });


    socket.on('disconnect', function(){
        console.log('user disconnected');
        socket.broadcast.emit('user disconnected');
    });
});



http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:3000');
});
    