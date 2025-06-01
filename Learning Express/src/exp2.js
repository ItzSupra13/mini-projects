// require('dotenv').config(); // crashes with error so use es6
import 'dotenv/config'; // use this instead of require
import express from "express";

const app = express();
const port = process.env.PORT || 4000;
const hostname = "127.0.0.1";

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});//not a good professional way to do it



app.use(express.json());

let data = [];
let nextId = 1;


app.post('/datain', (req, res) => {
    const {name, age} = req.body;
    const newData = {id: nextId++, name, age};
    data.push(newData);
    res.status(201).send(newData);
});

//get all data
app.get('/datain', (req, res) => {
    res.status(200).send(data);
});

//find item by id
app.get('/datain/:id', (req, res) => {
    const item = data.find((item) => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Data not found');
    }
    res.status(200).send(item);
});

//edit item
app.put('/datain/:id', (req, res) => {
    const item = data.find((item) => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Data not found');
    }
    const {name, age} = req.body;
    item.name = name;
    item.age = age;
    res.status(200).send(item);
});

//delete the item
app.delete('/datain/:id', (req, res) => {
    const itemIndex = data.findIndex((item) => item.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).send('Data not found');
    }
    data.splice(itemIndex, 1);
    return res.status(204).send('deleted');
});