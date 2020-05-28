import React ,{useState} from 'react';
import Base from '../core/Base';
import {Link, Redirect} from 'react-router-dom'

import {signin,authenticate,isAuthenticated} from '../auth/helper'
const Signin = () => {

    const [values,setValues] = useState({
        email:"tanayvan258@gmail.com",
        password:"tanayvan",
        error:"",
        loading:false,
        didRedirect:false,
    })

    const {email,password,error,loading,didRedirect} = values
    const {user}= isAuthenticated()

    const handleChange =name =>  event => {
        setValues({...values,error:false,[name]:event.target.value})
        
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to='/admin/dashboard'/>
            }
            else{
                return <Redirect to='/user/dashboard'/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to='/'/>

        }
    }

    const onSubmit= event =>{
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }else{
                authenticate(data,() =>{
                    setValues({
                        ...values,
                        didRedirect:true
                    })
                })
            }
        })
        .catch(console.log("Sign In Failed"))
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
    const loadingMessage =() => {
        return (
            loading && (
                <div className='alert alert-info'>
                    <h2>loading ...</h2>
                </div>
            )
        )
    }



    const signInForm = () => {
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                        
                        <div className="form-group">
                            <input type='text'
                             placeholder='Email' 
                             className="form-control"
                            value={email}
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <input type='password'
                             placeholder='Password' 
                             className="form-control"
                             value={password}
                             onChange={handleChange("password")}
                             />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block ">Login</button>
                    </form>
                </div>
            </div>
        )
    }

    
    return(
        <Base title="Sign In" description="To Login For Existing User !">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className='text-white '>{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin