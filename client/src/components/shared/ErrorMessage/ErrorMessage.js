import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="error">
            <i className="far fa-times-circle x-mark"></i>
            {message}
        </div>
    );
};

export default ErrorMessage;
