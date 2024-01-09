import React from 'react';

const Cart = ({ cartData, setCartData }) => {
  const handleRemoveItem = (id) => {
    const updatedCart = cartData.filter((item) => item.id !== id);
    setCartData(updatedCart);
    // Update localStorage after removing an item
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotalPrice = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="grid gap-4">
        {cartData.map((dt) => (
          <div
            key={dt.id}
            className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold mb-2">{dt.title}</h2>
            <img className="h-20 object-cover mb-2 rounded" src={dt.image} alt={dt.title} />
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">{dt.quantity} items</p>
              <p className="text-purple-500 font-semibold">${(dt.price * dt.quantity).toFixed(2)}</p>
            </div>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleRemoveItem(dt.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="p-6 mt-4 text-xl font-semibold">
        Total Price: ${calculateTotalPrice()}
      </div>
    </div>
  );
};

export default Cart;
