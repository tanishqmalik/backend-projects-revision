// const { urlencoded } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const port = 3000;
const Products = require('./models/Product');
const { raw } = require('body-parser');
const Product = require('./models/Product');

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/OctProducts')
.then(()=>{
    console.log("connected suucesfully")
})
.catch((err)=>{
    console.log(err, "error is there")
})

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('<a href="http://localhost:3000/products">Products Application</a> ')
})

app.get('/products', async (req,res)=>{
    const allProducts = await Products.find({})

    res.render('Launch',{products : allProducts} );
})

app.get('/products/addnew',(req,res) =>{
    res.render('New')
})

app.post('/products', async (req,res)=>{
    // const {name,price,category} = req.body;

    // const AddProduct = await 

    await Product.create({
        name:req.body.name,
        price:req.body.price,
        category:req.body.category
    })

    res.redirect('products')
})

app.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const foundProduct = await Products.findById(id);

    res.render('Product', {foundProduct: foundProduct})
})

app.get('/products/update/:id',async (req,res)=>{
    const {id} = req.params;

    const foundProduct = await Product.findById(id);

    res.render('update',{foundProduct:foundProduct});
})

app.post('/products/:id', async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndUpdate(id, {name: req.body.updatedName, price:req.body.updatedPrice, category:req.body.updatedCategory})

    res.redirect(`${id}`)
})

app.get('/products/delete/:id',async (req,res)=>{
    const {id} = req.params;

    await Product.deleteOne({_id:id});

    res.redirect('/products')
})



app.listen(port,(req,res)=>{
    console.log('running at server:- http://localhost:3000')
})