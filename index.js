const express = require('express');
const app = express();
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
const database = require('./db');
const ejs = require('ejs');
const Categoria = require('./models/categoria');
const Produto = require('./models/produto');
const Estoque = require('./models/estoque');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

async function criarBanco() {
    try {
      const conn = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
      });
  
      await conn.query('CREATE DATABASE IF NOT EXISTS mercado');
  
      await conn.end();
    } catch (error) {
      console.error('Erro ao criar o banco de dados:', error);
    }
  }

  criarBanco()
    .then(() => {
        

        return database.sync();
    });

// Envia a informação de todas as categorias no banco
app.get('/categorias', (req, res)=>{
    res.send(Categoria.findAll());
})

// Envia a informação de uma categoria com o id fornecido
app.get('/categorias/:id', (req, res)=>{
    res.send(Categoria.findByPk(req.params.id));
})

// Cadastra uma categoria usando o body-parser para direcionar as informações do formulário
app.post('/categorias', (req, res)=>{
    Categoria.create({
        codigo: req.body.codigoCategoria,
        titulo: req.body.tituloCategoria,
        status: req.body.statusCategoria
    }).then(() => {
        res.send('categoria cadastrada');
    }).catch((e) => {
        res.send('Houve um erro: ' + e);
    });
})

// Usa o Body-parser para os novos ou antigos/mantidos valores e salva com o Sequelize
app.patch('/categorias/:id', (req, res)=>{
    const categoria = Categoria.findByPk(req.params.id);
    categoria.codigo = req.body.codigoCategoria,
    categoria.titulo = req.body.tituloCategoria,
    categoria.status = req.body.statusCategoria,
    categoria.save();
})

// Deleta a categoria do id passado
app.delete('/categorias/:id', (req, res)=>{
    Categoria.destroy({ where: { id: req.params.id }})
})

// Procura todos produtos
app.get('/produtos', (req, res)=>{
    res.send(Produto.findAll());
})

// Procura um produto
app.get('/produtos/:id', (req, res)=>{
    res.send(Produto.findByPk(req.params.id));
})

// Cadastra um novo produto
app.post('/produtos', (req, res)=>{
    Produto.create({
        idCategoria: req.body.idCategoriaProduto,
        codigo: req.body.codigoProduto,
        nome: req.body.nomeProduto,
        descricao: req.body.descricaoProduto,
        valor: req.body.valorProduto,
        status: req.body.statusProduto
    }).then(() => {
        res.send('produto cadastrado');
    }).catch((e) => {
        res.send('Houve um erro: ' + e);
    });
})

app.patch('/produtos/:id', (req, res)=>{
    res.send('resposta funcionando');
})

app.delete('/produtos/:id', (req, res)=>{
    res.send('resposta funcionando');
})

app.get('/produtos/:id/estoque', (req, res)=>{
    res.send('resposta funcionando');
})

app.patch('/produtos/:id/estoque', (req, res)=>{
    res.send('resposta funcionando');
})

app.delete('/produtos/:id/estoque', (req, res)=>{
    res.send('resposta funcionando');
})

app.listen(8081, ()=>{
    console.log('Servidor funcionando.');
})