const jwt = require('jsonwebtoken');

exports.createAccessToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return accessToken;
};