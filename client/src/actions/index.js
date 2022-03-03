import axios from 'axios';

export function getAllCountries(){
    return async function (dispatch){
        try{
            const countries = await axios.get('http://localhost:3001/countries');
            return dispatch({
                type: 'GET_ALL_COUNTRIES',
                payload: countries.data,
            })

        }catch(e){
            console.log(e)
        }
    }
};


export function getCountriesName(name){
    return async function (dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: 'GET_COUNTRIES_NAME',
                payload: json.data,
            })     
        }catch(e){
        console.log(e)
    }}
};
export function countryDetail(id){
    return async function (dispatch){
        try{
            const detail = await axios.get(`http://localhost:3001/countries/${id}`);
           // console.log(detail)
            return dispatch({
                type:'COUNTRY_DETAIL',
                payload: detail.data,
            })
            
        }catch(e){
            console.log(e)
        }
    }
};
export function postActivity(payload){
    return async function (dispatch){
        const create=await axios.post('http://localhost:3001/activity', payload);
        return dispatch({
            type: 'POST_ACTIVITY',
            create,
        })
    }
};
export function getActivity(){
    return async function (dispatch){
        try{
            const {data} =await axios.get('http://localhost:3001/activity');
            return dispatch({
                type:'GET_ACTIVITY',
                payload: data
            })
        }catch(e){
            console.log(e)
        }
    }
};
export function filterContinents(payload){
 return{
     type: 'FILTER_CONTINENTS',
     payload
 }
};

export function filterActivities(payload){
    return{
        type: 'FILTER_ACTIVITIES',
        payload,
    }
};

export function orderCountries(payload){
    return{
        type: 'ORDER_COUNTRIES',
        payload,
    }
};
