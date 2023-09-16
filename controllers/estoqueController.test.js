const Estoque = require('../models/estoque');
const Produto = require('../models/produto');

describe('Testes para estoques', () => {
    it('Deve criar uma estoque', async () => {
        await Produto.bulkCreate([
            { id: 5, codigo: 'teste-estoque-produto', nome: 'teste-estoque-produto', descricao: 'teste-estoque-produto', valor: 15.5,  status: 1 }
        ]);

        await Estoque.bulkCreate([
            { idProduto: 5, quantidade: 0, reserva: 0, status: 0 }
        ]);

        const estoque = await Estoque.findOne({ where: { idProduto: 5 } });
        expect(estoque.idProduto).toBe(5);
    });

    it('Deve listar o estoque', async () => {
        const estoque = await Estoque.findOne({ where: { idProduto: 5 } });
        expect(estoque.idProduto).toBe(5);
        console.log(estoque);
    });

    it('Deve editar o estoque', async () => {
        const estoque = await Estoque.findOne({ where: { idProduto: 5 } });
        estoque.quantidade = 30;
        estoque.save();
        expect(estoque.quantidade).toBe(30);
    });

    it('limpar banco', async () => {
        Estoque.destroy({ where: { idProduto: 5 } });
        const estoque = await Estoque.findOne({ where: { idProduto: 5 } });
        expect(estoque).toBeNull();

        Produto.destroy({ where: { id: 5 } });
        const produto = await Produto.findOne({ where: { id: 5 } });
        expect(produto).toBeNull();
    });
})