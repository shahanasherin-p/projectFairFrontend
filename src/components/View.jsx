import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { userProjectAPI, userProjectRemoveAPI } from '../services/allAPI'
import { addProjectRespnseContext, editProjectResponseContext } from '../contexts/ContextApi'

const View = () => {
  const {editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
  const {addProjectRespnse,setAddProjectRespnse}=useContext(addProjectRespnseContext)
  const [userProjects,setUserProjects]=useState([])
 
  useEffect(()=>{
    getUserProjects()
  },[addProjectRespnse,editProjectResponse])

console.log(userProjects)

  const getUserProjects=async()=>{
    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try{
        const result=await userProjectAPI(reqHeader)
        console.log(result)
        if(result.status==200){
          setUserProjects(result.data)
        }
      }catch (err){
        console.log(err)
      }
    }
  }

  const deleteProject=async(id)=>{
    const token=sessionStorage.getItem('token')
    if(token){
      const reqHeader={
        "Authorization":`Bearer ${token}`
      }
      try{
        await userProjectRemoveAPI(id,reqHeader)
        getUserProjects()
      }
      catch (err){
        console.log(err)
      }
    }
}


  return (
    <>
    <div className="d-flex justify-content-between">
        <h2 className="text-warning">All Projects</h2>
        <div><Add/></div>
        
    </div>
    <div className="mt-2 allProjects">
        {
          userProjects?.length>0?
          userProjects?.map(project=>(
            <div key={project?.id} className="border rounded p-2 d-flex justify-content-between mb-3">
            <h3>{project?.title}</h3>
            <div className="d-flex align-items-center">
                <div className="btn"><Edit project={project}/></div>
                <div className="btn"><a href={project?.github} target='_blank'><i className='fa-brands fa-github'></i></a></div>
                <button onClick={()=>deleteProject(project?._id)} className="btn text-danger"><i className="fa-solid fa-trash"></i></button>
            </div>
        </div>
          ))
          :
          <div className="text-warning fw-bolder">Not Uploaded any projects yet</div>
        }
    </div> 
    </>
  )
}

export default View