const passport = require("passport");
const User = require("../models/User.model");
const registerStrategy = require("./register.strategy");
const loginStrategy = require("./login.strategy");

passport.serializeUser((user,done) => {
  return done(null,user._id);
});

passport.deserializeUser(async (userId, done) => {
  try{
      const existingUser = await User.findById(userId);
      return done(null,existingUser);
  }catch(error){
      return done(error);
  }
});

const useStrategies = () =>{
  passport.use("register", registerStrategy);
  passport.use("access", loginStrategy);

}

module.exports = {useStrategies};


//useStrategies