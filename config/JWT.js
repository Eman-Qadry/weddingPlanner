const JWT=require('jsonwebtoken');
const createJWT=(userId)=>{
    const token=JWT.sign({
        _id:userId
    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
    return token;
}
module.exports=createJWT;