export default async (req, res, next) => {
  const error = new Error(`404 Not Found - ${req.originalUrl}`);
  res.status(404).send(`<h1>${error.message} </h1> `);
  next(error);
};
