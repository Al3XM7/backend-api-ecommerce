const { getAll, create,  remove, update } = require('../controllers/category.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const categoryRoute = express.Router();

categoryRoute.route('/')
    .get(getAll)
    .post( verifyJWT,create);

categoryRoute.route('/:id')
    
    .delete( verifyJWT,remove)
    .put( verifyJWT,update);

module.exports = categoryRoute;