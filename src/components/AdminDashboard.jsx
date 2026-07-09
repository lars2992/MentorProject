import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ButtonCustom from "../utils/ButtonCustom";
import { supabase } from "../api/supabaseClient";

const AdminDashboard = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    // useEffect(() => {
    //     fetch('https://dummyjson.com/users?limit=50')
    //         .then(res => res.json())
    //         .then(data => setUsers(data.users))
    //         .catch(err => console.error('Ошибка загрузки пользователей:', err))
    // }, [])
    useEffect(() => {
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
    }, [])


    // удаление пользователя через id
    const handleDeleteUser = async (id) => {
        await supabase
            .from('users')
            .delete()
            .eq('id', id)

        setUsers(users.filter(user => user.id !== id))
    }

    // const handleLogout = () => {
    //     localStorage.removeItem('accessToken')
    //     localStorage.removeItem('refreshToken')
    //     localStorage.removeItem('userRole')

    //     navigate('/login')
    //     // setError('')
    //     // setIsAuth(false)
    // }

    return (
        <>
            <div className="mt-4 p-4 border border-gray-300 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold text-purple-600 mb-2">Панель Администратора: доступен список пользователей</h3>
            </div>
            {/* Кнопка выхода теперь здесь
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white rounded-2xl p-1.5 text-sm cursor-pointer hover:bg-red-600"
            >
                Выйти
            </button> */}
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