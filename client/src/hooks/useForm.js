import { useState } from "react"

export const useForm = (initialValues, submitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState('');

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await submitHandler(values);
        } catch (error) {
            setError(error.message);
        }
    }

    return {
        values,
        changeHandler,
        onSubmit,
        error
    }
};