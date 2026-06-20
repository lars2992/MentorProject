import { useEffect, useState } from "react"

const UserDashboard = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=5')
            .then(res => res.json())
            .then(data => setProducts(data.products))
            .catch(err => console.error('Ошибка загрузки товаров:', err))
    }, [])

    return (
        <>
            <div className="mt-4 p-4 border border-gray-300 rounded-2xl bg-gray-50">
                <h3 className="text-lg font-bold text-blue-600 mb-2">Панель Пользователя: доступны товары</h3>
            </div>
            <div className="space-y-2">
                {products.map(product => (
                    <div key={product.id} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="font-bold text-gray-800">{product.title}</p>
                        <p className="text-sm text-gray-500">Цена: ${product.price}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserDashboard