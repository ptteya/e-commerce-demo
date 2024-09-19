import 'components/SharedStyles/create-edit.css';
import InputField from 'components/InputField';
import { categoryOptions } from 'constants/categoryOptions';

const FurnitureForm = ({ formTitle, values, onSubmit, changeHandler, error }) => {
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
                <h1>{formTitle}</h1>
                <form onSubmit={onSubmit}>
                    <div className="left">
                        <InputField name="name" label="Name" value={values.name} onChange={changeHandler} />
                        <InputField name="price" label="Price" value={values.price} onChange={changeHandler} type='number' />
                        <div className="input-container">
                            <label htmlFor="description">
                                <span className="required">*</span>
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Highlight key features and specs...."
                                value={values.description}
                                onChange={changeHandler}
                                cols="30"
                                rows="5"
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="category">
                                <span className="required">*</span>
                                Category
                            </label>
                            <select
                                name="category"
                                value={values.category}
                                onChange={changeHandler}
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categoryOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <InputField name="material" label="Material" value={values.material} onChange={changeHandler} placeholder='eg. wood, leather' />
                        <InputField name="color" label="Color" value={values.color} onChange={changeHandler} />
                        <InputField name="width" label="Width" value={size.width} onChange={e => changeHandler(e, 'size', 'width')} type='number' />
                    </div>

                    <div className="right">
                        <InputField name="height" label="Height" value={size.height} onChange={e => changeHandler(e, 'size', 'height')} type='number' />
                        <InputField name="length" label="Length" value={size.length} onChange={e => changeHandler(e, 'size', 'length')} type='number' />
                        <InputField name="mainImage" label="Main Image" value={images.mainImage} onChange={e => changeHandler(e, 'images', 'mainImage')} placeholder="Paste the url of the main image....." />

                        {extraImages.map((image, index) => (
                            <InputField
                                key={index}
                                label={`Extra Image ${index + 1}`}
                                name={`extraImage${index}`}
                                value={image}
                                onChange={e => changeHandler(e, 'images', `extraImage${index + 1}`)}
                                placeholder="Url for additional image....."
                                isRequired={false} />
                        ))}
                        <button type="submit" className="submit-btn">{formTitle}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FurnitureForm;