const { pgInstance } = require('../databases/postgres');

exports.insertRol = (desc_rol) => {
  return new Promise((resolve) => {
    pgInstance.one(
      'INSERT INTO public.rol(desc_rol) VALUES ($1) RETURNING id_rol, desc_rol;',
      [desc_rol]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return resolve(error);
      })
  });
}


exports.getRoles = (desc_rol) => {
  return new Promise((resolve) => {
    pgInstance.any(
      'SELECT * FROM rol;',
      [desc_rol]
    )
      .then(data => {
        console.log('data', data)
        return resolve(data);
      })
      .catch(error => {
        return resolve(error);
      })
  });
}
