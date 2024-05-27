const { Dog , Temperaments } = require('../db')

const dogsDB = async () => {

    const Dogs = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ["name"],
            through: { attributes: [] },
          }
    })
    const allDogs = Dogs.map((dog) => ({ ...dog, source: 'database' }))

    return allDogs;
}

module.exports = dogsDB;