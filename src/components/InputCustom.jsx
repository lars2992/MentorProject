const InputCustom = (props) => {
    return (
        <>
            <input
                className="bg-gray-500 text-white rounded-2xl mb-2 p-1.5 w-full"
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </>
    )
}

export default InputCustom