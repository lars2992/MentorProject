import { useState, useEffect } from "react"
import Registration from "./Registration"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api/loginUser"
import { registerUser } from "../api/registerUser"
import InputCustom from "../utils/InputCustom";
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
        try {
            // Передаем логин и пароль в нашу чистую JS функцию
            const data = await loginUser(inputValue.login, inputValue.password)

            // Если функция вернула data (значит все ок), сохраняем токены:
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            // замена мок данных на реальные
            const detectedRole = data.role // Берём роль прямо из базы данных Supabase!
            localStorage.setItem('userRole', detectedRole)


            setError('')

            if (detectedRole === 'admin') {
                navigate('/admin')
            } else {
                navigate('/dashboard')
            }
        } catch (err) {
            // Если loginUser выкинул ошибку, она упадет сюда:
            setError(err.message || 'Неверный логин или пароль')
        }
    }
    const handleRegisterSubmit = async (event) => {
        event.preventDefault()

        if (inputValue.password !== inputValue.repeatPassword) {
            setError('Пароли не совпадают!')
            return
        }

        try {
            const data = await registerUser(inputValue.login, inputValue.password, inputValue.email)

            setSuccessMessage(`Пользователь ${data.username} успешно зарегистрирован!`)
            setError('') // Очищаем прошлые ошибки

            // Через 3 секунды переключаем на форму входа
            setTimeout(() => {
                setSuccessMessage('')
                setAuthToggle({ hasAccount: true })
            }, 3000)


        } catch (err) {
            setError(err.message || 'Произошла ошибка при регистрации')

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
                    <InputCustom
                        className="bg-gray-500 text-white rounded-2xl mt-2 mb-2 p-1.5 w-full"
                        type="text"
                        placeholder="Логин..."
                        name="login"
                        value={inputValue.login}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <InputCustom
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