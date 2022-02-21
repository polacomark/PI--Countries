// const {Router} = require('express')
// const axios = require('axios');
// require('dotenv').config();
// const router = Router();
// const { Country, Activity }= require('../db');

// router.get('/', async(req, res, next)=>{
//     try{
//         const apiUrl = await axios.get('https://restcountries.com/v3/all')
//         const apiInfo = await apiUrl.data.map((d)=>({
//                         id: d.cca3,
//                         name: d.name.common,
//                         flags: d.flags[0],
//                         continents: d.continents[0],
//                         capital: d.capital? d.capital[0]: '---',
//                         subregion: d.subregion,
//                         area: d.area,
//                         population: d.population
//         }))
//         await Country.FindOrCreate(apiInfo)
//         return apiInfo
//     }catch(e){
//         res.send('no se encontro los paises', e);
//     }
    
// })

// module.exports = {
//     //apiData,
// }
// module.exports = router;