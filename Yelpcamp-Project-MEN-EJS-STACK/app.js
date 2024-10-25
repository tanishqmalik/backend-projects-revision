const express = require('express')
const app = express()
const port = 3000;
const path = require('path')
const mongoose = require('mongoose');
const Campground = require('./models/Campground');
const { time } = require('console');


mongoose.connect('mongodb://localhost:27017/yelp-camp2')
.then(()=>{
    console.log("connected suucesfully")
})
.catch((err)=>{
    console.log(err, "error is there")
})



app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/campgrounds', async (req, res)=>{
    const campgrounds = await Campground.find({})
    res.render('Campgrounds/Index', {campgrounds})
})

app.get('/campgrounds/add', async(req,res)=>{
    res.render('Campgrounds/New')
})

app.post('/campgrounds', async (req,res)=>{
    await Campground.create({
        title: req.body.newtitle,
        location: req.body.newloc
    })
    res.redirect('campgrounds')
})

app.get('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    const foundcampground = await Campground.findById(id)

    res.render('Campgrounds/Show', {foundcampground})
})

app.get('/campgrounds/update/:id', async(req,res)=>{

    const {id} = req.params;

    const foundcampground = await Campground.findById(id);
    res.render('Campgrounds/Update', {foundcampground})
})

app.post('/campgrounds/:id', async (req,res)=>{
    const {id} = req.params
    await Campground.findByIdAndUpdate(id, {
        title: req.body.title,
        location: req.body.location
    })

    res.redirect('campgrounds')
})




app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})