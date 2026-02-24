test('soma de dois mais dois', () => {
    expect(2+2).toBe(4); // esse toBe é o valor que ele ta recebendo 
})

const can = {
    name: 'pamplemousse',
    ounces: 12,
};

describe('the can', () => {
    test('has 12 ounces', () => {
        expect(can.ounces).toBe(12);
    });

    test('has a sophisticated name', () => {
        expect(can.name).toBe('pamplemousse');
    });
}); 

const teste1 = {
    seuNome: 'seuNome',
    suaIdade: '17'
}

describe("The Teste1", () => {
    test("Teste seu nome", () => expect(teste1.seuNome).toBe("seuNome"));
    test("Teste sua idade", () => expect(teste1.suaIdade).toBe("17"));
});

const produtoA = {
    nome: "Caderno",
    preco: 15.90
}

const produtoB = {
    nome: "Caderno",
    preco: 15.90
}

describe("TesteComparacaoIgual", () => {

    test('Produtos com mesmo valor', () => {
        expect(produtoA).toEqual(produtoB)
    });

})


const produtoC = {
    nome: "Caderno",
    preco: 15.90
}

const produtoD = {
    nome: "Caderno",
    preco: 18.00
}

describe("TesteComparacaoDiferente", () => {

    test('Produtos com preço diferente', () => {
        expect(produtoC).not.toEqual(produtoD)
    });

})