import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilliary';

import Photo from './Photo/Photo';
import classes from './Photos.module.css';
import Spinner from '../UI/Spinner/Spinner';

import Modal from '../UI/Modal/Modal';
import PhotoViewer from '../Photos/PhotoViewer/PhotoViewer';
import axios from 'axios';

const Photos = (props) => {
    const [ imageURL, setImageURL ] = useState('');
    const [ imageID, setImageId ] = useState('');
    const [ isDeleted, setIsDeleted ] = useState(false);

    const clicker = (url, id) => {
        setImageURL(url);
        setImageId(id);
    }

    const deleter = (id) => {
        // axios.delete(`http://localhost:3001/api/photos/${id}`)
        axios.delete(`https://togaj-photography.herokuapp.com/api/photos/${id}`)
            .then(res => {
                setIsDeleted(true);
            }).catch(error => {
                console.log(error);
                setIsDeleted(false);
            });
    };
    
    //I created the array that will hold what i want to render
    let pictureData = [];

    //The pictures will be fiiltered here
    props.pictures.forEach(picture =>{
        //The sortCategory will only be available after the click event is triggered.
        if(props.sortCategory && props.sortCategory === picture.imageCategory){
            pictureData.push(
                <Photo 
                     key={picture.id}
                     imageUrl={picture.photoUrl} 
                     category={picture.imageCategory} 
                     viewer={props.view}
                     isAuth={props.isAuthenticated}
                     isAdmin={props.isAdmin}
                     click={()=>clicker(picture.photoUrl, picture.id)}
                     delete={() => deleter(picture.id)} />
            )
        } else if(!props.sortCategory) {
            pictureData.push(
                <Photo 
                     key={picture.id}
                     imageUrl={picture.photoUrl} 
                     category={picture.imageCategory} 
                     viewer={props.view}
                     isAuth={props.isAuthenticated}
                     isAdmin={props.isAdmin}
                     click={()=>clicker(picture.photoUrl, picture.id)}
                     delete={() => deleter(picture.id)} />
            )
        }
    });


    if(props.loading){
        pictureData = <Spinner />
    }

    if(isDeleted){
        pictureData = <Redirect to='/photo' /> 
    }

    return (
        <Aux>
            <div className={classes.Photos}>
                {/* The Modal will pop up on click */}
                <Modal show={props.viewing} modalClosed={props.viewHandlerClosed}>
                    {/* The Photoviewer will be displayed on the popedup modal */}
                    <PhotoViewer imageUrl={imageURL} imageID={imageID} />
                </Modal>
                <div className={classes.Photo}>
                    {pictureData}
                </div>
            </div>
        </Aux>
    )
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null,
        isAdmin: state.auth.isAdmin
    }
};

export default connect(mapStateToProps)(Photos);