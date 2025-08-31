import { useRef, useState } from "react";
import "./productInfoStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { reviews } from "../../../api/HomePageProducts";

const ProductSecNav = () => {
  const [activeSec, setActiveSec] = useState("selectDetails");
  const swiperRef = useRef(null);

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <>
      {/* Top Navigation */}
      <section>
        <div className="max-w-[var(--containers-max)] flex justify-between pb-6">
          <button
            onClick={() => {
              goToSlide(0);
              setActiveSec("selectDetails");
            }}
            className={`w-full border-b py-6 text-center text-lg text-black/60 transition ${
              activeSec === "selectDetails" && "border-black text-black"
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => {
              goToSlide(1);
              setActiveSec("selectReview");
            }}
            className={`w-full border-b py-6 text-center text-lg text-black/60 transition ${
              activeSec === "selectReview" && "border-black text-black"
            }`}
          >
            Rating & Review
          </button>
          <button
            onClick={() => {
              goToSlide(2);
              setActiveSec("selectFAQs");
            }}
            className={`w-full border-b py-6 text-center text-lg text-black/60 transition ${
              activeSec === "selectFAQs" && "border-black text-black"
            }`}
          >
            FAQs
          </button>
        </div>
      </section>

      {/* Swiper */}
      <Swiper
        onSwiper={(Swiper) => {
          swiperRef.current = Swiper;
        }}
        spaceBetween={0}
        className="productDetailsSlide"
      >
        {/* Product Details */}
        <SwiperSlide>
          <div className="max-w-[var(--containers-max)] bg-red-500 h-full">
            {/* Product details content here */}
          </div>
        </SwiperSlide>

        {/* Reviews */}
        <SwiperSlide>
          <div className="max-w-[var(--containers-max)] py-6">
            {/* Review Header */}
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-medium">All Reviews</h3>
            </div>

            {/* Review Grid */}
            <div className="reviewArea grid grid-cols-1 sm:grid-cols-2 gap-5 h-[787px] pr-4 overflow-auto">
              {reviews.map(({ date, title, starImg, desc, markImg }, index) => (
                <div
                  key={index}
                  className="border rounded-2xl p-6 sm:p-7 md:p-8"
                >
                  {/* Rating */}
                  <div className="flex justify-between mb-4">
                    <img src={starImg} alt="stars" />
                  </div>

                  {/* Title + Verified */}
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-lg md:text-xl font-medium">
                      {title}
                    </h2>
                    <img src={markImg} alt="verified" />
                  </div>

                  {/* Description */}
                  <p className="text-black/60 text-sm md:text-base mb-6">
                    {desc}
                  </p>

                  {/* Date */}
                  <p className="text-black/60 text-xs md:text-sm">
                    Posted on {date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>

        {/* FAQs */}
        <SwiperSlide>
          <div className="max-w-[var(--containers-max)] py-6">
            <div className="mb-6">
              <h3 className="text-2xl font-medium">FAQs</h3>
              <p className="text-black/60">Frequently asked questions</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{/* FAQ items */}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ProductSecNav;
