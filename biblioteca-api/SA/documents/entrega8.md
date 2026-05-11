
# ENTREGA 8 — Descritivo de Casos de Teste de Software

## 8.1 Casos de Teste

### Back-end (Jest + Supertest)

A tabela abaixo relaciona os casos de teste aos requisitos funcionais do sistema.

| ID Caso de Teste | ID Requisito Funcional | Descrição | Precondição | Passos | Resultado Esperado |
|------------------|------------------------|-----------|-------------|--------|--------------------|
| CT-01 | RF-01 | Cadastrar usuário com dados válidos | Banco de dados disponível | 1. Enviar POST /users com nome e e-mail válidos<br>2. Verificar resposta da API | Retorna status 201 e os dados do usuário criado |
| CT-02 | RF-01 | Tentar cadastrar com e-mail já existente | Usuário com mesmo e-mail já cadastrado | 1. Enviar POST /usuarios com e-mail duplicado | Retorna status 400 com mensagem de erro |
| CT-03 | RF-01 | Cadastrar sem informar o nome | Banco de dados disponível | 1. Enviar POST /usuarios sem o campo nome | Retorna status 400 com "Nome, e-mail e senha são obrigatórios" |
| CT-04 | RF-01 | Cadastrar com e-mail sem @ | Banco de dados disponível | 1. Enviar POST /usuarios com e-mail inválido | Retorna status 400 com "E-mail inválido" |
| CT-05 | RF-01 | Cadastrar com senha muito curta | Banco de dados disponível | 1. Enviar POST /usuarios com senha de 3 caracteres | Retorna status 400 com "Senha deve ter pelo menos 6 caracteres" |
| CT-06 | RF-02 | Login com e-mail e senha corretos | Usuário já cadastrado | 1. Enviar POST /usuarios/login com credenciais corretas | Retorna status 200 e os dados do usuário |
| CT-07 | RF-02 | Login com senha errada | Usuário já cadastrado | 1. Enviar POST /usuarios/login com senha incorreta | Retorna status 401 com mensagem de erro |
| CT-08 | RF-02 | Login com e-mail que não existe | Banco de dados disponível | 1. Enviar POST /usuarios/login com e-mail não cadastrado | Retorna status 401 com mensagem de erro |
| CT-09 | RF-03 | Cadastrar livro com todos os campos | Banco de dados disponível | 1. Enviar POST /livros com título, autor, gênero e quantidade | Retorna status 201 com os dados do livro |
| CT-10 | RF-03 | Cadastrar livro sem título | Banco de dados disponível | 1. Enviar POST /livros sem o campo título | Retorna status 400 com mensagem de campos obrigatórios |
| CT-11 | RF-03 | Cadastrar livro com quantidade negativa | Banco de dados disponível | 1. Enviar POST /livros com quantidade -1 | Retorna status 400 com mensagem de erro |
| CT-12 | RF-04 | Listar livros com 2 cadastrados | 2 livros no banco | 1. Enviar GET /livros | Retorna status 200 com array de 2 livros |
| CT-13 | RF-04 | Listar quando não tem nenhum livro | Banco sem livros | 1. Enviar GET /livros | Retorna status 200 com array vazio |
| CT-14 | RF-05 | Buscar livro pelo título | Livros cadastrados | 1. Enviar GET /livros/busca?q=Dom | Retorna o livro "Dom Casmurro" |
| CT-15 | RF-05 | Buscar livro pelo autor | Livros cadastrados | 1. Enviar GET /livros/busca?q=Tolkien | Retorna o livro do autor Tolkien |
| CT-16 | RF-05 | Buscar algo que não existe | Livros cadastrados | 1. Enviar GET /livros/busca?q=xyzinexistente | Retorna status 200 com array vazio |
| CT-17 | RF-05 | Buscar sem informar o parâmetro q | Banco de dados disponível | 1. Enviar GET /livros/busca sem query | Retorna status 400 com mensagem de erro |

---

### Front-end (Playwright)
 
| ID Caso de Teste | ID Requisito Funcional | Descrição | Precondição | Passos | Resultado Esperado |
|------------------|------------------------|-----------|-------------|--------|--------------------|
| CT-18 | RF-06 | Verificar se a tela de login aparece | Frontend rodando | 1. Acessar localhost:5173 | Campos de e-mail e senha estão visíveis |
| CT-19 | RF-07 | Ir para a tela de cadastro | Tela de login aberta | 1. Clicar em "Cadastre-se" | Formulário de cadastro é exibido |
| CT-20 | RF-08 | Voltar para o login pelo cadastro | Tela de cadastro aberta | 1. Clicar em "Entrar" | Formulário de login aparece novamente |
| CT-21 | RF-09 | Ver erro ao errar a senha no login | Usuário cadastrado | 1. Preencher e-mail certo e senha errada<br>2. Clicar em "Entrar" | Mensagem de erro aparece na tela |
| CT-22 | RF-10 | Ir pro dashboard depois do login | Usuário cadastrado | 1. Preencher dados corretos<br>2. Clicar em "Entrar" | Dashboard é exibido com o nome do usuário |
 

---

## 8.2 Ferramentas e Ambientes de Teste

### Ferramentas de Teste
- Jest — execução dos testes unitários (back-end)
- Supertest — simulação de requisições HTTP no back-end
- Playwright — testes end-to-end no front-end
- Navegador
- Postman
- Console do navegador

### Ambiente de Teste

- **Ambiente:** Desenvolvimento local 
- **Servidor de Teste:** Node.js 
- **Banco de Dados / Versão:** PostgreSQL
- **Browser / Versão:** Google Chrome (última versão) 
- **Sistema Operacional:** Windows 11 
