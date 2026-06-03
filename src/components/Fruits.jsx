import { useState } from "react"

const Fruits = () => {
    const [fruits, setFruits] = useState(['Apple', 'Banana', 'Orange'])
    const [value, setValue] = useState('')
    const newFruits = () => {
        setFruits([...fruits, value])
        setValue('')
    }
    console.log('value', value);

    return (
        <>
            {fruits.map((fruit, id) => {
                return <li key={id}>{fruit}</li>
            })}
            <input
                type="text"
                placeholder="Напишите фрукт.."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={newFruits} className="cursor-pointer">Добавить</button>
        </>
    )
}

export default Fruits

//useState, useEffect(3 состояния), props(2 вида), разбитие на компоненты, стилизация, callback func через props
//