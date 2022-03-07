const initialState={
    allCountries:[],
    filters:[],
    allActivities:[],
    detail:[]
}

function rootReducer(state=initialState, action){
switch(action.type){
    case 'GET_ALL_COUNTRIES':
    return{
        ...state,
        allCountries: action.payload,
        filters: action.payload,
    };
    case 'GET_COUNTRIES_NAME':
        return{
            ...state,
           // allCountries: action.payload,
            filters: action.payload
        };
    case 'COUNTRY_DETAIL':
        return{
            ...state,
            allCountries: action.payload,
            detail: action.payload
        };
    case 'POST_ACTIVITY':
        return{
            ...state,
        }
    case 'GET_ACTIVITY':
        return{
            ...state,
            allActivities: action.payload,
        }
    case 'FILTER_CONTINENTS':
        const filteredContinent= action.payload === 'All'
        ? state.allCountries
        : state.allCountries.filter((c) => c.continents === action.payload)
        return {
            ...state,
            filters: filteredContinent
        };
        case 'FILTER_ACTIVITIES':
            const filteredActivity = action.payload === 'All'
            ? state.allCountries
            : state.allCountries.filter((c) => c.activities && c.activities.filter((a)=>
            a.name === action.payload).length)
            return {
                ...state,
                filters: filteredActivity
            };
                  
        case 'ORDER_COUNTRIES':
           let sorts;
            if(action.payload === 'All') sorts=  state.allCountries;
            if(action.payload === 'AZ'){  
                 sorts = state.filters.sort((a,b) => {
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                })
            }
            if(action.payload === 'ZA'){
               sorts = state.filters.sort((a,b) => {
                    if(a.name < b.name) return 1;
                    if(a.name > b.name) return -1;
                    return 0;
                })
            }
            if(action.payload === 'ASC'){  //num
                 sorts = state.filters.sort((a,b) => {
                    return   a.population - b.population;
                })      
            }
            if(action.payload === 'DESC'){
                sorts = state.filters.sort((a,b) => {
                  return  b.population - a.population;
                })      
            } 
            
            return {
                ...state,
                filters: sorts
            };


    default:
        return state;
}
};
export default rootReducer;