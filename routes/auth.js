const express=require('express');
const auth=require('../middlewares/authenticated')
const router=express.Router();
const{login,register,
    forgotpassword,resetPasswordWithToken,
    updatePassword}=require('../controllers/auth');
const {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    updatePasswordSchema,
  }=require('../validation/authValidation');

    router.post('/login',loginSchema,login);
    router.post('/signUp',registerSchema,register);
    router.post('/forgot-password',forgotPasswordSchema,forgotpassword);
    router.post('/reset-password/:token',resetPasswordWithToken);
    router.post('/update-password',auth,updatePasswordSchema,updatePassword);
    module.exports=router;