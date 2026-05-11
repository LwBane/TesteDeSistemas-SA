import { useEffect, useState } from 'react'
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiBookOpen } from 'react-icons/fi'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Collections() {
  const [livros, setLivros] = useState([])
  const [colecoes, setColecoes] = useState([])
  const [novaColecao, setNovaColecao] = useState('')
  const [expandida, setExpandida] = useState(null)
  const [livroPorColecao, setLivroPorColecao] = useState({})

  useEffect(() => {
    axios.get('http://localhost:3000/livros').then(res => setLivros(res.data))
    axios.get('http://localhost:3000/colecoes')
      .then(res => setColecoes(res.data))
      .catch(() => setColecoes([]))
  }, [])

  const criarColecao = async () => {
    const nome = novaColecao.trim()
    if (!nome) return toast.warn('Digite um nome para a coleção.')
    if (colecoes.some(c => c.nome.toLowerCase() === nome.toLowerCase())) {
      return toast.warn('Já existe uma coleção com esse nome.')
    }
    try {
      const res = await axios.post('http://localhost:3000/colecoes', { nome, livros: [] })
      setColecoes(prev => [...prev, res.data])
      setNovaColecao('')
      toast.success(`Coleção "${nome}" criada!`)
    } catch {
      toast.error('Erro ao criar coleção.')
    }
  }

  const deletarColecao = async (id, nome) => {
    try {
      await axios.delete(`http://localhost:3000/colecoes/${id}`)
      setColecoes(prev => prev.filter(c => c.id !== id))
      if (expandida === id) setExpandida(null)
      toast.success(`Coleção "${nome}" removida.`)
    } catch {
      toast.error('Erro ao remover coleção.')
    }
  }

  const adicionarLivro = async (colecaoId) => {
    const livroId = livroPorColecao[colecaoId]
    if (!livroId) return toast.warn('Selecione um livro.')

    const colecao = colecoes.find(c => c.id === colecaoId)
    if (colecao.livros.includes(livroId)) return toast.warn('Livro já está nessa coleção.')

    const novosLivros = [...colecao.livros, livroId]
    try {
      const res = await axios.patch(`http://localhost:3000/colecoes/${colecaoId}`, { livros: novosLivros })
      setColecoes(prev => prev.map(c => c.id === colecaoId ? res.data : c))
      setLivroPorColecao(prev => ({ ...prev, [colecaoId]: '' }))
      toast.success('Livro adicionado à coleção.')
    } catch {
      toast.error('Erro ao adicionar livro.')
    }
  }

  const removerLivro = async (colecaoId, livroId) => {
    const colecao = colecoes.find(c => c.id === colecaoId)
    const novosLivros = colecao.livros.filter(l => l !== livroId)
    try {
      const res = await axios.patch(`http://localhost:3000/colecoes/${colecaoId}`, { livros: novosLivros })
      setColecoes(prev => prev.map(c => c.id === colecaoId ? res.data : c))
      toast.success('Livro removido da coleção.')
    } catch {
      toast.error('Erro ao remover livro.')
    }
  }

  const getLivrosDaColecao = (colecao) =>
    livros.filter(l => colecao.livros.includes(String(l.id)))

  const livrosDisponiveis = (colecao) =>
    livros.filter(l => !colecao.livros.includes(String(l.id)))

  return (
    <div className='min-h-screen p-8' style={{ backgroundColor: '#F5F0EA' }}>
      <h1
        className='text-2xl font-bold mb-1'
        style={{ color: '#3B2314', fontFamily: 'Georgia, serif' }}
      >
        Coleções
      </h1>
      <p className='text-sm mb-8' style={{ color: '#3B2314', opacity: 0.5 }}>
        Organize seus livros em grupos personalizados.
      </p>

      {/* Criar nova coleção */}
      <div
        className='flex gap-2 mb-8 p-4 rounded-2xl'
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C8' }}
      >
        <input
          type='text'
          value={novaColecao}
          onChange={e => setNovaColecao(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              criarColecao()
            }
          }}
          placeholder='Nome da nova coleção...'
          className='flex-1 bg-transparent outline-none text-sm'
          style={{ color: '#3B2314' }}
        />
        <button
          type='button'
          onClick={criarColecao}
          className='flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80'
          style={{ backgroundColor: '#7D9E8C', color: '#FFFFFF' }}
        >
          <FiPlus size={15} />
          Criar
        </button>
      </div>

      {/* Lista de coleções */}
      {colecoes.length === 0 ? (
        <div className='text-center py-20'>
          <FiBookOpen size={36} style={{ color: '#7D9E8C', margin: '0 auto 12px' }} />
          <p className='text-sm' style={{ color: '#3B2314', opacity: 0.4 }}>
            Nenhuma coleção criada ainda.
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {colecoes.map(colecao => {
            const aberta = expandida === colecao.id
            const livrosDaColecao = getLivrosDaColecao(colecao)
            const disponiveis = livrosDisponiveis(colecao)

            return (
              <div
                key={colecao.id}
                className='rounded-2xl overflow-hidden'
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C8' }}
              >
                {/* Cabeçalho da coleção */}
                <div
                  className='flex items-center justify-between px-5 py-4 cursor-pointer select-none'
                  onClick={() => setExpandida(aberta ? null : colecao.id)}
                >
                  <div className='flex items-center gap-3'>
                    <span className='font-semibold text-sm' style={{ color: '#3B2314' }}>
                      {colecao.nome}
                    </span>
                    <span
                      className='text-xs px-2 py-0.5 rounded-full'
                      style={{ backgroundColor: '#F5F0EA', color: '#7D9E8C' }}
                    >
                      {colecao.livros.length} livro{colecao.livros.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <button
                      type='button'
                      onClick={e => { e.stopPropagation(); deletarColecao(colecao.id, colecao.nome) }}
                      className='transition-opacity hover:opacity-70'
                      style={{ color: '#E8A0A0' }}
                    >
                      <FiTrash2 size={15} />
                    </button>
                    {aberta ? <FiChevronUp size={15} style={{ color: '#3B2314', opacity: 0.4 }} /> : <FiChevronDown size={15} style={{ color: '#3B2314', opacity: 0.4 }} />}
                  </div>
                </div>

                {/* Conteúdo expandido */}
                {aberta && (
                  <div style={{ borderTop: '1px solid #E0D5C8' }}>
                    {/* Adicionar livro */}
                    <div className='flex gap-2 p-4' style={{ borderBottom: '1px solid #F5F0EA' }}>
                      <select
                        value={livroPorColecao[colecao.id] || ''}
                        onChange={e => setLivroPorColecao(prev => ({ ...prev, [colecao.id]: e.target.value }))}
                        className='flex-1 bg-transparent outline-none text-sm rounded-xl px-3 py-2'
                        style={{ color: '#3B2314', border: '1px solid #E0D5C8', backgroundColor: '#F5F0EA' }}
                      >
                        <option value=''>Selecionar livro...</option>
                        {disponiveis.map(l => (
                          <option key={l.id} value={String(l.id)}>{l.titulo}</option>
                        ))}
                      </select>
                      <button
                        type='button'
                        onClick={() => adicionarLivro(colecao.id)}
                        className='flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80'
                        style={{ backgroundColor: '#7D9E8C', color: '#FFFFFF' }}
                      >
                        <FiPlus size={14} />
                        Adicionar
                      </button>
                    </div>

                    {/* Livros da coleção */}
                    {livrosDaColecao.length === 0 ? (
                      <p className='text-sm px-5 py-4' style={{ color: '#3B2314', opacity: 0.35 }}>
                        Nenhum livro nessa coleção ainda.
                      </p>
                    ) : (
                      livrosDaColecao.map(l => (
                        <div
                          key={l.id}
                          className='flex items-center justify-between px-5 py-3'
                          style={{ borderBottom: '1px solid #F5F0EA' }}
                        >
                          <div>
                            <p className='text-sm font-medium' style={{ color: '#3B2314' }}>{l.titulo}</p>
                            <p className='text-xs' style={{ color: '#3B2314', opacity: 0.45 }}>{l.autor}</p>
                          </div>
                          <button
                            type='button'
                            onClick={() => removerLivro(colecao.id, String(l.id))}
                            className='transition-opacity hover:opacity-70'
                            style={{ color: '#E8A0A0' }}
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}