
require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`


const dogsAPI = async  () => {
    
    try {
        const dogs = await axios.get(`${URL}`);

        if(dogs.data){
            
            const allDogs = dogs.data.map((dog)=>{
                const weight = dog.weight.metric.split(' - ')
                const height = dog.height.metric.split(' - ')
                const life_span = dog.life_span ? dog.life_span.split(' ') : [];
                const life_min = life_span.length > 0 ? life_span[0] : null;
                const life_max = life_span.length > 2 ? life_span[2] : life_min;
                const tempe = dog.temperament?dog.temperament.split(', '):[]
                const image = dog.image.url;
                
            
                
                const dogfinal = {

                    id: dog.id,
                    name: dog.name,
                    weight_min: weight[0],
                    weight_max: weight[1],
                    height_min: height[0],
                    height_max: height[1],
                    life_span_min: life_min,
                    life_span_max: life_max,
                    temperament: tempe,
                    image: image,
                    source: 'api',
                }

                return dogfinal
            })

            return allDogs
        }else{throw new Error('Hubo un error al obtener la informacion')}
       
        }catch (error) {
        
            throw new Error(`No se pudo agregar por ${error}`)
    }
}

module.exports = dogsAPI;