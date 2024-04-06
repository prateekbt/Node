import express from "express";
import mongoose from "mongoose";
import {Product} from "./models/product.model.js";

const app = express();
const port = 3000;

app.use(express.json()); 

app.get("/" , (req,res) => {
    res.send("Whhaattt I am reaallyyy dumbbbb");
});


app.get('/api/products', async (req,res) => {

    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({messaage: error.messaage});
    }
})


app.get('/api/product/:id', async (req,res) => {

    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch (error){
        res.status(500).json({message: error.messgae});
    }
});


app.post('/api/products', async (req,res) => {

    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch(error) {
       res.status(500).json({messaage: error.messaage});
    }
   
});

//update a product
app.put('/api/product/:id', async (req,res) => {
    try{
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(500).json({message: error.messgae});
        }

        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    }
    catch (error) {
        res.status(500).json({message:error.messaage});
    }
})

//Delete API

app.delete('/api/product/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({messaage:'Product Not Found :>'});
        }
        res.status(200).json({message:"Product deleted successfully!"});
    }catch (error){
        res.status(500).json({message: error.message});
    }
})

mongoose.connect('mongodb+srv://Prateek:kaka@backenddb.00cc8q9.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
    console.log('Connected!');
    app.listen(port,() =>{
        console.log(`Listening @ ${port}`);
     });
})
.catch(() => {
    console.log("Failed!")
})
  


// mongodb+srv://Prateek:kaka@backenddb.00cc8q9.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB