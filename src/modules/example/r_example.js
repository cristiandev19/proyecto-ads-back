const express = require('express');
const router = express.Router();
const passport = require('passport');

const c_example = require('./c_example');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/hola', c_example.exampleHola);
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).send({
    example: 'este es el mensaje dentor de example'
  })
})

module.exports = router;