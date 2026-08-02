import { useEffect, useState } from "react"
import { useCartStore } from "../store/useCartStore"
import { supabase } from "../api/supabaseClient"
import { useAuthStore } from "../store/useAuthStore"

const ProductList = () => {

    const user = useAuthStore((state) => state.user)
    const isAdmin = user?.role === 'admin'
    //zustand
    const cart = useCartStore((state) => state.cart)
    const addToCart = useCartStore((state) => state.addToCart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const clearCart = useCartStore((state) => state.clearCart)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    //useState
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [emoji, setEmoji] = useState('')

    const [isAdminOpen, setIsAdminOpen] = useState(false)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')

    const [sortBy, setSortBy] = useState('default') //default, cheap, expensive

    // // Проверка URL: вернет true, только если в адресе есть ?role=admin
    // const isAdmin = window.location.search.includes('role=admin')

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)

            const { data, error } = await supabase.from('products').select('*')
            if (error) {
                console.error('Ошибка при загрузки данных', error.message);
            } else {
                setProducts(data)
            }
            setIsLoading(false)
        }

        fetchProducts()
    }, [])
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-xl font-semibold text-gray-500">Загрузка свежих фруктов...</p>
                </div>
            </div>
        )
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()

        if (!title || !price || !emoji) {
            alert('Заполните все поля!')
            return
        }


        setIsSubmitting(true)


        const { data, error } = await supabase
            .from('products')
            .insert([{ title, price: Number(price), emoji }])
            .select() //.select() заставит Supabase вернуть созданную строку базы данных

        if (error) {
            console.error('Ошибка добавления', error.message)
        } else {
            setProducts(
                [...products, data[0]]
            )
            setTitle('')
            setPrice('')
            setEmoji('')
        }


        setIsSubmitting(false)
    }

    const handleDeleteProduct = async (id) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id) // .eq значит "где id равен переданному id"

        setProducts(products.filter(item => item.id !== id))
    }

    const handleCheckout = () => {
        const totalSum = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
        alert(`🎉 Заказ на сумму ${totalSum} ₽ успешно оформлен! Спасибо за покупку.`)
        clearCart()
    }



    const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'cheap') return a.price - b.price
        if (sortBy === 'expensive') return b.price - a.price
        if (sortBy === 'title') return a.title.localeCompare(b.title)
        return 0 // Для 'default' оставляем исходный порядок
    })









    return (
        <div className="max-w-6xl mx-auto p-6 font-sans">
            {/* Заголовок приложения */}
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">🍎 Фруктовый Экспресс</h1>
                <p className="text-gray-500 text-sm mt-1">Свежие фрукты с доставкой за 15 минут</p>
            </header>









            {isAdmin && (
                <div>
                    {/* Кнопка открытия админки */}
                    <div className="mb-6">
                        <button
                            onClick={() => setIsAdminOpen(!isAdminOpen)}
                            className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-xl text-sm transition-colors"
                        >
                            {isAdminOpen ? "❌ Закрыть админку" : "⚙️ Панель администратора"}
                        </button>
                    </div>

                    {/* Сама форма добавления товара */}
                    {isAdminOpen && (
                        <form onSubmit={handleAddProduct} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8 max-w-xl">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Добавить новый фрукт</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                {/* Поле: Название */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Название</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Например, Киви"
                                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                                    />
                                </div>

                                {/* Поле: Цена */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Цена (руб)</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="50"
                                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                                    />
                                </div>

                                {/* Поле: Эмодзи */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Эмодзи</label>
                                    <input
                                        type="text"
                                        value={emoji}
                                        onChange={(e) => setEmoji(e.target.value)}
                                        placeholder="🥝"
                                        maxLength="2"
                                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-center focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                            >
                                {isSubmitting ? "Создание..." : "Создать товар и загрузить в БД"}
                            </button>
                        </form>
                    )}
                </div>
            )}
















            {/* Две колонки: Каталог и Корзина */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">




                {/* Левая колонка: Каталог товаров (занимает 2 части пространства) */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Каталог товаров</h2>
                    <div className="mb-4 flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="🔍 Поиск фрукта..."
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
                        />
                        <select name="" id="" value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-gray-700 cursor-pointer shadow-sm">
                            <option value='default'>По умолчанию</option>
                            <option value='cheap'>Сначала дешевые</option>
                            <option value='expensive'>Сначала дорогие</option>
                            <option value='title'>По названию (А-Я)</option>
                        </select>

                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {sortedProducts.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-4xl bg-gray-50 p-3 rounded-xl">{item.emoji}</span>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                        <p className="text-emerald-600 font-semibold mt-0.5">{item.price} руб. / шт.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-medium py-2 px-4 rounded-xl transition-all text-sm"
                                    >
                                        Добавить в корзину
                                    </button>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDeleteProduct(item.id)}
                                            className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-medium py-2 px-4 rounded-xl transition-all text-sm">
                                            Удалить из БД
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}


                    </div>
                </div>

                {/* Правая колонка: Корзина (занимает 1 часть пространства) */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 h-fit">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center justify-between">
                        <span>Корзина</span>
                        {cart.length > 0 && (
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                {cart.reduce((sum, item) => sum + item.quantity, 0)} шт.
                            </span>
                        )}
                    </h2>

                    {cart.length === 0 ? (
                        <div className="text-center py-8">
                            <span className="text-4xl block mb-2">🛒</span>
                            <p className="text-gray-400 text-sm">Ваша корзина пуста</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Список товаров в корзине */}
                            <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto pr-1">
                                {cart.map((item) => (
                                    <li key={item.id} className="py-3 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{item.emoji}</span>
                                            <div>
                                                <p className="font-semibold text-sm text-gray-800">{item.title}</p>
                                                <p className="text-xs text-gray-400">
                                                    {item.price} руб. × {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 border border-gray-200">
                                                {/* Кнопка МИНУС */}
                                                <button
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className="w-5 h-5 flex items-center justify-center bg-white rounded text-xs font-bold text-gray-600 shadow-sm"
                                                >
                                                    -
                                                </button>

                                                <span className="text-xs font-bold px-1.5 text-gray-700">{item.quantity}</span>

                                                {/* Кнопка ПЛЮС */}
                                                <button
                                                    onClick={() => increaseQuantity(item.id)}
                                                    className="w-5 h-5 flex items-center justify-center bg-white rounded text-xs font-bold text-gray-600 shadow-sm"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-gray-700">
                                                {(item.price * item.quantity).toFixed(2)} ₽
                                            </span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
                                                title="Удалить товар"
                                            >
                                                🗑️
                                            </button>

                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Итоговая сумма */}
                            <div className="border-t pt-4 mt-2">
                                <div className="flex justify-between items-center font-bold text-lg text-gray-800 mb-4">
                                    <span>Итого:</span>
                                    <span className="text-emerald-600">
                                        {(cart.reduce((total, item) => total + (item.price * item.quantity), 0)).toFixed(2)} ₽
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {/* Кнопка оформления */}
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold py-2.5 rounded-xl text-sm transition-all shadow-sm"
                                    >
                                        🚀 Оформить заказ
                                    </button>
                                    {/* Экшен-кнопка очистки */}
                                    <button
                                        onClick={() => clearCart()}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-medium py-2 rounded-xl text-sm transition-colors"
                                    >
                                        Очистить корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ProductList