const { Router } = require('express');
const axios = require('axios');
const {Op} = require('sequelize');
const { Country, Activity }= require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// const Countries = require ('./countries.js');
// const Activities = require ('./activities.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('./countries', Countries);
// router.use('./activities', Activities)

// router.get("/coun", async(req, res)=>{
//     const country = await Country.findAll()
//     Promise.all(country)
//     .then(data => res.json(data))
//   })

router.get("/countries", async(req, res) =>{
    try{
        const { name }=req.query;
        if(req.query.name){
            const country = await Country.findAll({
                where:{
                    name:{
                        [Op.iLike]:`%${name}%`
                    }
                },
                include:Activity
            })
            console.log(name)
            res.json(country || "no se encontro el pais")
        // }else{
        //     countries = await Country.findAll({
        //         include:Activity

        //     })
        
    }else{
        //     const respuesta = await axios.get('https://restcountries.com/v3/all')
        //     const data = await respuesta.data
        //     const countri = data.map(async (d)=>{
        //         const countries = await Country.findOrCreate({
        //             where:{
        //                     id: d.cca3,
        //                     name: d.name.common,
        //                     flags: d.flags[0],
        //                     continents: d.continents[0],
        //                     capital: d.capital ? d.capital[0] : '---',
        //                     subregion: d.subregion,
        //                     area: d.area,
        //                     population: d.population

        //             }})
        //     });
        //     Promise.all(countri)
        //     .then(async ()=>{
        //         const allCountries = await Country.findAll();
        //         return allCountries;
        //     })
        //     .then((data)=>res.json(data))
        // }}
        // catch(e){
        //     res.send("error al buscar paises", error)
        // }
       
        
        const apiCountry = await axios.get('https://restcountries.com/v3/all')
        const allCountry  = apiCountry.data.map((d)=>({
           
                id: d.cca3,
                name: d.name.common,
                flags: d.flags[0],
                continents: d.continents[0],
                capital: d.capital? d.capital[0]: '---',
                subregion: d.subregion,
                area: d.area,
                population: d.population
            }));
                       
        
        await Country.FindOrCreate(allCountry)
        return allCountry
    }}catch(e){
        res.send('no se encontro los paises', e);
    }
    
});
// router.get('/countries', async(req, res, next)=>{
// try{
//     const { name }=req.query;
//     let countname;
//     if(req.query.name){
//         countname = await Country.findAll({
//             where:{
//                 name: {
//                     [Op.iLike]:`%${name}%`
                    
//                 }},
//             include: Activity
//         })
//     }else{
//         countries = await Country.findAll({
//             include:Activity,
//         })
//     }
//     return res.send(countries)

// }catch(e){
//  next(e)
// }
// });

router.get('/countries/:id', async(req, res)=>{
    const {id} = req.params;  
    try{ 
         const countryDetail= await Country.findOne({
            where:{
                id: id.toUpperCase()
            },
            include: Activity
        })
            return res.status(200).json(countryDetail);
    }catch(err){
        res.send("error country not found").status(404)
    }
});

router.get('/activity', async(req, res, next)=>{
 try{
     const actividad = await Activity.findall({
        // where:{name}, 
         include: Country
     }
     )
     return actividad

 }catch(e){
    res.send('no se encontro la actividad')
 }
});

router.post('/activity', async(req, res)=>{
    const {name, difficulty, duration, season, countries} = req.body;

    const newActivity = await Activity.create({
        name:name.charAt(0).toUpperCase()+name.slice(1),
        difficulty,
        duration,
        season,
        countries
    })

    await newActivity.addCountries(countries);
    //console.log(newActivity)
    const foundActivity = await Activity.findAll({
        where:{
            name: name.toUpperCase()
        },

        include: [{
            model: Country,
            attributes:['name']
        }] 
    })
   //console.log(newActivity)
    return res.status(200).json(foundActivity)
});



module.exports = router;
