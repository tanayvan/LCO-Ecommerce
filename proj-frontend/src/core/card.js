import React,{useState,useEffect} from 'react'
import ImageHelper from './helper/Imagehelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/carthelper';

 const Card = ({
     product,
     addToCart=true,
     removeFromCart=false,
     setReload=f => f,
     // function(f){return f}  it return ,the argument itself
     reload=undefined
 }) => {
   
    const [redirect, setRedirect] = useState(false)
    const [Count, setCount] = useState(product.count)

    

    const cardTitle = product ? product.name :"A Photo Of Tshirt"
    const cardDescription = product ? product.description :"Default Description"
    const cardPrice = product ? product.price :"200"

   
    const getARedirect = (redirect) => {
        if(redirect){
            return <Redirect to='/cart'/>
        }
    }

       const showAddToCart = () => {
           return(
            addToCart && (<button
            onClick={cardButton}
            className="btn btn-block btn-outline-dark mt-2 mb-2 text-white"
          >
            Add to Cart
          </button>)
           )
                    
       }
       const  cardButton = () => {
        addItemToCart(product,() => {
            setRedirect(true)
        })
    }
       const showRemoveFromCart = () => {
        return (
            removeFromCart && (<button
                onClick={() => {
                  removeItemFromCart(product._id)
                  setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>)
        )
        
       }
            return (
              <div className="card text-white  shadow  mb-3">
                <div className="card-header lead">{cardTitle}</div>
                <div className="card-body">
                    {getARedirect(redirect)}
                <ImageHelper product={product}/>
                  <p className="lead  font-weight-normal text-wrap">
                    {cardDescription}
                  </p>
                  <p className="btn btn-dark rounded  btn-sm px-4">${ cardPrice}</p>
                  <div className="row">
                    <div className="col-12">
                      {showAddToCart(addToCart)}
                    </div>
                    <div className="col-12">
                      {showRemoveFromCart(removeFromCart)}
                    </div>
                  </div>
                </div>
              </div>
            );
          };
    


export default Card