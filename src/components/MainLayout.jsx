import { Outlet, Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import {useAuthStore} from '../store/useAuthStore'

const MainLayout = () => {
    const logout = useAuthStore((state)=> state.logout)
    
    const navigate = useNavigate()
    const role = localStorage.getItem('userRole')

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Тренировочный Header */}
            <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-blue-600 tracking-wide">MyStore</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                        {role || 'user'}
                    </span>
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl px-4 py-2 text-sm transition-colors cursor-pointer" onClick={handleLogout}>Выйти</button>
            </header>
            <div className="flex flex-1">
                <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-2 shadow-sm">
                    <Link to='/dashboard' className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all">Магазин</Link>
                    <Link to='/fruits' className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all">Фрукты</Link>
                    {role === 'admin' && (<Link to='/admin' className="block px-4 py-2.5 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all">Панель админа</Link>)}
                </aside>
                <main className="p-6 flex-1 bg-gray-50 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout