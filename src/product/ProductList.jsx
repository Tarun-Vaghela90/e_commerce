import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigator = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigator("/login")
    }
    axios.get(`http://localhost:3000/products/api/products?page=${page}`)
      .then(res => {
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(err => console.error('❌ Error fetching products:', err));
  }, [page]);

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🛍 All Products</h2>
        <Link
          to="/addproducts"
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
        >
          ➕ Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg shadow p-4 bg-white">
              <img
                src={`http://localhost:3000/uploads/${product.imageUrl}`}
                alt={product.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{product.description}</p>
              <p className="font-bold text-blue-700">₹{product.price}</p>
              <p className="text-sm">Category: {product.category}</p>
              <p className="text-sm">Stock: {product.stockCount}</p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 items-center space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-300 text-gray-700 disabled:opacity-50"
          >
            ⬅ Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 rounded bg-gray-300 text-gray-700 disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
