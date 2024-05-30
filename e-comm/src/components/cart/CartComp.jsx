import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartComp = ({ cart }) => {
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    setEmail(localStorage.getItem('email'));
  
  }, []);

  const handleRemoveItem = async () => {
    try {
      await axios.post('http://localhost:8080/removeFromCart', { 
        userId: userId,
        productId:cart.productId
       });
     navigate("/")
    } catch (error) {
      console.error('Ürün silme işlemi başarısız oldu:', error);
    }
  };

  return (
    <div onClick={() => navigate(`/products/${cart?.productId}`)}
    className="cart-item p-4 border-b flex items-center cursor-pointer">
      <div className="w-3/4">
        <h2 className="font-bold text-lg">{cart.productName}</h2>
        <p>Fiyat: {cart.productPrice} TL</p>
        <p>Adet: {cart.quantity}</p>
      </div>
      <div className="w-1/4 flex justify-end">
        <p>Toplam Ürün Fiyatı: {cart.totalItemPrice}₺</p>
      </div>
      <div className="w-1/4 flex justify-end">
        <img
          src="/questionlogo.png" 
          alt={cart.productName}
          className="w-20 h-20 object-cover rounded"
        />
      </div>
      <div className="w-1/4 flex justify-end">
        <button onClick={handleRemoveItem} className="text-red-600">Ürünü Sil</button>
      </div>
    </div>
  );
};

export default CartComp;
