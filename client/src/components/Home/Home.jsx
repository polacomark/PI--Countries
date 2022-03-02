import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link} from 'react-router-dom';
import { getAllCountries, 
    getActivity, 
    filterContinents, 
    filterActivities, 
    filterBySeason, 
    orderCountries } from '../../actions';

import CardCountry from '../Cards/CardCountry';
import Card from '../Cards/Card';
import Paginado from '../Paginado/paginado';
import Searchbar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';

export function formatNumber(number){                
    return new Intl.NumberFormat().format(number);
};

export default function Home(){
    const dispatch = useDispatch();
    const filters = useSelector((state)=>state.filters)
    
    

//paginado
const [order, setOrder] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [countriesPg, setCountriesPg] = useState(10)
let indexOfLastCountry = currentPage * countriesPg;  //1*10
let indexOfFirstCountry = indexOfLastCountry - countriesPg; //10-10
let currentCountries = filters?.slice(indexOfFirstCountry, indexOfLastCountry) 

const paginado=(pgNumber)=>{
    setCurrentPage(pgNumber)
}
    
    function handleClick(e){
        e.preventDefault()
        dispatch(getAllCountries())
    }

    useEffect(()=>{
        dispatch(getAllCountries())
        dispatch(getActivity())
        setCountriesPg(10)
    },[dispatch]);

   function handlefiltercontinent(e){
       e.preventDefault()
       dispatch(filterContinents(e.target.value))
       setOrder(e.target.value)
   }
   function handlefilterActivity(e){
    e.preventDefault()
    dispatch(filterActivities(e.target.value))
    setOrder(e.target.value)
}

//por temporada
function handlefilterSeason(e){
    e.preventDefault()
    dispatch(filterBySeason(e.target.value))
    setOrder(e.target.value)
    
}
//ordenamiento
function handlefilterOrder(e){
    e.preventDefault()
    dispatch(orderCountries(e.target.value))
    setOrder(e.target.value)
}
//currentCountries.map((c)=> console.log(c))

    return(
        <div>
            <NavBar/>
            <br></br>
            <Searchbar/>
            <div>
                <div>
                    <button onClick={(e)=>handleClick(e)}>Refresh!</button>
                    
                </div>
                <select onChange={handlefiltercontinent}>
                <option value='All'>Filters Continents</option>
                        <option value='Africa'>Africa</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='North America'>North America</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='South America'>South America</option>
                </select>
                <select onChange={handlefilterSeason}>
                <option value='All'>Filters Season</option>
                        <option value='Autumn'>Autumn</option>
                        <option value='Spring'>Spring</option>
                        <option value='Summer'>Summer</option>
                        <option value='Winter'>Winter</option>
                </select>
                <select onChange={handlefilterActivity}>
                <option value='All'>Filters Activities</option> 
                        <option value='Surf'>Surf</option>
                        <option value='Safari'>Safari</option>
                        <option value='Sky'>Sky</option>
                        <option value='Diving'>Diving</option>
                        <option value='Montain_Climb'>Montain_Climb</option>
                        <option value='Camping'>Camping</option>
                </select>
                <select onChange={handlefilterOrder}>
                <option value='All'>Filters orders</option>
                        <option value='AZ'>A-Z</option>
                        <option value='ZA'>Z-A</option>
                        <option value='ASC'>Population ASC</option>
                        <option value='DESC'>Population DESC</option>
                        <option value='Small'>Small Area</option>
                        <option value='Big'>Big Area</option>
                </select>
                <div>
                    {
                        currentCountries.length?(
                            currentCountries.map((c) => (
                                <CardCountry
                                name={c.name}
                                id={c.id}
                                flags={c.flags}
                                continents={c.continents}
                                population={formatNumber(c.population)}
                                key={c.id}/>
                            ))
                            ):(<h3>Country Not found</h3>)
                        
                     
                    }
                    
                    <Card countries={currentCountries}  />
                    
                </div>
                        <Paginado 
                        countriesPg={countriesPg} 
                        filters={filters.length} 
                        paginado={paginado}/>
            </div>
        </div>
    )
}


