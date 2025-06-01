import express from 'express';
import path from 'path';
const app = express();
import fs from 'fs';

//parsers for form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//2 lines help in using form 

app.set('view engine', 'ejs');
//Backend will render the ejs file and send it to the client

// app.use(express.static(path.join(__dirname, 'public')));
//static files will be served from public folder

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory');
        }
        res.render('index', { files: files });
    });
});

//render main page

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details , (err)=> {
        res.redirect("/");
    });
});

app.get('/file/:filename', (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data)=>{
        res.render('show', {filename: req.params.filename, filedata: data});  
    }); 
});

app.get('/edit/:filename', (req,res)=>{
    res.render('edit', {filename: req.params.filename}); 
}); 

app.post(`/edit`, (req, res)=>{
    // console.log(req.body); requires the name thing in ejs template
    fs.rename(`./files/${req.body.previous}`,
        `./files/${req.body.new}`, (err)=>{
        res.redirect("/");
    })
});

app.post('/delete', (req,res)=>{
    let key = Object.keys(req.body)[0];
    fs.unlink(`./files/${key}`, (err)=>{
        res.redirect("/");
    })
});

//dynamic routING

// app.get('/profile/:mem', (req, res) => {
//     res.send(`Hello ${req.params.mem}`);
// });

// app.get('/profile/:username/:age', (req, res) => {
//     res.send(req.params);
// });
//the word after the colon is a variable and it will be passed in the request object

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});