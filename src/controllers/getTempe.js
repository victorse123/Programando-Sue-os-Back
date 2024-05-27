
const { Temperaments } = require('../db');
const dogsAPI = require('../handlers/dogsAPI');

const getTempe = async () => {
    
        const allDogs = await dogsAPI()
        if (allDogs) {
            
            const tempeApi = allDogs.flatMap((dog) => {
                
                if (dog.temperament) {
                    return dog.temperament.flatMap((tempe) => (tempe ? tempe.split(',') : []));
                } else {
                    return ['No tiene temperamentos'];
                }
            });
            const tempeDb = await Temperaments.findAll()

            const allTempe = [...tempeApi, ...tempeDb]

            return allTempe; 
        }
            
            
    
    
}

module.exports = getTempe;