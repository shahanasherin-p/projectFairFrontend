import commomAPI from "./commonAPI";
import SERVER_URL from "./serverUrl";


// register api called by auth component when user clicks register button
export const registerAPI=async(reqBody)=>{
    return await commomAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// login api called by auth component when user clicks login button
export const loginAPI=async(reqBody)=>{
    return await commomAPI("POST",`${SERVER_URL}/login`,reqBody)
}


// add-ProjectAPI called by Add componet when user click add buttom add project

export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commomAPI("POST",`${SERVER_URL}/add-projects`,reqBody,reqHeader)
}


// getHomeProjectApi called By Home componet when page loaded in browser (useEffect)

export const getHomeProjectApi=async()=>{
    return await commomAPI("GET",`${SERVER_URL}/home-projects`,{})
}

// allProjectAPI called by project componet when page loaded in browser (useEffect)

export const allProjectAPI=async(searchKey,reqHeader)=>{
    return await commomAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}

// userProjectAPI called by view component when page loaded in browser (useEffect)

export const userProjectAPI=async(reqHeader)=>{
    return await commomAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}

// updateProjectAPI called by edit component when user click update button projects/6725f7db1b7d6ed836df2668/edit

export const updateProjectAPI=async(id,reqBody,reqHeader)=>{
    return await commomAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

// userProjectRemoveAPI called by view component when user click delete button

export const userProjectRemoveAPI=async(id,reqHeader)=>{
    return await commomAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}

// UpadteUserAPI called by profile component when user click update button
export const UpadteUserAPI=async(reqBody,reqHeader)=>{
    return await commomAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}