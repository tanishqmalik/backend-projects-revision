const mongoose = require('mongoose');
const Campground = require('../models/Campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp2')
.then(()=>{
    console.log("connected succesfully")
})
.catch(()=>{
    console.log("not connected")
})

const sample  = array => array[Math.floor(Math.random() * array.length)]

const seedDb = async () =>{
    await Campground.deleteMany({})

    // const c = new Campground({title : 'purple field'})

    for(let i=0; i<50; i++){
        const random100 = Math.floor(Math.random() * 1000)


        const camp = new Campground({
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })

        await camp.save()
    }
    
}

seedDb()