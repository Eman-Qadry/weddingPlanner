const express = require('express');
const bodyparser=require('body-parser');
const connectDB=require('./config/DB')
const dotenv = require('dotenv');
const cors = require('cors');
const  connectDB=require('./config/DB');
dotenv.config();
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


app.use(
  cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("server is started on port 3000");
    
    
})

