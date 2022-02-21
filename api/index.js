//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//const { default: axios } = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db');


// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
  server.listen(3001, async() => {
    console.log('%s listening at 3001');
    // try{
    //     const apiCountries = await axios.get('https://restcountries.com/v3/all');
    //     const allCountries = apiCountries.data.map((d) => ({
    //                 id: d.cca3,
    //                 name: d.name.common,
    //                 flags: d.flags[0],
    //                 continents: d.continents[0],
    //                 capital: d.capital? d.capital[0]: '---',
    //                 subregion: d.subregion,
    //                 area: d.area,
    //                 population: d.population
    //     }))

    //       await Country.bulkCreate(allCountries)
    //       return allCountries
    // }catch(e) {
    //   console.log(e)
    // }
    });
  });