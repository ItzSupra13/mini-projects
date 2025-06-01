//Server constantly forgets the user
//i -> Setting and reading cookies
//ii -> Using bcrypt for password encryption and decryption
//iii -> Using jwt, storing and retriving user data from jwt


const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const app = express();

app.use(cookieParser());

// app.get("/", (req, res) => {
// //     bcrypt.genSalt(5, function(err, salt) {
// //     bcrypt.hash("password", salt, function(err, hash) {
// //         // Store hash in your password DB.
// //         console.log(hash);
// //     });
// // });
// //     bcrypt.compare("password","$2b$05$8GgjA4Ar7vphdSWBmQqJoe3hOKVSYIncKQ/yWWsE1YDLHGH9XaqfW" ).then(function(result) {
// //         console.log(result); // true
// // });
// });

// app.get("/", (req,res)=>{
//     res.cookie("name", 'supra');
//     res.send("Cookie is set");
// });


// app.get('/read', (req, res)=>{
//     console.log(req.cookies);
//     res.send('Hi');
// })

app.get('/', (req,res)=>{
    let token = jwt.sign({email: "supra@example.com"}, "secretkey") //Very important secret key do not share to anyone
    res.cookie("token", token); //Setting the cookie with httpOnly flag
    console.log(token);
    res.send("Cookie is set with JWT");
})

app.get('/read', (req, res)=>{
    // console.log(req.cookies.token);
    let data = jwt.verify(req.cookies.token, "secretkey"); //Verifying the token
    console.log(data); //This will give the data stored in the token
    res.send('Token read successfully');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});