const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DonoSchema = new mongoose.Schema({
    nome: String,
    logradouro: String,
    bairro: String,
    localidade: String,
    uf: String,
    complemento: String,
    cep: String,
    location:{
        type: PointSchema,
        index: '2dsphere'
    }
    
    // foto: String,
    // cachorros: [String]
});

module.exports = mongoose.model('Dono', DonoSchema);