const jwt = require('jsonwebtoken');
const UserSchema = require('../models/User-model');
const maxAge = 3 * 24 * 60 * 60;
const bycript = require('bcrypt');

const createToken = userID => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const LoginPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ Email: email });
    if (!user) throw new Error('Invalid Email');
    const auth = await bycript.compare(password, user.Password);
    if (!auth) throw new Error('Invalid Password');
    console.log(user);
    const jwt = createToken(user._id);
    res.cookie('jwt', jwt, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      UserID: user._id,
      email: user.Email,
      IsAdmin: user.IsAdmin,
      Token: jwt,
    });
  } catch (err) {
    const errMsg = { message: 'mot de passe ou email incorrect' };
    res.json(errMsg);
    console.log(err);
  }
};

const RegistrationPost = async (req, res) => {
  const { IsAdmin,email, password, CreatedAt } = req.body;
  try {
    const user = await UserSchema.create({
      IsAdmin,
      Email: email,
      Password: password,
      CreatedAt,
    });
    const jwt = createToken(user._id);
    res.cookie('jwt', jwt, { httpOnly: true, maxAge: maxAge * 1000 });
    res
      .status(200)
      .json({
        UserID: user._id,
        email: user.Email,
        IsAdmin: user.IsAdmin,
        Token: jwt
      });
  } catch (err) {
    const errMsg = { msg: 'problème survenu' };
    res.json({ errMsg });
    console.log(err);
  }
};

const LogoutPost = (req, res) => {};

module.exports = { LoginPost, RegistrationPost, LogoutPost };
