import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { Product } from "../models/products.models.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

// products admin part
const addProducts = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    stock,
    price,
    images,
    sizes,
    subCategory,
    fabric,
    colors,
    brand,
    ram,
    storage,
    colorOptions,
  } = req.body;
  const { _id } = req.user;
  if (!title)
    throw new ApiError(
      400,
      "title is missing, please give a title to the product"
    );
  if (!category)
    throw new ApiError(
      400,
      "Category is required, You Have to Select an Category"
    );
  if (!_id)
    throw new ApiError(400, "Unauthorized Request, Register or Login Fisrt");

  if (!stock) throw new ApiError(400, "Mention Stock of product");

  if (!price) throw new ApiError(400, "Price is Required ");
  if (!Array.isArray(images))
    throw new ApiError(400, "images are in Array format");
  if (category === "mobile") {
    if (!brand) throw new ApiError(400, "Brand Name is required");
    if (!ram && !storage)
      throw new ApiError(400, "Ram and Storage is required");
  }
  if (category === "dress") {
    if (!subCategory) throw new ApiError(400, "gender is required");
    if (!sizes) throw new ApiError(400, "Add Atleast one Size");
    if (!fabric) throw new ApiError(400, "material info is required");
  }

  const productObj = {
    title,
    description,
    category,
    stock,
    admin: _id,
    price,
    images,
    details: {},
  };

  if (category === "mobile") {
    if (brand) productObj.details.brand = brand;
    if (ram) productObj.details.ram = ram;
    if (storage) productObj.details.storage = storage;
    if (colorOptions) productObj.details.colorOptions = colorOptions;
  }

  if (category === "dress") {
    if (subCategory) productObj.details.subCategory = subCategory;
    if (sizes) productObj.details.sizes = sizes;
    if (fabric) productObj.details.fabric = fabric;
    if (colors) productObj.details.colors = colors;
  }

  const existingProduct = await Product.findOne({
    admin: _id,
    title: title,
    price: price,
    category: category,
  });

  if (existingProduct) {
    throw new ApiError(
      400,
      "Same product already exists. Please add a different one."
    );
  }

  const product = await Product.create(productObj);

  if (!product) {
    throw new ApiError(400, "Product is not Added properly, please try again");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Product Added Successfully", product));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  if (!productId)
    throw new ApiError(400, "Request Failed, Product ID is not Found");
  if (!userId) {
    throw new ApiError(
      400,
      "Unauthorized Request, User is not Logged In or Register"
    );
  }

  const product = await Product.findOneAndDelete({
    _id: productId,
    admin: userId,
  });

  if (!product) {
    throw new ApiError(400, "Error while deleting Product");
  }

  res.status(200).json(new ApiResponse(200, "product is deleted", product));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const updatedProduct = req.body;

  if (!productId) {
    throw new ApiError(400, "Request Denied Failed to get productId");
  }

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request , Login or Register First");
  }

  const product = await Product.findOne({ admin: userId, _id: productId });

  if (!product) {
    throw new ApiError(
      400,
      "User not Found, Register your Account and Try Again"
    );
  }
  let count = 0;
  if (updatedProduct.title) {
    product.title = updatedProduct.title;
    count++;
  }
  if (updatedProduct.description) {
    product.description = updatedProduct.description;
    count++;
  }
  if (updatedProduct.stock) {
    product.stock = updatedProduct.stock;
    count++;
  }
  if (updatedProduct.price) {
    product.price = updatedProduct.price;
    count++;
  }
  if (Array.isArray(updatedProduct.images)) {
    product.images = updatedProduct.images;
    count++;
  }
  if (product.category === "mobile") {
    if (updatedProduct.ram) {
      product.details.ram = updatedProduct.ram;
      count++;
    }
    if (updatedProduct.colorOptions) {
      product.details.colorOptions = updatedProduct.colorOptions;
      count++;
    }
    if (updatedProduct.storage) {
      product.details.storage = updatedProduct.storage;
      count++;
    }
    if (updatedProduct.brand) {
      product.details.brand = updatedProduct.brand;
      count++;
    }
  }
  if (product.category === "dress") {
    if (updatedProduct.subCategory) {
      product.details.subCategory = updatedProduct.subCategory;
      count++;
    }
    if (Array.isArray(updatedProduct.sizes)) {
      product.details.sizes = updatedProduct.sizes;
      count++;
    }
    if (Array.isArray(updatedProduct.colors)) {
      product.details.colors = updatedProduct.colors;
      count++;
    }
    if (updatedProduct.fabric) {
      product.details.fabric = updatedProduct.fabric;
      count++;
    }
  }

  if (count >= 1) {
    await product.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, "Product updated succssfully", product));
  } else {
    res.status(200).json(new ApiResponse(200, "Nothing to update", product));
  }
});

const getAdminProducts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { query, page = 1, limit = 20 } = req.query;
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const aggregation = [];

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request, Please Login First");
  }
  aggregation.push({
    $match: { admin: mongoose.Types.ObjectId(userId) },
  });
  if (query) {
    aggregation.push(
      {
        $addFields: {
          matches: {
            $regexFindAll: {
              input: "$title",
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

  if (pageNum && limitNum) {
    aggregation.push({ $skip: (pageNum - 1) * limitNum });

    aggregation.push({ $limit: limitNum });
  }

  const products = await Product.aggregate(aggregation);

  if (!products || products.length === 0) {
    throw new ApiError(404, "No products found. Please add a product.");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Fetched all admin products successfully", products)
    );
});

// products user Part

const getProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, query, sortedBy, sortedType } = req.query;

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const aggregation = [];
  const allowedSortFields = ["price", "title", "createdAt"];
  let sortField = allowedSortFields.includes(sortedBy) ? sortedBy : "createdAt";
  let sortOrder = sortedType === "desc" ? -1 : 1;

  aggregation.push({
    $sort: { [sortField]: sortOrder },
  });

  if (query) {
    aggregation.push(
      {
        $addFields: {
          matches: {
            $regexFindAll: {
              input: "$title",
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

  aggregation.push({ $skip: (pageNum - 1) * limitNum }, { $limit: limitNum });

  const product = await Product.aggregate(aggregation);

  if (!product || product.length === 0) {
    throw new ApiError(404, "product not found");
  }
  res
    .status(200)
    .json(ApiResponse(200, "Fetched Products Successully", product));
});
export { addProducts, deleteProduct, updateProduct, getAdminProducts };
