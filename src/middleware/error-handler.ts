import { ErrorRequestHandler, RequestHandler } from 'express';

import { ErrorPayload, Errors } from '@typings';

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(new Errors.NotFoundError(res.__('DEFAULT_ERRORS.RESOURCE_NOT_FOUND')));
};

export const serverErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // This is not application error, most probably unhandled exception
  // let downstream handler handle it
  if (!err.statusCode) {
    return next(err);
  }

  const payload: ErrorPayload = {
    message: res.__(err.message),
  };

  if (err.failures) {
    payload.failures = err.failures;
  }
  res.status(err.statusCode).json(payload);
};
