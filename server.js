const express = require('express');
const path = require('path'); // to serve specific files whennroutes are hit
const morgan = require('morgan');
const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('public')); // to serve static files
app.use(morgan('dev'));
var PORT = process.env.PORT || 3000; // PORT = 3000 or whatever the enviornmanet sets it to


app.get("/", (req, res, next) => { // Just setting up to route to the main index page

    res.sendFile(path.join(__dirname, '/public', '/html', 'index.html'));
})


var clients = 0;
io.on('connection', function(socket) {
   clients++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   });
});



 http.listen(PORT, () => {
    console.log('listening on *:3000');
 });