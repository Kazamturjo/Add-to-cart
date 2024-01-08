import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import About from './Pages/About';
import Home from './Pages/ Home';
import Cart from './Component/Cart/Cart';
import ProductID from './Pages/ProductID';
import { useState } from 'react';

function App() {
  const [count,setCount]=useState(0)
  
  const incrementCart =()=>{
    setCount(count +1)
  }
  const [cartData,setCartData]=useState([])
   
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout count={count}/>}>
        <Route index element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:id'element={<ProductID incrementCart={incrementCart} cartData={cartData} setCartData={setCartData}/>}/>

        </Route>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
