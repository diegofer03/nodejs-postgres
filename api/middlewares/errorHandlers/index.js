function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err); //mostrar el error en servidor para poder monitorearlo
  next(err); //importante para saber que se esta enviando a un middleware de tipo error, si no tiene el error dentro entonces se esta mandando a uno normal
}

// Crear formato para devolverlo al cliente que se complementa con la función anterior:
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) { //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  res.status(500).json({ //indicar que el error es estatus 500 Internal Server Error
    message: err.message, //mostrar al cliente el mensaje de error
    stack: err.stack, //mostrar info del error
  })
}

function queryErrorHandler(err, req, res, next) {
  if (err.parent) {
    const { fields, parent } = err;
    res.status(500).json({
      field: fields,
      message: parent.detail,
    });
  }
  next(err);
}

// eslint-disable-next-line no-unused-vars
function boomErrorHandler(err, req, res, next) { //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  if(err.isBoom){
    const {output} = err
    res.status(output.statusCode).json(output.payload)
  }else{
    next(err)
  }
}

module.exports = { logErrors, errorHandler, queryErrorHandler, boomErrorHandler }; //exportarlo como modulo
