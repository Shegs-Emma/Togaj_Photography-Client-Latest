import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    error: null,
    loading: null,
    submitted: null
}

const contactStart = (state, action) => {
    return updateObject(state, {error: false, loading: true, submitted: false});
};

const contactSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        error: null,
        loading: false,
        submitted: true
    });
};

const contactFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        submitted: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case (actionTypes.CONTACT_START): return contactStart(state, action);
        case (actionTypes.CONTACT_SUCCESS): return contactSuccess(state, action);
        case (actionTypes.CONTACT_FAIL): return contactFail(state, action);
        default:
            return state;
    }
}

export default reducer;