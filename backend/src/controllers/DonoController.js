const Dono = require('../models/Dono');
const getEnderecoByCep = require('../lib/getEnderecoByCep');

module.exports = {
    async index(request, response){
        const donos = await Dono.find();

        return response.json(donos);
    },

    async store(request, response) {
        const {nome, cep, latitude, longitude} = request.body;
        const {logradouro, bairro, localidade, uf, complemento} = getEnderecoByCep(cep);
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
    
        const dono = await Dono.create({
            nome,
            logradouro,
            bairro,
            localidade,
            uf,
            complemento,
            cep,
            location
        });
    
        return response.json(dono);
    },

    async delete(request, response){
        const { id } = request.params;
        const dono = await Dono.deleteOne({
            _id: id
        },
        function (err) {
            console.log(err);
        });
        return response.json({message: "Dono apagado com sucesso."});
    },

    async edit(request, response){
        const id = request.query.id;
        const dono = {
            _id: id
        }
        
        const {nome, cep, longitude, latitude} = request.body;
        const {logradouro, bairro, localidade, uf, complemento} = await getEnderecoByCep(cep);
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        const update = {            
            nome,
            logradouro,
            bairro,
            localidade,
            uf,
            complemento,
            cep,
            location
        }

        const donoUpdated = await Dono.findOneAndUpdate(dono, update, {useFindAndModify: false});
        
        return response.json({message: "Dono editado com sucesso."});
    }

};