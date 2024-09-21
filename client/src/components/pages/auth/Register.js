import 'components/shared/styles/login-register.css';
import { Link } from 'react-router-dom';
import { useForm } from 'hooks/useForm';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import InputField from 'components/shared/forms/InputField';

const Register = () => {
    const { register } = useContext(AuthContext);
    const { values, changeHandler, onSubmit, error } = useForm({
        email: '',
        username: '',
        password: '',
        repeatPass: ''
    }, register);

    return (
        <div className="login-register-container">
            <div className="login-register-card">
                {error && <div className="error"><i className="far fa-times-circle x-mark"></i>{error}</div>}
                <h1>Register</h1>
                <form onSubmit={onSubmit}>
                    <InputField name="email" label="Email" value={values.email} onChange={changeHandler} />
                    <InputField name="username" label="Username" value={values.username} onChange={changeHandler} />
                    <InputField name="password" label="Password" value={values.password} onChange={changeHandler} type="password" />
                    <InputField name="repeatPass" label="Repeat Password" value={values.repeatPass} onChange={changeHandler} type="password" />
                    <button type="submit" className="submit-btn">Register</button>
                </form>

                <p className="login-reg-message">Already have an account? <Link to="/users/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;