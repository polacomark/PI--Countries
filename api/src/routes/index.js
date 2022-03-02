const { Router } = require('express');
const axios = require('axios');
//const fetch = require('node-fetch');
//const {Op} = require('sequelize');
const { Country, Activity }= require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const cors = require("cors");
const router = Router();
router.use (cors({origin:"http://localhost:3000", credentials: true}));

// const Countries = require ('./countries.js');
// const Activities = require ('./activities.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('./countries', Countries);
// router.use('./activities', Activities)


const getApiInfo = async () => {
	const { data } = await axios('https://restcountries.com/v3/all');
	const apiInfo = await data.map((country) => {
		return {
			id: country.cca3,
			name: country.name.common,
			img: country.flags[0],
			continents: country.continents[0],
			capital: country.capital?.[0], //?.[0] por alguna razon pregunto y accedo
			subregion: country.subregion, // de lo contrario no accedo
			area: country.area,
			population: country.population,
		};
	});
	const countryResul = await Country.bulkCreate(apiInfo);
	return countryResul;
};

const getDb = async () => {
	//traer db e incluir una actividad
	return await Country.findAll({
		include: {
			model: Activity,
			attribute: ['name', 'difficulty', 'duration', 'season'],
			through: {
				attributes: [],
			},
		},
	});
};

const getDbActivity = async () => {
	return await Activity.findAll({
		include: {
			model: Country,
			attribute: ['name:', 'img', 'continents', 'capital'],
			through: {
				attributes: [],
			},
		},
	});
};

// router.get('/activity', async (req, res) => {
// 	const activities = await getDbActivity();
// 	const { name } = req.query;
// 	res.status(200).send(activities);
// });

router.get('/countries', async (req, res) => {
	// /countries?name=argentina
	const { name } = req.query;
	//countries = await getApiInfo();
	let countries;
	const countryDB = await Country.count();
	countries =
		countryDB === 0
			? await getApiInfo() // asi que si la db esta bacia llamo a la api
			: await getDb(); // si no saco de la bd
	if (name) {
		console.log('este es el name', name);
		const byName = countries.filter((n) =>
			n.name.toLowerCase().includes(name.toLowerCase())
		);
		byName.length
			? res.status(200).send(byName)
			: res.status(404).json({ error: 'no se encontro ningun pais' });
	} else {
		res.status(200).send(countries);
	}
});

// router.get('/countries/:id', async function (req, res) {
// 	const id = req.params.id.toUpperCase();
// 	const allCountries = await getDb();
// 	if (id) {
// 		const idCountries = allCountries.filter((i) => i.id === id);
// 		idCountries.length
// 			? res.status(200).send(idCountries)
// 			: res.status(404).send('id no valido');
// 	}
// });
// router.get("/countries", async(req, res)=>{
//     const country = await Country.findAll()
//     Promise.all(country)
//     .then(data => res.json(data))
//   })

 
// router.get("/countries", async(req, res) =>{
//     try{
    //     const { name }=req.query;
    //     if(req.query.name){
    //         const country = await Country.findAll({
    //             where:{ name: name},
               
    //             include:Activity
    //         }) 
    //         console.log(name)
    //         res.json(country || "no se encontro el pais")
        
    // }else{
        // const {data} = await axios.get('https://restcountries.com/v3/all');
        // const apiUrl = await data.map((c)=>{
        //     return{
        //         id: d.cca3,
        //         name: d.name.common,
        //         flags: d.flags[0],
        //         continents: d.continents[0],
        //         capital: d.capital ? d.capital[0] : '---',
        //         subregion: d.subregion ? d.subregion[0]: '---',
        //         area: d.area,
        //         population: d.population
        //     }
        // });
        // const resultado = await Country.bulkCreate(apiUrl)
        // return resultado;
//             const respuesta = await axios.get('https://restcountries.com/v3/all');
//             const data = await respuesta.data;
//             const countryUrl = data.map(async (d)=>{
//                 const countries = await Country.findOrCreate({
//                     where:{
//                             id: d.cca3,
//                             name: d.name.common,
//                             flags: d.flags[0],
//                             continents: d.continents[0],
//                             capital: d.capital ? d.capital[0] : '---',
//                             subregion: d.subregion ? d.subregion[0]: '---',
//                             area: d.area,
//                             population: d.population

//                     }})
//             });
//             Promise.all(countryUrl)
//             .then(async ()=>{
//                 const allCountries = await Country.findAll();
//                 return allCountries;
//             })
//             .then((data)=>res.json(data))
//         }
//         catch(error){
//             res.send("No se encontro los paises", error)
//         }
        
// });

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
//     return res.send(countname)

// }catch(e){
//  next(e)
// }
// });

//--------------busqueda por id ----------
// router.get('/countries/:id', async function (req, res) {
// 	const id = req.params.id.toUpperCase();
// 	const allCountries = await getDb();
// 	if (id) {
// 		const idCountries = allCountries.filter((i) => i.id === id);
// 		idCountries.length
// 			? res.status(200).send(idCountries)
// 			: res.status(404).send('id no valido');
// 	}
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
// //---------------------------------------------
// router.get('/activity', async(req, res, next)=>{
//  try{
//      const actividad = await Activity.findall({
//         //where:{name: name}, 
//          include: Country
//      }
//      )
//      return actividad

//  }catch(e){
//     res.send('no se encontro la actividad')
//  }
// });
//------------post para crear las actividades -------
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
router.get('/activity', async (req, res) => {
	const activities = await getDbActivity();
	const { name } = req.query;
	res.status(200).send(activities);
});
router.get('/', async(req,res) =>{
    
    const activitiesCreated = await Activity.findAll({
        include: Country
    })
    res.status(200).json(activitiesCreated)
})
// router.get('/activitybyall', async(req,res) =>{
//     const {name}=req.query;

//         const activity= await Activity.findAll({
//             where:{name: name},
//             include: Country
//         })
//         Promise.all(activity)
//    .then(data => 
//     res.json(data)
//    )
// })

module.exports = router;
