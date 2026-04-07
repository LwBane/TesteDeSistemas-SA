# Controllers

A camada de **controllers** é responsável por receber as requisições HTTP
e devolver as respostas para o cliente.

## Por que usar?

O controller é o intermediário entre a rota e o restante da aplicação.
Ele não contém lógica de negócio — apenas chama o service, espera o
resultado e devolve o status e os dados corretos.

## Fluxo

requisição → rota → controller → service → banco de dados → controller → resposta

## Responsabilidades

- Ler os dados da requisição (`req.body`, `req.params`)
- Chamar o service correspondente
- Retornar a resposta com o status HTTP adequado (`200`, `201`, `400`, `404`, `500`)
- Capturar erros no `catch` e devolver uma mensagem de erro

## Exemplo prático

Ao receber um `POST /users`, o `usuarioController.js` extrai `nome` e
`email` do `req.body`, chama o `validateUsuario` do service e, se passar,
executa o INSERT no banco. Em caso de erro, devolve status 400 com a
mensagem correspondente.
