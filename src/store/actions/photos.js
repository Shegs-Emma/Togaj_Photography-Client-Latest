import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
// import { config } from 'dotenv';

// config();


export const fetchStart = () => {
    return{
        type: actionTypes.FETCH_START
    };
};

export const fetchSuccess = (photoData) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        pictures: photoData
    };
};

export const fetchFail = (error) => {
    return {
        type: actionTypes.FETCH_FAIL,
        error: error
    }
}

export const postPhotoStart = () => {
    return {
        type: actionTypes.POST_PHOTO_START
    }
}

export const postPhotoSuccess = (filePath, imageCategory) => {
    return {
        type: actionTypes.POST_PHOTO_SUCCESS,
        filePath: filePath,
        imageCategory: imageCategory
    };
};

export const postPhotoFail = (error) => {
    return {
        type: actionTypes.POST_PHOTO_FAIL,
        error: error
    };
};

export const postPhoto = (formData, token) => {
    return dispatch => {
        dispatch(postPhotoStart());

        axios.post('https://togaj-photography.herokuapp.com/api/photos', formData, {
        // axios.post(`${process.env.REACT_APP_BASE_URL}photos`, formData, {
                headers: {
                    'Content-type': 'multi-part/form-data',
                    'Authorization' : `Bearer ${token}`
                },
            }).then(res => {
                const { filePath, imageCategory } = res.data;
                dispatch(postPhotoSuccess(filePath, imageCategory));
            }).catch(error => {
                dispatch(postPhotoFail(error));
            });
    };
}

export const fetch = () => {
    return dispatch => {
        dispatch(fetchStart());

        axios.get('https://togaj-photography.herokuapp.com/api/photos')
        // axios.get(`${process.env.REACT_APP_BASE_URL}photos`)
            .then(res => {
                const fetchedData = [];
                const photos = res.data;

                photos.forEach(photo => {
                    fetchedData.push({
                        id: photo._id,
                        photoUrl: photo.photoUrl,
                        imageCategory: photo.imageCategory
                    });
                });
                dispatch(fetchSuccess(fetchedData));
            })
            .catch(err => {
                dispatch(fetchFail(err));
            })
    }
}