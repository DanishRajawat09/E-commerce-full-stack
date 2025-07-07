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

  let order = await Order.findOne({ customer: userId, product: product._id });

  if (order) {
    order.quantity = quantity;
    order.priceAtPurchase = product.price * quantity;
    await order.save({ validateBeforeSave: false });
  }

  if (!order) {
    order = await Order.create({
      customer: userId,
      product: product._id,
      quantity: quantity,
      priceAtPurchase: product.price * quantity,
      deliveredBy: product.admin,
    });
  }
  if (!order) {
    throw new ApiError(400, "Error while create order");
  }

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

  const productData = cart.products;
  const orders = [];

  for (const cartItem of productData) {
    const product = await Product.findById(cartItem.product);
    if (!product) continue;

    let order = await Order.findOne({
      customer: userId,
      product: cartItem.product,
    });

    if (order) {
      order.quantity = cartItem.quantity;
      order.priceAtPurchase = cartItem.priceAtAdd * cartItem.quantity;
    } else {
      order = await Order.create({
        customer: userId,
        product: cartItem.product,
        quantity: cartItem.quantity,
        priceAtPurchase: cartItem.priceAtAdd * cartItem.quantity,
        deliveredBy: product.admin,
      });
    }

    await order.save({ validateBeforeSave: false });
    orders.push(order);
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Products from cart added to order successfully",
        orders
      )
    );
});

const deleteOrderUser = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized. Please log in.");
  }
  if (!productId) {
    throw new ApiError(400, "Product ID is required.");
  }

  const prodId = mongoose.Types.ObjectId(productId);

  const result = await Order.deleteOne({ customer: userId, product: prodId });

  if (result.deletedCount === 0) {
    throw new ApiError(404, "No matching order found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Order cancelled successfully", {}));
});

const orderDetailsAdmin = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { query, page = 1, limit = 20, sortBy, sortType } = req.query;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const aggregation = [];

  if (!userId) {
    throw new ApiError(
      400,
      "Unauthorized Request From Admin, Admin should be Logged in"
    );
  }

  aggregation.push(
    { $match: { deliveredBy: userId } },
    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customerInfo",
      },
    },
    { $unwind: "$customerInfo" },
    {
      $lookup: {
        from: "profiles",
        localField: "customerInfo.profile",
        foreignField: "_id",
        as: "customerProfile",
      },
    },
    { $unwind: "$customerProfile" },
    {
      $lookup: {
        from: "addresses",
        localField: "customerInfo.address",
        foreignField: "_id",
        as: "customerAddress",
      },
    },
    { $unwind: "$customerAddress" },
    {
      $group: {
        _id: "$_id",
        customer: { $first: "$customerInfo" },
        customerProfile: { $first: "$customerProfile" },
        customerAddress: { $first: "$customerAddress" },
      },
    }
  );

  if (query) {
    aggregation.push(
      {
        $addFields: {
          matches: {
            $regexFindAll: {
              input: "$customerProfile.fullName",
              regex: query,
              options: "i",
            },
          },
        },
      },

      {
        $match: {
          "matches.0": { $exists: true },
        },
      }
    );
  }

  if (sortBy) {
    aggregation.push({
      $sort: { [sortBy]: sortType === "desc" ? -1 : 1 },
    });
  }
  aggregation.push({ $skip: (pageNum - 1) * limitNum }, { $limit: limitNum });

  const order = await Order.aggregate(aggregation);

  if (!order || order.length === 0) {
    throw new ApiError(404, "Order not Found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Fetched Order details Successfully", order));
});

const editOrderDetails = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = req.user;
  const { orderStatus } = req.body;

  if (!productId) {
    throw new ApiError(400, "ProductID is required");
  }
  if (!user._id) {
    throw new ApiError(
      400,
      "Unauthorize Admin, Admin should be logged in for edit order"
    );
  }

  if (user.role === "admin") {
    const status = ["Processing", "Shipped", "delivered", "cancelled"];
    if (!status.includes(orderStatus)) {
      throw new ApiError(400, "invalid order status");
    }

    const result = await Order.updateOne(
      { deliveredBy: user._id, product: productId },
      { $set: { orderStatus: orderStatus } }
    );

    if (result.matchedCount === 0) {
      throw new ApiError(404, "No matching order found or unauthorized access");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Order Status is Updated Successfully", result)
      );
  } else if (user.role === "user") {
    const status = ["cancelled"];
    if (!status.includes(orderStatus)) {
      throw new ApiError(400, "invalid order status");
    }

    const result = await Order.updateOne(
      { customer: user._id, product: productId },
      { $set: { orderStatus: orderStatus } }
    );

    if (result.matchedCount === 0) {
      throw new ApiError(404, "No matching order found or unauthorized access");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Order Status is Updated Successfully", result)
      );
  } else {
    throw new ApiError(
      400,
      "Unauthorized Request,User Role should be Admin or User"
    );
  }
});

export {
  orderSoloProduct,
  orderCartProducts,
  deleteOrderUser,
  orderDetailsAdmin,
  editOrderDetails,
};
