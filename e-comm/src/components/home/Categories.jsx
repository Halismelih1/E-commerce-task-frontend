import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/CategorySlice';
import { useNavigate } from 'react-router-dom';
import { VscActivateBreakpoints } from "react-icons/vsc";
import { GiExitDoor } from "react-icons/gi";



const Categories = ({setCategory,isLoggedIn}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(store => store.categories || { categories: [] });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleNavigate = () => {
    if (isLoggedIn) {
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      window.location.reload();
    } else {
      window.location.href = "/login";
    }
  };

  const buttonColor = isLoggedIn ? "text-red-700" : "text-green-700";


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="p-4 flex-grow w-[200px]">
        <h2 className="text-2xl font-bold mb-4 flex"><VscActivateBreakpoints size={30} />Categories</h2>
        {state.categories.map((category, i) => (
          <div onClick={() => setCategory(category.categoryId)}
            key={i}
            className="flex items-center justify-between py-3 px-4 bg-white border-t border-gray-300 last:border-b"
          >
            <span className="text-black-400 hover:text-black-900 cursor-pointer">{category.categoryName}</span>
          </div>
        ))}
      </div>
      <div className="ml-2 mt-12 mb-2">
      <button onClick={handleNavigate} className={` border p-1 rounded font-bold mr-2 ${buttonColor}`}>
          {isLoggedIn ? "Çıkış Yap"   : "Giriş Yap" }
        </button>
        
        {
          !isLoggedIn &&
          <button onClick={()=>navigate("/register")} className={`text-blue-700 font-bold ml-2 border p-1 rounded text-blue-700`}>
          Kayıt ol
        </button>
        }
       
      </div>
    </div>
  );
};

export default Categories;
