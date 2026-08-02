import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const ProtectedRoute = ({ allowedRole }) => {
    const user = useAuthStore((state) => state.user)
    const isLoading = useAuthStore((state) => state.isLoading) // если есть флаг загрузки

    // 1. Пока идет проверка авторизации из базы (checkAuth)
    if (isLoading) {
        return <div className="p-6 text-center">Проверка доступа...</div>
    }

    // 2. Если нет пользователя — отправляем на логин
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // 3. Если передана требуемая роль, и она не совпадает с ролью пользователя
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/dashboard" replace />
    }

    // Если всё хорошо — рендерим защищенный роут
    return <Outlet />
}

export default ProtectedRoute