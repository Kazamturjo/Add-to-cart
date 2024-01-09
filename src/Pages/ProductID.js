import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductID = ({cartData, setCartData}) => {
  
  const [quantity, setQuantity] = useState(1);
  const [current, setCurrent] = useState({});

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


  useEffect(() => {
    try {
      const storedData = localStorage.getItem('cart');
      if (storedData) {
        // Attempt to parse the JSON string if it's not empty
        setCartData(JSON.parse(storedData));
      } else {
        // If the stored data is empty or null, set a default value (e.g., an empty array)
        setCartData([]);
      }
    } catch (error) {
      // Handle any parsing errors here
      console.error('Error parsing JSON from localStorage:', error);
      // Optionally, set a default value in case of parsing errors
      setCartData([]);
    }
  }, []);
  

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };


  
  const handleAddToCart = () => {
    let data = cartData.find(dt => dt.id === current.id)
    if (data) {
   

      let newInfo = cartData.map(dt => {
        if (dt.id === data.id) {
          // If the id matches, create a new object with updated quantity
          return { ...dt, quantity: dt.quantity + 1 };
        } else {
          // If the id doesn't match, return the original object unchanged
          return dt;
        }
      });
      console.log("here is my new Info",newInfo);
      localStorage.setItem('cart',JSON.stringify(newInfo))
      setCartData(newInfo);
    }else{
      let newInfo = [...cartData, { ...current,quantity:1}];
      console.log("here is my new Info",newInfo);
      localStorage.setItem('cart',JSON.stringify(newInfo))
      setCartData(newInfo);
    }
    // setCartData([...cartData,{...current}])
    // console.log(cartData)
    // localStorage.setItem('cart',JSON.stringify(cartData));


  //   // current.quantity = 1;
  //   // 1) Access localstorage
  //   // 2) If localstorage is empty - set the cart data in localstorage - add a method Quantity: 1
  //   // 3) else - check if current product id === productId exist in localstorage, Quantity ++; 
  //   // 4) else - set the data in localstorage with Quantity: 1
  };

  

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      {current ? (
        <div>
          <img src={current?.image} alt={current?.title} className="w-full h-48vh object-cover mb-4 rounded" />
          <div className="text-gray-700">
            <p className="text-sm italic mb-2">{current?.category}</p>
            <h1 className="text-xl font-bold mb-4">{current?.title}</h1>
            <p className="text-gray-600 mb-4">
              {showFullDescription ? current?.description : `${current?.description?.slice(0, 100)}...`}
              <button
                onClick={handleToggleDescription}
                className="text-blue-500 underline focus:outline-none"
              >
                {showFullDescription ? 'See less' : 'See more'}
              </button>
            </p>
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">${current?.price}</p>
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
                onClick={handleAddToCart}
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
