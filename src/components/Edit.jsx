import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SERVER_URL from '../services/serverUrl';
import { editProjectResponseContext} from '../contexts/ContextApi';
import { updateProjectAPI } from '../services/allAPI';

const Edit = ({ project }) => {
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  const [preview, setPreview] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    languages: project.languages,
    overview: project.overview,
    github: project.github,
    website: project.website,
    projectImg: ""
  });

  useEffect(() => {
    if (projectDetails.projectImg) {
      if (['image/png', 'image/jpg', 'image/jpeg'].includes(projectDetails.projectImg.type)) {
        setImageStatus(true);
        setPreview(URL.createObjectURL(projectDetails.projectImg));
      } else {
        setImageStatus(false);
        setPreview("");
        setProjectDetails({ ...projectDetails, projectImg: "" });
      }
    }
  }, [projectDetails.projectImg]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      id: project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImg: ""
    });
  };
  const handleShow = () => {
    setShow(true);
    setProjectDetails({
      id: project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImg: ""
    });
  };

  const handleUpdateProject = async () => {
    const { id, title, languages, overview, github, website, projectImg } = projectDetails;
    if (title && languages && overview && github && website) {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      if (projectImg) {
        reqBody.append("projectImg", projectImg);
      }
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };
        try{
          const result=await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            alert("Project updated successfully")
            handleClose()
            setEditProjectResponse(result)
          }
        }
        catch(err){
          console.log(err)
        }
      } 
    } else {
      alert("Please fill the form completely!");
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn"><i className="fa-solid fa-edit"></i></button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input
                  onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })}
                  type="file"
                  style={{ display: 'none' }}
                />
                <img
                  height={'200px'}
                  src={preview ? preview : `${SERVER_URL}/uploads/${project.projectImg}`}
                  className='img-fluid'
                  alt="Project Preview"
                />
              </label>
              {!imageStatus && <div className="text-warning fw-bolder my-2">*Upload only jpeg, jpg, or png files!</div>}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input
                  value={projectDetails.title}
                  onChange={e => { setProjectDetails({ ...projectDetails, title: e.target.value }) }}
                  placeholder='Project Title'
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectDetails.languages}
                  onChange={e => { setProjectDetails({ ...projectDetails, languages: e.target.value }) }}
                  placeholder='Languages used in project'
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectDetails.overview}
                  onChange={e => { setProjectDetails({ ...projectDetails, overview: e.target.value }) }}
                  placeholder='Project Overview'
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectDetails.github}
                  onChange={e => { setProjectDetails({ ...projectDetails, github: e.target.value }) }}
                  placeholder='Project GitHub Link'
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectDetails.website}
                  onChange={e => { setProjectDetails({ ...projectDetails, website: e.target.value }) }}
                  placeholder='Project Website Link'
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className='me-2'>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary" className='me-2'>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit;
