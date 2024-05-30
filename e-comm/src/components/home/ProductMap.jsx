import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductMap = ({ product }) => {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(`/products/${product?.productId}`)}
      className="bg-white p-4 w-[280px] m-4 rounded-md shadow-md flex flex-col justify-center items-center h-full cursor-pointer mb-4"
    >
      <div className="text-center">
        <img className="w-48 mx-auto border mb-4 cursor-pointer" src="/questionlogo.png" alt="" />
        <h3 className="text-xl font-bold text-black-800">{product?.productName}</h3>
        <h6 className="text-sm font-bold text-gray-800">{product?.productDesc}</h6>
        <h6 className="text-sm font-bold text-gray-400 mt-2 underline">{product?.subCategory?.subCategoryName}</h6>
      </div>
      <div className="mt-4 text-green-600 font-bold">
        Price: {product?.productPrice}₺
      </div>
    </div>
  );
};

export default ProductMap;
