const { Router } = require('express');
const DonoController = require('./controllers/DonoController')
const SearchController = require('./controllers/SearchController')

const routes = Router(); 

routes.post('/donos', DonoController.store);
routes.get('/donos', DonoController.index);
routes.put('/donos', DonoController.edit);
routes.delete('/donos/:id', DonoController.delete);

routes.get('/donos/buscar', SearchController.index);

module.exports = routes;