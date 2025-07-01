import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { Product } from "../models/products.models.js";
import ApiResponse from "../utils/apiResponse.js";
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


  const product = await Product.findOneAndDelete({_id : productId , admin : userId})

  if (!product) {
    throw new ApiError(400 , "Error while deleting Product")
  }

  res.status(200).json(
    new ApiResponse(200 , "product is deleted" , product)
  )

});

const updateProduct = asyncHandler(async (req ,res) => {
    const {productId} = req.params
    const userId = req.user._id
    
})

export { addProducts , deleteProduct};
