const express = require("express");
const router = express.Router();
const User = require("../../db/models/user");

router.post("/users/login", async (req, res) => {
  try{
    const user = await User.findByCredential(req.body.email, req.body.password);
    user.generateJWT();
    res.status(200).send({message: "login successful"});
  } catch(e){
    res.status(404).send({error: e.message});
  }
});

router.post("/users/signup", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user == null) {
    // if user doesnt exist we create it
    user = new User(req.body);
    user.generateJWT();
    return res.status(201).send({ message: "account succesfully created" });
  }

  res.status(409).send({ error: "email address is already used" });
});

module.exports = router;
