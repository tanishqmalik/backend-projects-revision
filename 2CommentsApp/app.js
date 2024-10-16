const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');

app.use(urlencoded({extended:true}))
app.set('view engine', 'ejs');


let comments = [
    {
        id:uuidv4(),
        username:'tanishq',
        comment: 'hello ji'
    },
    {
        id:uuidv4(),
        username:'harsh',
        comment: 'kayise ho'
    },
    {
        id:uuidv4(),
        username:'yash',
        comment: 'yoo'
    },
    {
        id:uuidv4(),
        username:'somya',
        comment:'or bhai kya haal hai'
    }
]


app.get('/', (req,res)=>{
    res.render('landing')
})

app.get('/comments', (req,res)=>{
    res.render('comments',{comments: comments});
})

app.get('/addcomment', (req,res)=>{
    res.render('addcomment')
})

app.post('/comments',(req,res)=>{
    comments.push({id: uuidv4(),username: req.body.addusername , comment: req.body.addcomment});
    res.redirect('/comments')
})

app.get('/editcomment/:id',(req,res)=>{
    const {id}  = req.params;
    const foundcomment = comments.find(c=>
        c.id==id
)
    res.render('editcomment' ,{foundcomment: foundcomment})
})

app.post('/editcomment/:id', (req,res,next)=>{
    const {id} = req.params;
    const newComment = req.body.editcomment;
    const foundcomment = comments.find(c=> c.id==id);

    foundcomment.comment = newComment;

    res.redirect('/comments')

})
app.get('/deletecomment/:id',(req,res)=>{
    const {id} = req.params;
    const foundComment = comments.find(c=>c.id==id);

    comments=comments.filter(element => element !==foundComment);

    res.redirect('/comments')
})


app.listen(port, ()=>{
    console.log('running at server:- http://localhost:3000')
})