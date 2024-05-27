// const { Dog, Temperaments } = require('../db')

// const postDogs = async ({image, name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max,
//     temperament}) => {
//         if(image&&name&&height_max&&height_min&&weight_max&&weight_min&&life_span_max&&life_span_min&&temperament){
//             const [ dogNuevo, create ] = await Dog.findOrCreate({
                
//                 where: { image, 
//                     name,
//                     height_min,
//                     height_max,
//                     weight_min,
//                     weight_max,
//                     life_span_min,
//                     life_span_max,
//                     include: [
//                         {
//                             model: Temperaments,
//                             where: { name: temperament },
//                         }
//                     ]
//                 }})
//                 if(!create){return `el Dog ${name} ya existe`}
//                 else{ return `se creo correctamente ${dogNuevo}`}
//             }}
// module.exports = postDogs

const { Dog, Temperaments } = require('../db');

const postDogs = async ({ image, name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, temperament }) => {
  if (image && name && height_max && height_min && weight_max && weight_min && life_span_max && life_span_min && temperament) {
    try {
      const temperamentFound = await Temperaments.findOne({ where: { name: temperament } });

      if (!temperamentFound) {
        return { error: `El temperamento '${temperament}' no existe en la base de datos.` };
      }

      const [dogNuevo, create] = await Dog.findOrCreate({
        where: { 
          image,
          name,
          height_min,
          height_max,
          weight_min,
          weight_max,
          life_span_min,
          life_span_max,
        },
      });

      await dogNuevo.setTemperaments(temperamentFound);

      if (!create) {
        return `El perro ${name} ya existe.`;
      } else {
        return `Se creó correctamente el perro ${dogNuevo.name}.`;
      }
    } catch (error) {
      return { error: 'Hubo un error al procesar la solicitud.' };
    }
  } else {
    return { error: 'Faltan datos obligatorios para crear el perro.' };
  }
};

module.exports = postDogs;