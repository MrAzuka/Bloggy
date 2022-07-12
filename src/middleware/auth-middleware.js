const jwt = require('jsonwebtoken');
const User = require('../models/author-model');

exports.requireSignIn = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(res.status(401).json({message: "Authentication is Required"}));
  }
  if (!String(authorization).startsWith('Bearer')) {
    return next(res.status(400).json({message: "Please use bearer token"}));
  }

  const [bearer, token] = authorization.split(' ');
    // verify the token and verify if user is logged in in or not
    // If user is logged in then call the next() function to go to the next middleware
   
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      next(err);
    }

    const { id } = decoded;

    const user = await User.findById(id);

    req.user = user;

    next();
  });
};
