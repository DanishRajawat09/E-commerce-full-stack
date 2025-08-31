import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./dressStyle.css"; // only for tricky grid-area stuff

const DressStyle = () => {
  AOS.init();

  return (
    <section className="py-10">
      <div className="max-w-[var(--containers-max)] mx-auto bg-searchBar px-16 py-[72px] rounded-[40px] overflow-hidden">
        <h1 className="font-primary text-center font-bold xl:text-[48px] md:text-[38px] sm:text-[34px] text-[26px] leading-[58px] mb-10">
          BROWSE BY DRESS STYLE
        </h1>

        <div className="styleContainer grid gap-5 [grid-template-rows:repeat(2,289px)] max-[750px]:[grid-template-rows:repeat(4,290px)]">
          {/* Casual */}
          <div
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-delay="100"
            className="casual font-secondary style bg-[url('/casual.png')] max-[750px]:bg-left-top bg-left-top bg-[length:600px] font-bold text-[36px] rounded-[20px] px-9 py-6"
          >
            Casual
          </div>

          {/* Formal */}
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="200"
            className="formal font-secondary style bg-[url('/formal.png')] bg-left-top bg-[length:600px] font-bold text-[36px] rounded-[20px] px-9 py-6"
          >
            Formal
          </div>

          {/* Party */}
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="300"
            className=" party font-secondary style bg-[url('/party.png')] bg-left bg-[length:600px] font-bold text-[36px] rounded-[20px] px-9 py-6
              max-[1040px]:bg-right-top
              max-[890px]:bg-center-top
              max-[400px]:bg-center-top max-[400px]:bg-[length:400px]"
          >
            Party
          </div>

          {/* Gym */}
          <div
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-delay="400"
            className="style font-secondary gym bg-[url('/gym.png')] bg-left bg-no-repeat bg-[length:600px] font-bold text-[36px] rounded-[20px] px-9 py-6
              max-[890px]:bg-center-top
              max-[400px]:bg-[length:200px]"
          >
            Gym
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;
