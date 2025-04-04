const Joi=require('joi');

const addSchema=Joi.object({
    name:Joi.string().required().lowercase().regex(/^[a-zA-Z]+$/)
    ,description:Joi.string().required().lowercase()
    ,image:Joi.string().optional()
})
const checkId=Joi.object({
    
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
  module.exports={
addSchema:validate(addSchema)
  }