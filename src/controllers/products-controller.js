import Product from '../models/product-model.js';

export const getProducts = async (req, res) => {
  const { featured, company, name, sort, fields, page, limit, filter } =
    req.query;
  const sortList = sort ? sort.split(',').join(' ') : 'createdAt';
  const defaultLimit = 10;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true';
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    // https://docs.mongodb.com/manual/reference/operator/query/regex/
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (filter) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const options = ['price', 'rating', 'name'];

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    const filterObject = filter.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    filterObject.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');

      if (options.includes(field)) {
        queryObject[field] = { [operator]: value };
      }
    });
  }

  let response = Product.find(queryObject).sort(sortList);

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    response = response.select(fieldsList);
  }

  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || defaultLimit;
  const skipNumber = (pageNumber - 1) * limitNumber;

  response = response.skip(skipNumber).limit(limitNumber);

  const products = await response;
  return res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
