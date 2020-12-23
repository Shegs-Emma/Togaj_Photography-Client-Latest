import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

import Photos from '../../components/Photos/Photos';
import Layout from '../Layout/Layout';
import classes from './Gallery.module.css';
import * as actions from '../../store/actions/index';

const Gallery = (props) => {
    const [ viewing, setViewing ] = useState(false);
    const { pictures, loading, onFetch } = props;
    const [ category, setCategory ] = useState('');
    //The category above is storing the value gotten when i click the particular category i want to see

    useEffect(() => {
        onFetch();
    }, [onFetch]);
    
    const viewHandler = () => {
        //This is handling the way the modal that pops up the image works.
        setViewing(true);
    }

    const viewHandlerClosed = () => {
        //This is handling the way the modal that pops up the image works. When it is closed.
        setViewing(false);
    }

    let photograph = <Spinner />

    if(pictures){
        photograph = (
            <Photos 
                pictures={pictures} 
                sortCategory={category}
                view={viewHandler} 
                loading={loading}
                viewing={viewing}
                viewHandlerClosed={viewHandlerClosed} />
        )
    }

    const sorter = (cat) => {
        //This function is handling the onClick function that is present in the Layout. It is referenced back to it.
        setCategory(cat);
    }

    return (
        <div className={classes.Gallery}>
            <Layout sort={sorter}>
                <div className={classes.PhotoDiv}>
                    {photograph}
                </div>
            </Layout>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        pictures: state.photo.pictures,
        loading: state.photo.loading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetch: () => (dispatch(actions.fetch()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Gallery, axios));