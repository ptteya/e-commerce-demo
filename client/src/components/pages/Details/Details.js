import './Details.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import { useCollectionManager } from 'hooks/useCollectionManager';
import * as furnitureService from 'services/furnitureService';
import DeleteModal from 'components/modals/DeleteModal/DeleteModal';
import { AuthContext } from 'contexts/AuthContext';

const Details = () => {
    const { furnitureId } = useParams();
    const [furniture, setFurniture] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { added, toggleCollectionItem } = useCollectionManager(furnitureId, 'cart');
    const { user } = useContext(AuthContext);
    const mainImageRef = useRef(null);
    const imageRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        furnitureService.getDetails(furnitureId)
            .then(result => setFurniture(result.data))
            .catch((error) => console.error('Error fetching furniture details:', error.message));
    }, [furnitureId]);

    const handleImageClick = (event) => {
        const clickedImageSrc = event.target.getAttribute('src');
        if (mainImageRef.current) {
            mainImageRef.current.setAttribute('src', clickedImageSrc);
        }

        imageRefs.current.forEach(img => img.classList.remove('activeImg'));
        event.target.classList.add('activeImg');
    };

    const handleDeleteClick = async () => {
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await furnitureService.deleteFurniture(furnitureId);
            setShowDeleteModal(false);
            navigate(`/furniture?category=${furniture.category}`);
        } catch (error) {
            console.error('Error deleting furniture:', error.message);
        }
    };

    const images = furniture.images ? Object.values(furniture.images).filter(image => image !== '') : [];
    const isAdmin = user?.role === 'admin';

    return (
        <div className="details-container">
            <div className="content">
                <div className="images-container">
                    <div className="more-images">
                        {images.map((src, index) => (
                            <img
                                key={index}
                                ref={el => imageRefs.current[index] = el}
                                className={`image ${index === 0 ? 'activeImg' : ''}`}
                                src={src}
                                alt={`product-image-${index}`}
                                onClick={handleImageClick} />
                        ))}
                    </div>
                    <div className="main-image">
                        <img
                            src={images[0]}
                            alt="main-image"
                            ref={mainImageRef} />
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
                        <div className="left">
                            <p><i className="fas fa-truck"></i> Free Delivery</p>
                            <p><i className="fas fa-hand-holding-usd"></i> Payment on Delivery</p>
                        </div>
                        <div className="right">
                            <p><i className="fas fa-undo-alt"></i> Free Return</p>
                            <p><i className="fas fa-calendar-check"></i> 365 Day Return Guarantee</p>
                        </div>
                    </div>

                    <p className="product-description">{furniture.description}</p>

                    <div className="product-buttons">
                        {added ? (
                            <button className="btn add-to-cart" disabled>Added to Cart</button>
                        ) : (
                            <button className="btn add-to-cart" onClick={() => toggleCollectionItem()}>Add to Cart</button>
                        )}
                        {isAdmin && (
                            <>
                                <Link to={`/furniture/edit/${furnitureId}`} className="btn edit-del-btn">
                                    <i className="fas fa-pencil-alt edit"></i>
                                </Link>
                                <button className="btn edit-del-btn" onClick={handleDeleteClick}>
                                    <i className="fas fa-trash delete"></i>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <DeleteModal
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
};

export default Details;
