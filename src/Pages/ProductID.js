import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductID = () => {
  
  const [quantity, setQuantity] = useState(1);
  const [current, setCurrent] = useState(null);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setCurrent(res.data);
      })
      .catch(err => {
        console.error('Error fetching data', err);
      });
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = (current) => {
    console.log("Add to cart created", current)
    // current.quantity = 1;
    // 1) Access localstorage
    // 2) If localstorage is empty - set the cart data in localstorage - add a method Quantity: 1
    // 3) else - check if current product id === productId exist in localstorage, Quantity ++; 
    // 4) else - set the data in localstorage with Quantity: 1
  };
  console.log('cart t',current);
  

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      {current ? (
        <div>
          <img src={current.image} alt={current.title} className="w-full h-48vh object-cover mb-4 rounded" />
          <div className="text-gray-700">
            <p className="text-sm italic mb-2">{current.category}</p>
            <h1 className="text-xl font-bold mb-4">{current.title}</h1>
            <p className="text-gray-600 mb-4">
              {showFullDescription ? current.description : `${current.description.slice(0, 100)}...`}
              <button
                onClick={handleToggleDescription}
                className="text-blue-500 underline focus:outline-none"
              >
                {showFullDescription ? 'See less' : 'See more'}
              </button>
            </p>
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">${current.price}</p>
              <div className="flex items-center">
                <label className="mr-2">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="border border-gray-300 p-1 w-16 text-center"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handleAddToCart(current)}
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading.........</h1>
      )}
    </div>
  );
};

export default ProductID;
