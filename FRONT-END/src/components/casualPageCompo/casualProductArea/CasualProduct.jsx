import productApi from "../../../api/productApi";
import { useDispatch } from "react-redux";
import { filterOpen } from "../../../features/stateSlice";
import { Link } from "react-router-dom";
import { addProduct } from "../../../features/productData";
import "./casualProductStyles.css";

const CasualProduct = () => {
  const dispatch = useDispatch();

  const handleProduct = (
    id,
    title,
    desc,
    price,
    img,
    actualPrice,
    starImg,
    rating
  ) => {
    dispatch(
      addProduct({ id, img, title, rating, price, actualPrice, starImg, desc })
    );
  };

  return (
    <section className="max-w-[var(--containers-max)] mx-auto p-4">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Casual</h1>
        <img
          onClick={() => dispatch(filterOpen({ filOpen: true }))}
          className="hidden xl:inline-block w-8 h-8 cursor-pointer"
          src="filterBtn.png"
          alt="filter"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-h-[1320px] overflow-y-scroll pr-5 reviewArea">
        {productApi.map(
          ({
            id,
            title,
            desc,
            price,
            images,
            actualPrice,
            ratingImg,
            rating,
          }) => (
            <Link
              key={id}
              to={"/productDetails"}
              className="no-underline text-black"
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  handleProduct(
                    id,
                    title,
                    desc,
                    price,
                    images,
                    actualPrice,
                    ratingImg,
                    rating
                  )
                }
              >
                {/* Image */}
                <div className="rounded-2xl overflow-hidden mb-4">
                  <img src={images[0]} alt={title} className="w-full h-full" />
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-medium mb-2">{title}</h3>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-2">
                  <img src={ratingImg} alt="stars" className="w-24 md:w-32" />
                  <p className="text-sm md:text-base">{rating}</p>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <p className="text-xl md:text-2xl font-semibold">${price}</p>
                  {actualPrice && (
                    <p className="text-lg md:text-xl font-semibold text-black/20 line-through">
                      ${actualPrice}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default CasualProduct;
