import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { getAllCategories, getProduct,updateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'

  
 const UpdateProduct = ({match}) => {

    const {user,token}= isAuthenticated()
    const [values, setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getARedirect:false,
        formData:""
    })

    const {name,description,price,stock,photo,categories,category,loading,error,createdProduct,getARedirect,formData} = values

    const preLoad = (productId) => {
        getProduct(productId).then(data => {
           // console.log("Data",data)
            if(data.error) {
                setValues({ ...values,error: data.error})
            }
            else{
                setValues({ 
                    ...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category._id,
                    stock:data.stock,
                    formData:new FormData(),
                   

                })
                preloadCategories()
                
            }
        }).catch(error => console.log("Add Product",error))
    }
    const preloadCategories = () => {
        getAllCategories().then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    categories:data,
                    formData:new FormData()
                })
            }
        })
    }
     useEffect( () => {
        preLoad(match.params.productId) 
    }, [])
     const onSubmit = (event) => {
      event.preventDefault()
      setValues({...values,error:"",loading:true})
      updateProduct(match.params.productId,user._id,token,formData)
      .then(data => {
          console.log(data)
        if(data.error)
        {
          setValues({...values,error:data.error})
        }else{
          setValues({
            ...values,
            name:"",
            description:"",
            price:"",
            photo:"",
            stock:"",
            loading:false,
            createdProduct:data.name,
            
            
          })
        }
      })
     }
      const redirect = () => {
        if(getARedirect)
        return(
          setTimeout(
            <Redirect to='/'></Redirect>
              ,2000)
        )
      }
     const handleChange = name =>event  =>{
            const value =name ==='photo'?event.target.files[0]:event.target.value;
            formData.set(name,value)
            setValues({...values,[name]:value})
     }

      const successMessage= () => (
        <div class="alert alert-success mt-3" style={{display:createdProduct?"":"none"}}>
          <h4> Sucessfully Updated</h4>
        </div>
      )
      const errorMessage= () => (
        <div class="alert alert-danger mt-3" style={{display:error?"":"none"}}>
          <h4>Error Updating Product</h4>
        </div>
      )


    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((cate,index) => {
                return(
                  <option key={index} value={cate._id}>{cate.name}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
            Update Product
          </button>
        </form>
      );
    return (
        <Base  title="Update Product Here" description='Welcome to product Updattion Section'>
                
                <Link to='/admin/dashboard' className='btn btn-outline-success'>Go To Dashboard</Link>
                <div className="row bg-dark text-white rounded">
                    <div class="col-md-8 offset-md-2">
                      {successMessage()}
                      {errorMessage()}
                      
                      {createProductForm()} 
                    </div>
                </div>
        </Base>
    )
}

export default UpdateProduct