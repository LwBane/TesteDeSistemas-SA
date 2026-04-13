import { Router } from 'express'
import { criarLivro, listarLivros, buscarLivros, deletarLivro } from '../controller/livroController.js'

const router = Router()

router.post('/cadastrar-livro', criarLivro)
router.get('/', listarLivros)
router.get('/buscar', buscarLivros)
router.delete('/:id', deletarLivro)


export default router

