const express = require('express')
const app = express()
const port = 3000;
const path = require('path')
const mongoose = require('mongoose');
const Campground = require('./models/Campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp2')
.then(()=>{
    console.log("connected suucesfully")
})
.catch((err)=>{
    console.log(err, "error is there")
})



app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/campgrounds', async (req, res)=>{
    const campgrounds = await Campground.find({})
    res.render('Campgrounds/Index', {campgrounds})
})

app.get('/campgrounds/add', async(req,res)=>{
    res.render('Campgrounds/New')
})

app.get('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    const foundcampground = await Campground.findById(id)

    res.render('Campgrounds/Show', {foundcampground})
})



app.listen(port, ()=>{
    console.log(`server is running at ${port}`)
})