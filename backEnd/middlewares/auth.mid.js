const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../constants/httpStatus.js');

const authMid = (req, res, next) => {
  const token = req.headers.access_token;
  console.log(req.headers);
  if (!token) return res.status(UNAUTHORIZED).send();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded)
  } catch (error) {
    return res.status(UNAUTHORIZED).send();
  }

  return next();
};

module.exports = authMid;
