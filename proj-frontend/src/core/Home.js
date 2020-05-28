import React,{useState,useEffect} from 'react';
import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './card';
import { getProducts } from './helper/coreapicalls';


export default function Home() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProduct = () => {
        getProducts().then( data => {
            if(data.error){
                setError(data.error)
            }
            else{
                 setProducts(data)
            }
        })
    }
    useEffect(() => {
        loadAllProduct()
    }, [])
    return(
        <Base title="Tanay's Merch" description="Welcome Bro!">
            <h1 className='display-4 mb-5'>All T-Shirts</h1>
            <div className="row">
               {products.map((product,index) =>{
                   return(
                       <div key={index} class="col-lg-4 mb-4">
                           <Card product={product}/>
                       </div>
                   )
               })}
            </div>
            
        </Base>
    )
}