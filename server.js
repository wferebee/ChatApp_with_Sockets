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


io.on('connection', function(socket) {
    console.log('\n A user connected \n');
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('\n A user disconnected \n');
    });
 });



 http.listen(PORT, () => {
    console.log('listening on *:3000');
 });