import CartCard from "../../components/cartCompo/cartCard/CartCard";
import CartCalc from "../../components/cartCompo/cartCalculater/CartCalc";

const Cart = () => {
  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10">
      <div className="max-w-[var(--containers-max)] mx-auto">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">YOUR CART</h1>

        {/* Layout */}
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          {/* Cart Products */}
          <div className="border border-black/10 rounded-2xl p-4 sm:p-6 flex flex-col gap-6 overflow-auto min-h-[300px]">
            <CartCard />
          </div>

          {/* Cart Summary */}
          <CartCalc />
        </div>
      </div>
    </main>
  );
};

export default Cart;
