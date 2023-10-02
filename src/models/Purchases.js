const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchases = sequelize.define('Purchases', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        
    },
    price: {
        type: DataTypes.DECIMAL,
       
    },

});

module.exports = Purchases