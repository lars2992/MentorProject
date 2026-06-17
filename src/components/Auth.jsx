import { useState } from "react"
import Registration from "./Registration"



const Auth = () => {
    //useState
    const [authToggle, setAuthToggle] = useState({ hasAccount: true })

    const [inputValue, setInputValue] = useState(
        {
            login: '',
            password: '',
            repeatPassword: '',
            email: ''
        }
    )

    //для авторизации
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('accessToken'))

    const [role, setRole] = useState(localStorage.getItem('userRole') || '')

    const [error, setError] = useState('')


    // Универсальный обработчик ввода
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setInputValue((prevState) => ({
            ...prevState,
            [name]: value // Обновляет только нужное поле по его имени
        }))
    }

    //handles
    const handleHasAccount = () => {
        setAuthToggle((prevState) => ({
            ...prevState, hasAccount: !prevState.hasAccount
        }))
    }
    //для автоирзации
    const handleSubmit = async (event) => {

        event.preventDefault()

        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
            setRole(detectedRole)

            setError('')
            setIsAuth(true)
        }
        else {
            setError('Неверный логин или пароль')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userRole')

        setError('')
        setIsAuth(false)
    }



    return (
        <>
            <div className="bg-white">
                {isAuth ? (<div className="text-center">
                    <h2 className="text-xl font-bold mb-4"><span className="text-green-600">Вы успешно авторизованы!</span></h2>
                    <p className="mb-4 text-gray-700">Токены сохранены в вашем браузере.</p>
                    {role === 'admin' ? <button className="bg-green-500 text-white rounded-2xl p-1.5 cursor-pointer">admin panel</button> : null}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white rounded-2xl p-1.5 cursor-pointer hover:bg-red-600"
                    >
                        Выйти из аккаунта
                    </button>
                </div>) : (/* Старая форма авторизации (показывается, если не авторизован) */
                    <form onSubmit={handleSubmit}>
                        <div>
                            {error && <p className="text-red-500 font-bold mb-2">{error}</p>}
                            <input
                                className="bg-gray-500 text-white rounded-2xl mt-2 mb-2 p-1.5"
                                type="text"
                                placeholder="Логин..."
                                name="login"
                                value={inputValue.login}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <input
                                className="bg-gray-500 text-white rounded-2xl mb-2 p-1.5"
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
                            <button type="submit" className="bg-green-500 text-white rounded-2xl p-1.5 mb-1.5 cursor-pointer">
                                Войти
                            </button>
                        </div>
                        <div>
                            <button
                                type="button" // Важно: задать type="button", чтобы клик не отправлял форму случайно
                                className="bg-gray-500 text-white rounded-2xl mb-2 p-1.5 cursor-pointer hover:bg-amber-300"
                                onClick={handleHasAccount}
                            >
                                Есть/Нет аккаунта
                            </button>
                        </div>
                    </form>)}
            </div>
        </>
    )
}

export default Auth