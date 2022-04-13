import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function AddProduct(props) {
  let [prodlink, setlink] = useState('')
  let [flag,setFlag] = useState(false)
  const Submit = (e) => {
    e.preventDefault()
    if (prodlink){
    fetch('http://192.168.1.154:5000/api/add?link='+prodlink,{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => props.setData(response))
    .then(response => setFlag(true))
    .then(response => setlink(''))
    .catch(error => console.log(error))
  }
  else{
    console.log("not working")
  }
}
  return (<>
  {flag?<div className="alert alert-success container my-3 alert-dismissible fade show" role="alert">
      <strong>{props.data['title']}</strong> Added Successfully
  <button type="button" className="btn-close" onClick={() =>{setFlag(false)}} data-dismiss="alert" aria-label="Close">
  </button>
</div>:<></>}
  {flag?<div className="card container" style={{width: '18rem'}}>
  <img src={props.data['image']} className="card-img-top" alt='product'/>
  <div className="card-body">
    <h5 className="card-title">{props.data['title']}</h5>
    <p className="card-text">&#x20B9;{props.data['price']}<br/><span style={{color:"#007600"}}>{props.data['availability']}</span></p>
  </div>
</div>:<></>}
    <form className='container' onSubmit={Submit}>
      <h3 className='my-5'>Add Product</h3>
      <div className="mb-3">
        <label htmlFor="prodlink" className="form-label"><h6>Product Link</h6></label>
        <input type="text" value={prodlink} onChange={(e) => { setlink(e.target.value) }} className="form-control" id="prodlink" />
      </div>
      <button type="submit" className="btn btn-danger">Add <FontAwesomeIcon icon={faHeartCirclePlus}/></button>
    </form>
    </>
  )
}
