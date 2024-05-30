import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getDetailProduct } from '../redux/ProductSlice';
import DetailComp from '../components/detail/DetailComp';
import Loading from '../components/home/Loading';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, productsDetailStatus } = useSelector(state => state.products);


  useEffect(() => {
    dispatch(getDetailProduct(id));
  }, [dispatch, id]);


  return (
    <div>
        {
            productsDetailStatus == "LOADING" ? <Loading/> : <DetailComp productDetail={productDetail} id={id} />
 
        }
    </div>
  );
}

export default Detail;
