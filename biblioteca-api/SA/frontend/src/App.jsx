import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import DashboardLayout from './layouts/DashboardLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RegisterBook from './pages/RegisterBook'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página pública */}
        <Route path='/' element={<Login />} />

        {/* Páginas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/livros/cadastrar' element={<RegisterBook />} />
          </Route>
        </Route>

        {/* Rota não encontrada */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App