import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
    MdExitToApp,
} from 'react-icons/md'

import {
    FaBook,
    FaBookMedical,
    FaLayerGroup
} from 'react-icons/fa'

import { useAuth } from '../../contexts/AuthContext'
import logo from '../../assets/images/logo-biblioteca2.png'

const SideMenu = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { logout } = useAuth()

    // Função do logout 
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const isActive = (path) => location.pathname === path

    const linkStyle = (path) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        borderRadius: '8px',
        color: isActive(path) ? '#3B2314' : '#5a5a5a',
        backgroundColor: isActive(path) ? '#E0D5C8' : 'transparent',
        fontWeight: isActive(path) ? '600' : '400',
        textDecoration: 'none',
        transition: 'background-color 0.15s, color 0.15s',
        fontSize: '0.95rem',
    })

    return (
        <aside className='h-screen flex flex-col justify-between' style={{ backgroundColor: '#FFFFFF', borderRight: '1.5px solid #E0D5C8', width: '220px', flexShrink: 0 }}>

            {/* Logo */}
            <div>
                <div className='p-5 flex items-center justify-center' style={{ borderBottom: '1px solid #E0D5C8' }}>
                    <img src={logo} alt='Biblioteca' style={{ width: '130px', objectFit: 'contain' }} />
                </div>

                {/* Menu */}
                <nav className='p-4'>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li>
                            <Link
                                to="/dashboard"
                                style={linkStyle('/dashboard')}
                                onMouseEnter={(e) => { if (!isActive('/dashboard')) { e.currentTarget.style.backgroundColor = '#F5F0EA'; e.currentTarget.style.color = '#3B2314' } }}
                                onMouseLeave={(e) => { if (!isActive('/dashboard')) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#5a5a5a' } }}
                            >
                                <FaBook size={18} />
                                <span>Minha Biblioteca</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/livros/cadastrar"
                                style={linkStyle('/livros/cadastrar')}
                                onMouseEnter={(e) => { if (!isActive('/livros/cadastrar')) { e.currentTarget.style.backgroundColor = '#F5F0EA'; e.currentTarget.style.color = '#3B2314' } }}
                                onMouseLeave={(e) => { if (!isActive('/livros/cadastrar')) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#5a5a5a' } }}
                            >
                                <FaBookMedical size={18} />
                                <span>Cadastrar Livro</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/colecoes"
                                style={linkStyle('/colecoes')}
                                onMouseEnter={(e) => { if (!isActive('/colecoes')) { e.currentTarget.style.backgroundColor = '#F5F0EA'; e.currentTarget.style.color = '#3B2314' } }}
                                onMouseLeave={(e) => { if (!isActive('/colecoes')) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#5a5a5a' } }}
                            >
                                <FaLayerGroup size={18} />
                                <span>Coleções</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Botão sair */}
            <div className='p-4' style={{ borderTop: '1px solid #E0D5C8' }}>
                <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 w-full cursor-pointer'
                    style={{ color: '#9E8C7E', fontSize: '0.95rem', background: 'none', border: 'none', padding: '10px 12px', borderRadius: '8px' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F5F0EA'; e.currentTarget.style.color = '#3B2314' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#9E8C7E' }}
                >
                    <MdExitToApp size={20} />
                    <span>Sair</span>
                </button>
            </div>

        </aside>

    )
}

export default SideMenu