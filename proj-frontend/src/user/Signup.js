import React ,{useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom'
import { signup } from '../auth/helper/index';




const Signup = () => {


    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:'',
        success:false
    })

    const {name,email,password,error,success} = values

    const handleChange =name =>  event => {
        setValues({...values,error:false,[name]:event.target.value})
       
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password})
        .then(data => {
            if(data.error)
            {
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success:"true"
                })
            }
        })
        .catch(error => {
           
            console.error('There was an error!', error)
            
    })
}

    const signUpForm = () => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        <div className="form-group">
                            <input className="form-control" 
                                type='text'
                                placeholder='Name' 
                                value={name}
                                onChange={handleChange("name")}
                            />
                        </div>
                        <div className="form-group">
                            <input type='text'
                             placeholder='Email' 
                             className="form-control"
                            
                             onChange={handleChange("email")}
                             value={email}
                             />
                        </div>
                        <div className="form-group">
                            <input 
                            type='password' 
                            placeholder='Password' 
                            className="form-control"
                            value={password}
                            onChange={handleChange("password")}
                            />
                        </div>
                        <button className="btn btn-success btn-block " onClick={onSubmit}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
    
       

    const errorMessage =() => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
        <div className='alert alert-danger'
        style={{display:error?"": "none"}}>
            {error}
        </div>
        </div>
        </div>
       
        )
    }
    const successMessage =() => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
        <div className='alert alert-success'
        style={{display: success ? "": "none" }}>
           Account Created Succesfully.Please <Link to='/signin'>Login</Link> here
        </div>
         </div>
         </div>
        )
    }


    return(
        <Base title="Sign Up" description="To Register New User!">
             <p className="text-white text-center">{JSON.stringify(values)}</p>
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
   
        </Base>
    )
}

export default Signup