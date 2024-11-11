import { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import userUploadImg from '../assets/userUpload.png'
import SERVER_URL from '../services/serverUrl';
import { UpadteUserAPI } from '../services/allAPI';

const Profile = () => {
  const [preview,setPreview]=useState("")
  const [existingProfileImg,setExistingProfileImg]=useState("")
  const [userDetails ,setUserDetails]=useState({
    username:"",email:"",password:"",github:"",linkedin:"",profilePic:""
  })
  
  const [open, setOpen] = useState(false);


  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user=JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
      })
      setExistingProfileImg(user.profilePic)
    }
  },[open])

  useEffect(()=>{
    if(userDetails.profilePic){
      setPreview(URL.createObjectURL(userDetails.profilePic))
    }
    else{
      setPreview("")
    }
  },[userDetails.profilePic])

  const handleUpdateProfile=async()=>{
    const {username,email,password,github,linkedin,profilePic}=userDetails
    if(github && linkedin){
      const reqBody=new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview? reqBody.append("profilePic",profilePic):reqBody.append("profilePic",existingProfileImg)
      const token = sessionStorage.getItem("token");
      if(token){
        const reqHeader={
          "Content-Type" :"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result= await UpadteUserAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("user profile updated successfully")
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }
          else{
            console.log(result)
          }
        }
        catch (err){
          console.log(err)
        }
      }
    }
    else{
      alert("Please Fill te form completely!!")
    }
  }



  return (
    <>
    <div className="d-flex justify-content-evenly">
      <h3 className="text-warning">Profile</h3>
      <button onClick={()=>{setOpen(!open)}} className="btn text-warning"><i className="fa-solid fa-chevron-down"></i></button>
    </div>
    <Collapse in={open}>
        <div className='row align-items-center justify-content-center shadow rounded p-2 container-fluid' id="example-collapse-text">
          <label>
            <input onChange={e=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} type="file" style={{display:'none'}} />
           {
            existingProfileImg==""?
            <img width={'150px'} height={'150px'}  src={preview?preview:userUploadImg} alt="" />
            :
            <img width={'150px'} height={'150px'}  src={preview?preview:`${SERVER_URL}/uploads/${existingProfileImg}`} alt="" />
           }
          </label>
          <div className="mb-2 mt-2 w-100">
            <input value={userDetails.github} onChange={e=>setUserDetails({...userDetails,github:e.target.value})} placeholder='User GITHUB Link' type="text" className="form-control" />          
          </div>
          <div className="mb-2 w-100">
            <input value={userDetails.linkedin} onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})} placeholder='User LINKEDIN PROFILE Link' type="text" className="form-control" />          
          </div>
          <div className="mb-2 w-100">
            <button onClick={handleUpdateProfile}  className="btn btn-warning">Update Profile</button>         
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile