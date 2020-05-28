import React,{useState,useEffect} from 'react';
import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './card';
import { loadCart } from './helper/carthelper';
import StripeCheckout from './stripeCheckout';


  const  Cart = () => {
    
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false) // Chutiya bana neki Ninja Technique
    useEffect(() => {
       setProducts(loadCart())
        
    }, [reload])



    const loadAllProducts = () => {
        return(
            <div>
                <h2>This section is to load Products</h2>
                
                {products.map((product,index) => {
                    return(<Card key={index} product={product} removeFromCart={true} addToCart={false}
                                 setReload={setReload}
                                reload={reload}
                                 />)
                    
                })}
            </div>
        )
    }
    const loadCheckout = () => {
        return(
            <div>
                <h2>This section is For CheckOut</h2>
                
            </div>
        )
    }


    return(
        <Base title="Cart Page" description="Ready To CheckOut">
            
            <div className="row">
                <div class="col-6">
                    <div className='col-6'>
                    {loadAllProducts()}
                    </div>
                    
                </div>
                <div class="col-6">
                    <StripeCheckout 
                        products={products}
                        setReload={setReload}
                    />
                </div>
            </div>
            
        </Base>
    )
}

export default Cart