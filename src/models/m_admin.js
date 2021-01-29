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



exports.getProductos = () => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      'SELECT * FROM producto;',
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
