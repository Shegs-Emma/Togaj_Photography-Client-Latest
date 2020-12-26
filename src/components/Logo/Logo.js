import React from 'react';
import classes from './Logo.module.css';

import togajLogo from '../../assets/Images/togaj.png';
import togajLogo2 from '../../assets/Images/togaj_d.png';

const logo = (props) => {
    let src = props.locate === 'sidebar' ? togajLogo2 : togajLogo;
    let style = props.locate === 'sidebar' ? classes.LogoSide : classes.Logo;
    return (
        <div className={style} style={{ height: props.height, width: props.width }}>
            <img src={src} alt='' />
        </div>
    )
};

export default logo;