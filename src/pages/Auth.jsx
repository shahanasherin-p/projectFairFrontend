import React, { useContext, useState } from 'react'
import authImg from '../assets/rb_2148683810.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allAPI';
import { Spinner } from 'react-bootstrap';
import { tokenAuthContext } from '../contexts/AuthContextApi';


const Auth = ({ insideRegister }) => {
  const {isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const[isLogined,setIsLogined]=useState(false)
  const navigate=useNavigate()
  const [inputData,setInputData]=useState({
    username:"",
    email:"",
    password:""
  })

  // console.log(inputData);

  const handleRegister=async(e)=>{
    e.preventDefault()
    // console.log("inside handle register");
    if(inputData.email && inputData.password && inputData.username){
      // alert("make api call")
      try{
        const result=await registerAPI(inputData)
        console.log(result)
        if(result.status==200){
          alert(`Welcome ${result.data?.username}, Please login to explore our website!!`)
          navigate('/login')
          setInputData({username:"",
            email:"",
            password:""})
        }else{
          if(result.response.status==406){
            alert(result.response.data)
            setInputData({username:"",email:"",password:""})
          }
        }
      }catch(err){
        console.log(err)
      }

    }else{
      alert("Please fill the form !!")
    }
  }

  const handleLogin=async(e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      try{
        const result=await loginAPI(inputData)
        if(result.status==200){
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          setIsLogined(true)
          setTimeout(()=>{
            setInputData({username:"",
              email:"",
              password:""})
              navigate('/')
          },2000)
        }else{
          if(result.response.status==404){
            alert(result.response.data)
          }
        }
      }catch(err){
        console.log(err)
      }
    }else{
      alert("Please fill the form completely")
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh', width: '100%' }}>
      <div className="container w-75">
        <div className="shadow car p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className='img-fluid' src={authImg} alt="" />
            </div>
            <div className="col-lg-6 px-5">
              <h1 className="mt-2"><i class="fa-solid fa-brands fa-docker"></i>
                Project Fair</h1>
              <h5 className='my-3'> Sign {insideRegister ? "Up" : "In"} to Your Account</h5>
              <Form>
                {
                  insideRegister &&
                  <FloatingLabel className='mb-3' controlId="floatingUserName" label="Username">
                   <Form.Control value={inputData.username} onChange={(e)=>setInputData({...inputData,username:e.target.value})} type='text' placeholder="Username" />
                  </FloatingLabel>
                }
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control value={inputData.email} onChange={(e)=>setInputData({...inputData,email:e.target.value})} type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control value={inputData.password} onChange={(e)=>setInputData({...inputData,password:e.target.value})} type="password" placeholder="Password" />
                </FloatingLabel>

                  {
                    insideRegister ? 
                    <div className="mt-3">
                      <button onClick={handleRegister} className='btn btn-outline-info py-2 px-3 mb-2'>Register</button>
                      <p>Already a User ? Please Click here to <Link to={'/login'} >Login</Link></p>
                    </div>
                    :
                    <div className="mt-3">
                      <button onClick={handleLogin} className='btn btn-outline-info py-2 px-3 mb-2'>Login</button>
                     { isLogined && <Spinner animation="border" role="status" className='ms-3'>
                      </Spinner>}
                      <p>Already a User ? Please Click here to <Link to={'/register'} >Register</Link></p>
                    </div>
                  }

              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth