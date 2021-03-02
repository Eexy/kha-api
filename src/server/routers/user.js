const express = require("express");
const auth = require('../middlewares/auth');
const router = express.Router();
const User = require("../../db/models/user");

router.post("/users/login", async (req, res) => {
  try{
    const user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateJWT();
    res.cookie('jwt', token, {httpOnly: true});
    res.status(200).send({message: "login successful"});
  } catch(e){
    res.status(404).send({error: e.message});
  }
});

router.get("/users/me", auth, (req, res) => {
  if(!req.user){
    return res.send({error: 'you need to be logged'});
  }

  res.status(200).send(req.user.toJson());
})

router.get("/users/logout", auth, async (req, res) => {
  if(!req.user){
    return res.status(401).send({error: 'you need to be logged'});
  }

  // we clear browser'cookies
  res.clearCookie('jwt');
  res.status(200).send({message: 'Logout successfully'});
});

router.post("/users/signup", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user == null) {
    // if user doesnt exist we create it
    user = new User(req.body);
    const token = user.generateJWT();
    await user.save();
    res.cookie('jwt', token, {httpOnly: true});
    return res.status(201).send({ message: "account succesfully created" });
  }

  res.status(409).send({ error: "email address is already used" });
});

module.exports = router;
