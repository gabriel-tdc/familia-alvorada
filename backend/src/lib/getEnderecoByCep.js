const axios = require('axios');

module.exports = async function getEnderecoByCep(cep){
    const apiResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const {logradouro, bairro, localidade, uf, complemento} = apiResponse.data;
    const endereco = {
        logradouro,
        bairro,
        localidade,
        uf,
        complemento
    }
    
    return endereco;
}