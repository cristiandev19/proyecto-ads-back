const express    = require('express'),
      app        = express(),
      cors       = require('cors'),
      bodyParser = require('body-parser'),
      { dbConnection } = require('./src/databases/mongodb'),
      { config } = require('./src/config/index');

//passport stuff
const passport      = require('passport'),
      jwtStrategry  = require('./src/strategies/jwt');
passport.use(jwtStrategry);

// Hacemos la conexion a mongodb
dbConnection();

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
  
// Middleware para manejo de errores
app
  .use(logErrors)
  .use(errorHandler);


app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});