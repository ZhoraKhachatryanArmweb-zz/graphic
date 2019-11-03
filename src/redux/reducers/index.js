import * as types from '../actions/types';

const initialState = {
    formData: {},
    profile: [],
    fetching: true
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case types.CHANGE_DATA_REQUEST:
            return { ...state, fetching: action.fetching };
        case types.CHANGE_DATA_COMPLETE:
            return { ...state, profile: action.profile, fetching: action.fetching };
        case types.FETCH_PERIOD_REQUEST:
            return { ...state, fetching: action.fetching };
        case types.FETCH_PERIOD_COMPLETE:
            return { ...state, profile: action.profile, fetching: action.fetching };
        case types.FETCH_GRAFIC_REQUEST:
            return { ...state, fetching: action.fetching };
        case types.FETCH_GRAFIC_COMPLETE:
            return { ...state, profile: action.profile, fetching: action.fetching };
        default:
            return state;
    }
}

export default rootReducer;
