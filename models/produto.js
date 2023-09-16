const Sequelize = require('sequelize');
const database = require('../db');
const Categoria = require('./categoria');

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

Produto.belongsTo(Categoria, {
    allowNull: true,
    foreignKey: 'idCategoria'
})

module.exports = Produto;