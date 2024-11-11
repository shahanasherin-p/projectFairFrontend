import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingImg from '../assets/landingImg.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectApi } from '../services/allAPI'
const Home = () => {

  const [allHomeProjects, setAllHomeProjects] = useState([]);
   const navigate=useNavigate()

  useEffect(()=>{
    getAllHomeProjects()
  },[])

  const getAllHomeProjects=async()=>{
    try{
      const result=await getHomeProjectApi()
      if(result.status==200){
        setAllHomeProjects(result.data)
      }
    }catch(err){
      console.log(err)
    }
  }

  console.log(allHomeProjects)

  
  const handleProjects=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      alert("Please login to get full access to our projects")
    }
  }
  return (
    <>
    <div style={{minHeight:'100vh'}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 style={{fontSize:'80x'}}> <i className="fa-brands fa-docker"></i>Project Fair</h1>
            <p style={{textAlign:'justify'}}>One Stop Destination for all software development projects.where user can add and manage their projects.As well as access all projects available in our website... what are you waiting for!!!</p>
           { 
            sessionStorage.getItem("token")?
            <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROJECTS</Link>
            :
            <Link to={'/login'} className='btn btn-warning'>STARTS TO EXPLORE</Link>}
          </div>
          <div className="col-lg-6">
            <img height={'550px'} src={landingImg} alt="" />
          </div>
        </div>
      </div>
    </div>
    <div className="mt-5 text-center">
      <h1 className="mb-5"></h1>
      <marquee behavior="" direction="">
        <div className="d-flex">
          {
            allHomeProjects?.map(project=>(
              <div key={project?._id} className="me-5">
               <ProjectCard displayData= {project}/>
          </div>
            ))
          }
        </div>
      </marquee>
      <button onClick={handleProjects} className="btn btn-link mt-5">CLICK HERE TO VIEW MORE PROJECTS</button>
    </div>
    <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
      <h1>Our Testimonals</h1>
      <div className='d-flex justify-content-evenly align-item-center mt-3 w-100'>
     
       <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'70px'} height={'70px'} src="https://img.freepik.com/premium-vector/boy-with-shirt-that-says-hes-shirt_1230457-38175.jpg?w=740" alt="" className='rounded-circle img-fluid'/>
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
               <div className="d-flex justify-content-center">
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
               </div>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste, laudantium ipsam acvel rem eaque inventore.</p>
              </Card.Text>
            </Card.Body>
       </Card>
       <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'70px'} height={'70px'} src="https://img.freepik.com/premium-vector/boy-with-shirt-that-says-hes-character_1230457-34191.jpg?w=740" alt="" className='rounded-circle img-fluid'/>
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
               <div className="d-flex justify-content-center">
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
               </div>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste, laudantium ipsam acvel rem eaque inventore.</p>
              </Card.Text>
            </Card.Body>
       </Card>
       <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
                <img width={'70px'} height={'70px'} src="https://img.freepik.com/premium-vector/boy-with-shirt-that-says-hes-character_1230457-46149.jpg?w=740" alt="" className='rounded-circle img-fluid'/>
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
               <div className="d-flex justify-content-center">
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
                <i className="fa-solid fa-star text-warning"></i>
               </div>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste, laudantium ipsam acvel rem eaque inventore.</p>
              </Card.Text>
            </Card.Body>
       </Card>
      </div>
    </div>
    </>
  )
}

export default Home