import React from 'react'
import { useState, useEffect } from 'react';

export default function AllProducts() {
    let [db, setDb] = useState()
    useEffect(() => {
      fetch('http://192.168.1.154:5000/api/getall', {
        'methods': 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(response => setDb(response))
    }, [])
    let style = {
            width: '40%',
            height: 'auto',
            marginLeft:'30%'
        }
  return (<>
    <div className='container d-flex flex-row flex-wrap'>
    {db?db.map((prod) => {
      return (<div className="card container" style={{ width: '30rem',marginTop:'1rem'}}>
        <br/>
        <img src={prod['image']} className="card-img-top" style={style} alt='product' />
        <div className="card-body">
          <h5 className="card-title">{prod['title']}</h5>
          <p className="card-text">&#x20B9;{prod['price']}<br/><span style={{ color: "#007600" }}>{prod['availability']}</span></p>
        </div>
      </div>)
    }):<></>}
  </div>
  <br/>
  </>
  )
}
