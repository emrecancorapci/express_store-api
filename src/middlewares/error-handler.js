import { APIError } from '../errors/api-error.js';

export default (err, req, res) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      msg: err.message,
    });
  }

  return res.status(err.status).json({
    error: 'Server error',
    msg: err.message,
  });
};
