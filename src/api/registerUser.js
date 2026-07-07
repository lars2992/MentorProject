import { supabase } from "./supabaseClient";

export const registerUser = async (username, password, email) => {
    try {
        // const response = await fetch('https://dummyjson.com/users/add', {
        //     method: 'POST',
        //     headers: { 'Content-type': 'application/json' },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password,
        //         email: email,
        //     })
        // })
        // const data = await response.json()

        // if (!response.ok) {
        //     throw new Error(data.message || 'Ошибка при регистрации')
        // }
        // return data
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    username: username,
                    password: password,
                    email: email,
                    role: 'user' // по умолчанию все обычные юзеры
                }
            ])
            .select() // возвращает добавленную строку

        // 2. Если Supabase вернул ошибку, пробрасываем её в catch

        if (error) {
            throw new Error(error.message)
        }

        // 3. Возвращаем созданного пользователя (он лежит в массиве data[0])
        return data[0]
    }
    catch (err) {
        console.error('Ошибка в API при регистрации:', err)
        throw err
    }
}