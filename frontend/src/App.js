import React, { useState } from 'react'
import Header from './Components/Header'
import AddProduct from './Components/AddProduct';
import Home from './Components/Home';
import AllProducts from './Components/AllProducts';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default function App() {
  let [data , setData] = useState([])
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addproduct' element={<AddProduct data={data} setData={setData}/>}/>
        <Route path='/allproducts' element={<AllProducts/>}/>
      </Routes>
    </Router>
  )
}
