const { getAll, create, remove } = require("../controllers/image.controller")
const express = require("express")
const upload = require("../utils/multer")
const verifyJWT = require("../utils/verifyJWT")

const imageRoute = express.Router()

imageRoute.route("/")
    .get(verifyJWT,getAll)
    .post(verifyJWT,upload.single("image"),create)
imageRoute.route("/:id")
    .delete(verifyJWT,remove)

module.exports = imageRoute