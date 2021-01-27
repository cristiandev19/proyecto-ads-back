const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY; //normally store this in process.env.secret

// Aqui debemos cambiarlo para que llame a la BD por un id dentro del token
module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
  if (jwt_payload.email === "paul@nanosoft.co.za") {
    return done(null, true)
  } else if (jwt_payload.email === 'cristiansotomayor.dev@gmail.com') {
    return done(null, true)
  }
  return done(null, false)
}) 