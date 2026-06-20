import { useEffect, useState } from "react"

const AdminDashboard = () => {
    const [users, setUsers] = useState([])


    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=10')
            .then(res => res.json())
            .then(data => setUsers(data.users))
            .catch(err => console.error('Ошибка загрузки пользователей:', err))
    }, [])
    return (
        <>
            <div className="mt-4 p-4 border border-gray-300 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold text-purple-600 mb-2">Панель Администратора: доступен список пользователей</h3>
            </div>
            <div>
                {users.map(user => (
                    <div key={user.id} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="font-bold text-gray-800">{user.firstName}</p>
                        <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AdminDashboard