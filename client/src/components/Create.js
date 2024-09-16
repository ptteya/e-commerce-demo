import 'components/SharedStyles/create-edit.css';
import { useForm } from 'hooks/useForm';
import { useNavigate } from 'react-router-dom';
import * as furnitureService from 'services/furnitureService';
import InputField from './InputField';

const Create = () => {
    const navigate = useNavigate();
    const { values, changeHandler, onSubmit, error } = useForm({
        name: '',
        price: '',
        description: '',
        category: '',
        material: '',
        color: '',
        size: { width: '', height: '', length: '' },
        images: { mainImage: '', extraImage1: '', extraImage2: '', extraImage3: '', }
    }, onCreateSubmit);

    async function onCreateSubmit(data) {
        await furnitureService.create(data);
        navigate(`/furniture/catalog?category=${data.category}`);
    }

    const { images, size } = values;
    const extraImages = [
        images.extraImage1 || '',
        images.extraImage2 || '',
        images.extraImage3 || ''
    ];

    return (
        <div className="create-container">
            <div className="create-card">
                {error && <div className="error"><i className="far fa-times-circle x-mark"></i>{error}</div>}
                <h1>Create</h1>
                <form onSubmit={onSubmit}>
                    <div className="left">
                        <InputField name="name" label="Name" value={values.name} onChange={changeHandler} />
                        <InputField name="price" label="Price" value={values.price} onChange={changeHandler} type='number' />
                        <InputField name="description" label="Description" value={values.description} onChange={changeHandler} />
                        <InputField name="category" label="Category" value={values.category} onChange={changeHandler} />
                        <InputField name="material" label="Material" value={values.material} onChange={changeHandler} />
                        <InputField name="color" label="Color" value={values.color} onChange={changeHandler} />
                        <InputField name="width" label="Width" value={size.width} onChange={e => changeHandler(e, 'size', 'width')} type='number' />
                    </div>

                    <div className="right">
                        <InputField name="height" label="Height" value={size.height} onChange={e => changeHandler(e, 'size', 'height')} type='number' />
                        <InputField name="length" label="Length" value={size.length} onChange={e => changeHandler(e, 'size', 'length')} type='number' />
                        <InputField name="mainImage" label="Main Image" value={images.mainImage} onChange={e => changeHandler(e, 'images', 'mainImage')} placeholder="Enter main image url...." />

                        {extraImages.map((image, index) => (
                            <InputField
                                key={index}
                                label={`Extra Image ${index + 1}`}
                                name={`extraImage${index}`}
                                value={image}
                                onChange={e => changeHandler(e, 'images', `extraImage${index + 1}`)}
                                placeholder="Enter image url...."
                                isRequired={false} />
                        ))}
                        <button type="submit" className="submit-btn">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;