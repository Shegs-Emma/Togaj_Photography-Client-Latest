import React, { useState } from 'react';

import classes from './PhotoData.module.css';
import Button from '../../components/UI/Button/Button';
import Layout from '../Layout/Layout';

import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const PhotoData = (props) => {
    const [ file, setFile ] = useState('');
    const [ imageCategory, setImageCategory ] = useState('');
    const [ fileName, setFileName ] = useState('Choose File');
    const [ previewSource, setPreviewSource ] = useState();

//========================================================================================================
    const postHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('file', file);
        formData.append('imageCategory', imageCategory);

        props.onPost(formData, props.token);
    };

    const onChange = (event) => {
        const photoFile = event.target.files[0];

        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);

        previewFile(photoFile);
    }

    const onSelect = (event) => {
        setImageCategory(event.target.value);
    }

    //The code below controls the previewing of the selected file on the page
    const previewFile = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    let redirect = null;

    if(props.loading){
        redirect = <Spinner />
    }

    if(props.submitted){
        redirect = <Redirect to='/gallery' />;
    }
//===================================================================================================
//====================================================================================================


    return(
        <div className={classes.Gallery}>
            <Layout uploading header='UPLOAD A PHOTOGRAPH'>
                <div className={classes.ContactData}>
                    <form onSubmit={postHandler}>
                        <div className='custom-file mb-4'>
                            <input 
                                required
                                type='file'
                                className='custom-file-input' 
                                id='customFile'
                                onChange={onChange} />
                            <label className='custom-file-label' htmlFor='customFile'>
                                {fileName}
                            </label>
                            <div className={classes.DropDown}>
                                <select id="inputState" className="form-control" onChange={onSelect}>
                                    <option>Select Category...</option>
                                    <option>Weddings</option>
                                    <option>Birthdays</option>
                                    <option>Graduations</option>
                                    <option>Others</option>
                                </select>
                            </div>
                        </div>
                        <Button btnType="Danger" >SUBMIT</Button>
                    </form>
                </div>
            </Layout>
            {previewSource && (
                        <img src={previewSource} alt="chosen" style={{height:'300px'}} />
                    )}
            {redirect}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        filePath: state.photo.filePath,
        imageCategory: state.photo.imageCategory,
        loading: state.photo.loading,
        submitted: state.photo.submitted,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPost: (formDataFile, token) => dispatch(actions.postPhoto(formDataFile, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoData);