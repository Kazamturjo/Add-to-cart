import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Card = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('Error fetching data', err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {data.map((item, index) => (
        <Link to={`/product/${item.id}`} key={index} className="bg-white p-4 rounded-lg shadow-md transition transform hover:scale-105">
          <img src={item.image} alt={item.description} className="w-full h-80vh object-cover mb-4 rounded" />
          <div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Card;
