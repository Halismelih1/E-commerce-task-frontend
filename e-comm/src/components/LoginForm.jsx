import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm({setIsLoggedIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get(`http://localhost:8080/login/${email}/${password}`);
        alert("başarili giriş,yönlendirliyorsunuz.."); 
      localStorage.setItem('userId', response.data.userId); 
      localStorage.setItem('email', response.data.email); 
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      alert("Hatalı giriş bilgileri,Lütfen tekrar deneyiniz!");
    }
  };

  return (
    <div className="flex justify-center items-center p-52">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-center font-bold text-xl mb-4">Login</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight "
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="font-bold text-green-700 underline font-bold py-2 px-4 rounded "
              type="submit"
            >
              Giriş yap
            </button>
            <button onClick={()=>navigate("/register")} className={`text-white underline font-bold ml-2  rounded text-blue-700`}>
          Kayıt ol
        </button>
            <button
            onClick={()=>navigate("/")}
              className="ml-2 font-bold text-red-700 font-bold underline py-2 px-4 rounded "
            >
              Vazgeç
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
