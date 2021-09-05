function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Não encontrado - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV == "development"
        ? err.stack
        : "Não foi possivel acessar esse caminho, entre em contato com o administrador da página para mais detalhes!",
  });
}

module.exports = {
  notFound,
  errorHandler,
};
