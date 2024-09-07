import { Link } from 'react-router-dom';
import '../SharedStyles/login-register.css';
import { useForm } from '../../hooks/useForm';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Register = () => {
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
                    <div className="input-container">
                        <label htmlFor="email"><span className="required">*</span> Email</label>
                        <input type="text" name="email" placeholder="Enter your email...." value={values.email} onChange={changeHandler} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="username"><span className="required">*</span> Username</label>
                        <input type="text" name="username" placeholder="Enter your username...." value={values.username} onChange={changeHandler} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password"><span className="required">*</span> Password</label>
                        <input type="password" name="password" placeholder="Enter your password...." value={values.password} onChange={changeHandler} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="repeatPass"><span className="required">*</span> Repeat Password</label>
                        <input type="password" name="repeatPass" placeholder="Repeat your password...." value={values.repeatPass} onChange={changeHandler} />
                    </div>
                    <button type="submit" className="submit-btn">Register</button>

                </form>

                <p className="login-reg-message">Already have an account? <Link to="/auth/login">Login</Link></p>
            </div>
        </div>
    );
}