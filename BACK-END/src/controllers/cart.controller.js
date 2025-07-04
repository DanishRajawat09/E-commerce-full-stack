import { Cart } from "../models/cart.models.js";
import { Product } from "../models/products.models.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const quantity = Number(req.body.quantity);
  if (!productId) {
    throw new ApiError(400, "ProductId is not defined, try again");
  }
  if (isNaN(quantity) || quantity <= 0) {
    throw new ApiError(400, "Quantity must be a valid number greater than 0");
  }
  if (quantity > 10) {
      throw new ApiError(400, "Quantity must be in the range of 10");
  }

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request, user must be logIn");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(400, "could not Find the product, request denied");
  }

  let cart = await Cart.findOne({ cartOwner: userId });

  if (!cart) {
    cart = await Cart.create({ cartOwner: userId });
  }
  if (!cart) {
    throw new ApiError(500, "error while creating cart");
  }

  
  const existingProdcutIndex = cart.products.findIndex(
    (val) => val.product.toString() === product._id.toString()
  );

  if (existingProdcutIndex > -1 && (cart.quantity >= 0 && cart.quantity <= 10)) {
    cart.products[existingProdcutIndex].quantity = quantity;
  } else {
    cart.products.push({
      product: product._id,
      quantity: quantity,
      priceAtAdd  : product.price
    });
  }
  await cart.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, "Product added to cart successfully", cart));
});

export { addToCart };
