const config = require("../config/default.json");

// module.exports = function (req, res, next) {
//   if (!config.get("requiresAuth")) return next();

//   const token = req.header("x-auth-token");
//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
