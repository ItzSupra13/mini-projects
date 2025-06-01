import express from 'express';
//const express = require('express');
const app = express();
const port = 3500;
const hostname = "127.0.0.1";

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//above is the boiler plate for every express server

//Middleware stuff
app.use((req, res, next) => {
    console.log('Middleware is running');
    next();
});

app.use((req, res, next) => {
    console.log('Middleware is running again');
    next();
});

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!!!!!');
});

app.get('/first', (req, res) => {
    res.send('Hi there sexy! just made your first express server eh?');
});

// app.get('/second', (req, res) => {
//     res.send('Just used nodemon eh?');
// });