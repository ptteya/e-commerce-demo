import { useForm } from 'hooks/useForm';
import { usePopup } from 'hooks/usePopup';
import PopupMessage from 'components/layout/PopupMessage/PopupMessage';
import './SubscribeForm.css';

const SubscribeForm = () => {
    const { showPopup, message, triggerPopup } = usePopup();
    const { values, changeHandler, onSubmit } = useForm(
        { email: '' },
        () => {
            triggerPopup('You have successfully subscribed to our newsletter!');
        }
    );

    return (
        <div className="subscribe-container">
            {showPopup && (<PopupMessage message={message} />)}

            <div className="subscribe-info">
                <p className="subscribe-heading">Join Our <br></br>Newsletter</p>
                <p className="description">Subscribe Today and save 10% on your first purchase.</p>
            </div>
            <form className="subscribe-form" onSubmit={onSubmit}>
                <input type="email" className="subscribe-input" name="email" placeholder="Enter email address...." value={values.email} onChange={changeHandler} required />
                <input type="submit" value="Subscribe" className="subscribe-btn" />
            </form>
        </div>
    );
};

export default SubscribeForm;