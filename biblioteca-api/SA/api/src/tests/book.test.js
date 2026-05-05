import request from 'supertest'
import app from '../server.js'
import { pool } from '../config/db.js'

afterAll(async () => {
  await pool.end()
})

describe('RF-03 — Cadastro de Livro', () => {

  beforeEach(async () => {
    await pool.query('TRUNCATE TABLE livro RESTART IDENTITY CASCADE')
  })

  // CT-09: — envia todos os campos corretos e espera status 201 com os dados do livro criado
  test('CT-09 — Deve cadastrar livro com dados válidos', async () => {
    const res = await request(app)
      .post('/livros')
      .send({ titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance', quantidade: 3 })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.titulo).toBe('Dom Casmurro')
    expect(res.body.autor).toBe('Machado de Assis')
  })

  // CT-10: Validação de campo obrigatório — omite o título e espera erro 400 com mensagem adequada
  test('CT-10 — Deve rejeitar cadastro sem título', async () => {
    const res = await request(app)
      .post('/livros')
      .send({ autor: 'Machado de Assis', genero: 'Romance', quantidade: 3 })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Título, autor e gênero são obrigatórios')
  })

  // CT-11: Validação de valor inválido — envia quantidade negativa e espera erro 400
  test('CT-11 — Deve rejeitar cadastro com quantidade negativa', async () => {
    const res = await request(app)
      .post('/livros')
      .send({ titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance', quantidade: -1 })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Quantidade deve ser um número maior ou igual a zero')
  })
})

describe('RF-04 — Listagem de Livros', () => {

  beforeAll(async () => {
    await pool.query('TRUNCATE TABLE livro RESTART IDENTITY CASCADE')

    await request(app)
      .post('/livros')
      .send({ titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance', quantidade: 3 })

    await request(app)
      .post('/livros')
      .send({ titulo: 'O Senhor dos Anéis', autor: 'Tolkien', genero: 'Fantasia', quantidade: 2 })
  })

  // CT-12: — banco tem 2 livros, espera array com exatamente 2 itens
  test('CT-12 — Deve listar todos os livros cadastrados', async () => {
    const res = await request(app).get('/livros')

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBe(2)
  })

  // CT-13: Caso limite — banco vazio após truncate, espera array vazio e status 200
  test('CT-13 — Deve retornar array vazio quando não há livros', async () => {
    await pool.query('TRUNCATE TABLE livro RESTART IDENTITY CASCADE')

    const res = await request(app).get('/livros')

    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })
})

describe('RF-05 — Busca de Livro', () => {

  beforeAll(async () => {
    await pool.query('TRUNCATE TABLE livro RESTART IDENTITY CASCADE')

    await request(app)
      .post('/livros')
      .send({ titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance', quantidade: 3 })

    await request(app)
      .post('/livros')
      .send({ titulo: 'O Senhor dos Anéis', autor: 'Tolkien', genero: 'Fantasia', quantidade: 2 })
  })

  // CT-14: Busca por título — query parcial "Dom" deve retornar "Dom Casmurro"
  test('CT-14 — Deve encontrar livro por título', async () => {
    const res = await request(app).get('/livros/busca?q=Dom')

    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0].titulo).toBe('Dom Casmurro')
  })

  // CT-15: Busca por autor — query "Tolkien" deve retornar o livro correspondente
  test('CT-15 — Deve encontrar livro por autor', async () => {
    const res = await request(app).get('/livros/busca?q=Tolkien')

    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0].autor).toBe('Tolkien')
  })

  // CT-16: Busca sem resultado — termo inexistente deve retornar array vazio com status 200
  test('CT-16 — Deve retornar array vazio para busca sem resultado', async () => {
    const res = await request(app).get('/livros/busca?q=xyzinexistente')

    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  // CT-17: Parâmetro ausente — requisição sem ?q= deve retornar erro 400
  test('CT-17 — Deve retornar erro ao buscar sem parâmetro', async () => {
    const res = await request(app).get('/livros/busca')

    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})