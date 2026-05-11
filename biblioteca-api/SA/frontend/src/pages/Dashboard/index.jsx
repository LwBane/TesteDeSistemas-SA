import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router'
import axios from 'axios'
import { FaBook } from 'react-icons/fa'

const Dashboard = () => {
    const [livros, setLivros] = useState([])
    const { search } = useOutletContext() || { search: '' }

    useEffect(() => {
        axios.get('http://localhost:3000/livros')
            .then(res => setLivros(res.data))
            .catch(err => console.error('Erro ao buscar livros', err))
    }, [])

    // Filtra por pesquisa
    const livrosFiltrados = livros.filter(l =>
        l.titulo.toLowerCase().includes(search.toLowerCase()) ||
        l.autor.toLowerCase().includes(search.toLowerCase())
    )

    // Agrupa por primeira letra do título
    const agrupados = livrosFiltrados.reduce((acc, livro) => {
        const letra = livro.titulo[0].toUpperCase()
        if (!acc[letra]) acc[letra] = []
        acc[letra].push(livro)
        return acc
    }, {})

    const letras = Object.keys(agrupados).sort()

    return (
        <div>
            <h2 className='text-2xl font-bold mb-6' style={{ color: '#3B2314', fontFamily: 'Georgia, serif' }}>
                Minha Biblioteca
            </h2>

            {letras.length === 0 && (
                <p className='mt-10 text-center' style={{ color: '#9E8C7E' }}>
                    Nenhum livro encontrado.
                </p>
            )}

            {letras.map(letra => (
                <div key={letra} className='mb-8'>
                    {/* Cabeçalho da letra */}
                    <div className='flex items-center gap-3 mb-4'>
                        <h3 className='text-xl font-bold' style={{ color: '#3B2314', fontFamily: 'Georgia, serif' }}>{letra}</h3>
                        <hr style={{ flex: 1, borderColor: '#E0D5C8' }} />
                    </div>

                    {/* Grid de cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1.25rem' }}>
                        {agrupados[letra].map(livro => (
                            <Link
                                key={livro.id}
                                to={`/livros/${livro.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div
                                    className='flex flex-col rounded-xl overflow-hidden'
                                    style={{ backgroundColor: '#FFFFFF', border: '1.5px solid #E0D5C8', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(59,35,20,0.1)' }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                                >
                                    {/* Capa placeholder */}
                                    <div
                                        className='flex items-center justify-center'
                                        style={{ backgroundColor: '#7D9E8C', height: '190px' }}
                                    >
                                        <FaBook size={48} color='#F5F0EA' />
                                    </div>

                                    {/* Info */}
                                    <div className='p-3 flex flex-col gap-1'>
                                        <p className='font-bold text-sm leading-tight' style={{ color: '#3B2314', fontFamily: 'Georgia, serif' }}>
                                            {livro.titulo.length > 25 ? livro.titulo.slice(0, 25) + '...' : livro.titulo}
                                        </p>
                                        <p className='text-xs' style={{ color: '#7D9E8C' }}>{livro.autor}</p>
                                        <div className='flex justify-between items-center mt-1'>
                                            <span className='text-xs px-2 py-0.5 rounded-full' style={{ backgroundColor: '#F5F0EA', color: '#9E8C7E', border: '1px solid #E0D5C8' }}>
                                                {livro.genero}
                                            </span>
                                            <span className='text-xs' style={{ color: '#9E8C7E' }}>{livro.ano}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Dashboard