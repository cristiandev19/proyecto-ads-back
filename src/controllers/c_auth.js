const m_auth = require('../models/m_auth');
const { MESSAGE_API } = require('../config/constants');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.query;
    console.log('email, password', email, password)
    const result = await m_auth.login(email, password);
    console.log('result', result)
    if (result.length == 0) {
      return res.status(400).send({
        message: 'No se encontro un usuario con este email y contrasena'
      });
    }
    const [user] = result;
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      user
    });
  } catch (error) {
    next(error);
  }
}

exports.registerUser = async (req, res, next) => {
  try {
    const { nombres, email, password } = req.body;
    const result = await m_auth.registerUser(nombres, email, password);
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      user: {
        ...result
      }
    });
  } catch (error) {
    next(error);
  }
}