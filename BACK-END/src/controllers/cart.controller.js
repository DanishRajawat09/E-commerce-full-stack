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

  if (existingProdcutIndex > -1 && cart.quantity >= 0 && cart.quantity <= 10) {
    cart.products[existingProdcutIndex].quantity = quantity;
  } else {
    cart.products.push({
      product: product._id,
      quantity: quantity,
      priceAtAdd: product.price,
    });
  }
  await cart.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, "Product added to cart successfully", cart));
});

const deleteCartProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request, please Login first");
  }

  if (!productId) {
    throw new ApiError(400, "cannot read Prodcut ID, try again");
  }

  const cart = await Cart.findOne({ cartOwner: userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found for the user.");
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );
  if (productIndex === -1) {
    throw new ApiError(404, "Product not found in cart.");
  }

  cart.products.splice(productIndex, 1);
  await cart.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, "Product removed from cart successfully", cart));
});

export { addToCart, deleteCartProduct };
