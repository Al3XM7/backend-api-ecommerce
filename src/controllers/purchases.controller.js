const catchError = require("../utils/catchError")
const Purchases = require("../models/Purchases")
const Cart = require("../models/Cart")
const Image = require("../models/Image")
const getAll = catchError(async(req, res) => {
    const {user} = req
    const results = await Purchases.findAll({where: {userId: user.id}})
    return res.json(results)
})
const create = catchError(async(req, res) => {
    const {user} = req
    const cartProducts = await Cart.findAll({where: {userId: user.id}},{include:Image })
    if (cartProducts.length <= 0) return res.status(404).json({message: "Cart is empty"})
    console.log(cartProducts.product)
    cartProducts.forEach(async(product) => {
        await Purchases.create({quantity: product.quantity,
            userId: user.id, productId: product.productId,
            title: product.product.title,price: product.product.price})
        return product.id
    })
    await Cart.destroy({where: {userId: user.id}})
    return res.status(201).json({message: "Purchases successfully created"})
})
module.exports = {
    getAll,
    create
}