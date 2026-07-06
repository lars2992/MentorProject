export const getProducts = async () => {
    try {
        // 1. Ждем, пока выполнится сетевой запрос
        const response = await fetch('https://dummyjson.com/products?limit=5')

        // 2. Ждем, пока ответ превратится в обычный JS-объект
        const data = await response.json()

        // 3. Возвращаем сам массив товаров наружу
        return data.products

    } catch (err) {
        console.error('Ошибка в API при получении товаров:', err)
        // Если случилась ошибка, возвращаем пустой массив, чтобы приложение не упало
        
        return []
    }
}