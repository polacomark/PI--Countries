import './App.css';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail';
import CreateActivity from './components/CreateActivity/CreateActivity';
import { getAllCountries, getActivity }from './actions/index'

function App() { //al montarse la app ya estan cargados los paises

    const dispatch = useDispatch();
     useEffect(() => {
          dispatch(getAllCountries())
          dispatch(getActivity()) 
      }, [dispatch])

  return (
    <>
    <BrowserRouter>
    <div className="App">
    <Switch> 
      <Route exact path='/' component={Landing}/>
      <Route path='/home' component={Home}/>
      <Route path ='/countries/:id' component={Detail}/>
      <Route path='/activity' component={CreateActivity}/>
    </Switch>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
