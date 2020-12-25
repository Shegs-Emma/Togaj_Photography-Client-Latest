import * as actionTypes from './actionTypes';
import axios from 'axios';
// import { config } from 'dotenv';

// config();

export const contactStart = () => {
    return{
        type: actionTypes.CONTACT_START
    }
};


export const contactSuccess = (userId) => {
    return{
        type: actionTypes.CONTACT_SUCCESS,
        userId: userId
    };
}

export const contactFail = (error) => {
    return{
        type: actionTypes.FETCH_FAIL,
        error: error
    }
};

export const contact = (userDetails) => {
    return dispatch => {
        dispatch(contactStart());

        axios.post('https://enigmatic-eyrie-76099.herokuapp.com/api/contact', userDetails)
            .then((res) => {
                console.log(res);
                dispatch(contactSuccess(res.data.messageId));
            })
            .catch(err => {
                console.log(err)
                dispatch(contactFail(err));
            })
    }
}