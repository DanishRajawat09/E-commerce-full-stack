
import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-searchBar)] pt-36 min-h-[499px]">
      <div className="max-w-[var(--containers-max)] mx-auto">
        {/* Top Section */}
        <div className="grid md:grid-cols-[248px_1fr] gap-8 mb-12 px-4 md:px-0">
          {/* Left Company Info */}
          <div>
            <h2 className="text-[34px] font-extrabold mb-6">shop.co</h2>
            <p className="text-sm text-[var(--color-subtext)] mb-8">
              We have clothes that suit your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex gap-3">
              <img src="1.png" alt="social" />
              <img src="2.png" alt="social" />
              <img src="3.png" alt="social" />
              <img src="4.png" alt="social" />
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:justify-items-end">
            <div>
              <h3 className="text-lg font-bold mb-6">COMPANY</h3>
              <ul className="flex flex-col gap-4 text-[var(--color-subtext)] text-sm">
                <li>About</li>
                <li>Feature</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">HELP</h3>
              <ul className="flex flex-col gap-4 text-[var(--color-subtext)] text-sm">
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">FAQ</h3>
              <ul className="flex flex-col gap-4 text-[var(--color-subtext)] text-sm">
                <li>Account</li>
                <li>Manage Deliveries</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">RESOURCES</h3>
              <ul className="flex flex-col gap-4 text-[var(--color-subtext)] text-sm">
                <li>Free eBooks</li>
                <li>Development Tutorial</li>
                <li>How to - Blog</li>
                <li>Youtube Playlist</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-black/20" />

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center mt-6 gap-4 px-4 md:px-0">
          <p className="text-sm text-[var(--color-subtext)]">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-3">
            <img src="visa.png" alt="Visa" />
            <img src="debit.png" alt="Debit" />
            <img src="paypal.png" alt="Paypal" />
            <img src="applePay.png" alt="Apple Pay" />
            <img src="gpay.png" alt="GPay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
