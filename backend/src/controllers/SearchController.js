const Dono = require('../models/Dono');

module.exports = {
    async index(request, response){
        // Buscar todos os donos num raio de 100km
        // Filtrar pelo nome do PET

        const { latitude, longitude } = request.query;
        
        const donos = await Dono.find({
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 100000,
                }
            }
        });

        return response.json({ donos});
    }
}