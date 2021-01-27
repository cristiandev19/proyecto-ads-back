exports.exampleHola = (req, res) => {
  try {
    return res.status(200).send({
      msj: 'Hola como estas',
    });
  } catch(error) {
    next(error);
  }
}