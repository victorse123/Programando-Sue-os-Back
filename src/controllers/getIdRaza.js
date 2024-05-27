const getDogs = require('../controllers/getDogs')

const getIdRaza = async (idRaza) => {
       
        const allDogs =  await getDogs()

        const dog = allDogs.filter((dog)=> dog.id == idRaza)

        if(dog){

            return dog;
            
        }else { return 'No se encontro ese id'}
}

module.exports = getIdRaza;