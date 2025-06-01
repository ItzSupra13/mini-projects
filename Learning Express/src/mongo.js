import express from 'express';
import userModel from './usermodel.js';

const app = express();

app.get('/', (req,res)=>{
    res.send('HI DB');
});

app.get('/create', async (req, res) => {
    let created = await userModel.create({ 
        name: 'supra',
        email: 'example@example.com',
        username: 'supra13'
    }) //async code 
    res.send(created);
});

app.get('/update', async (req, res) => {
    
    let updated = userModel.findOneAndUpdate({name: 'supra'}, {name: "supra updated"}, {new: true}, (err, data) => {
        if (err) {
            return res.status(500).send('Error updating user');
        }
        res.send(data);
    });
    res.send(updated);
});

app.get("/read", async (req, res) => {
    let users = await userModel.find({}); //find all users
        // let users = await userModel.find({name: 'supra'}); //find users with name 'supra'
    res.send(users);
});

app.get('/delete', async (req, res) => {
    let deleted = await userModel.findOneAndDelete({name: 'supra updated'}, (err, data) => {
        if (err) {
            return res.status(500).send('Error deleting user');
        }
        res.send(data);
    });
    res.send(deleted);
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});