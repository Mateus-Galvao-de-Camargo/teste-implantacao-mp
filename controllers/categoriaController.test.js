const Categoria = require('../models/categoria');

describe('Testes para categorias', () => {
    it('Deve listar todas as categorias', async () => {
        await Categoria.bulkCreate([
            { codigo: 'teste-categoria', titulo: 'teste-categoria', status: 1 },
            { codigo: 'teste-categoria-2', titulo: 'teste-categoria-2', status: 1 }
        ]);

        const categorias = await Categoria.findAll();
        expect(categorias[0].titulo).toBe('teste-categoria');
        expect(categorias[1].titulo).toBe('teste-categoria-2'); 
    })

    it('Deve listar a categoria requisitada', async () => {
        const categoria = await Categoria.findOne({ where: { titulo: 'teste-categoria' } });
        expect(categoria.titulo).toBe('teste-categoria');
    });

    it('Deve criar uma categoria', async () => {
        await Categoria.bulkCreate([
            { codigo: 'teste-categoria-3', titulo: 'teste-categoria-3', status: 0 }
        ]);

        const categoria = await Categoria.findOne({ where: { titulo: 'teste-categoria-3' } });
        expect(categoria.titulo).toBe('teste-categoria-3');
    });

    it('Deve editar a categoria', async () => {
        const categoria = await Categoria.findOne({ where: { titulo: 'teste-categoria-3' } });
        categoria.titulo = 'teste-categoria-4';
        categoria.save();
        expect(categoria.titulo).toBe('teste-categoria-4');
    });

    it('Deve deletar as categorias', async () => {
        Categoria.destroy({ where: { titulo: 'teste-categoria-4' } });
        Categoria.destroy({ where: { titulo: 'teste-categoria' } });
        Categoria.destroy({ where: { titulo: 'teste-categoria-2' } });
        
        const categoria = await Categoria.findOne({ where: { titulo: 'teste-categoria-4' } });
        const categoria1 = await Categoria.findOne({ where: { titulo: 'teste-categoria' } });
        const categoria2 = await Categoria.findOne({ where: { titulo: 'teste-categoria-2' } });

        expect(categoria).toBeNull();
        expect(categoria1).toBeNull();
        expect(categoria2).toBeNull();
    })
})