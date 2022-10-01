const router = require("express").Router();
const User = require("../model/User");

const { registerValidation } = require("../validation");
router.post("/register", async (req, res) => {
  const { value, error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    //Check user exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.send("Email exists");
    }
    //Create new user
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
