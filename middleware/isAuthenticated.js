const jwt = require('jsonwebtoken');

const IsAuthenticated = (req, res, next) => {
  //recuperer le token
  const authHeader = req.headers['authorization'];
  const CookieToken = authHeader.split(' ')[1];
  const isTokenExist = !!CookieToken;

  if (isTokenExist) {
    jwt.verify(CookieToken, process.env.JWT_SECRET, async (err, decoded) => {
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
