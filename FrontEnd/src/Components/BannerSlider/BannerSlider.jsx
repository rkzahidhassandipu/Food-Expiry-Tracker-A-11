import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "motion/react";
import { fadeIn } from "../animation/motions";

const slides = [
  {
    title: "Welcome to FreshBox",
    subtitle: "Delivering freshness to your door",
    image: "https://i.postimg.cc/BQJ9w67N/sa.jpg", // replace with your image path
  },
  {
    title: "Customize Your Fridge",
    subtitle: "Manage your food with ease",
    image: "https://i.postimg.cc/rFgX6kvT/saa.jpg",
  },
  {
    title: "Join Our Community",
    subtitle: "Start saving and sharing today",
    image: "https://i.postimg.cc/jj2R355B/ss.jpg",
  },
];

const BannerSlider = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      animate="show"
      viewport={{once: false, amount: 0.7}}
      className="w-full hidden lg:flex h-[60vh] my-10"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center  rounded-3xl"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
              {/* Overlay Color */}
              <div className="absolute inset-0  rounded-3xl bg-black/50"></div>{" "}
              {/* or use bg-primary/60 */}
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center text-center">
                <div className="text-white p-6 max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-primary px-6 py-2 rounded-md text-white hover:bg-primary/80 cursor-pointer transition"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default BannerSlider;
