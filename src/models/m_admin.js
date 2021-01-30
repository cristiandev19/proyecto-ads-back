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

exports.getBoletas = () => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      'SELECT * FROM boleta;',
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
