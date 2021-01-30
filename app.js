const express          = require('express'),
      app              = express(),
      cors             = require('cors'),
      bodyParser       = require('body-parser'),
      { dbConnection } = require('./src/databases/mongodb'),
      { config }       = require('./src/config/index');

//passport stuff
const passport      = require('passport'),
      jwtStrategry  = require('./src/strategies/jwt');
passport.use(jwtStrategry);

// Hacemos la conexion a mongodb
// dbConnection(); -- es para mongodb

// Importamos los middlewares para manejar los errores
const { logErrors, errorHandler } = require('./src/utils/middleware/errorHandler');

// Aqui configuraciones
app
  .use(cors({ 'origin': '*' }))
  .use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  .use(bodyParser.json({ limit: '5mb' }));

// Importamos modulos
const r_example = require('./src/modules/example/r_example');
const r_auth = require('./src/modules/auth/r_auth');
// Establecemos las rutas
app
  .use('/example', r_example)
  .use('/auth', r_auth);

const c_admin = require('./src/controllers/c_admin');
const c_auth = require('./src/controllers/c_auth');
// Rutas hardcoded
app.post('/insert-rol', c_admin.insertRol)
app.get('/roles', c_admin.getRoles)
app.get('/acciones', c_admin.getAcciones)
app.post('/insert-product', c_admin.insertProducto)
app.post('/update-product', c_admin.updateProducto)
app.post('/delete-product', c_admin.deleteProducto)
app.get('/productos', c_admin.getProductos)
app.get('/boletas', c_admin.getBoletas)
app.get('/login', c_auth.login)
app.post('/register', c_auth.registerUser)
app.post('/insert-accion', c_admin.insertAccion)
app.post('/asignar-accion', c_admin.asignarAccionxRol)
app.get('/get-usuario', c_admin.getUsuario)
app.get('/usuarios', c_admin.getUsuarios)
app.post('/create-usuario', c_admin.createUsuario)
app.post('/update-usuario', c_admin.updateUsuario)


// Middleware para manejo de errores
app
  .use(logErrors)
  .use(errorHandler);


app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});