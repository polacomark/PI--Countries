const { Router } = require('express');
const axios = require('axios');
//const {Op} = require('sequelize');
const { Country, Activity }= require('../db');
// Importar todos los routers;

const cors = require("cors");
const router = Router();
router.use (cors({origin:"http://localhost:3000", credentials: true}));

// Configurar los routers

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

//-----busco por name-----------
router.get('/countries', async (req, res) => {
	// /countries?name=argentina
	const { name } = req.query;
	//countries = await getApiInfo();
	let countries;
	const countryDB = await Country.count();
	countries = countryDB === 0
			? await getApiInfo() // si la db esta bacia llamo a la api
			: await getDb(); // si no lo traigo de la bd
	if (name) {
		console.log('es el pais', name);
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
//-----------busco por id ---------
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


module.exports = router;
