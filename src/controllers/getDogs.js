const dogsAPI = require("../handlers/dogsAPI");
const dogsDB = require('../handlers/dogsDB')


const getDogs = async () => {

    const dogsApi = await dogsAPI();
    const dogsDb = await dogsDB()

    const allDogs = [...dogsApi, ...dogsDb]

    if(allDogs.length > 0){
        return allDogs
    }else{throw new Error('Hubo un error al obtener la informacion')}
    
}

module.exports = getDogs;