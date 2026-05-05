import { Router } from 'express'
import { criarLivro, listarLivros, buscarLivros, deletarLivro } from '../controller/livroController.js'

const router = Router()

router.post('/', criarLivro)
router.get('/', listarLivros)
router.get('/busca', buscarLivros)
router.delete('/:id', deletarLivro)

export default router

