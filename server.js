const express = require('express');
const path = require('path'); // to serve specific files whennroutes are hit
const morgan = require('morgan'); // error middleware
const app = express();


app.use(express.static('public')); // to serve static files
app.use(morgan('dev')); // 'dev' is just the paramter that Type/ URL/ Status-Code/ Time-Elapsed

var PORT = process.env.PORT || 3000; // PORT = 3000 or whatever the enviornmanet sets it to

app.get("/", (req, res, next) => { // Just setting up to route to the main index page

    res.sendFile(path.join(__dirname, '/public', '/html', 'index.html'));
})

app.get("/extra", (req, res, next) => { // route to extra page

    res.sendFile(path.join(__dirname, '/public', '/html', 'extra.html'));
})

app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));