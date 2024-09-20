const InputField = ({
    name,
    label,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    isRequired = true,
}) => {
    const placeholderText = placeholder ? placeholder : `Enter ${label.toLowerCase()}...`;

    return (
        <div className="input-container">
            <label htmlFor={name}>
                {isRequired && <span className="required">*</span>}
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholderText}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputField;