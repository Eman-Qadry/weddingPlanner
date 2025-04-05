const express = require('express');
const bodyparser=require('body-parser');
const { swaggerUi, swaggerSpec } = require("./swagger");
const {error}=require('./middlewares/error')
const dotenv = require('dotenv');
const cors = require('cors');
const  connectDB=require('./config/DB');
const authRouter=require('./routes/auth');
const vendorRouter=require('./routes/auth');
const categoriesRouter=require('./routes/categories');
dotenv.config();
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());




app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use('/api/auth',authRouter);
app.use('/api/categories',categoriesRouter);
app.use('/api/vendor',vendorRouter);
app.use(error);
app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("server is started on port 3000");
    
    
})

