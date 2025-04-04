const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required().lowercase().regex(/^[a-zA-Z]+$/),
  description: Joi.string().required().lowercase(),
  image: Joi.string().optional(),
});

const checkId = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Matches a valid MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "Invalid ID format. Must be a 24-character hexadecimal string.",
    }),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params); // Use req.params for ID validation
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = {
  addSchema: validate(addSchema),
  checkId: validate(checkId),
};