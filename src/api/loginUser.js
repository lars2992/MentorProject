import { supabase } from "./supabaseClient"; // Проверь путь к файлу!

export const loginUser = async (username, password) => {
    try {
        // 1. Ищем пользователя с таким юзернеймом в базе данных
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)

        if (error) {
            throw new Error(error.message)
        }

        // 2. Если массив пустой, значит такого юзера нет
        if (!users || users.length === 0) {
            throw new Error('Неверный логин или пароль')
        }

        const user = users[0]

        // 3. Проверяем, совпадает ли пароль (поскольку это учебный проект без хэширования, сравниваем напрямую)
        if (user.password !== password) {
            throw new Error('Неверный логин или пароль')
        }

        // 4. Если всё совпало — возвращаем данные пользователя наружу
        return user

    } catch (err) {
        console.error('Ошибка в API при авторизации:', err)
        throw err
    }
}









// export const loginUser = async (username, password) => {
//     try {
//         const response = await fetch('https://dummyjson.com/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 username: username, // передаем то, что пришло в аргументы функции
//                 password: password,
//             })
//         })
//         const data = await response.json()

//         // Если сервер ответил ошибкой (например, статус 400 или 401)
//         if (!response.ok) {
//             throw new Error(data.message || 'Неверный логин или пароль')
//         }

//         // Если всё супер — возвращаем данные наружу
//         return data

//     } catch (err) {
//         console.error('Ошибка в API при авторизации:', err)
//         // Пробрасываем ошибку дальше, чтобы её поймал компонент Auth
//         throw err
//     }
// }