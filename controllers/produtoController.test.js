
const Produto = require('../models/produto');
const Categoria = require('../models/categoria');

describe('Testes para produtos', () => {
    it('Deve listar todos os produtos', async () => {
        await Categoria.bulkCreate([
            { id: 4, codigo: 'teste-produto-categoria', titulo: 'teste-produto-categoria', status: 1 },
        ]);

        await Produto.bulkCreate([
            { id: 1, idCategoria: 4, codigo: 'teste-produto', nome: 'teste-produto', descricao: 'teste-produto', valor: 15.5,  status: 1 },
            { id: 2, idCategoria: 4, codigo: 'teste-produto-2', nome: 'teste-produto-2', descricao: '', valor: 31, status: 1 }
        ]);

        const produtos = await Produto.findAll();
        expect(produtos[0].nome).toBe('teste-produto');
        expect(produtos[1].nome).toBe('teste-produto-2'); 
    })

    it('Deve listar o produto requisitado', async () => {
        const produto = await Produto.findOne({ where: { nome: 'teste-produto' } });
        expect(produto.nome).toBe('teste-produto');
    });

    it('Deve criar um produto e sem categoria definida', async () => {
        await Produto.bulkCreate([
            { id: 3, codigo: 'teste-produto-3', nome: 'teste-produto-3', descricao: '', valor: 62, status: 0 }
        ]);

        const produto = await Produto.findOne({ where: { nome: 'teste-produto-3' } });
        expect(produto.nome).toBe('teste-produto-3');
    });

    it('Deve editar o produto', async () => {
        const produto = await Produto.findOne({ where: { nome: 'teste-produto-3' } });
        produto.nome = 'teste-produto-4';
        produto.save();
        expect(produto.nome).toBe('teste-produto-4');
    });

    it('Deve deletar a categoria do produto e manter null', async () => {
        const produto = await Produto.findOne({ where: { nome: 'teste-produto' } });
        produto.idCategoria = null;
        produto.save();
        expect(produto.idCategoria).toBeNull();

        Categoria.destroy({ where: { titulo: 'teste-produto-categoria' } });
        const categoria = await Categoria.findOne({ where: { titulo: 'teste-produto-categoria' } });
        expect(categoria).toBeNull();
    });

    it('Deve deletar os produtos', async () => {
        Produto.destroy({ where: { nome: 'teste-produto-4' } });
        Produto.destroy({ where: { nome: 'teste-produto' } });
        Produto.destroy({ where: { nome: 'teste-produto-2' } });
        
        const produto = await Produto.findOne({ where: { nome: 'teste-produto-4' } });
        const produto1 = await Produto.findOne({ where: { nome: 'teste-produto' } });
        const produto2 = await Produto.findOne({ where: { nome: 'teste-produto-2' } });

        expect(produto).toBeNull();
        expect(produto1).toBeNull();
        expect(produto2).toBeNull();
    })
})