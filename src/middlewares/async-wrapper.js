export default async (fn) =>
  fn.then((data) => [null, data])
    .catch((err) => [err, null]);
