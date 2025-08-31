import "./cartStyle.css";
import CartCard from "../../components/cartCompo/cartCard/CartCard";
import CartCalc from "../../components/cartCompo/cartCalculater/CartCalc";
const Cart = () => {
  return (
    <main className="cartPage">
      <div className="container">
        <h1 className="cartHeading">YOUR CART</h1>
        <div className="cartContainer grid">
          <div className="cartProducts flexContainer">
            <CartCard />
          </div>
          <CartCalc />
        </div>
      </div>
    </main>
  );
};

export default Cart;
