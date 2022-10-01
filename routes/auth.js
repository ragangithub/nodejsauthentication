const router = require("express").Router();
const User = require("../model/User");

const { registerValidation } = require("../validation");
// const Joi = require("@hapi/joi");

// Validation
// const schema = Joi.object({
//   name: Joi.string().min(4).required(),
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required(),
// });

router.post("/register", async (req, res) => {
  // const Validation=schema.validate(req.body);
  // const { value, error } = schema.validate(req.body);
  const { value, error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.send(err.message);
    }
  }
});

module.exports = router;
