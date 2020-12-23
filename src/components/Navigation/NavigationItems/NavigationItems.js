import React from 'react';
import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact> Home </NavigationItem>
        <NavigationItem link='/gallery'> Gallery </NavigationItem>
        <NavigationItem link='/about'> About </NavigationItem>
        <NavigationItem link='/contact'> Contact </NavigationItem>
        {props.isAuthenticated && props.isAdminUser && props.isAuthenticated === props.isAdminUser ? <NavigationItem link='/photo'> ADD+ </NavigationItem> : null}
        {!props.isAuthenticated ? 
            <NavigationItem link='/login'>Authenticate</NavigationItem> :
            <NavigationItem link='/logout'>Logout</NavigationItem>}
    </ul>
);
 
export default navigationItems;