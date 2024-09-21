import 'components/shared/styles/create-edit.css';
import { useForm } from 'hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { initialFormValues } from 'constants/formInitialValues';
import FurnitureForm from 'components/shared/forms/FurnitureForm';
import * as furnitureService from 'services/furnitureService';

const Create = () => {
    const { values, changeHandler, onSubmit, error } = useForm(initialFormValues, formSubmitHandler);
    const navigate = useNavigate();

    async function formSubmitHandler(data) {
        await furnitureService.create(data);
        navigate(`/furniture?category=${data.category}`);
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