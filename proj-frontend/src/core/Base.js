import React from 'react';
import Menu from './menu';



const  Base = ({
    title="My Title",
    description="My description",
    className="bg-dark text-white p-4",
    children
}) => {
    return(
        <div>
            <Menu/>
            <div className="container">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className='display-4'>{ title}</h2>
                     <p className="lead"> {description}</p>
                </div>
                <div className={className}>{ children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid  text-white text-center">
                    <h4>If You got something feel free to reach out</h4>
                    <button className="btn btn-warning btn-lg"> Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        A Amazing Shop by <span className="text-white">Tanay Van</span>
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base
