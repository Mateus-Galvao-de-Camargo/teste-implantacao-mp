const Sequelize = require('sequelize');
const database = require('../db');
const Produto = require('./produto');

const Estoque = database.define('estoque', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idProduto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reserva: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

Estoque.belongsTo(Produto, {
    foreignKey: 'idProduto'
})

module.exports = Estoque;