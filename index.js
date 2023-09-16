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

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/views/menu.html');
})

app.get('/categorias', (req, res)=>{
    res.sendFile(__dirname+'/views/addCategoria.html');
})

app.get('/categorias/:id', (req, res)=>{
    res.send('resposta funcionando');
})

// Cadastra uma categoria
app.post('/categorias', (req, res)=>{
    Categoria.create({
        codigo: req.body.codigoCategoria,
        titulo: req.body.tituloCategoria,
        status: req.body.statusCategoria
    }).then(() => {
        res.send('deu boa');
    }).catch((e) => {
        res.send('Houve um erro: ' + e);
    });
})

app.patch('/categorias/:id', (req, res)=>{
    res.send('resposta funcionando');
})

app.delete('/categorias/:id', (req, res)=>{
    res.send('resposta funcionando');
})

app.get('/produtos', (req, res)=>{
    res.send('resposta funcionando');
})

app.get('/produtos/:id', (req, res)=>{
    res.send('resposta funcionando');
})

app.post('/produtos', (req, res)=>{
    res.send('resposta funcionando');
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