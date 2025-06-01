const express = require('express');
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const app = express();
const userModel = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
}); 

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    console.log(users);
    res.render('read', { users });
}); 

app.post('/create', async (req, res) => {
    let {name, email, image} = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    });
    console.log(createdUser);
    res.redirect('/read');
}); 

app.get('/delete/:id', async (req, res) => {
    let users = await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read');
}); 

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});