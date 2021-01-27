const jwt = require('jsonwebtoken');

exports.signToken = (payload, secret = process.env.JWT_SECRET_KEY, ) => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRE_TIME
  });
}

exports.verifyToken = (token, secret = process.env.JWT_SECRET_KEY) => {
  try {
    const verified = jwt.verify(token, secret);
    return {
      msj: 'Autentificado con exito',
      payload: verified
    }
  } catch (error) {
    return {
      msj: error.message || 'Problemas al verificar el token',
      error
    }
  }
}
