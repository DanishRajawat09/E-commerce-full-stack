import { Product } from "../models/products.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Order } from "../models/order.models.js";
import ApiResponse from "../utils/apiResponse";
import { Cart } from "../models/cart.models.js";
const orderSoloProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const quantity = Number(req.body.quantity);

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request, User Must be Logged in");
  }
  if (!productId) {
    throw new ApiError(400, "Product ID is Required");
  }
  if (!quantity || isNaN(quantity) || quantity <= 0) {
    throw new ApiError(400, "Quantity must be a number greater than 0");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product Not Found");
  }

  if (product.stock < quantity) {
    throw new ApiError(400, `Only ${product.stock} item(s) left in stock`);
  }

  let order = null;

  order = await Order.findOne({ customer: userId });

  if (!order) {
    order = await Order.create({ customer: userId });
  }

  if (!order) {
    throw new ApiError(500, "Error while Creating the order");
  }

  const productIndex = order?.products?.findIndex(
    (val) => val.product.toString() === product._id.toString()
  );

  if (productIndex > -1) {
    order.products[productIndex].quantity = quantity;
  } else {
    order.products.push({
      product: product._id,
      quantity: quantity,
      priceAtPurchase: product.price,
      deliveredBy: product.admin,
    });
  }

  await order.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Order Placed or update Quantity successfully",
        order
      )
    );
});

const orderCartProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request, user must be logged in");
  }

  const cart = await Cart.findOne({ cartOwner: userId });

  if (!cart || cart.products.length === 0) {
    throw new ApiError(400, "Cart is empty or not found");
  }

  const productData = cart.toObject().products;

  let order = await Order.findOne({ customer: userId });

  if (!order) {
    order = await Order.create({ customer: userId });
  }

  for (const cartItem of productData) {
    const existingIndex = order.products.findIndex(
      (orderItem) => orderItem.product.toString() === cartItem.product.toString()
    );

    if (existingIndex > -1) {
    
      order.products[existingIndex].quantity = cartItem.quantity;
    } else {
     
      order.products.push({
        product: cartItem.product,
        quantity: cartItem.quantity,
        priceAtPurchase: cartItem.priceAtAdd,
      });
    }
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json(
    new ApiResponse(200, "Products from cart added to order successfully", order)
  );
});
const deleteOrder = asyncHandler(async (req , res) => {
  const {productId} = req.params;
  const userId = req.user._id

  if (!userId) {
    throw new ApiError(400 , "Unauthorized Request, user must be logged in")
  }
  if (!productId) {
    throw new ApiError(400 , "Product ID is Required")
  }

  const order = await Order.findOne({customer : userId})

  if (!order) {
    throw new ApiError(400 ,"could not find order Docuemnt")
  }

  const productIndex = order.products.findIndex(val => val.product.toString() === productId)

if (productIndex === -1) {
  throw new ApiError(400, "Product not found in order.");
}


  order.products.splice(productIndex , 1)

  await order.save({validateBeforeSave : false})

  res.status(200).json(
    new ApiResponse(200 ,"order cancelled successfully" , order)
  )

})
export { orderSoloProduct , orderCartProducts , deleteOrder};
