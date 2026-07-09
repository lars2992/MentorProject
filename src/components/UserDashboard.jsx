import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts } from "../api/getProducts"
import { AuthContext } from "../context/AuthContext"

const UserDashboard = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const { isAuth, isLoading, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        // Создаем быструю асинхронную функцию прямо внутри эффекта
        const fetchValues = async () => {
            const data = await getProducts()
            setProducts(data) // кладем чистый массив в стейт
        }

        fetchValues()
    }, [])

    useEffect(() => {
        if (!isLoading && !isAuth) {
            navigate('/login')
        }
    }, [isAuth, isLoading, navigate])

    if (isLoading) {
        <div className="text-center mt-10 text-xl font-bold">Загрузка...</div>
    }

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product])
    }
    // Считаем общую сумму всех товаров в корзине
    // .reduce() пробегается по корзине и складывает цены
    const totalCost = cart.reduce((sum, item) => sum + item.price, 0)

    return (
        <>
            <div className="mt-4 p-4 border border-gray-300 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold text-blue-600 mb-2">Панель Пользователя: доступны товары</h3>
                {/* Наш счетчик */}
                <p className="text-sm font-semibold text-green-600 mt-1">
                    🛒 Корзина: {cart.length} шт. | Сумма: ${totalCost.toFixed(2)}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {products.map(product => (
                    <div key={product.id} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[150px]">
                        <div>
                            <p className="font-bold text-gray-800 text-base mb-1 line-clamp-1">{product.title}</p>
                            <p className="text-sm font-semibold text-blue-500 mb-4">Цена: ${product.price}</p>
                        </div>
                        {/* Кнопка всегда будет прижата к низу карточки */}
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-xl hover:bg-blue-600 cursor-pointer transition-colors"
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