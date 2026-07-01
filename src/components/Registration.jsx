import InputCustom from "./inputCustom"


const Registration = ({ onInput, onInputChange }) => {
    return (
        <>
            <div>
                <InputCustom
                    className="bg-gray-500 text-white rounded-2xl mb-2 p-1.5"
                    type="password"
                    name="repeatPassword"
                    placeholder="Повторите пароль..."
                    value={onInput.repeatPassword}
                    onChange={onInputChange}
                />
            </div>
            <div>
                <InputCustom
                    className="bg-gray-500 text-white rounded-2xl mb-2 p-1.5"
                    type="email"
                    name="email"
                    placeholder="Введите почту..."
                    value={onInput.email}
                    onChange={onInputChange}
                />
            </div>
        </>
    )
}

export default Registration