import * as types from './types';
import axios from 'axios';
const origin = "https://grafic.herokuapp.com";


export const fetchGraficRequest = () => {
    return { type: types.FETCH_GRAFIC_REQUEST, fetching: true };
}

export const fetchGraficAction = profile => {
    return { type: types.FETCH_GRAFIC_COMPLETE, profile, fetching: false };
}

export const fetchPeriodRequest = () => {
    return { type: types.FETCH_PERIOD_REQUEST, fetching: true };
}

export const fetchPeriodAction = profile => {
    return { type: types.FETCH_PERIOD_COMPLETE, profile, fetching: false };
}

export const changeDataRequest = () => {
    return { type: types.CHANGE_DATA_REQUEST, fetching: true };
}

export const changeDataAction = profile => {
    return { type: types.CHANGE_DATA_COMPLETE, profile, fetching: false };
}


export const fetchGraficData = () => dispatch => {
    dispatch(fetchGraficRequest());
    return axios.get(origin+"/all").then(res => {
        console.log("data------>",res.data);
        dispatch(fetchGraficAction(res.data));

    });
}
export const fetchPeriodData = (period) => dispatch => {
    dispatch(fetchPeriodRequest());
    return axios.get(origin+`${period}`).then(res => {
        console.log("data------>"+period,res.data);
        dispatch(fetchPeriodAction(res.data));

    });
}

export const changeData = (name,yiel,spread,price) => dispatch => {
    dispatch(changeDataRequest());
    return axios.get(origin+`/${name}/${yiel}/${spread}/${price}`).then(res => {
        console.log("data------>",res.data);
        dispatch(changeDataAction(res.data));

    });
}
