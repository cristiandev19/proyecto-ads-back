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

exports.getAcciones = async (req, res, next) => {
  try {
    const result = await m_admin.getAcciones();
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      acciones: result
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

exports.updateProducto = async (req, res, next) => {
  try {
    const { id_producto, desc_producto, stock, precio } = req.body;
    const result = await m_admin.updateProducto({ id_producto, desc_producto, stock, precio });
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


exports.deleteProducto = async (req, res, next) => {
  try {
    const { id_producto } = req.body;
    const result = await m_admin.deleteProducto(id_producto);
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.REMOVE_SUCCESS,
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

exports.insertAccion = async (req, res, next) => {
  try {
    const { desc_accion, ruta_accion,resumen } = req.body;
    const result = await m_admin.insertAccion({desc_accion, ruta_accion,resumen});
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

exports.asignarAccionxRol = async (req, res, next) => {
  try {
    const { _id_accion, _id_rol } = req.body;
    const validar = await m_admin.validarAccionxRol({_id_accion, _id_rol});
    const [registro] = validar;
    if(validar.length == 0) {
      result = await m_admin.insertAccionxRol({_id_accion, _id_rol});
    } else {
      const { active } = registro;
      console.log('active', active);
      console.log('1')
      if (!active) {
        console.log('2')
        result = await m_admin.updateAccionxRol({_id_accion, _id_rol});
      } else {
        return res.status(400).send({
          message: 'No se puede insertar este valor'
        });
      }
    }
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


exports.getAccionesXRol = async (req, res, next) => {
  try {
    const { id_rol } = req.query;
    const result = await m_admin.getAccionesXRol(id_rol);
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      acciones: result
    });
  } catch (error) {
    next(error);
  }
}

exports.getUsuario = async (req, res, next) => {
  try {
    const id_usuario = req.query.id_usuario;
    const result = await m_admin.getUsuario(id_usuario);
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      usuario: result
    });
  } catch (error) {
    next(error);
  }
}


exports.getUsuarios = async (req, res, next) => {
  try {
    const result = await m_admin.getUsuarios();
    console.log('result', result)
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      usuarios: result
    });
  } catch (error) {
    next(error);
  }
}


exports.createUsuario = async (req, res, next) => {
  try {
    const default_rol = 8;
    const { nombres, email, password } = req.body;
    const usuario = await m_admin.createUsuario({
      nombres, email, password,
      _id_rol: default_rol
    });
    console.log('result', usuario)
    return res.status(200).send({
      message: MESSAGE_API.INSERT_SUCCESS,
      usuario: usuario
    });
  } catch (error) {
    next(error);
  }
}

exports.updateUsuario = async (req, res, next) => {
  try {
    const { id_usuario, nombres, email, password } = req.body;
    const usuario = await m_admin.updateUsuario({
      id_usuario, nombres, email, password
    });
    console.log('result', usuario)
    return res.status(200).send({
      message: MESSAGE_API.UPDATE_SUCCESS,
      usuario: usuario
    });
  } catch (error) {
    next(error);
  }
}

exports.emitirNotaVenta = async (req, res, next) => {
  try {
    const { nota_ventas, total } = req.body
    const result = await m_admin.emitirNotaVenta(JSON.stringify(nota_ventas), total)
    console.log('result', result);
    return res.status(200).send({
      message: MESSAGE_API.UPDATE_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
}

exports.buscarNotaVenta = async (req, res, next) => {
  try {
    const { nota_venta } = req.query;
    console.log('nota_venta', nota_venta);
    const result = await m_admin.buscarNotaVenta(nota_venta)
    console.log('result', result);
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      nota_venta: result
    });
  } catch (error) {
    next(error);
  }
}

exports.emitirBoleta = async (req, res, next) => {
  try {
    const { nota_venta, medio_pago } = req.body;
    // return res.status(200).send({})
    const result = await m_admin.emitirBoleta(nota_venta, medio_pago)
    // console.log('result', result);
    return res.status(200).send({
      message: MESSAGE_API.UPDATE_SUCCESS,
      boleta: result
    });
  } catch (error) {
    next(error);
  }
}

exports.getBoletas = async (req, res, next) => {
  try {
    const result = await m_admin.getBoletas();
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      boletas: result
    });
  } catch (error) {
    next(error);
  }
}
