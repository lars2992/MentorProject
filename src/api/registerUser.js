export const registerUser = async (username, password, email) => {
    try {
        const response = await fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            })
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Ошибка при регистрации')
        }
        return data
    }
    catch (err) {
        console.error('Ошибка в API при регистрации:', err)
        throw err
    }
}