import AOS from "aos";
import "aos/dist/aos.css";
import "./BrandBelt.css"; // only for responsive img sizes

const BrandBelt = () => {
  AOS.init();

  return (
    <section className="bg-black overflow-hidden">
      <div className="max-w-[var(--containers-max)] mx-auto flex justify-between max-[930px]:justify-center flex-wrap items-center py-11 gap-5 px-4 overflow-hidden">
        <img
          data-aos="fade-left"
          className="versache"
          src="versache.png"
          alt="Versace"
          data-aos-delay="0"
        />
        <img
          data-aos="fade-left"
          className="zara"
          src="zara.png"
          alt="Zara"
          data-aos-delay="200"
        />
        <img
          data-aos="fade-left"
          className="gucci"
          src="gucci.png"
          alt="Gucci"
          data-aos-delay="400"
        />
        <img
          data-aos="fade-left"
          className="prada"
          src="prada.png"
          alt="Prada"
          data-aos-delay="600"
        />
        <img
          data-aos="fade-left"
          className="ck"
          src="ck.png"
          alt="Calvin Klein"
          data-aos-delay="800"
        />
      </div>
    </section>
  );
};

export default BrandBelt;
