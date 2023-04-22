const Joi = require("joi");
const { ValidationError } = require("../utilities/errorHandler");
const { isTokenExist } = require("./Auth");
const jwt = require("jsonwebtoken");
const data = require("../../config/config.json");

// checking validation of user and password
const isValidLoginCredential = async (req, res, next) => {
  const data = req.body;
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().required(),
  });
  const valid = await schema.validate(data);

  if (valid.error) {
    console.log(valid.error);
    next(new ValidationError(valid.error));
  } else {
    next();
  }
};

const isAurthorisedUser = (req, res, next) => {
  try {
    console.log(req);
    const token = isTokenExist(req.headers.authorization, next);
    if (token) {
      const decode = jwt.verify(token, data["secretkey"]);
    }
    req.usertails = decode;
    next();
  } catch (error) {
    next(new ValidationError(error));
  }
};

module.exports = { isValidLoginCredential, isAurthorisedUser };
