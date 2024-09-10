import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './Details.css';
import * as furnitureService from 'services/furnitureService';
import useToggle from 'hooks/useToggle';

const Details = () => {
    const { furnitureId } = useParams();
    const [furniture, setFurniture] = useState({});
    const { added, handleToggle } = useToggle(furnitureId, 'cart');
    const mainImageRef = useRef(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        furnitureService.getDetails(furnitureId)
            .then(result => setFurniture(result.furniture))
            .catch((error) => console.error('Error fetching furniture details:', error.message));
    }, [furnitureId]);

    const handleImageClick = (event) => {
        const clickedImageSrc = event.target.getAttribute('src');
        if (mainImageRef.current) {
            mainImageRef.current.setAttribute('src', clickedImageSrc);
        }

        imageRefs.current.forEach(img => img.classList.remove('activeImg'));
        event.target.classList.add('activeImg');
    }

    const images = furniture.images || {};
    const mainImage = images.mainImage || '';
    const moreImages = images.moreImages || [];

    return (
        <div className="details-container">
            <div className="content">
                <div className="images-container">
                    <div className="main-image">
                        <img
                            src={mainImage}
                            alt="main-image"
                            ref={mainImageRef} />
                    </div>
                    <div className="more-images">
                        {[mainImage, ...moreImages].map((src, index) => (
                            <img
                                key={index}
                                ref={el => imageRefs.current[index] = el}
                                className={`image ${index === 0 ? 'activeImg' : ''}`}
                                src={src}
                                alt={`product-image-${index}`}
                                onClick={handleImageClick} />
                        ))}
                    </div>
                </div>
                <div className="furniture-info">
                    <h1 className="product-name">{furniture.name}</h1>
                    <p className="product-price">${furniture.price}</p>
                    <p className="product-material"><strong>Material:</strong> {furniture.material}</p>
                    <p className="product-color"><strong>Color:</strong> {furniture.color}</p>
                    <p className="product-dimensions">
                        <strong>Dimensions: </strong>
                        W: {furniture.size?.width} cm, H: {furniture.size?.height} cm, L: {furniture.size?.length} cm
                    </p>
                    <div className="service-icons">
                        <p><i className="fas fa-truck"></i> Free Delivery</p>
                        <p><i className="fas fa-undo-alt"></i> Free Return</p>
                        <p><i className="fas fa-hand-holding-usd"></i> Payment on Delivery</p>
                        <p><i className="fas fa-calendar-check"></i> 365 Day Return Guarantee</p>
                    </div>
                    <p className="product-description">{furniture.description}</p>
                    <div className="product-buttons">
                        {added ? (
                            <button className="btn add-to-cart" disabled>Added to Cart</button>
                        ) : (
                            <button className="btn add-to-cart" onClick={handleToggle}>Add to Cart</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
