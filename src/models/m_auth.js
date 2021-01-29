const { pgInstance } = require('../databases/postgres');

exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    pgInstance.any(
      'SELECT * FROM usuario WHERE email = $1 AND password = $2;',
      [email, password]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}


exports.registerUser = (nombres, email, password) => {
  return new Promise((resolve, reject) => {
    pgInstance.one(
      `INSERT INTO public.usuario(nombres, email, password)
            VALUES ($1, $2, $3)
         RETURNING id_usuario, nombres, email, password;`,
      [nombres, email, password]
    )
      .then(data => {
        return resolve(data);
      })
      .catch(error => {
        return reject(error);
      })
  });
}
