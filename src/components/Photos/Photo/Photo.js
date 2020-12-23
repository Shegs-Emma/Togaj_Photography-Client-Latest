import React from 'react';
import classes from './Photo.module.css';

const Photo = (props) => {
    const handleClick = () => {
        props.viewer();
        props.click();
    }

    return(
        <div className={classes.Photo}>

            <img 
                src={props.imageUrl} 
                alt=""
                className={classes.Image} />
            {/* {props.category} */}
            <button className={classes.Button} onClick={handleClick}> View Photo </button>
            {props.isAuth && props.isAdmin && props.isAuth === props.isAdmin ? <button className={classes.Button} onClick={props.delete}> Delete Photo </button> : null}
        </div>
    )
}

export default Photo;