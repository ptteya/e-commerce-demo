import 'components/shared/styles/create-edit.css';
import { useForm } from 'hooks/useForm';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initialFormValues } from 'constants/formInitialValues';
import * as furnitureService from 'services/furnitureService';
import FurnitureForm from 'components/shared/forms/FurnitureForm';
const Edit = () => {
    const { furnitureId } = useParams();
    const { values, changeHandler, onSubmit, error, changeValues } = useForm(initialFormValues, formSubmitHandler);
    const navigate = useNavigate();

    useEffect(() => {
        furnitureService.getDetails(furnitureId)
            .then(result => changeValues(result.data))
            .catch((error) => console.error('Error fetching furniture details:', error.message));
    }, [furnitureId]);

    async function formSubmitHandler(data) {
        await furnitureService.edit(furnitureId, data);
        navigate(`/furniture/${furnitureId}`);
    }

    return (
        <FurnitureForm
            formTitle={'Edit Furniture'}
            values={values}
            onSubmit={onSubmit}
            changeHandler={changeHandler}
            error={error}
        />
    );
};

export default Edit;