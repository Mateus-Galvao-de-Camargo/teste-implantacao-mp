const Sequelize = require('sequelize');

const banco = 'mercado';
const usuario = 'root';
const senha = '';
const host = 'localhost';
const port = 3306;

const sequelize = new Sequelize(banco, usuario, senha, {
    dialect: 'mysql',
    host: host,
    port: port
});

module.exports = sequelize;