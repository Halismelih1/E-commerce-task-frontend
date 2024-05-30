import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    setEmail(localStorage.getItem('email'));
  
  }, []);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/viewOrders/${userId}`);
        setOrderHistory(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-8" style={{minHeight: 'calc(100vh - 80px)'}}>
      {loading && <div>Loading...</div>}
      <h1 className='font-bold text-xl '>Merhaba, {email}. Bu sayfada geçmiş siparişlerinizi görüntülemektesiniz.</h1>
      <hr className='mb-4'/>
      {orderHistory.length > 0 ? (
        orderHistory.map((order, index) => (
          <div key={index} className="mb-4 flex items-center">
            <img src="/questionlogo.png" alt={`Sipariş ${order.orderId}`} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-xl font-bold">Sipariş</h3>
              <p className='text-green-900 text-l font-bold'>Toplam Tutar: {order.totalOrderPrice} ₺</p>
              <p>Sipariş Tarihi: {order.orderDate}</p>
              <p>Sipariş Detay: {order.orderDetails}</p>
            </div>
          </div>
        ))
      ) : (
        !loading && <p className='text-xl font-bold mt-4 md:mt-0'>Geçmiş siparişiniz bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Order;
