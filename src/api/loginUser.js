export const loginUser = async (username, password) => {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username, // передаем то, что пришло в аргументы функции
                password: password,
            })
        })
        const data = await response.json()

        // Если сервер ответил ошибкой (например, статус 400 или 401)
        if (!response.ok) {
            throw new Error(data.message || 'Неверный логин или пароль')
        }

        // Если всё супер — возвращаем данные наружу
        return data

    } catch (err) {
        console.error('Ошибка в API при авторизации:', err)
        // Пробрасываем ошибку дальше, чтобы её поймал компонент Auth
        throw err
    }
}