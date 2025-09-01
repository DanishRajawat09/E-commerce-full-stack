import AOS from "aos";
import "aos/dist/aos.css";
const Hero = () => {
      AOS.init();
  return (
    <main className="bg-heroBG">
      <div className="max-w-[var(--containers-max)] m-auto grid grid-cols-2 pb-0 max-[855px]:grid-cols-1 max-[855px]:grid-rows-[1fr_700px] px-4">
        {/* Left */}
        <div
          data-aos="fade-right"
          data-aos-duration="1500"
          className="pt-[103px] pb-[116px] max-[855px]:pt-10 max-[855px]:pb-0"
        >
          <h1 className="font-primary font-bold text-[64px] leading-[64px] mb-8 w-full max-[855px]:w-full max-[550px]:text-[52px] max-[550px]:leading-[54px] max-[550px]:font-extrabold max-[550px]:mb-5 max-[400px]:text-[36px] max-[400px]:leading-[34px]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>

          <p className="font-secondary font-normal text-base text-subtext leading-[22px] mb-8 w-full max-[855px]:w-full max-[550px]:text-sm max-[550px]:leading-5 max-[550px]:mb-5">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          {/* <Button
            title="Shop Now"
            linkTo="/shop"
            classname="bg-black text-white py-4 px-[54px] rounded-[62px] font-medium text-base mb-12 cursor-pointer"
          /> */}
       

          {/* stats */}
          <div className="flex gap-8 max-[1135px]:gap-6 max-[620px]:justify-center max-[855px]:w-full max-[855px]:justify-evenly max-[620px]:flex-wrap">
            <div>
              <p className="font-secondary font-bold text-[40px] max-[1135px]:text-[36px] max-[1045px]:text-[30px] max-[620px]:text-[32px]">
                2000+
              </p>
              <p className="font-secondary font-normal text-subtext max-[1045px]:text-xs max-[620px]:text-xs">
                International Brand
              </p>
            </div>

            <div className="bg-[#0000001d] w-[2px] h-[74px] max-[550px]:h-[52px]" />

            <div>
              <p className="font-secondary font-bold text-[40px] max-[1135px]:text-[36px] max-[1045px]:text-[30px] max-[620px]:text-[32px]">
                2,0000+
              </p>
              <p className="font-secondary font-normal text-subtext max-[1045px]:text-xs max-[620px]:text-xs">
                High-Quality Products
              </p>
            </div>

            <div className="bg-[#0000001d] w-[2px] h-[74px] max-[550px]:h-[52px] max-[400px]:hidden" />

            <div>
              <p className="font-secondary font-bold text-[40px] max-[1135px]:text-[36px] max-[1045px]:text-[30px] max-[620px]:text-[32px]">
                30,000+
              </p>
              <p className="font-secondary font-normal text-subtext max-[1045px]:text-xs max-[620px]:text-xs">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="relative bg-[url('/heromodels.jpg')] bg-no-repeat  max-[1100px]:bg-bottom  max-[855px]:bg-top max-[620px]:bg-bottom bg-[length:600px] max-[1135px]:bg-[length:550px] max-[1045px]:bg-[length:450px] max-[855px]:bg-[length:600px] max-[620px]:bg-[length:450px]"
        />
      </div>
    </main>
  );
}

export default Hero
