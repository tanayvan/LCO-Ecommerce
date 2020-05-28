import { API } from "../../backend";


//Categories Calls
export const createCategory = (userId,token,category) => {

    return fetch(`${API}/category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))    
   
}
//get all categories
export const getAllCategories = () => {
    return fetch(`${API}/category/all`,{
        method:"GET"
    }).then(response => {
        console.log(response)
        return response.json()
    }).catch(err => console.log("API ADMIN",err))
}

//products calls

//Create A Product
export const createProduct = (userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
           Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))

}

// get All Product
export const getAllProducts = () => {
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//delete Product
export const deleteProduct = (producdId,userId,token,product) => {
    return fetch(`${API}/product/${producdId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:'application/json',
           Authorization:`Bearer ${token}`
        },
        
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))

}


//get a Product

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

//update a product
export const updateProduct = (productId,userId,token,product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:'application/json',
           Authorization:`Bearer ${token}`
        },
        body:product
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))

}