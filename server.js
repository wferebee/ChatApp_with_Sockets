const express = require('express');
const path = require('path'); // to serve specific files whennroutes are hit
const morgan = require('morgan');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = require("./public/js/chat")(io); // has to go after the: const io = require('socket.io')(http);

app.use(express.static('public')); // to serve static files
app.use(morgan('dev'));
var PORT = process.env.PORT || 3000; // PORT = 3000 or whatever the enviornmanet sets it to


app.get("/chat", (req, res, next) => { // Just setting up to route to the main index page
   res.sendFile(path.join(__dirname, '/public', '/html', 'login.html'));
})


app.get("/", (req, res, next) => {
   res.sendFile(path.join(__dirname, '/public', '/html', 'chat.html'));
});

http.listen(PORT, () => {
   console.log('listening on *:3000');
});