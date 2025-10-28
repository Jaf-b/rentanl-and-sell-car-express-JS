const jwt = require('jsonwebtoken');

const IsAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const isTokenExist = !!token;

  if (isTokenExist) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.json({ error: 'Invalid Token' });
        return false;
      } else {
        next();
        return true;
      }
    });
  } else {
    res.json({ error: 'Invalid Token' });
    return false;
  }
};

module.exports = IsAuthenticated;
