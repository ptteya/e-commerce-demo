import 'components/shared/styles/login-register.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import { useForm } from 'hooks/useForm';
import InputField from 'components/shared/forms/InputField';

const Login = () => {
    const { login } = useContext(AuthContext);
    const { values, changeHandler, onSubmit, error } = useForm({
        email: '',
        password: '',
    }, login);

    return (
        <div className="login-register-container">
            <div className="login-register-card">
                {error && <div className="error"><i className="far fa-times-circle x-mark"></i>{error}</div>}
                <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <InputField name="email" label="Email" value={values.email} onChange={changeHandler} />
                    <InputField name="password" label="Password" value={values.password} onChange={changeHandler} type='password' />
                    <button type="submit" className="submit-btn">LogIn</button>
                </form>
                <p className="login-reg-message">Don't have an account? <Link to="/auth/register">Register</Link></p>
            </div>
        </div>
    );
}

export default Login;