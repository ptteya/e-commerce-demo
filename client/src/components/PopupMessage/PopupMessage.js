import './PopupMessage.css';

const PopupMessage = ({ message }) => {
    return (
        <div className="popup-message">
            <p>{message}</p>
        </div>
    );
};

export default PopupMessage;