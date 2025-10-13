const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  IsAdmin: {
    type: Boolean,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// We hashed the password before to save it in the database
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

// create a function to log in the user with email and password
UserSchema.statics.login = async (email, password) => {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bycript.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error('Invalid Password');
  }
  throw new Error('Invalid Email');
};

module.exports = mongoose.model('User', UserSchema);
