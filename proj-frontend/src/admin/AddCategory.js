import React,{useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { createCategory } from './helper/adminapicall'

const AddCategory = ()=> {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token}= isAuthenticated()

    
    const handleChange = event =>{

        setError('')
        setName(event.target.value)

    }
    const onSubmit = (event) => {
        event.preventDefault()
        setError('')
        setSuccess(false)

        //backend Request Fires
        createCategory(user._id,token,{name})
        .then( data => {
            if(data.error){
                setError(true)
            }
            else{
                setError(false)
                setSuccess(true)
                setName("")
            }
        })
    }
    const successMessage = () => {
        if(success){
        return <h4 class="text-success">Category Created Sucessfully</h4>

        }
    }
    const errorMessage = () => {
        if(error){
            return <h4 class="text-success">Failed to create Category</h4>
    
            }
    }
    const myCategoryForm = () => (
        
        <form action="">
            <div className="form-group">
                <p className="lead text-white">Enter The Category</p>
                <input type="text" className='form-control my-3' 
                placeholder='Enter your category' 
                autoFocus
                required
                value={name} 
                onChange={handleChange}
                 />
                <button onClick={onSubmit}className="btn btn-outline-success">Create Category</button>
            </div>
        </form>
    )

    const goBack = () => (
        <div class="mt-5">
            <Link className='btn btn-outline-success' to='/admin/dashboard'>Go Back To Dashboard</Link>
        </div>
    )


        



    return (
        <Base title='Create a Category' description='Add Categories for your site' className='container  p-4'>
            <div class="row  rounded">
                <div class="col-md-8 offset-md-2">
                        {successMessage()}
                        {errorMessage()}
                        {myCategoryForm()}
                        {goBack()}
                </div>
            </div>
        </Base>
    )
}


export default AddCategory