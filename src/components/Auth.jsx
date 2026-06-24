import { useState, useEffect } from "react"
import Registration from "./Registration"
import { useNavigate } from "react-router-dom"

const Auth = () => {
    const navigate = useNavigate()

    const [authToggle, setAuthToggle] = useState({ hasAccount: true })
    const [inputValue, setInputValue] = useState({
        login: '',
        password: '',
        repeatPassword: '',
        email: ''
    })
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    // ⚡️ Защита страницы входа: если токены есть, не даем сидеть на форме логина
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const savedRole = localStorage.getItem('userRole')

        if (token) {
            if (savedRole === 'admin') {
                navigate('/admin')
            } else {
                navigate('/dashboard')
            }
        }
    }, [navigate])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setInputValue((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleHasAccount = () => {
        setAuthToggle((prevState) => ({
            ...prevState, hasAccount: !prevState.hasAccount
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: inputValue.login,
                password: inputValue.password,
            })
        })
        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)

            const detectedRole = data.username === 'emilys' ? 'admin' : 'user'
            localStorage.setItem('userRole', detectedRole)

            setError('')

            // Перенаправляем на нужную страницу
            if (detectedRole === 'admin') {
                navigate('/admin')
            } else {
                navigate('/dashboard')
            }
        } else {
            setError('Неверный логин или пароль')
        }
    }
    const handleRegisterSubmit = async (event) => {
        event.preventDefault()

        if (inputValue.password !== inputValue.repeatPassword) {
            setError('Пароли не совпадают!')
            return
        }
        try {
            const response = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    username: inputValue.login,
                    password: inputValue.password,
                    email: inputValue.email,
                })
            })
            const data = await response.json()

            if (response.ok) {
                setSuccessMessage(`Пользователь ${data.username} успешно зарегистрирован!`)
                setError('') // Очищаем прошлые ошибки

                // Через 3 секунды автоматически возвращаем пользователя на форму входа
                setTimeout(() => {
                    setSuccessMessage('')
                    setAuthToggle({ hasAccount: true })
                }, 3000)
            } else {
                setError(data.message || 'Ошибка при регистрации')
            }
        } catch (err) {
            console.error('Ошибка:', err);
            setError('Произошла ошибка соединения с сервером')

        }
    }

    return (
        <div className="bg-white p-6 max-w-sm mx-auto text-center">
            <h2 className="text-xl font-bold mb-4"><span className="text-blue-600">
                {authToggle.hasAccount ? 'Авторизация' : 'Регистрация'}</span></h2>
            {successMessage && <p className="text-green-600 font-bold mb-2">{successMessage}</p>}
            <form onSubmit={authToggle.hasAccount ? handleSubmit : handleRegisterSubmit}>
                <div>
                    {error && <p className="text-red-500 font-bold mb-2">{error}</p>}
                    <input
                        className="bg-gray-500 text-white rounded-2xl mt-2 mb-2 p-1.5 w-full"
                        type="text"
                        placeholder="Логин..."
                        name="login"
                        value={inputValue.login}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <input
                        className="bg-gray-500 text-white rounded-2xl mb-2 p-1.5 w-full"
                        type="password"
                        placeholder="Пароль..."
                        name="password"
                        value={inputValue.password}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    {authToggle.hasAccount ? null : <Registration onInput={inputValue} onInputChange={handleInputChange} />}
                </div>

                <div>
                    <button type="submit" className="bg-green-500 text-white rounded-2xl p-1.5 mb-1.5 w-full cursor-pointer">
                        {authToggle.hasAccount ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </div>

                <div>
                    <button
                        type="button"
                        className="bg-gray-500 text-white rounded-2xl mb-2 p-1.5 w-full cursor-pointer hover:bg-amber-300"
                        onClick={handleHasAccount}
                    >
                        Есть/Нет аккаунта
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Auth