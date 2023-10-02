const catchError = require('../utils/catchError');
const product = require('../models/Product');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { Op } = require("sequelize");
const image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await product.findAll({include:image});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const {categoryId} = req.body;
    const isValidCategory = await  Category.findByPk(categoryId);
    if(!isValidCategory){
        return res.status(400).json({error:'invalid category'});
    }
    const result = await product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await product.findByPk(id, {include:image});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const filterByCategory = catchError(async(req, res) => {
    const { id } = req.params
    const products = await Product.findAll({where: {categoryId:id},include:image})
    return res.json(products)
})
const filterByName = catchError(async(req, res) => {
    const { title } = req.body
    /*
    Op.like: Se utiliza para realizar búsquedas que coincidan parcialmente con un patrón, similar al operador LIKE en SQL. Por ejemplo, %texto% busca cualquier cadena que contenga "texto".
   
    Op.and: Operador lógico "AND" en Sequelize. Permite construir condiciones de búsqueda donde todas las condiciones deben ser verdaderas.
    Op.or: Operador lógico "OR" en Sequelize. Permite construir condiciones de búsqueda donde al menos una de las condiciones debe ser verdadera.
    !Primer Nivel de [Op.or]:
    ?En el nivel más externo de [Op.or], se busca productos que cumplan con cualquiera de las siguientes condiciones:
    ?La condición en la propiedad title.
    ?La condición en la propiedad description.
    !Segundo Nivel de [Op.or] (para title y description):
    ?Dentro de cada condición (tanto para title como para description), hay otro [Op.or]. Esto se debe a que quiero buscar productos que contengan cualquiera de las palabras en keywords en el título o la descripción. Cada iteración del map genera una condición "LIKE" para una palabra específica.
    */
    // Dividir el título en palabras individuales
    let keywords = title?.split(/\s+/)
    const products = await Product.findAll({
        where: {
            [Op.or]:
                {
                // Buscar productos que contengan alguna de las palabras en el título
                    title: {
                        [Op.or]: keywords?.map(keyword => ({
                            [Op.like]: `%${keyword}%`
                        }))
                    }
                }
        },include: image
    })
    return res.json(products)
})
const setProductImage  = catchError(async(req, res) => {
    const { id } = req.params
    const productToSet = await Product.findByPk(id)
    await productToSet.setImages(req.body)
    const image = await productToSet.getImages()
    return res.json(image)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    filterByCategory,
    filterByName,
    setProductImage


}