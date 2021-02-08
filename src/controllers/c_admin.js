const m_admin = require('../models/m_admin');
const { MESSAGE_API } = require('../config/constants');
const { pass } = require('../strategies/jwt');

exports.insertRol = async (req, res, next) => {
  try {
    const { desc_rol } = req.body;
    const result = await m_admin.insertRol(desc_rol);
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
    console.log('1');
    const result = await m_admin.getAcciones();
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
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      boletas: result
    });
  } catch (error) {
    next(error);
  }
}

exports.getBoletas1 = async (req, res, next) => {
  try {
    console.log('wtf')
    const result = await m_admin.getBoletas1();
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      boletas: result
    });
  } catch (error) {
    next(error);
  }
}

exports.getEstadosBoleta = async (req, res, next) => {
  try {
    const result = await m_admin.getEstadosBoleta();
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      estados: result
    });
  } catch (error) {
    next(error);
  }
}

exports.getBoletasFiltro = async (req, res, next) => {
  try {
    const { fecha } = req.query;
    if (!fecha) {
      return res.status(200).send({
        message: MESSAGE_API.SELECT_SUCCESS,
        boletas: []
      });
    }
    const result = await m_admin.getBoletasFiltro(fecha);
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
      console.log('registro', registro);
      // const { active } = registro;
      if (!registro || !registro.active) {
        result = await m_admin.updateAccionxRol({_id_accion, _id_rol});
      } else {
        return res.status(400).send({
          message: 'No se puede insertar este valor'
        });
      }
    }
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
    const default_rol = 12;
    const { nombres, email, password } = req.body;
    const usuario = await m_admin.createUsuario({
      nombres, email, password,
      _id_rol: default_rol
    });
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
    console.log('nota_ventas, total', {nota_ventas, total})
    const result = await m_admin.emitirNotaVenta(JSON.stringify(nota_ventas), total)
    return res.status(200).send({
      message: MESSAGE_API.UPDATE_SUCCESS,
      result: result
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

exports.buscarBoleta = async (req, res, next) => {
  try {
    const { boleta } = req.query;
    // console.log('nota_venta', nota_venta);
    const result = await m_admin.buscarBoleta(boleta)
    console.log('result', result);
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      boletas: result
    });
  } catch (error) {
    next(error);
  }
}

exports.emitirBoleta = async (req, res, next) => {
  try {
    const { nota_venta, medio_pago } = req.body;
    console.log('nota_venta, medio_pago', {nota_venta, medio_pago})
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

// exports.getBoletas = async (req, res, next) => {
//   try {
//     const result = await m_admin.getBoletas();
//     return res.status(200).send({
//       message: MESSAGE_API.SELECT_SUCCESS,
//       boletas: result
//     });
//   } catch (error) {
//     next(error);
//   }
// }

exports.detalleBoleta = async (req, res, next) => {
  try {
    const { id_boleta } = req.query;
    const result = await m_admin.detalleBoleta(id_boleta);
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      detalle_boleta: result
    });
  } catch (error) {
    next(error);
  }
}

exports.updateBoleta = async (req, res, next) => {
  try {
    const { id_boleta, estado } = req.body;
    const result = await m_admin.updateBoleta({id_boleta, estado});
    return res.status(200).send({
      message: MESSAGE_API.UPDATE_SUCCESS,
      updated: result
    });
  } catch (error) {
    next(error);
  }
}



function sendCorreo(id_usuario, email) {
  return new Promise((resolve) => {

    var nodemailer = require('nodemailer');
  
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      service: 'gmail',
      auth: {
        user: 'zohetestapp@gmail.com',
        pass: 'los72524292'
      }
    });
    console.log('transporter', transporter)
  
    var mailOptions = {
      from: 'zohetestapp@gmail.com',
      to: email,
      subject: 'Reestablece contra',
      text: `
        apreta el siguiente enlace o pegalo en tu navegador:
      localhost:4200/auth/restart-password/${id_usuario}
      `
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return resolve({err: true})
      } else {
        return resolve({status: 'ok'})
        console.log('Email sent: ' + info.response);
      }
    });
  })
}

exports.validarEmail = async (req, res, next) => {
  try {
    const {email} = req.query;
    const result = await m_admin.validarEmail(email);
    console.log('result', result);
    if (result.length == 0) {
      return res.status(400).send({
        message: 'No existe un usuario con un email como el que enviaste'
      });
    }

    console.log('aqui')
    const id_usuario = result[0].id_usuario;
    console.log('id_usuario', id_usuario)
    const send_correo = await sendCorreo(id_usuario, email);
    console.log('send_correo', send_correo);

    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      email: result
    });
  } catch (error) {
    next(error);
  }
}


exports.updatePass = async (req, res, next) => {
  try {
    const {password, id_usuario} = req.body;
    const result = await m_admin.updatePass(password, id_usuario);
    return res.status(200).send({
      message: MESSAGE_API.UPDATE_SUCCESS,
      pass: result
    });
  } catch (error) {
    next(error);
  }
}


// exports.getBoletas = async (req, res, next) => {
//   try {
//     const result = await m_admin.getBoletas();
//     return res.status(200).send({
//       message: MESSAGE_API.SELECT_SUCCESS,
//       boletas: result
//     });
//   } catch (error) {
//     next(error);
//   }
// }

exports.searchUsuario = async (req, res, next) => {
  try {
    const {id_usuario} = req.query;
    const result = await m_admin.searchUsuario(id_usuario);
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      usuario: result
    });
  } catch (error) {
    next(error);
  }
}

exports.updateRol = async (req, res, next) => {
  try {
    const {id_usuario, rol} = req.body;
    const result = await m_admin.updateRol(id_usuario, rol);
    return res.status(200).send({
      message: MESSAGE_API.UPDATE_SUCCESS,
      usuario: result
    });
  } catch (error) {
    next(error);
  }
}


exports.searchProduct = async (req, res, next) => {
  try {
    const { desc_producto } = req.query;
    const result = await m_admin.searchProduct(desc_producto);
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      productos: result || []
    });
  } catch (error) {
    next(error);
  }
}



exports.boletasFiltro = async (req, res, next) => {
  try {
    const { fecha_ini, fecha_fin } = req.query;
    const result = await m_admin.boletasFiltro(fecha_ini, fecha_fin);
    return res.status(200).send({
      message: MESSAGE_API.SELECT_SUCCESS,
      boletas: result || []
    });
  } catch (error) {
    next(error);
  }
}


exports.insertReclamo = async (req, res, next) => {
  try {
    const { _id_boleta, desc_reclamo } = req.body;
    const validar = await m_admin.validarReclamo(_id_boleta);
    if (validar.length > 0) {
      return res.status(400).send({
        message: 'Ya existe un reclamo para esta boleta'
      });
    }
    const result = await m_admin.insertReclamo(_id_boleta, desc_reclamo);

    const result2 = await m_admin.updateBoleta({
      id_boleta: _id_boleta,
      estado: '3'
    });

    return res.status(200).send({
      message: MESSAGE_API.INSERT_SUCCESS,
      reclamo: result
    });
  } catch (error) {
    next(error);
  }
}


exports.deleteUsuario = async (req, res, next) => {
  try {
    const { id_usuario } = req.body;
    const result = await m_admin.deleteUsuario(id_usuario);
    return res.status(200).send({
      message: MESSAGE_API.REMOVE_SUCCESS,
      usuario: {
        ...result
      }
    });
  } catch (error) {
    next(error);
  }
}

