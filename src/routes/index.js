const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogs = require('../controllers/getDogs')
const getIdRaza = require('../controllers/getIdRaza')
const getName = require('../controllers/getName')
const postDogs = require('../controllers/postDogs');
const getTempe = require('../controllers/getTempe');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', async (req, res) => {
    try {
        const { name } = req.query
        if(name){
            const response = await getName(name)
            return res.status(200).json(response);
        }else{
            const response = await getDogs();
            return res.status(200).json(response);

        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
router.get('/dogs/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params
        const response = await getIdRaza(idRaza);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
router.post('/dogs', async (req, res) => {
    try {
        
        const { image, name, height_min, height_max,
            weight_min, weight_max, life_span_min, life_span_max, temperament
         } = req.body
        
        if(image&&name&&height_max&&height_min&&weight_max&&weight_min&&life_span_max&&life_span_min&&temperament){
            
            const dog = {image, name, height_min, height_max,
                weight_min, weight_max, life_span_min, life_span_max, temperament}
            
            const response = await postDogs(dog);

            return res.status(200).json(response);
        }
    } catch (error) {
        
        return res.status(400).json({ error: error.message });
    }
})
router.get('/temperaments', async (req, res) => {
    try {
        const response = await getTempe();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});




module.exports = router;
