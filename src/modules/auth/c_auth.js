const auth_utils = require('./auth_utils');

exports.loginEmail = (req, res) => {
  try {
    const { email, password } = req.body;
    const result = auth_utils.signToken({ email, isLoged: true });
    
    res.status(200).send({
      msj: 'Ingreso existoso',
      token: result
    });
  } catch (error) {
    next(error);
  }
}


exports.verifyLogin = (req, res) => {
  try {
    const result = auth_utils.verifyToken(req.query.token);
    if(result.error) {
      throw new Error(result.msj);
    }
    res.status(200).send({  
      msj: result.msj
    });
  } catch (error) {
    next(error);
  }
}