import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/carthelper'
import { Link } from 'react-router-dom'
import Stripecheckout from 'react-stripe-checkout'
import { API } from '../backend'
import { createOrder } from './helper/orderHelper'

 const StripeCheckout = ({products,setReload = f => f, reload=undefined}) => {

    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        Address:''
    })
    const token = isAuthenticated() && isAuthenticated().token  
    const token1 = isAuthenticated() && isAuthenticated().token  
    const userId = isAuthenticated() && isAuthenticated().user._id  
    const getFinalAmount = () => {
        let amount=0
        products.map(product => {
            amount=amount+product.price;
        })
        return amount
    };  
    const makePayment = (token) => {
        const body ={
            token,
            products
        }
        const headers ={
            "Content-Type":"application/json",
            Authotization:`Bearer ${token1}`
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(response =>{
            console.log(response)
            console.log(products)
            //call further
            //createOrder(userId,token1,products)
            cartEmpty()
            setReload(!reload)
            const {status}= response
        }).catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <Stripecheckout 
                stripeKey='pk_test_7NvNU7idgkNGm6aGMUBaRloV00y481c5IB'
                token={makePayment}
                amount={getFinalAmount()*100}
                name='Merchandise Of GB'
                
            >
            <button className='btn btn-success'>Pay with Stripe</button>
            </Stripecheckout>
        ) : (
            <Link to='/signin'>
                <button class="btn btn-warning">SignIn</button>
            </Link>
        )
    }


   


    

    return (
        <div>
            <h3 className='text-white'>Your Total amount is : $ { getFinalAmount() }</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout