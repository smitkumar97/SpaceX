const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().min(2).max(25).required(),
    username: Joi.string().required().min(4).max(20),
    email: Joi.string().min(5).max(20).required().email(),
    password: Joi.string().min(5).max(100).required(),
  };

  return Joi.validate(user, schema);
}
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};
module.exports = User;
exports.validate = validateUser;
