import { useEffect } from "react";
import Button from "../../button/Button";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsLatter = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="relative top-24 z-20 bg-black rounded-2xl w-full px-6   md:px-16 py-9 flex flex-wrap max-[1000px]:gap-8  max-[1000px]:justify-center items-center justify-between max-w-[var(--containers-max)] mx-auto"
    >
      {/* Left text */}
      <div className="text-white font-bold text-3xl max-[500px]::text-4xl mb-6 font-primary md:mb-0">
        STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
      </div>

      {/* Input + Button */}
      <div className="flex flex-col w-full max-w-sm gap-3">
        <div className="flex items-center gap-3 bg-white rounded-[62px] px-4 py-3 min-w-[290px] sm:min-w-[311px] md:min-w-[349px]">
          <img src="email.png" alt="emailIcon" />
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full border-none outline-none placeholder:text-base sm:placeholder:text-sm max-[400px]:placeholder:text-sm"
          />
        </div>
        <Button
          title="Subscribe to Newsletter"
          classname="bg-white rounded-[62px] py-3 text-base font-semibold w-full max-[400px]:text-sm"
        />
      </div>
    </div>
  );
};

export default NewsLatter;
