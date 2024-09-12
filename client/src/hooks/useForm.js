import { useState } from "react"

export const useForm = (initialValues, submitHandler) => {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState('');

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const resetForm = () => {
        setValues(initialValues);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await submitHandler(values);
            resetForm();
        } catch (error) {
            setError(error.message);
        }
    }

    return {
        values,
        changeHandler,
        onSubmit,
        resetForm,
        error
    }
};