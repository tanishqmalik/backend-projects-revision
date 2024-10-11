const express = require('express')
const app = express();
const port = 3000;

const path = require('path')
const fs = require('fs');
const { isUtf8 } = require('buffer');
// const { urlencoded } = require('body-parser');

// middlewares

// app.use((req,res)=>{
//     res.send("hello")
// })

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended : true}))

app.set('view engine', 'ejs');

app.get('/', (req,res)=> {
    fs.readdir('./files', (err, files)=>{
        res.render('Landing',{files : files})
    })
})

app.post('/create', (req,res)=>{
    fs.writeFile(`./files/${req.body.filename}.txt`,req.body.textarea, (err)=>{
        res.redirect('/')
    })
})

app.get('/viewdata/:filename',  (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, (err, filedata)=>{
        res.render('Filedata', {filename: req.params.filename, filedata});
    })
})

app.get('/updatetitle/:filename', (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, (err,filedata)=>{
        res.render('updatetitle', {filename: req.params.filename, filedata});
    })
})

app.post(`/updatetitle/:filename`,(req,res)=>{
    fs.rename(`./files/${req.body.initial}`, `./files/${req.body.updatetitle.split(' ').join(' ')}.txt`, (err)=>{
        res.redirect('/')
    })
})

app.get('/updatedata/:filename/:filedata', (req,res)=>{
    res.render('updatedata',{filename: req.params.filename, filedata: req.params.filedata})
})

app.post('/updatedata/:filename/:filedata', (req,res)=>{
    fs.writeFile(`./files/${req.params.filename}`, req.body.updatedata, (err)=>{
        res.redirect('/')
    })
})

app.get('/deletefile/:filename', (req,res)=>{
    fs.unlink(`./files/${req.params.filename}`, (err)=>{
        res.redirect('/')
    })
})

app.listen(port, ()=>{
    console.log(`your server is running on port ${port}`);
})