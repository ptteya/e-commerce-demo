const InputField = ({
    name,
    label,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    isRequired = false,
    showRequired = true,
    pattern = null,
    title = null,
}) => {
    const placeholderText = placeholder ? placeholder : `Enter ${label.toLowerCase()}...`;

    return (
        <div className="input-container">
            <label htmlFor={name}>
                {showRequired && <span className="required">*</span>}
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholderText}
                value={value}
                onChange={onChange}
                pattern={pattern}
                title={title}
                required={isRequired}
            />
        </div>
    );
};

export default InputField;