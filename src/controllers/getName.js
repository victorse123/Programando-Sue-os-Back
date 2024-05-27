const getDogs = require('./getDogs');



const getName = async (name) => {
    
    const allDogs = await getDogs()
    
    if(allDogs){
        
        const List = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        
       if (List){return List}
       else{return `No se encontro a la raza ${name}`}
    }
    
    
    
}
        


module.exports = getName