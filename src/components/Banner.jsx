import { useRef } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

const Banner = () => {
  const inputRef = useRef(null);
  const images = [
    "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
  ];

  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  };

  return (
    <div className='w-full h-auto overflow-x-hidden'>
      <div className='w-screen  relative'>
        <Slider {...settings} ref={inputRef}>
          {images.map((image, index) => (
            <img
              key={index}
              className='w-screen h-full object-cover'
              alt={`banner${index}`}
              loading='priority'
              src={image}
            />
          ))}
        </Slider>
        <div className='absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-44'>
          <div
            className='arrowStyle'
            onClick={() => inputRef.current.slickPrev()}
          >
            <HiArrowLeft />
          </div>
          <div
            className='arrowStyle'
            onClick={() => inputRef.current.slickNext()}
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
