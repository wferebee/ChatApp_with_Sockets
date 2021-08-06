const express = require('express');
const path = require('path'); // to serve specific files whennroutes are hit
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const userRouter = require('./src/routers/user')
const PORT = 4000
require('./src/db/db')
require('dotenv').config()

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chat = require('./public/js/chat')(io); // has to go after the: const io = require('socket.io')(http);

app.use(cookieParser());
app.use(express.json())
app.use(morgan("dev"));
app.use(express.static('public')); // to serve static files
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

http.listen(PORT, () => {
   console.log(`listening on ${PORT}`);
});