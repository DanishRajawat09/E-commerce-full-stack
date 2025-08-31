import { useEffect, useState } from "react";

import "./cartCardStyle.css";
// import SetQuantity from '../../../../components/setquantityBar/SetQuantity'
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../../features/cartSlice";
import { addCalc } from "../../../features/cartCalc";

const CartCard = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const cartProduct = useSelector((state) => state.cartProduct || []);
  const dispatch = useDispatch();
  const handleRemoveProduct = (crtProdId) => {
    dispatch(removeProduct({ crtProdId }));
  };
  console.log(cartProduct);

  const productPrice = [];

  cartProduct.map(({ crtProdPrice, crtProdQuantity }) => {
    let result = crtProdPrice * crtProdQuantity;
    productPrice.push(result);
  });
  useEffect(() => {
    const total = productPrice.reduce((acc, currVal) => {
      return acc + currVal;
    }, 0);

    setTotalPrice(total);
  }, [productPrice]);
  useEffect(() => {
    dispatch(addCalc({ totalPrice }));
  }, [totalPrice]);
  return cartProduct.length > 0 ? (
    <>
      {cartProduct.map(
        ({
          crtProdId,
          crtProdTitle,
          crtProdImg,
          crtProdQuantity,
          crtProdSize,
          crtProdPrice,
        }) => (
          <div key={crtProdId} className="cartCard grid">
            <div className="cartImgArea flexContainer">
              <img src={crtProdImg} alt={crtProdTitle} />
            </div>
            <div className="cardData">
              <div className="titleArea flexContainer">
                <h2 className="cartTitle">{crtProdTitle}</h2>
                <img
                  src="/cartBin.png"
                  alt="bin"
                  onClick={() => handleRemoveProduct(crtProdId)}
                />
              </div>
              <div className="sizeArea">
                <p className="sizeDetails">Size: {crtProdSize}</p>
              </div>

              <div className="priceQuantityArea flexContainer">
                <p className="cartPrice">${crtProdQuantity * crtProdPrice}</p>
                {/* <div className='quantity' ><SetQuantity quantityProd={crtProdQuantity} /></div> */}
              </div>
            </div>
          </div>
        )
      )}
    </>
  ) : (
    <div>nothing to see </div>
  );
};

export default CartCard;
