import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
   
    <div style={{height:'300px'}} className='container mt-5 w-100'>
          <div className="d-flex justify-content-evenly">
            <div style={{width:"400px"}} className="intro">
            <Link style={{textDecoration:"none", color:"white",fontWeight:"600"}} to={'/'}> 
                  <i className="fa-solid fa-music me-2"></i>{' '}
                  Project Fair
              </Link>
              <p className='mt-3'>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</p>
              <p>Code licensed MIT, docs CC BY 3.0.</p>
              <p>Currently v5.3.3.</p>
            </div>
            <div>
              <h2 className="text-white" style={{fontWeight:"600",fontSize:"20px"}}>Links</h2>
              <Link style={{textDecoration:"none", color:"white",}} to={'/'}> 
                   Home
              </Link> <br />
              <Link style={{textDecoration:"none", color:"white",}} to={'/auth'}> 
                  Login
              </Link><br />
              <Link style={{textDecoration:"none", color:"white",}} to={'/auth'}> 
                 Register
              </Link>
            </div>
            <div>
              <h2 className="text-white" style={{fontWeight:"600",fontSize:"20px"}}>Guides</h2>
              <Link style={{textDecoration:"none", color:"white",}} to={''}> 
                  React
              </Link> <br />
              <Link style={{textDecoration:"none", color:"white",}} to={''}> 
                  React Bootstrap
              </Link><br />
              <Link style={{textDecoration:"none", color:"white",}} to={''}> 
                  Routing
              </Link>
            </div>
            <div className="contact">
            <h2 className="text-white" style={{fontWeight:"600",fontSize:"20px"}}>Contact Us</h2>
            <input type="text" placeholder='Enter your email here' className='rounded  text-center' />
            <i className="fa-solid fa-arrow-right bg-info p-1 rounded" style={{height:"25px", color:"white"}}></i>
            <br />
            <div className='d-flex  justify-content-evenly mt-3'>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-github"></i>
            <i class="fa-solid fa-phone"></i>
            </div>
           
            </div>
          </div>
          <p className='text-center mt-3'>Copyright & copy ; June 2024 Batch, Project Fair. Buildt with React. </p>
        </div>
      )
}

export default Footer