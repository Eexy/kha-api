const express = require('express');
const router = express.Router();
const User = require('../../db/models/user');

router.post('/users/signup', async (req, res) => {
  let user = await User.findOne({email: req.email});
  
  if(user == null){
    // if user doesnt exist we create it
    user = new User(req.body);
    user.save();
    return res.status(201).send({message: 'account succesfully created'});
  }

  res.status(409).send({error: "email address is already used"});
});

module.exports = router;