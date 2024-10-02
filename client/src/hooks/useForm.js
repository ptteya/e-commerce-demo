import { useState } from "react";

export const useForm = (initialValues, submitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState('');

    const changeHandler = (e, field, subField) => {
        const { name, value } = e.target;

        if (subField) {
            setValues({
                ...values,
                [field]: {
                    ...values[field],
                    [subField]: value
                }
            });
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    const onSubmit = async (e, resetAfterSubmit = true) => {
        e.preventDefault();

        try {
            await submitHandler(values);

            if (resetAfterSubmit) {
                resetForm();
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const changeValues = (newValues) => {
        setValues(newValues);
    };

    return {
        values,
        changeHandler,
        onSubmit,
        resetForm,
        error,
        changeValues,
        setValues,
    };
};