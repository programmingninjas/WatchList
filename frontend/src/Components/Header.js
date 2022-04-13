import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  let [title, setTitle] = useState('')
  let [flag,setFlag] = useState(false)
  let [result, setResult] = useState()
  const Submit = (e)=> {
    e.preventDefault()
    if (title){
      fetch('http://192.168.1.154:5000/api/search?title='+title, {
        'methods': 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => setResult(response))
        .then(response => setFlag(true))
    }

  }
  return (<>{flag?<>
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark ms-auto">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Watch List</Link>
        <button className="navbar-toggler" type="text" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/addproduct">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allproducts">All Products</Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={Submit}>
            <input className="form-control me-2" value={title} onChange={(e) => { setTitle(e.target.value) }} type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
        <br/>
        <div className="card container" style={{width: '18rem'}}>
      <img src={result['image']} className="card-img-top" alt='product'/>
      <div className="card-body">
        <h5 className="card-title">{result['title']}</h5>
        <p className="card-text">&#x20B9;{result['price']}<br/><span style={{color:"#007600"}}>{result['availability']}</span></p>
      </div>
    </div></>:
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark ms-auto">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Watch List</Link>
        <button className="navbar-toggler" type="text" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/addproduct">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allproducts">All Products</Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={Submit}>
            <input className="form-control me-2" value={title} onChange={(e) => { setTitle(e.target.value) }} type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>}
    </>
  )
}
