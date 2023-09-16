const express = require('express');
const app = express();
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
const database = require('./db');
const Categoria = require('./models/categoria');
const Produto = require('./models/produto');
const Estoque = require('./models/estoque');

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
});

// Envia a informação de uma categoria com o id fornecido
app.get('/categorias/:id', (req, res)=>{
    res.send(Categoria.findByPk(req.params.id));
});

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
});

// Usa o Body-parser para os novos ou antigos/mantidos valores e salva com o Sequelize
app.patch('/categorias/:id', (req, res)=>{
    const categoria = Categoria.findByPk(req.params.id);
    categoria.codigo = req.body.codigoCategoria,
    categoria.titulo = req.body.tituloCategoria,
    categoria.status = req.body.statusCategoria,
    categoria.save().then(() => {
        res.send('categoria atualizada');
    }).catch((e) => {
        res.send('Houve um erro: ' + e);
    });
});

// Deleta a categoria do id passado
app.delete('/categorias/:id', (req, res)=>{
    Categoria.destroy({ where: { id: req.params.id }})
});

// Procura todos produtos
app.get('/produtos', (req, res)=>{
    res.send(Produto.findAll());
});

// Procura um produto
app.get('/produtos/:id', (req, res)=>{
    res.send(Produto.findByPk(req.params.id));
});

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
});

// Atualiza um produto
app.patch('/produtos/:id', (req, res)=>{
    const produto = Produto.findByPk(req.params.id);
    produto.idCategoria = req.body.idCategoriaProduto;
    produto.codigo = req.body.codigoProduto;
    produto.nome = req.body.nomeProduto;
    produto.descricao = req.body.descricaoProduto;
    produto.valor = req.body.valorProduto;
    produto.status = req.body.statusProduto;
    produto.save().then(() => {
        res.send('produto atualizado');
    }).catch((e) => {
        res.send('Houve um erro: ' + e);
    });
});

// Deleta um produto
app.delete('/produtos/:id', (req, res)=>{
    Produto.destroy({ where: { id: req.params.id } });
});

app.get('/produtos/:id/estoque', (req, res)=>{
    res.send(Estoque.findByPk(req.params.id));
});

app.patch('/produtos/:id/estoque', (req, res)=>{
    const estoque = Estoque.findByPk(req.params.id);
    estoque.quantidade = req.body.quantidadeEstoque;
    estoque.reserva = req.body.reservaEstoque;
    estoque.status = req.body.statusEstoque;
});

app.delete('/produtos/:id/estoque', (req, res)=>{
    res.send('[501] - Not Implemented.');
});

app.listen(8081, ()=>{
    console.log('Servidor funcionando.');
});