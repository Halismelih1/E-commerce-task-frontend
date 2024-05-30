import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryProduct, getProducts } from '../../redux/ProductSlice';
import Loading from '../home/Loading';
import ProductMap from './ProductMap';
import ReactPaginate from 'react-paginate';

const Product = ({ category, sort }) => {
  const dispatch = useDispatch();
  const { products, productsStatus } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;

  useEffect(() => {
    if (category) {
      dispatch(getCategoryProduct(category));
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, category]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setCurrentPage(0); // Kategori değiştiğinde sayfalamayı sıfırla
  }, [category]);

  const sortedProducts = [...products]
    .sort((a, b) =>
      sort === "inc" ? a.productPrice - b.productPrice : sort === "dec" ? b.productPrice - a.productPrice : 0
    );

  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);
  const offset = currentPage * productsPerPage;
  const currentProducts = sortedProducts.slice(offset, offset + productsPerPage);

  return (
    <div className="p-8">
      {productsStatus === 'LOADING' ? (
        <Loading />
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {currentProducts.map((product, i) => (
              <ProductMap key={i} product={product} />
            ))}
          </div>
          <ReactPaginate
            previousLabel={'← Previous'}
            nextLabel={'Next →'}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center items-center list-none p-0"
            previousLinkClassName="text-gray-700 dark:text-black-900 no-underline cursor-pointer mx-2"
            nextLinkClassName="text-gray-700 dark:text-black-900 no-underline cursor-pointer mx-2"
            disabledClassName="text-gray-400 cursor-not-allowed"
            activeClassName="font-bold"
            breakClassName="mx-2"
            pageClassName="mx-1"
            pageLinkClassName="text-gray-700 dark:text-black-900 no-underline cursor-pointer"
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
          />
        </>
      )}
    </div>
  );
};

export default Product;
