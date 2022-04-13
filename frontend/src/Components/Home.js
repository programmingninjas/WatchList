import bg from './bg.jpg';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function Home(props) {
  let [db, setDb] = useState()
  useEffect(() => {
    fetch('http://192.168.1.154:5000/api/getrecent', {
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
    <div className='container text-center'>
      <div className='my-3'><img src={bg} width='50%' alt='bg' /></div>
      <p className='fst-italic fs-1'>What have you fallen for today?</p>
      <Link to="/addproduct"><button type="button" className='btn btn-danger'>Add it in your heart <FontAwesomeIcon icon={faHeartCirclePlus} /></button></Link>
    </div>
    <p className='fs-2 mx-4 my-3'>Recently Added</p>
    <div className='container d-flex flex-row flex-wrap'>
      {db?db.map((prod) => {
        return (<div className="card container" style={{ width: '18rem',marginTop:'1rem'}}>
          <br/>
          <img src={prod['image']} className="card-img-top" style={style} alt='product' />
          <div className="card-body">
            <h5 className="card-title">{prod['title']}</h5>
            <p className="card-text">&#x20B9;{prod['price']}<br /><span style={{ color: "#007600" }}>{prod['availability']}</span></p>
          </div>
        </div>)
      }):<></>}
    </div>
    <br/>
  </>
  )
}
