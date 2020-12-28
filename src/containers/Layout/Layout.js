import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary';
import classes from './Layout.module.css';
import logo from '../../assets/togaj.png';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

const Layout = (props) => {
    const [ showSideDrawer, SetShowSideDrawer ] = useState(false);

    const sideDrawerClosedHandler = () => {
        SetShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        SetShowSideDrawer(!showSideDrawer);
    }
 
    let header2 = (
        <header className={classes.header2}>
            <span onClick={() => props.sort('Weddings')}>Weddings</span> 
            <span onClick={() => props.sort('Birthdays')}>Birthdays</span> 
            <span onClick={() => props.sort('Portraits')}>Portraits</span> 
            <span onClick={() => props.sort('Model Shoots')}>Model Shoots</span>
        </header>
    );

    //Passing the props below, to let page display specific headers in my layout

    if(props.uploading){
        header2 = <header className={classes.header3}>
                    <h4>{props.header}</h4>
                </header>;
    }

    if(props.contact){
        header2 = <header className={classes.header3}>
                    <h4>{props.header}</h4>
                </header>;
    }

    return(
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated} 
                isAdmin={props.isAdmin}
                img={logo} 
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer 
                open={showSideDrawer} 
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuthenticated} />
            {header2}

            <main className={classes.Content}>
                {props.children}
            </main>

            <Footer />
        </Aux>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null,
        isAdmin: state.auth.isAdmin
    }
}

export default connect(mapStateToProps)(Layout);