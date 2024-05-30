import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { FaCircleXmark } from "react-icons/fa6";


const Favourites = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null); 
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    setEmail(localStorage.getItem('email'));
  }, []);

  useEffect(() => {
    if (filter) {
      fetchData();
    }
  }, [filter]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    let url = '';
    if (filter === 'mostFav') {
      url = 'http://localhost:8080/mostFavouritedProducts';
    } else if (filter === 'userFav') {
      url = `http://localhost:8080/viewUserFav/${userId}`;
    }

    try {
      const response = await axios.get(url);
      setProducts(response.data);
      console.log(products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const removeFav = (id) => {
    const itemToAdd = {
      userId: userId,
      productId: id,
    };

    const addUrl = "http://localhost:8080/removeFromFav"; 

    axios.post(addUrl, itemToAdd)
      .then(response => {
        alert('Ürün favorilerden çıkarıldı');
        fetchData(); 
      })
      .catch(error => {
        console.error('Ürün çıkarılırken hata oluştu:', error); 
      });
  };

  return (
    <div style={{minHeight: 'calc(100vh - 80px)'}}>
      <h1 className='mt-4 border p-2 font-bold text-l'>
        Merhaba, {email}. Bu sayfada favoriye eklediğiniz ürünleri görüntüleyebilir, aynı zamanda en çok favorilere eklenmiş ürünleri listeleyebilirsiniz.
      </h1>
      <div className='flex gap-4 mb-4 mt-4'>
        <button
          onClick={() => handleFilterClick('mostFav')}
          className={`px-4 py-2 border text-xl rounded ${filter === 'mostFav' ? 'bg-blue-500 text-white' : ''}`} 
        >
          Most Favourited Products
        </button>
        <button
          onClick={() => handleFilterClick('userFav')}
          className={`px-4 py-2 border text-xl rounded ${filter === 'userFav' ? 'bg-blue-500 text-white' : ''}`} 
        >
          My Favourites
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        products.length > 0 ? (
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {products.map((product) => (
              <div
                onClick={() => navigate(`/products/${product?.productId}`)}
                key={product.productId}
                className='p-4 border rounded mt-4 mb-8 cursor-pointer transition-transform transform hover:scale-105 flex items-center justify-center'
              >
                <div className='w-1/2 p-2'>
                  <h2 className='font-bold text-lg underline'>{product.productName}</h2>
                  <h2 className='font-bold text-lg'>{product.productPrice}₺</h2>
                  <div className='flex items-center'>
                    <p className='mr-2'>{product.favCount}</p>
                    <AiFillHeart color='red' size={20} />
                  </div>
                </div>
                <div className='w-1/2 p-2 flex justify-center'>
                  <img src="/questionlogo.png" className='w-24 h-24 object-cover' alt={product.productName} />
                </div>
                {filter === 'userFav' && (
                  <p onClick={() => removeFav(product.productId)} className='text-red-700 font-bold'><FaCircleXmark/></p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div><h1 className='text-center text-2xl font-bold mb-4'>Favori listenizde bir ürün bulunmamaktadır.</h1></div>
        )
      )}
    </div>
  );
};

export default Favourites;
