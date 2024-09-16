import 'components/SharedStyles/create-edit.css';
import { useForm } from 'hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { initialFormValues } from 'constants/formInitialValues';
import FurnitureForm from 'components/FurnitureForm';
import * as furnitureService from 'services/furnitureService';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';

const Create = () => {
    const { values, changeHandler, onSubmit, error } = useForm(initialFormValues, formSubmitHandler);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    async function formSubmitHandler(data) {
        await furnitureService.create(data, token);
        navigate(`/furniture/catalog?category=${data.category}`);
    }

    return (
        <FurnitureForm
            formTitle={'Create Furniture'}
            values={values}
            onSubmit={onSubmit}
            changeHandler={changeHandler}
            error={error}
        />
    );
};

export default Create;