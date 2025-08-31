import "./casualProductStyles.css";
import productApi from "../../../api/productApi";
import { useDispatch } from "react-redux";
import { filterOpen } from "../../../features/stateSlice";
import { Link } from "react-router-dom";
import { addProduct } from "../../../features/productData";
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
    console.log("");

    dispatch(
      addProduct({ id, img, title, rating, price, actualPrice, starImg, desc })
    );
  };

  return (
    <section className="casualProductSection">
      <div className="CPHead flexContainer">
        <h1 className="CPHeading">Casual</h1>
        <img
          onClick={() => {
            dispatch(filterOpen({ filOpen: true }));
          }}
          className="filterIcon"
          src="filterBtn.png"
          alt=""
        />
      </div>
      <div className="productGrid grid">
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
            <Link key={id} to={"/productDetails"} className="productLink">
              <div
                className="CPCard "
                onClick={() => {
                  handleProduct(
                    id,
                    title,
                    desc,
                    price,
                    images,
                    actualPrice,
                    ratingImg,
                    rating
                  );
                }}
              >
                <div className="CPCardImg">
                  <img src={images[0]} alt={title} />
                </div>
                <h3 className="CPCardTitle">{title}</h3>
                <div className="CPRatingArea flexContainer">
                  <img src={ratingImg} className="ratingStar" alt="stars" />
                  <p>{rating}</p>
                </div>
                <div className="CPPriceArea flexContainer">
                  <p className="CPPrice">${price}</p>
                  {actualPrice && (
                    <p className="CPActualPrice">${actualPrice}</p>
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
