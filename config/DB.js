const mongoose=require('mongoose');
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("no connection");
})