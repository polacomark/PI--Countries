import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {postActivity, getAllCountries} from '../../actions/index';
import {useDispatch, useSelector } from'react-redux';

export function validate(activity){
    let errors={};
    if(!activity.name){
        errors.name = 'ingrese un nombre'
    }
    if(!activity.difficulty){
        errors.difficulty='ingrese un nivel de difucultad'
    }
    if(!activity.duration >= 1){
        errors.duration='ingrese una duracion mayor o igual a 1 hora'
    }
    if(!activity.season){
        errors.season='selecciones una termporada'
    }
    return errors
}

export default function CreateActivity(){
    const dispatch = useDispatch();
    const countries = useSelector(state => state.allCountries)
    const [activity, setActivity]= useState({   //activity es mi input
        name:"",
        difficulty:"",
        duration:"",
        season:"",
        countries:[]
    })

    const [errors, setErrors]=useState({})

    useEffect(()=>{
        dispatch(getAllCountries())
    },[dispatch])

   function handleChange(e){
        setActivity({
            ...activity,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...activity,
            [e.target.name] : e.target.value,
        }))
    }
    function handleSubmit (e){
        e.preventDefault()
        //let errors = Objet.keys(validate(activity))
        if(!errors.length){
            dispatch(postActivity(activity))
            setActivity({
                name:'',
                difficulty:'',
                duration:'',
                season:'',
                countries:[]
            })
            alert("activity created successfully") // actividad creada exitosamente   
        }else{
            alert('Fill in the fields') //rellenar los campos
        }
    }
    function handleSelect(e){
        setActivity({
            ...activity,
            countries: [...activity.countries, e.target.value],
        })
        setErrors(validate({
            ...activity,
            countries: [...activity.countries, e.target.value],
        }))
    }
    function handleDelete(id){
        //e.preventDefault(e)
        setActivity({
            ...activity,
            countries: activity.countries.filter((t)=>t!==id)
        })
    }

    return(
        <div>
            <div>
                <div>
                    <h1>Crear Actividad Turistica</h1>
                    <p> En esta seccion podra agregar una nueva actividad a su lista de paises</p>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                <fieldset>
                    <div>
                    <div>
                        <label>Name:</label>
                    </div>
                    <input name='name'
                    id='name'
                    type='text'
                    value={activity.name}
                    placeholder='Activity name'
                    onChange={handleChange}
                    required>
                    </input>
                    {errors.name &&(
                        <p>
                            {errors.name}
                        </p>
                    )}
                    </div>
                    <div>
                    <div>
                        <label>Difficulty:</label>
                    </div>
                    <select 
                    id='difficulty'
                    name='difficulty'
                    type='text'
                    value={activity.difficulty}
                    onChange={handleChange}
                    required>
                        <option value=''>select your Difficulty</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                    {errors.difficulty &&(
                        <p>
                            {errors.difficulty}
                        </p>
                    )}
                    </div>
                    
                    <div>
                    <div>
                        <label>Duration:</label>
                    </div>
                    <input name='duration'
                    type='number'
                    value={activity.duration}
                    placeholder='hours'
                    required='required'
                    onChange={handleChange}>
                    </input>
                    {errors.duration &&(
                        <p>
                            {errors.duration}
                        </p>
                    )}
                    </div>

                    <div>
                    <div>
                        <label>Season:</label>
                    </div>
                    <select name='season'
                    type='text'
                    value={activity.season}
                    required='required'
                    onChange={handleChange}>
                        <option value=''>Select your Season</option>
                        <option value='Autumn'>Autumn</option>  {/* otoño */}
                        <option value='Spring'>Spring</option>  {/* primavera */}
                        <option value='Summer'>Sumer</option>   {/* verano */}
                        <option value='Winter'>Winter</option>  {/* invierno */}
                    </select>
                    {errors.season &&(
                        <p>
                            {errors.season}
                        </p>
                    )}
                       </div> 

                      <div>
                          <div>
                           <label>Countries:</label>
                          </div>
                          <select 
                          name='countries'
                          type='text'
                        onChange={handleSelect}>
                          <option value={activity.countries}>Select countries</option>
                          {
                              countries.map((c)=>(
                                  
                                      <option value={c.id} key={c.id}>{c.name}</option>

                                  )
                                   )
                          }
                          </select>
                          </div>
                   <ul>
                       {activity.countries.map((c)=>(
                           <li key={c.id}>{c}{' '}
                            <button  onClick={() => handleDelete(c)}>X</button>
                           </li>
                       ))}
                      {/* {activity.countries.map((e, id) => {
                          return(
                            <React.Fragment key={id}>
                                <div>{e}

                            <button  onClick={() => handleDelete(e)}>X</button>
                                </div>
                            </React.Fragment>
                          )
                          
                            })} */}
                      </ul>  
                        
                   
                    <button type='submit'>Create Activity</button>
                    <Link to='/home'>
                            <button >Back</button>
                        </Link> 
                        </fieldset>                   
                </form>
            </div>
        </div>
    )
}