import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { Product } from "../models/products.models.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";
import { responseFormat } from "../utils/basicUtils.js";
import { uploadImage } from "../utils/cloudinary.js";

// products admin part
const addProducts = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    stock,
    price,
    sizes,
    gender,
    febric,
    colors,
    brand,
    ram,
    storage,
    colorOptions,
  } = req.body;
  const { _id } = req.user;
  const filePaths = req.files;
  console.log(filePaths);

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
  if (category === "mobile") {
    if (!brand) throw new ApiError(400, "Brand Name is required");
    if (!ram && !storage)
      throw new ApiError(400, "Ram and Storage is required");
  }
  if (category === "dress") {
    if (!gender) throw new ApiError(400, "gender is required");
    if (!sizes) throw new ApiError(400, "Add Atleast one Size");
    if (!febric) throw new ApiError(400, "material info is required");
  }

  const numStock = Number(stock);
  const numPrice = Number(price);
  const productObj = {
    title,
    description,
    category,
    stock: numStock,
    admin: _id,
    price: numPrice,
    images: [],
    details: {},
  };

  for (const file of filePaths) {
    const uploadProductsImages = await uploadImage(file.path);

    if (!uploadProductsImages) {
      throw new ApiError(400, "Product image is not uploaded");
    }

    productObj.images.push({
      url: uploadProductsImages.url,
      publicId: uploadProductsImages.public_id,
    });
  }
  if (category === "mobile") {
    if (brand) productObj.details.brand = brand;
    if (ram) productObj.details.ram = ram;
    if (storage) productObj.details.storage = storage;
    if (colorOptions) {
      const val = colorOptions.split(",");
      productObj.details.colorOptions = val;
    }
  }

  if (category === "dress") {
    if (gender) productObj.details.gender = gender;
    if (sizes) productObj.details.sizes = sizes;
    if (febric) productObj.details.febric = febric;
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

  const excludedKeys = ["_id", "__v", "createdAt", "updatedAt", "admin"];
  const formatedResponse = await responseFormat(product, excludedKeys);
  res
    .status(200)
    .json(new ApiResponse(200, "Product Added Successfully", formatedResponse));
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

  res
    .status(200)
    .json(new ApiResponse(200, "product is deleted", product.title));
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
    if (updatedProduct.gender) {
      product.details.gender = updatedProduct.gender;
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
    if (updatedProduct.febric) {
      product.details.febric = updatedProduct.febric;
      count++;
    }
  }
  const excludedKeys = ["_id", "admin", "createdAt", "updatedAt", "__v"];
  const formatedResponse = await responseFormat(product, excludedKeys);
  if (count >= 1) {
    await product.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Product updated succssfully", formatedResponse)
      );
  } else {
    res
      .status(200)
      .json(new ApiResponse(200, "Nothing to update", formatedResponse));
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
  const {
    page = 1,
    limit = 20,
    query,
    sortedBy,
    sortedType,
    category,
    size,
    febric,
    color,
    gender,
    ram,
    storage,
    brand,
    colorOptions,
    priceUpper,
    priceLower,
  } = req.query;
  const priceUpperNum = Number(priceUpper);
  const priceLowerNum = Number(priceLower);
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const aggregation = [];
  const allowedSortFields = ["price", "title", "createdAt"];
  let sortField = allowedSortFields.includes(sortedBy) ? sortedBy : "createdAt";
  let sortOrder = sortedType === "desc" ? -1 : 1;

  aggregation.push({
    $sort: { [sortField]: sortOrder },
  });

  if (category) {
    aggregation.push({
      $match: { category: category },
    });
  }

  if (category === "dress" && size) {
    aggregation.push({
      $match: {
        category: category,
        "details.sizes": size,
      },
    });
  }
  if (category === "dress" && febric) {
    aggregation.push({
      $match: {
        category: category,
        "details.fabric": { $regex: new RegExp(febric, "i") },
      },
    });
  }

  if (category === "dress" && color) {
    aggregation.push({
      $match: {
        category: category,
        "details.colors": color,
      },
    });
  }
  if (priceUpper && priceLower) {
    aggregation.push({
      $match: {
        price: {
          $gt: priceLowerNum,
          $lt: priceUpperNum,
        },
      },
    });
  }

  if (category === "dress" && gender) {
    aggregation.push({
      $match: {
        category: category,
        "details.gender": gender,
      },
    });
  }

  if (category === "mobile" && ram) {
    aggregation.push({
      $match: {
        category: category,
        "details.ram": ram,
      },
    });
  }
  if (category === "mobile" && storage) {
    aggregation.push({
      $match: {
        category: category,
        "details.storage": storage,
      },
    });
  }
  if (category === "mobile" && colorOptions) {
    aggregation.push({
      $match: {
        category: category,
        "details.colorOptions": colorOptions,
      },
    });
  }
  if (category === "mobile" && brand) {
    aggregation.push({
      $match: {
        category: category,
        "details.brand": brand,
      },
    });
  }

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
  const excludedKeys = ["_id", "__v", "createdAt", "updatedAt", "admin"];
  const formatedResponse = await responseFormat(product, excludedKeys);
  res
    .status(200)
    .json(ApiResponse(200, "Fetched Products Successully", formatedResponse));
});

const productDetail = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const aggregation = [];
  if (!productId) {
    throw new ApiError(400, "could not get product ID, try again");
  }

  aggregation.push({
    $match: { _id: mongoose.Types.ObjectId(productId) },
  });
  aggregation.push(
    {
      $lookup: {
        from: "users",
        localField: "admin",
        foreignField: "_id",
        as: "adminInfo",
      },
    },
    { $unwind: "$adminInfo" },
    {
      $lookup: {
        from: "adminprofiles",
        localField: "adminInfo._id",
        foreignField: "admin",
        as: "adminprofileInfo",
      },
    },
    { $unwind: "$adminprofileInfo" },
    {
      $lookup: {
        from: "addresses",
        localField: "adminprofileInfo.shopAddress",
        foreignField: "_id",
        as: "shopAddress",
      },
    },
    { $unwind: "$shopAddress" },
    {
      $project: {
        title: 1,
        description: 1,
        category: 1,
        rating: 1,
        price: 1,
        images: 1,
        details: 1,
        shopName: "$adminprofileInfo.shopName",
        shopAddress: "$shopAddress",
      },
    }
  );
  const product = await Product.aggregate(aggregation);

  if (!product || product.length === 0) {
    throw new ApiError(400, "cannnot find product, invalid product Id");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Product fetched successfully", product));
});
export {
  addProducts,
  deleteProduct,
  updateProduct,
  getAdminProducts,
  getProducts,
  productDetail,
};
