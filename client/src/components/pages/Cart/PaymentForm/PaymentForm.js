import { useForm } from "hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CollectionContext } from "contexts/CollectionContext";
import { paymentFormInitialValues, paymentMethods } from "constants/paymentConstants";
import InputField from "components/shared/forms/InputField";
import './PaymentForm.css';

const CART_COLLECTION_NAME = 'cart';

const PaymentForm = ({ totalPrice }) => {
    const navigate = useNavigate();
    const { emptyCollection } = useContext(CollectionContext);
    const { values, changeHandler, onSubmit } = useForm(paymentFormInitialValues, handleSubmit);

    function handleSubmit() {
        emptyCollection(CART_COLLECTION_NAME);
        navigate('/cart/confirmation');
    }

    return (
        <form className="payment-form" onSubmit={onSubmit}>
            <p className='title'>Payment Info</p>
            <PaymentMethod values={values} changeHandler={changeHandler} />

            {values.method === 'Credit Card' && <CardInputs values={values} changeHandler={changeHandler} />}

            <ShippingDetails values={values} changeHandler={changeHandler} />

            <div className="final-price">
                <p>Total (tax incl.)</p>
                <p className="price">${Number(totalPrice)}</p>
            </div>
            <button type="submit" className='pay-btn'>Submit Payment</button>
        </form>
    );
};

function PaymentMethod({ values, changeHandler }) {
    return (
        <div className="payment-method">
            <p>Payment Method</p>
            <div className="options">
                {paymentMethods.map(method => (
                    <div className="option" key={method.id}>
                        <input
                            type="radio"
                            id={method.id}
                            name="method"
                            value={method.value}
                            checked={values.method === method.value}
                            onChange={changeHandler}
                        />
                        <label htmlFor={method.id}>{method.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CardInputs({ values, changeHandler }) {
    return (
        <>
            <InputField
                name="cardName"
                label="Name on Card"
                value={values.cardName}
                onChange={changeHandler}
                placeholder='David Hamilton'
                isRequired
            />
            <InputField
                name="cardNumber"
                label="Card Number"
                value={values.cardNumber}
                onChange={changeHandler}
                placeholder="●●●● ●●●● ●●●● ●●●●"
                pattern="^\d{4} \d{4} \d{4} \d{4}$"
                title="Enter a valid 16-digit card number."
                isRequired
            />
            <div className="input-group">
                <InputField
                    name="expiryDate"
                    label="Expiry Date"
                    value={values.expiryDate}
                    onChange={changeHandler}
                    placeholder="MM/YY"
                    pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                    title="Enter a valid Expiry Date."
                    isRequired
                />
                <InputField
                    name="cvv"
                    label="CVV"
                    value={values.cvv}
                    onChange={changeHandler}
                    placeholder='123'
                    pattern="^\d{3}$"
                    title="Enter a valid cvv."
                    isRequired
                />
            </div>
        </>
    );
}

function ShippingDetails({ values, changeHandler }) {
    return (
        <>
            <h4>Shipping details</h4>
            <div className="input-group">
                <InputField
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={changeHandler}
                    placeholder='David Hamilton'
                    isRequired
                />
                <InputField
                    name="phone"
                    label="Phone Number"
                    value={values.phone}
                    onChange={changeHandler}
                    placeholder='0893456343'
                    pattern="^\d{10}$"
                    title="Enter a valid phone number."
                    isRequired
                />
            </div>
            <div className="input-group">
                <InputField
                    name="address"
                    label="Address"
                    value={values.address}
                    onChange={changeHandler}
                    placeholder="12 Main Street"
                    isRequired
                />
                <InputField
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={changeHandler}
                    type="email"
                    placeholder='david@gmail.com'
                    isRequired
                />
            </div>
        </>
    );
}

export default PaymentForm;