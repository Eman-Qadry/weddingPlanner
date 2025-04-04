const User=require('../models/user');
const createJWT=require('../config/JWT')
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const sendEmail=require('../utils/sendEmail');
const login=async (req,res,next)=>{
    try{
const {email,password}=req.body;
const existingUser=await User.findOne({email});
    if (!existingUser){
        return res.status(400).json({message:"User not registered  ,you can sign up instead"});
    }
    const isMatchedPassword=await bcrypt.compare(password,existingUser.password);
    if (!isMatchedPassword) return res.status(400).json({ message: "Invalid credentials" });
    const token=createJWT(existingUser._id);
    res.cookie('token', token, { httpOnly: true }).json({ message: "Login successful", token });
    }
    catch(err){
        next(err)
    }
}

const register=async(req,res,next)=>{
    try{
    const {name,email,password,role}=req.body;
    const existingUser=await User.findOne({email});
    if (existingUser){
        return res.status(400).json({message:"User exist ,you can login instead"});
    }
    const hashedPassword=await bcrypt.hash(password,12);
 
    const newUser= new User({
        name,
       password: hashedPassword,
       email,role

    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
} catch (err) {
    next(err)
}
}
const forgotpassword=async (req,res,next)=>{
    const {email}=req.body;
    const user=await User.findOne({email});
    if (!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    const resetToken=crypto.randomBytes(32).toString("hex");
    user.resetToken=resetToken;
    user.resetTokenExpiry=Date.now()+900000;
    await user.save();
    const resetLink=`${process.env.BASE_URL}/api/auth/reset-password/${resetToken}`;
  const emailHtml=`<p>click<a href="${resetLink}">here</a> to reset your password.</p>`;
await sendEmail(user.email,"reset password",emailHtml);
res.status(200).json({message:"password reset email sent "});
};

const resetPasswordWithToken=async (req,res,next)=>{
    try{
        const {token}=req.params;
    const {newPassword}=req.body;
    const user=await User.findOne({
        resetToken:token,
        resetTokenExpiry:{$gt:Date.now()}
    });
    if (!user){
        return res.status(404).json({
            message:"User not found"
        })}
const hashedNewPassword=bcrypt.hash(newPassword,12);
user.password=hashedNewPassword;
user.resetToken=undefined;
user.resetTokenExpiry=undefined;
await user.save();

}
catch(err){
    next(err);
}
}

const updatePassword=async(req,res,next)=>{
    const {password,newPassword,verifyNewPassword}=req.body;
    const userId=req.userId;
    const user=await User.findById(userId);
    if (!user){
        res.status(404).json({message:"user not found"})
    }
    if (newPassword!==verifyNewPassword){
        return res.status(400).json({message:"passwords are not matched"})
    };
    
    const isMatchedPassword=await bcrypt.compare(password,user.password);
    if (!isMatchedPassword) return res.status(400).json({ message: "Invalid credentials" });

    const hashedNewPassword=await bcrypt.hash(newPassword,12);
    user.password=hashedNewPassword;
    await user.save();
    res.status(201).json({message:"userpassword is updated successfully"})

}

module.exports={login,register,forgotpassword,resetPasswordWithToken,updatePassword};