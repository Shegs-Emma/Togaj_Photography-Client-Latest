import React from 'react';

import Button from '../../components/UI/Button/Button';
// import logo from '../../assets/togaj-logo.jpg';
import './Landing.css';

const Landing = () => {
    return(
        <div className="Landing" >
            <img src="https://images.unsplash.com/photo-1506241537529-eefea1fbe44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="alt" />
            <div>
                <div className="welcome-text">
                    Welcome To Togaj Photography
                </div>
                <div className="Button">
                    <a href="/gallery" ><Button btnType="Danger"> Gallery </Button></a>
                </div>
            </div>
        </div>
    )
}

export default Landing;