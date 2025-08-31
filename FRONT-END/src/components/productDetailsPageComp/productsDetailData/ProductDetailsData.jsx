import { useState } from "react";
import "./productDetailsDataStyles.css";
import SetQuantity from "../../setquantityBar/SetQuantity";
import Button from "../../button/Button";
import { addToCart, updateProduct } from "../../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductData = ({ data }) => {
  const [size, setSize] = useState("medium");
  const [border, setBorder] = useState("firstImg");
  const cartProduct = useSelector((state) => state.cartProduct);
  const productArr = useSelector((state) => state.product);

  const [bgBlack, setBgBlack] = useState("bgBlackMDM");
  const [bigImg, setBigImg] = useState(productArr[0].productImage[0]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const checkProd = (id, cartProd) =>
    cartProd.some((item) => item.crtProdId === id);

  const handleAddToCart = (
    crtProdTitle,
    crtProdSize,
    crtProdImg,
    crtProdQuantity,
    crtProdId,
    crtProdPrice,
    cartProd
  ) => {
    const isExisting = checkProd(crtProdId, cartProd);
    if (isExisting) {
      dispatch(
        updateProduct({
          crtProdId,
          crtProdTitle,
          crtProdImg,
          crtProdQuantity,
          crtProdSize,
          crtProdPrice,
        })
      );
    } else {
      dispatch(
        addToCart({
          crtProdId,
          crtProdTitle,
          crtProdImg,
          crtProdQuantity,
          crtProdSize,
          crtProdPrice,
        })
      );
    }
  };

  return (
    <main className="productDetails">
      <div className="max-w-[var(--container-max)] m-auto grid gap-10 lg:grid-cols-2 md:grid-cols-1">
        {/* Image Area */}
        <div className="grid grid-cols-[130px_1fr] gap-4 md:grid-cols-1">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 md:flex-row md:justify-center">
            {productArr[0].productImage.map((img, idx) => {
              const key = ["firstImg", "secondImg", "thirdImg"][idx];
              return (
                <img
                  key={key}
                  className={`rounded-xl cursor-pointer object-cover w-full max-w-[130px] h-[150px] sm:max-w-[100px] sm:h-[120px] ${
                    border === key ? key : ""
                  }`}
                  onClick={(e) => {
                    setBigImg(e.currentTarget.src);
                    setBorder(key);
                  }}
                  src={img}
                  alt={data.altName}
                />
              );
            })}
          </div>

          {/* Big Image */}
          <div className="flex justify-center">
            <img
              className="rounded-xl w-full max-w-[500px] md:max-w-[630px] sm:max-w-full h-auto object-cover"
              src={bigImg}
              alt={data.altName}
            />
          </div>
        </div>

        {/* Text Area */}
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-extrabold uppercase mb-3">
            {productArr[0].productTitle}
          </h1>

          <div className="flex items-center gap-4 mb-3">
            <img src={productArr[0].productRatingImg} alt="stars" />
            <span className="text-base">{data.rating}</span>
          </div>

          <div className="flex gap-2 mb-5">
            <p className="text-xl font-medium">${productArr[0].productPrice}</p>
            <p className="text-xl line-through text-black/30">
              ${productArr[0].productActualPrice}
            </p>
          </div>

          <p className="text-sm text-black/60">{productArr[0].productDesc}</p>

          <hr className="my-4" />

          <h4 className="text-black/60 mb-4">Choose Size</h4>
          <div className="flex flex-wrap items-center gap-3">
            {["Small", "Medium", "Large", "X-Large"].map((label, i) => {
              const keys = ["bgBlackSM", "bgBlackMDM", "bgBlackL", "bgBlackXL"];
              return (
                <button
                  key={label}
                  onClick={(e) => {
                    setBgBlack(keys[i]);
                    setSize(e.currentTarget.innerText);
                  }}
                  className={`px-6 py-3 rounded-full border border-black/20 transition ${
                    bgBlack === keys[i] ? keys[i] : ""
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <hr className="my-4" />
          <div className="flex flex-col sm:flex-row gap-5">
            <SetQuantity setQuantityProd={setQuantity} quantityProd={quantity} />
            <Button
              event={() =>
                handleAddToCart(
                  productArr[0].productTitle,
                  size,
                  productArr[0].productImage[0],
                  quantity,
                  productArr[0].id,
                  productArr[0].productPrice,
                  cartProduct
                )
              }
              title={"Add To Cart"}
              classname={"flex-grow rounded-full addToCartBtn"}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductData;
