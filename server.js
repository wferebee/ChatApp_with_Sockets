const express = require('express');
const path = require('path'); // to serve specific files whennroutes are hit
const morgan = require('morgan');
const app = express();


/*   ---------------------------------------------------- */

var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('public')); // to serve static files
app.use(morgan('dev'));
var PORT = process.env.PORT || 3000; // PORT = 3000 or whatever the enviornmanet sets it to


app.get("/", (req, res, next) => { // Just setting up to route to the main index page



   res.sendFile(path.join(__dirname, '/public', '/html', 'login.html'));
})


app.get("/chat", (req, res, next) => {
   res.sendFile(path.join(__dirname, '/public', '/html', 'chat.html'));


var clients = 0;
users = [];
io.on('connection', function (socket) {
   console.log('A user connected');
   socket.on('setUsername', function (data) {
      console.log(data);

      if (users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {
            username: data
         });
         clients++;
         socket.emit('newclientconnect', {
            description: 'Hey, welcome!'
         });
         socket.broadcast.emit('newclientconnect', {
            description: clients + ' clients connected!'
         })
         socket.on('disconnect', function () {
            clients--;
            socket.broadcast.emit('newclientconnect', {
               description: clients + ' clients connected!'
            })
         });

      }
   });

   socket.on('msg', function (data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});


})


http.listen(PORT, () => {
   console.log('listening on *:3000');
});