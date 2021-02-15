import * as actionTypes from './actionTypes';
import axios from 'axios';
// import { config } from 'dotenv';

// config();



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId, isAdmin) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        isAdmin: isAdmin
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, adminCode, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            adminCode: adminCode
        }

        let url = 'https://togaj-photography.herokuapp.com/api/auth/signup';
        // let url = `${process.env.REACT_APP_BASE_URL}auth/signup`;

        if(!isSignUp){
            url = 'https://togaj-photography.herokuapp.com/api/auth/login';
            // url = `${process.env.REACT_APP_BASE_URL}auth/login`;
        }

        return axios.post(url, authData)
            .then(response => {
                try{
                    const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('expirationTime', expirationTime );
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('isAdmin', response.data.isAdmin);

                    dispatch(authSuccess(response.data.token, response.data.userId, response.data.isAdmin));
                    //Take note of the checkAuthTimeout. It affected my code previously..
                    dispatch(checkAuthTimeout(3600));
                    
                }catch(error){
                    console.log(error);
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            })
        
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const adminStatus = localStorage.getItem('isAdmin');
        if(!token){
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime < new Date()){
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId, adminStatus));
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime())/1000));
            }
        }
    }
};