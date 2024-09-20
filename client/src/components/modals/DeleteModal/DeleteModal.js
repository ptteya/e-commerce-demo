import './DeleteModal.css';

const DeleteModal = ({ show, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <i className="far fa-times-circle x-mark"></i>
                <h2>Delete Confirmation</h2>
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                <div className="modal-buttons">
                    <button className="btn cancel-btn" onClick={onCancel}>No, keep it.</button>
                    <button className="btn delete-btn" onClick={onConfirm}>Yes, delete!</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;