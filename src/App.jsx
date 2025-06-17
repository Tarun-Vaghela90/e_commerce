import React from 'react'
import Login from './user/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './user/Signup';
import AddProduct from './product/AddProduct';
import ProductList from './product/ProductList';
export default function App() {
  return (
    < >
    <Router>
        <Routes>
          <Route path="/" element={ <Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route path="/home" element={<ProductList />} />
        </Routes>
      </Router>
   
    </>
  )
}
