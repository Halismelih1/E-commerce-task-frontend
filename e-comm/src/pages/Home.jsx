import React, { useState } from 'react'
import SliderComp from '../components/home/SliderComp'
import Sorting from "../components/home/Sorting"
import Categories from "../components/home/Categories"
import Product from "../components/home/Product"
const Home = ({isLoggedIn}) => {

  const [sort,setSort]= useState("");
  const [category,setCategory]= useState("");


  return (
    <div>
      <SliderComp/>
      <Sorting setSort={setSort} />
      <div className='flex'>
      <Categories setCategory={setCategory} isLoggedIn={isLoggedIn}/>
      <Product category={category} sort={sort}/>
      </div>
    </div>
  )
}

export default Home