import React from 'react';
import classes from './Logo.module.css';

import togajLogo from '../../assets/Images/togaj_logo_edited.png';

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{ height: props.height, width: props.width }}>
            <img src={togajLogo} alt='logo' />
        </div>
    )
};

export default logo;