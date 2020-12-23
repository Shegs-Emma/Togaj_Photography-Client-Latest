import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    pictures: null,
    filePath: null,
    imageCategory: null,
    error: null,
    loading: null,
    submitted: false,
    filename: null,
    filepath: null
}

const fetchStart = (state, action) => {
    return updateObject(state, {loading: true, submitted: false});
};

const fetchSuccess = (state, action) => {
    return updateObject(state, {
        pictures: action.pictures,
        loading: false
    });
};

const fetchFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const postPhotoStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        submitted: false
    });
}

const postPhotoSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        submitted: true,
        filePath: action.filePath,
        imageCategory: action.imageCategory
    });
}

const postPhotoFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        submitted: false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.FETCH_START): return fetchStart(state, action);
        case (actionTypes.FETCH_SUCCESS): return fetchSuccess(state, action);
        case (actionTypes.FETCH_FAIL): return fetchFail(state, action);
        case (actionTypes.POST_PHOTO_START): return postPhotoStart(state, action);
        case (actionTypes.POST_PHOTO_SUCCESS): return postPhotoSuccess(state, action);
        case (actionTypes.POST_PHOTO_FAIL): return postPhotoFail(state, action);
        default: 
            return state;
    }
}

export default reducer;