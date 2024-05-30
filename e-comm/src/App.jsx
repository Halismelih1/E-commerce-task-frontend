import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import PageContainer from './containers/PageContainer';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import Footer from './components/home/footer/Footer';
import Order from './components/Order';
import Favourites from './components/Favourites';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userId, setUserId] = useState();


  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    if (userId) {
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
   
  }, [isLoggedIn,userId]); 

  return (
    <div>
      <PageContainer>
        <Router>
          <Navbar/>
          <hr />
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>}  />
            <Route path="/products/:id" element={<Detail/>}  />
            <Route path="/cart" element={<OrderPage isLoggedIn={isLoggedIn} />}  />
            <Route path="/viewOrders" element={<Order/>}  />
            <Route path="/favourites" element={<FavouritesPage isLoggedIn={isLoggedIn} />}  />
            <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn}/>}  />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
          <Footer/>
        </Router>
      </PageContainer>
    </div>
  );
}

function OrderPage({isLoggedIn}) {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!isLoggedIn) {
      
      navigate('/login');
    }
  }, [isLoggedIn, navigate]); 

  return isLoggedIn ? <Cart/> : null; 
}

function FavouritesPage({isLoggedIn}) {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!isLoggedIn) {
     
      navigate('/login');
    }
  }, [isLoggedIn, navigate]); 

  return isLoggedIn ? <Favourites/> : null; 
}

export default App;
