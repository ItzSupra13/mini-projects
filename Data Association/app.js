const express = require('express');
const app = express();

const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', async (req, res) => {
    let { name, username, password, age, email } = req.body;
    let user = await userModel.findOne({ email });
    // console.log(name, username, password, age, email);

    if(user) {return res.status(400).send("User already exists");}

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return res.status(500).send("Error generating salt");
        bcrypt.hash(password, salt, async (err, hash) => {
            if(err) return res.status(500).send("Error hashing password");
            try {
                console.log("starting user")
                let newUser = await userModel.create({
                    name,
                    username,
                    password: hash,
                    age,
                    email,
                    posts: []
                });
                console.log("user created")
                let token = await jwt.sign({email: email, userid: newUser._id}, "qwerty");
                res.cookie("token", token);
                console.log("token created")
                res.send("User created successfully");
            } catch (error) {
                res.status(500).send("Error creating user");
            }
        });
    });
});

//login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    let { username, password } = req.body;
    let user = await userModel.findOne({ username });
    // console.log(name, username, password, age, email);
    if(!user) {return res.status(400).send("Something went wrong");}

    bcrypt.compare(password, user.password, async (err, result) => {

        if(err) return res.status(500).send("Error comparing password");
        if(!result) return res.redirect('/login');

        let token = await jwt.sign({username: username, userid: user._id}, "qwerty");
        res.cookie("token", token);
        res.redirect('/dashboard'); 
    });
});

//logout
app.get('/logout', (req, res) => {
    res.cookie("token", ""); // Clear the cookie by setting it to an empty string and an expired date
    res.redirect('/login');
});

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    if(!user) return res.status(400).send("User not found");

    let post = await postModel.create({
        content: req.body.post,
        user: user._id
    });

    user.posts.push(post._id); // Add the post ID to the user's posts array
    await user.save(); // Save the user document to update the posts array
    res.redirect('/dashboard'); 
});

app.get('/dashboard', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email}).populate('posts'); // Populate the user field in posts
    res.render('dashboard', {user: user} );
});

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findById(req.params.id).populate('user'); // Populate the user field in posts
    if(post.likes.includes(req.user.userid)) {
        // If the user already liked the post, remove their like
        post.likes = post.likes.filter(like => like.toString() !== req.user.userid);
        console.log("User already liked the post, removing like");
    } else {
        post.likes.push(req.user.userid); // Add the user's ID to the likes array
        console.log("User liked the post");
    }
    await post.save();
    console.log(post); // Save the updated post document
    res.redirect('/dashboard' );
});

function isLoggedIn(req, res, next) {
    let token = req.cookies.token;
    if(!token) return res.redirect('/login');
    
    jwt.verify(token, "qwerty", (err, decoded) => {
        if(err) return res.status(401).send("Unauthorized");
        req.user = decoded; // Store the decoded user information in the request object
        next();
    });
} // Middleware to check if the user is logged in















// app.get('/create', async (req,res) => {
//     const user = await userModel.create({
//         username: 'Supra',
//         age: 30,
//         email: "hi@gmail.com"
//     });
//     res.send(user);
// });

// app.get('/post/create', async (req,res) => {
//     const post = await postModel.create({
//         postData: "This is a post",
//         user: "683af90d4bc6d2aedba6f2ad"
//     });
//     let user = await userModel.findOne({_id: "683af90d4bc6d2aedba6f2ad"});
//     user.posts.push(post._id);  //have to save since im manipulating externally instead of mongoose command
//     await user.save();
//     res.send({post: post, user: user});
// });

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});