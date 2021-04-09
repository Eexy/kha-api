const jwt = require('jsonwebtoken');
const User = require('../../db/models/user');

async function auth(req, res, next){
  try{
    const token = req.header('Authorization').replace('Bearer ', '')
    const decodedJWT =  jwt.verify(token, process.env.SECRETKEY);
  
    const user = await User.findOne({_id: decodedJWT.id});
    req.user = user;
    
    next();
  } catch(e){
    res.status(401).send({error: 'no auth cookie provided'})
  }
}

module.exports = auth;