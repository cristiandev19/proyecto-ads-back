const m_admin = require('../models/m_admin');
const { MESSAGE_API } = require('../config/constants');

exports.insertRol = async (req, res, next) => {
  try {
    const { desc_rol } = req.body;
    console.log('desc_rol', desc_rol)
    const result = await m_admin.insertRol(desc_rol);
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.INSERT_SUCCESS,
      rol: {
        ...result
      }
    });
  } catch (error) {
    next(error);
  }
}

exports.getRoles = async (req, res, next) => {
  try {
    const result = await m_admin.getRoles();
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      roles: result
    });
  } catch (error) {
    next(error);
  }
}

exports.insertProducto = async (req, res, next) => {
  try {
    const { precio, stock, desc_producto } = req.body;
    const result = await m_admin.insertProducto(precio, stock, desc_producto);
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.INSERT_SUCCESS,
      product: {
        ...result
      }
    });
  } catch (error) {
    next(error);
  }
}


exports.getProductos = async (req, res, next) => {
  try {
    const result = await m_admin.getProductos();
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      productos: result
    });
  } catch (error) {
    next(error);
  }
}

exports.getBoletas = async (req, res, next) => {
  try {
    const result = await m_admin.getBoletas();
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      boletas: result
    });
  } catch (error) {
    next(error);
  }
}
