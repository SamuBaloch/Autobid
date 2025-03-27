import Joi from "joi";


export const signupValidation = (req, res, next) => {
  console.log(req.body);
  console.log("Sign Up Request Reached");

  // Define the Joi validation schema including password and address
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required().messages({
      "string.min": "Password must be at least 4 characters long",
      "string.max": "Password cannot be longer than 100 characters",
    }),
    cnic: Joi.string().length(13).pattern(/^[0-9]+$/).required().messages({
      "string.length": "CNIC must be 13 digits",
      "string.pattern.base": "CNIC must contain only numbers",
    }),
  });

  // Validate the incoming data against the schema
  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  // If validation passes, proceed to the next middleware
  next();
};



export const loginValidation = (req, res, next) => {
  console.log("Login Request Reached");
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error,
    });
  }
  next();
};
