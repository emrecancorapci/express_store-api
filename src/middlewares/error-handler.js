import { APIError } from '../errors/api-error.js';

export default (err, req, res) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).send('Something went wrong try again later');
};

