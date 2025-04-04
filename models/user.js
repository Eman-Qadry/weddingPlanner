const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Bride', 'Groom', 'Vendor', 'Admin'], required: true },
    resetToken:{type:String},
    resetTokenExpiry:{type:Date}
});


module.exports=mongoose.model("User",userSchema);