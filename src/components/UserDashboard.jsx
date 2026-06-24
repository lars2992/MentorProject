import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const UserDashboard = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=5')
            .then(res => res.json())
            .then(data => setProducts(data.products))
            .catch(err => console.error('Ошибка загрузки товаров:', err))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userRole')

        navigate('/login')

        // setError('')
        // setIsAuth(false)
    }

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product])
    }
    // Считаем общую сумму всех товаров в корзине
    // .reduce() пробегается по корзине и складывает цены
    const totalCost = cart.reduce((sum, item) => sum + item.price, 0)
    // остановился здесь

    return (
        <>
            <div className="mt-4 p-4 border border-gray-300 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold text-blue-600 mb-2">Панель Пользователя: доступны товары</h3>
                {/* Наш счетчик */}
                <p className="text-sm font-semibold text-green-600 mt-1">
                    🛒 Корзина: {cart.length} шт. | Сумма: ${totalCost.toFixed(2)}
                </p>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white rounded-2xl p-1.5 text-sm cursor-pointer hover:bg-red-600"
            >
                Выйти
            </button>
            <div className="space-y-2">
                {products.map(product => (
                    <div key={product.id} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="font-bold text-gray-800">{product.title}</p>
                        <p className="text-sm text-gray-500">Цена: ${product.price}</p>
                        {/* Кнопка действия */}
                        <button
                            onClick={() => addToCart(product)}
                            className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-xl hover:bg-blue-600 cursor-pointer transition-colors"
                        >
                            Купить
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserDashboard