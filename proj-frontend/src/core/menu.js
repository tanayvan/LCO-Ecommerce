import React,{Fragment} from 'react';
import {Link,withRouter} from "react-router-dom"
import { signout ,isAuthenticated} from '../auth/helper';

const  currentTab=(history,path) => {
    if(history.location.pathname === path){
        return{color:"#2ecc72"}
    }else{
        return{color:"#FFFFFF"} 
    }
}


const Menu = ({history})=>{
    return(
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history,'/')} className='nav-link' to='/'>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                    style={currentTab(history,'/cart')}
                    className='nav-link' 
                    to='/cart'>
                        Cart
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                    <Link className='nav-link' 
                    style={currentTab(history,'/user/dashboard')}
                    to='/user/dashboard'>
                        User Dashboard
                    </Link>
                </li>
                )}
                
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                    <Link className='nav-link' 
                    style={currentTab(history,'/admin/dashboard')}
                    to='/admin/dashboard'>
                        Admin Dashboard
                    </Link>
                </li>
                )} 

                
                {!isAuthenticated() && <Fragment>
                <li className="nav-item">
                    <Link className='nav-link' 
                    style={currentTab(history,'/signup')}
                    to='/signup'>
                        SignUp
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link'
                    style={currentTab(history,'/signin')}
                    to='/signin'>
                        Sign In
                    </Link>
                </li>
                </Fragment> }
                
               {isAuthenticated() && (
                    <li className="nav-item">
                            <span className='nav-link text-warning'
                                onClick={() => {
                                    signout(() => {
                                        history.push("/")
                                    })
                                }}
                            >
                                Signout
                            </span>
                    </li>
                )}
            </ul>
        </div>
    )
} 
export default withRouter(Menu)