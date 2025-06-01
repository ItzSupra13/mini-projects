const express = require('express');
const app = express();
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cookieParser = require('cookie-parser');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/create', (req,res)=>{
    let user;
    let {username, password, age, email} = req.body;
    console.log(req.body, username, password, age, email);
    if (username && password && age && email) {
        bcrypt.genSalt(5, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                console.log("Inside hash", hash);
                user = await userModel.create({username, 
                    password: hash, 
                    age, 
                    email});
                console.log("User created", user);
                let token = jwt.sign({email}, "qwerty")
                res.cookie("token", token);
                res.send(user);
            });
        });
    }
    else {
        res.status(400).send('All fields are required');
    }
    // res.redirect('/');
});

app.get('/logout', async (req, res) => {
    res.cookie("token",""); 
    res.redirect('/');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    let user = await userModel.findOne({email: req.body.email}); //If none found gives null
    if(!user) return res.send('Something went wrong'); //writing this is better ethically as it does not reveal whether the email exists or not
    bcrypt.compare(req.body.password, user.password, (error, result)=>{
        if (error) {
            console.log("Error in comparing password", error);
            return res.status(500).send('Internal Server Error');
        }
        if (result) {
            let token = jwt.sign({email: user.email}, "qwerty");
            res.cookie("token", token);
            return res.send('Login successful');
        } else {
            return res.send('Invalid credentials');
        }
    });
});

app.listen(3000, ()=> {
    console.log('Server is running on http://localhost:3000');
});