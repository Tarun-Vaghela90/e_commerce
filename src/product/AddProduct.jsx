import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const AddProduct = () => {
      const navigator = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockCount: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    data.append('image', image);

    try {
      const res = await axios.post('http://localhost:3000/products/api/addproduct', data);
      setMessage('✅ Product added successfully');
      console.log(res.data);
        navigator("/")
    } catch (err) {
      setMessage('❌ Failed to add product');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full p-2 border rounded" name="name" placeholder="Product Name" onChange={handleChange} required />
        <textarea className="w-full p-2 border rounded" name="description" placeholder="Description" onChange={handleChange} required />
        <input className="w-full p-2 border rounded" name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <input className="w-full p-2 border rounded" name="category" placeholder="Category" onChange={handleChange} required />
        <input className="w-full p-2 border rounded" name="stockCount" type="number" placeholder="Stock Count" onChange={handleChange} required />
        <input className="w-full p-2 border rounded" type="file" accept="image/*" onChange={handleImage} required />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
      </form>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default AddProduct;
