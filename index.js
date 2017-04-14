var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var numberOfUsersOnline = 0;

app.get('/helloworld', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    numberOfUsersOnline++;
    socket.broadcast.emit('user connected');

    console.log('users Online: ' + numberOfUsersOnline);
    io.emit('system message', 'user connected. usercount:'+numberOfUsersOnline );


    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });


    socket.on('disconnect', function(){
        numberOfUsersOnline--;

        console.log('users Online: ' + numberOfUsersOnline);
        io.emit('system message', 'user disconnected. usercount:'+numberOfUsersOnline );
        
    });
});



http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:5000');
});
    