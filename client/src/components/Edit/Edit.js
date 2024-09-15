import 'components/SharedStyles/create-edit.css';
import { useForm } from 'hooks/useForm';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as furnitureService from 'services/furnitureService';

const Edit = () => {
    const navigate = useNavigate();
    const { furnitureId } = useParams();
    const { values, changeHandler, onSubmit, error, changeValues } = useForm({
        name: '',
        price: '',
        description: '',
        category: '',
        material: '',
        color: '',
        size: { width: '', height: '', length: '' },
        images: { mainImage: '', extraImage1: '', extraImage2: '', extraImage3: '', }
    }, onEditSubmit);

    useEffect(() => {
        furnitureService.getDetails(furnitureId)
            .then(result => changeValues(result.furniture))
            .catch((error) => console.error('Error fetching furniture details:', error.message));
    }, [furnitureId]);

    async function onEditSubmit(data) {
        await furnitureService.edit(furnitureId, data);
        navigate(`/furniture/${furnitureId}`);
    }

    const { images, size } = values;
    const mainImage = images.mainImage || '';
    const extraImages = [
        images.extraImage1 || '',
        images.extraImage2 || '',
        images.extraImage3 || ''
    ];

    return (
        <div className="create-container">
            <div className="create-card">
                {error && <div className="error"><i className="far fa-times-circle x-mark"></i>{error}</div>}
                <h1>Edit</h1>
                <form onSubmit={onSubmit}>
                    <div className="left">
                        <div className="input-container">
                            <label htmlFor="name"><span className="required">*</span> Name</label>
                            <input type="text" name="name" placeholder="Enter name...." value={values.name} onChange={changeHandler} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="price"><span className="required">*</span> Price</label>
                            <input type="number" name="price" placeholder="Enter price...." value={values.price} onChange={changeHandler} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="description"><span className="required">*</span> Description</label>
                            <input type="text" name="description" placeholder="Enter description...."
                                value={values.description} onChange={changeHandler} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="category"><span className="required">*</span> Category</label>
                            <input type="text" name="category" placeholder="Enter category...." value={values.category} onChange={changeHandler} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="material"><span className="required">*</span>Material</label>
                            <input type="text" name="material" placeholder="Enter material...." value={values.material} onChange={changeHandler} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="color"><span className="required">*</span>Color</label>
                            <input type="text" name="color" placeholder="Enter color...." value={values.color} onChange={changeHandler} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="size"><span className="required">*</span> Width</label>
                            <input type="number" name="size" placeholder="Enter width...." value={size.width} onChange={e => changeHandler(e, 'size', 'width')} />
                        </div>
                    </div>

                    <div className="right">
                        <div className="input-container">
                            <label htmlFor="size"><span className="required">*</span>Height</label>
                            <input type="number" name="size" placeholder="Enter height...." value={size.height} onChange={e => changeHandler(e, 'size', 'height')} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="size"><span className="required">*</span>Length</label>
                            <input type="number" name="size" placeholder="Enter length...." value={size.length} onChange={e => changeHandler(e, 'size', 'length')} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="mainImage"><span className="required">*</span>Main Image</label>
                            <input type="text" name="mainImage" placeholder="Enter main image url...."
                                value={mainImage} onChange={e => changeHandler(e, 'images', 'mainImage')} />
                        </div>
                        {extraImages.map((image, index) => (
                            <div key={index} className="input-container">
                                <label htmlFor="moreImages">Image</label>
                                <input type="text" name="moreImages" placeholder="Enter image url...." value={image} onChange={e => changeHandler(e, 'images', `extraImage${index + 1}`)} />
                            </div>
                        ))}
                        <button type="submit" className="submit-btn">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;