import React, { createContext, useState } from 'react'
export const addProjectRespnseContext=createContext()
export const editProjectResponseContext=createContext()


const ContextApi = ({children}) => {
    const [addProjectRespnse,setAddProjectRespnse]=useState("")
    const [editProjectResponse,setEditProjectResponse]=useState("")
  return (
    <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
      <addProjectRespnseContext.Provider value={{addProjectRespnse,setAddProjectRespnse}}>
        {children}
    </addProjectRespnseContext.Provider>
    </editProjectResponseContext.Provider>
  )
}

export default ContextApi