const { getAll, create, getOne, remove, update,filterByCategory,filterByName,setProductImage } = require('../controllers/product.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const productRoute = express.Router();

productRoute.route('/')
    .get(getAll)
    .post(verifyJWT,create);
productRoute.route("/category_id/:id")
    .get(filterByCategory)
productRoute.route("/name")
    .post(filterByName)
productRoute.route("/:id/image")
    .post(verifyJWT,setProductImage)

productRoute.route('/:id')
    .get(getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);


module.exports = productRoute;