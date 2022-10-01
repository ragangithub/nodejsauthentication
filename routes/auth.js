const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");

const { registerValidation, loginValidation } = require("../validation");
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

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.send(err.message);
    }
  }
});

router.post("/login", async (req, res) => {
  const { value, error } = loginValidation(req.body);
  if (error) {
    res.status(400).send(error.message);
  } else {
    //Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("Email is incorrects");
    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");
    res.send("sucess");
  }
});

module.exports = router;
