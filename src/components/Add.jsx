import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadingImg from '../assets/imageUpload.png'
import { addProjectAPI } from '../services/allAPI'
import { addProjectRespnseContext } from '../contexts/ContextApi'

const Add = () => {
  const {addProjectRespnse,setAddProjectRespnse}=useContext(addProjectRespnseContext)
  const[preview,setPreview]=useState("")
  const [imageStatus ,setImageStatus]=useState(false)
  const [projectDetails,setProjectDeatils]=useState({
    title:"",languages:"",overview:"",github:"",website:"",projectImg:""
  })
  console.log(projectDetails)

  useEffect(()=>{
    if(projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg"){
      // valid image
      setImageStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }else{
      // invalid image

      setImageStatus(false)
      setPreview("")
      setProjectDeatils({...projectDetails,projectImg:""})
    }
  },[projectDetails.projectImg])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setPreview("")
    setImageStatus(false)
    setProjectDeatils({title:"",languages:"",overview:"",github:"",website:"",projectImg:""})
  };
  const handleShow = () => setShow(true);

  const handleAddProject=async()=>{
    const {title,languages,overview,github,website,projectImg}=projectDetails
    if(title && languages && overview && github && website && projectImg){
      // alert("proceed to api")
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Content-Type" :"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try{
          const result=await addProjectAPI(reqBody,reqHeader)
          if(result.status==200){
            alert("Project added successfully")
            setAddProjectRespnse(result)
            handleClose()
          }else{
            alert(result.response.data)
          }
        }
        catch(err){
          console.log(err)
        }
      }
    }else{
      alert("Please fill the form completely")
    }
  }
  return (
    <>
    <button onClick={handleShow} className="btn btn-primary">+ New Project</button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e=>setProjectDeatils({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} />
                <img height={'200px'} src={preview?preview:uploadingImg} className='img-fluid' alt="" />
              </label>
              {!imageStatus &&<div className="text-warning fw-bolder my-2">*Upload only the following file types (jpeg,jpg,png) here !!</div>}
            </div>
            <div className="col-lg-8">
                <div className="mb-2">
                  <input value={projectDetails.title} onChange={e=>{setProjectDeatils({...projectDetails,title:e.target.value})}} placeholder='Project Title' type="text" className="form-control" />
                </div>
                <div className="mb-2">
                  <input value={projectDetails.languages} onChange={e=>{setProjectDeatils({...projectDetails,languages:e.target.value})}} placeholder='Languages used in project' type="text" className="form-control" />
                </div>
                <div className="mb-2">
                  <input value={projectDetails.overview} onChange={e=>{setProjectDeatils({...projectDetails,overview:e.target.value})}} placeholder='Project Overview' type="text" className="form-control" />
                </div>
                <div className="mb-2">
                  <input value={projectDetails.github} onChange={e=>{setProjectDeatils({...projectDetails,github:e.target.value})}} placeholder='Project Github Link' type="text" className="form-control" />
                </div>
                <div className="mb-2">
                  <input value={projectDetails.website} onChange={e=>{setProjectDeatils({...projectDetails,website:e.target.value})}} placeholder='Project Website Link' type="text" className="form-control" />
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className='me-2'>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary" className='me-2'>Add</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Add