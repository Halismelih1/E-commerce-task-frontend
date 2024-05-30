
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DetailComp = ({ productDetail,id }) => {
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");


  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    setEmail(localStorage.getItem('email'));
  
  }, []);

  const handleIncrement = () => {
      setQuantity(quantity + 1);

  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const addBasket = () => {
    if (quantity === 0) {
      alert('Ürün miktarı 0 olamaz. Lütfen en az bir ürün seçin.');
      return;
    }
    const itemToAdd = {
      userId: userId,
      productId: Number(id),
      quantity: quantity
    };
    
    const addUrl = "http://localhost:8080/addToCart"; 
    
    axios.post(addUrl, itemToAdd)
      .then(response => {
        alert('Ürün sepete eklendi :)');
      })
      .catch(error => {
        console.error('Ürün eklenirken hata oluştu:', error); 
      });
  };

  const addFav = () => {

     const itemToAdd = {
      userId: userId,
      productId: Number(id),
    };
    
    const addUrl = "http://localhost:8080/addToFav"; 
    
    axios.post(addUrl, itemToAdd)
      .then(response => {
        alert('Ürün favorilere eklendi :)');
      })
      .catch(error => {
        console.error('Ürün eklenirken hata oluştu:', error); 
      });
  };

 
 


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Ürün Resmi */}
        <div className="md:order-2">
          <img
           src="/questionlogo.png"
            className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Ürün Detayları */}
        <div className="md:order-1">
        <h1 className="text-3xl font-bold mb-2">{productDetail?.productName}</h1>
        <p className="text-green-500 text-xl font-bold mb-4">{productDetail?.productPrice}₺</p>
          <p className="text-gray-700 text-lg mb-4">{productDetail?.productDesc}</p>
          <p className="text-gray-500 text-md mb-4">{productDetail?.subCategory?.subCategoryName}</p>
          
          <div className="flex items-center">
            <button
              className="bg-gray-200 text-gray-600 px-4 py-1 rounded hover:bg-gray-300"
              onClick={handleDecrement}
            >
              -
            </button>
            <span className="mx-4">{quantity}</span>
            <button
              className="bg-gray-200 text-gray-600 px-4 py-1 rounded-lg hover:bg-gray-300"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <button
            className=" mb-4 mt-4  text-green-700 text-xl font-bold border p-2" 
            onClick={addBasket}
          >
            Add to Basket
          </button>
          
          <button
            className=" text-purple-800 text-xl ml-4 font-bold border p-2" 
            onClick={addFav}
          >
            Add to Favourites
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailComp;
