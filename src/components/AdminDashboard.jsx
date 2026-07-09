import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import ButtonCustom from "../utils/ButtonCustom";
import { supabase } from "../api/supabaseClient";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
    const { isAuth, user, isLoading } = useContext(AuthContext)

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading) {
            if (!isAuth || user?.role !== 'admin') {
                navigate('/login')
            }
        }
    }, [isAuth, user, isLoading, navigate])


    useEffect(() => {
        if(isAuth && user?.role === 'admin'){
            const fetchUsers = async () => {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')

                if (error) {
                    console.error('Ошибка:', error.message)
                } else {
                    // Не забыть положить пришедшие данные (data) в стейт:
                    setUsers(data)
                }
            }
            fetchUsers() // Запуск функции
        }
    }, [isAuth, user])

    if (isLoading) {
        return <div className="text-center mt-10 text-xl font-bold text-purple-600">Проверка прав администратора...</div>
    }


    // удаление пользователя через id
    const handleDeleteUser = async (id) => {
        await supabase
            .from('users')
            .delete()
            .eq('id', id)

        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <>
            <div className="mt-4 p-4 border border-gray-300 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold text-purple-600 mb-2">Панель Администратора: доступен список пользователей</h3>
            </div>

            <div>
                {users.map(user => (
                    <div key={user.id} className="p-2 mt-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="font-bold text-gray-800">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>

                        <ButtonCustom
                            className="bg-red-500 text-white p-1 rounded-lg text-xs mt-2 cursor-pointer"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            Удалить
                        </ButtonCustom>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AdminDashboard