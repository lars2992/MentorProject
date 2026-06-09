import { useState } from "react"
import Registration from "./Registration"



const Auth = () => {
    //useState
    const [authToggle, setAuthToggle] = useState({ hasAccount: false })

    const [inputValue, setInputValue] = useState(
        {
            login: '',
            password: '',
            repeatPassword: '',
            email: ''
        }
    )

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



    return (
        <>
            <div className="bg-white">
                <div>
                    <input
                        className="bg-gray-500 text-white rounded-2xl mt-2 mb-2 p-1.5"
                        type="text"
                        placeholder="Логин..."
                        name="login" //Важно: имя совпадает с ключом в useState
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
                    <button
                        className="bg-gray-500 text-white rounded-2xl mb-2 p-1.5 cursor-pointer hover:bg-amber-300"
                        onClick={handleHasAccount}
                    >
                        Есть/Нет аккаунта
                    </button>
                </div>
            </div>
        </>
    )
}

export default Auth