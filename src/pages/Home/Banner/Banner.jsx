import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../loader/Loader";

const Banner = () => {
  const axiosSecure = useAxiosSecure();

  const { data: sliderData = [], isLoading } = useQuery(
    ["sliderData"],
    async () => {
      const res = await axiosSecure.get(`/slider`);
      return res.data;
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData?.map((sd, i) => (
          <SwiperSlide key={i}>
            <div className="h-[calc(100vh-73px)]">
              <div
                className="sliderImg relative"
                style={{
                  background: `linear-gradient(to bottom, #1f234044, #1f2340d7)`,
                  opacity: 0.3,
                }}
              >
                <img className="" src={sd?.img} alt="" />
              </div>
              <div className="w-full md:w-3/5 xl:w-3/6 mx-auto absolute flex-col text-center space-y-4 text-white items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-7xl font-bold  text-center">{sd?.title}</h2>
                <p className="pb-6">{sd.desc}</p>
                <Link to="/classes">
                  <Button value="See Our Classes" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
