import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import About from './Pages/About';
import Home from './Pages/ Home';
import Cart from './Component/Cart/Cart';
import ProductID from './Pages/ProductID';
import { useState } from 'react';

function App() {

  

  const [cartData,setCartData]=useState([])
   
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout cartData={cartData} setCartData={setCartData}/>}>
        <Route index element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/cart' element={<Cart cartData={cartData} setCartData={setCartData}/>}/>
          <Route path='/product/:id'element={<ProductID  cartData={cartData} setCartData={setCartData}/>}/>

        </Route>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
