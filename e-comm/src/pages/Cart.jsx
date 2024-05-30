import CartComp from '../components/cart/CartComp';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [carts, setCarts] = useState([]); 
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    setEmail(localStorage.getItem('email'));
  }, []);
  
  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8080/viewCart/${userId}`); 
          const cartData = response.data;
  
          if (Array.isArray(cartData)) {
            setCarts(cartData);
            if (cartData.length > 0) {
              setTotalAmount(cartData[0].totalCartAmount || 0);
            } 
          } else {
            setCarts([]);
            setTotalAmount(0);
          }
  
          console.log('Fetched cart:', cartData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCart();
    }
  }, [userId]);

  const handleOrder = async () => {
    const confirmed = window.confirm('Siparişinizi onaylıyor musunuz?');

    if (confirmed) {
      try {
        const userData = {
          userId: userId, 
        };
    
        const response = await axios.post('http://localhost:8080/createOrder', userData);
        console.log('Sipariş başarıyla oluşturuldu:', response.data);
        alert('Siparişiniz başarıyla oluşturuldu!');
        navigate("/viewOrders")
      } catch (error) {
        console.error('Sipariş oluşturulurken hata oluştu:', error.message);
        alert('Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
      }
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.post(`http://localhost:8080/clearCart/${userId}`);
      alert('Sepet içeriği silindi!');
      navigate("/")
    } catch (error) {
      console.error('Sepet temizlenirken bir hata oluştu:', error.message);
    }
  };


  const handleNavigate = () => {
    navigate("/viewOrders")
  }
  
  return (
    <div className='container mx-auto px-4 py-8' style={{minHeight: 'calc(100vh - 80px)'}}>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {carts.length > 0 ? (
        <div>
          {carts.map((cart, i) => (
            <CartComp  key={i} cart={cart} />
          ))}
          <div className="flex justify-end items-center mt-6">
            <div className='text-xl text-green-800 font-bold border p-2'>Toplam Sepet Tutarı: {totalAmount} ₺</div>
            <button onClick={handleOrder} className='ml-4 bg-blue-500 text-white px-4 py-2 rounded-full'>Sipariş Ver</button>
            <button onClick={handleClearCart} className='ml-4 bg-red-500 text-white px-4 py-2 rounded-full'>Sepeti Temizle</button>
          </div>
        </div>
      ) : (
        !loading && (
          <div>
            <div className='text-xl font-bold mt-4 md:mt-0'>Merhaba, {email}</div>
            <div className='text-xl font-bold mt-4 md:mt-0'>Sepetiniz boş...</div>
          </div>
        )
      )}
      {/* Sabit konumda olan "Geçmiş Siparişlerim" butonu */}
      <button onClick={handleNavigate} className='fixed bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-full'>Geçmiş Siparişlerim</button>
    </div>
  );
};

export default Cart;
