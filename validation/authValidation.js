const Joi= require('joi');
const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('Bride', 'Groom', 'Vendor', 'Admin').required(),
});

const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
})

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

const updatePasswordSchema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  verifyNewPassword:Joi.string().min(6).required(),
});
const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  };
  
 
  module.exports = {
    registerSchema: validate(registerSchema),
    loginSchema: validate(loginSchema),
    forgotPasswordSchema: validate(forgotPasswordSchema),
    updatePasswordSchema: validate(updatePasswordSchema),
  };