const Product = require(`../models/product`);
const ErrorHandler = require(`../utils/errorHandler`);
const catchAsyncErrors = require(`../middlewares/catchAsyncErrors`);
const APIFeatures = require(`../utils/apiFeatures`);

// create new product.

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const product = await Product.create(data);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all product. =>/api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});

// get single product by its id =>api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(`Product not found`, 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// update product => /api/va/product/:id

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler(`Product not found`, 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.send({
      error: true,
      errObj: error,
    });
  }
};

// deleting product by id = /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(`Product not found`, 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product is deleted",
  });
});
