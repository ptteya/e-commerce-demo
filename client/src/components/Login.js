import { useContext } from 'react';
import { Link } from 'react-router-dom';
import 'components/SharedStyles/login-register.css';
import { AuthContext } from 'contexts/AuthContext';
import { useForm } from 'hooks/useForm';

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
                    <div className="input-container">
                        <label htmlFor="email"><span className="required">*</span> Email</label>
                        <input type="text" name="email" placeholder="Enter your email...." value={values.email} onChange={changeHandler} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password"><span className="required">*</span> Password</label>
                        <input type="password" name="password" placeholder="Enter your password...." value={values.password} onChange={changeHandler} />
                    </div>
                    <button type="submit" className="submit-btn">LogIn</button>

                </form>

                <p className="login-reg-message">Don't have an account? <Link to="/auth/register">Register</Link></p>
            </div>
        </div>
    );
}

export default Login;