import React from 'react';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { PiShootingStarThin } from "react-icons/pi";
import { WiDirectionRight } from "react-icons/wi";



const SliderComp = () => {
  const { products, productsStatus } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const handleDetailClick = () => {
    if (products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const randomProduct = products[randomIndex];
      navigate(`/products/${randomProduct.productId}`);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-4 my-16">
        Lucky Products for <span className='text-purple-700'>YOU</span>!
      </h1>
      <Slider {...settings}>
        <div className='!flex items-center bg-gray-200 px-6 '>
          <div className='p-8'>
            <div className='text-6xl font-bold flex'>See More <PiShootingStarThin size={24}/></div>
            <div className='text-lg my-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptate nemo expedita quisquam at repellendus dolor in aut, sed mollitia vitae reprehenderit cum recusandae harum ad provident id possimus necessitatibus?
            </div>
            <button 
              className='border rounded-full cursor-pointer text-2xl w-[200px] h-16 flex items-center justify-center bg-gray-100'
              onClick={handleDetailClick}
            >
              Detail <WiDirectionRight/>

            </button>
          </div>
          <img 
            className='w-[250px] rounded-xl' 
            src="https://i2.milimaj.com/i/milliyet/75/869x477/5ea3069155428010fc7475da.jpg" 
            alt="Product"
          />
        </div> 
      </Slider>
    </div>
  );
}

export default SliderComp;
