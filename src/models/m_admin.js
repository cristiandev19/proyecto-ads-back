const { pgInstance } = require('../databases/postgres');

exports.insertRol = (desc_rol) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      'INSERT INTO public.rol(desc_rol) VALUES ($1) RETURNING id_rol, desc_rol;',
      [desc_rol]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}


exports.getRoles = () => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      'SELECT * FROM rol;',
      []
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.getAcciones = () => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      'SELECT * FROM accion;',
      []
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}




exports.getProductos = () => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      'SELECT * FROM producto WHERE estado = TRUE;',
      []
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

// exports.getBoletas = () => {
//   return new Promise((resolve, reject) => {
//     pgInstance.any(
//       'SELECT * FROM boleta;',
//       []
//     )
//       .then(data => {
//         console.log('data', data)
//         return resolve(data);
//       })
//       .catch(error => {
//         return reject(error);
//       })
//   });
// }

exports.insertAccion = ({desc_accion, ruta_accion,resumen}) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `INSERT INTO public.accion(desc_accion, ruta_accion, resumen)
            VALUES ($1, $2, $3)
         RETURNING id_producto, desc_accion, ruta_accion, resumen;`,
      [desc_accion, ruta_accion,resumen]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.insertAccion = ({id_accion, id_rol}) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `INSERT INTO public.accion(_id_accion, _id_rol, active)
            VALUES ($1, $2, $3)
         RETURNING _id_accion, _id_rol, active;`,
      [id_accion, id_rol, true]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.getUsuario = (id_persona) => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      'SELECT * FROM usuario WHERE id_persona = $1;',
      [id_persona]
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.getUsuarios = () => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      `SELECT *
         FROM usuario u
              LEFT JOIN rol r ON (u._id_rol = r.id_rol)
         ;`,
      []
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.insertAccionxRol = ({_id_accion, _id_rol}) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `INSERT INTO public.accion_x_rol(_id_accion, _id_rol, active)
            VALUES ($1, $2, $3)
         RETURNING _id_accion, _id_rol, active;`,
      [_id_accion, _id_rol, true]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.updateAccionxRol = ({_id_accion, _id_rol}) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `UPDATE public.accion_x_rol
          SET active = $3
        WHERE _id_accion = $1
          AND _id_rol = $2
    RETURNING *;`,
      [_id_accion, _id_rol, true]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}


exports.getAccionesXRol = (id_rol) => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      `SELECT *
         FROM accion_x_rol ar
              LEFT JOIN accion a ON (a.id_accion = ar._id_accion)
        WHERE ar._id_rol = $1
          AND ar.active = TRUE;`,
      [id_rol]
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.validarAccionxRol = ({_id_accion, _id_rol}) => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      `SELECT *
         FROM accion_x_rol
        WHERE _id_accion = $1
          AND _id_rol    = $2;`,
      [_id_accion, _id_rol]
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}



exports.createUsuario = ({nombres, email, password, _id_rol}) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `INSERT INTO public.usuario(nombres, email, password, _id_rol)
            VALUES ($1, $2, $3, $4)
         RETURNING id_usuario, nombres, email, password, _id_rol;`,
      [nombres, email, password, _id_rol]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.updateUsuario = ({id_usuario, nombres, email, password}) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `UPDATE usuario
          SET nombres = $2,
              email = $3,
              password = $4
        WHERE id_usuario = $1
      RETURNING *;`,
      [id_usuario, nombres, email, password]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}


exports.insertProducto = (precio, stock, desc_producto) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `INSERT INTO public.producto(precio, stock, desc_producto)
            VALUES ($1, $2, $3)
         RETURNING id_producto, precio, stock, desc_producto;`,
      [precio, stock, desc_producto]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.updateProducto = ({id_producto, desc_producto, stock, precio}) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `UPDATE producto
          SET desc_producto = $2,
              stock = $3,
              precio = $4
        WHERE id_producto = $1
      RETURNING *;`,
      [id_producto, desc_producto, stock, precio]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.deleteProducto = (id_producto) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `UPDATE producto
          SET estado = FALSE
        WHERE id_producto = $1
      RETURNING *;`,
      [id_producto]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.emitirNotaVenta = (nota_ventas, total) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `SELECT * FROM crear_nota_venta($1, $2) res;`,
      [nota_ventas, total]
    )
      .then(data => {
        return resolve(data.res);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.buscarNotaVenta = (nota_venta) => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      `SELECT *
         FROM nota_venta nv
              LEFT JOIN producto_x_nota_venta pxv ON (pxv._id_nota_venta = nv.id_nota_venta)
              LEFT JOIN producto p ON (p.id_producto = pxv._id_producto)
        WHERE nv.codigo_nota = $1 ;`,
      [nota_venta]
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.emitirBoleta = (nota_venta, medio_pago) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `SELECT * FROM crear_boleta($1, $2) res;`,
      [nota_venta, medio_pago]
    )
      .then(data => {
        return resolve(data.res);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.getBoletas = () => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      `SELECT to_char(b.fecha, 'DD-MM-YYYY') as fecha_f,
      to_char(b.fecha, 'HH12:MI:SS') as hora,
      to_char(b.fecha, 'MM') as mes,*
         FROM boleta b
         LEFT JOIN estado_boleta eb on (eb.id_estado = b.estado::INTEGER)
         LEFT JOIN nota_venta nv on (nv.id_nota_venta = b._id_nota_venta)
        ORDER BY b.fecha asc;`,
      []
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.detalleBoleta = (id_boleta) => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      `select *
      from boleta b
           left join nota_venta nv on (nv.id_nota_venta = b._id_nota_venta)
           left join producto_x_nota_venta pxv on (pxv._id_nota_venta = nv.id_nota_venta)
           left join producto p on (p.id_producto = pxv._id_producto)
     where b.id_boleta = $1::INTEGER
    `,
      [id_boleta]
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.updateBoleta = ({id_boleta, estado}) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `UPDATE boleta
          SET estado = $2
        WHERE id_boleta = $1
      RETURNING *;`,
      [id_boleta, estado]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}


exports.validarEmail = (email) => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      `select *
      from usuario
     where email = $1`,
      [email]
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}



exports.updatePass = (pass, id_usuario) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `UPDATE usuario
          SET password = $1
        WHERE id_usuario = $2
      RETURNING *;`,
      [pass, id_usuario]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}


exports.searchUsuario = (id_usuario) => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      `select *
      from usuario u
           left join rol r on (r.id_rol = u._id_rol)
     where id_usuario = $1`,
      [id_usuario]
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}

exports.updateRol = (id_usuario, id_rol) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `UPDATE usuario
          SET _id_rol = $2
        WHERE id_usuario = $1
      RETURNING *;`,
      [id_usuario, id_rol]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}
