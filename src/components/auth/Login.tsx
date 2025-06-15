import React, { useState } from 'react';
import { login as loginAPI } from '../../service/Service';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import { useAuth } from '../../components/AuthContext';
import { toast } from 'react-toastify';
import LoginImage from '../../assets/img/loan-bg.png';

const Login: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const from = (location.state as any)?.from?.pathname || '/';

    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberThisDevice: false,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const isFormValid = form.email.trim() !== '' && form.password.length >= 6;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) {
            toast.error('Please enter a valid email and a password with at least 6 characters.');
            return;
        }

        setLoading(true);

        try {
            const data = await loginAPI(form);

            switch (data.responseCode) {
                case "429":
                    toast.error(data.responseMessage || 'Too many attempts. Try again later.');
                    return;
                case "403":
                    toast.error("Your account is locked or pending approval.");
                    return;
                case "401":
                    toast.error("Invalid email or password.");
                    return;
                case "206":
                    toast.info("OTP verification required for untrusted device.", { autoClose: 3000 });
                    sessionStorage.setItem("otp_email", form.email);
                    navigate("/verify-otp", { state: { email: form.email } });
                    return;
                case "500":
                    toast.error("Server error. Please try again later.");
                    return;
                case "200":
                    break;
                default:
                    toast.error(data.responseMessage || 'Login failed.');
                    return;
            }

            if (!data.user) {
                throw new Error("User information missing from response.");
            }

            localStorage.clear();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);

            const fullName = `${data.user.firstName} ${data.user.otherName}`;
            const userObject = {
                ...data.user,
                fullName,
                token: data.token,
                role: data.user.role,
            };

            localStorage.setItem('user', JSON.stringify(userObject));
            setUser(userObject);

            toast.success('Login successful!', { autoClose: 2000 });

            if (userObject.role.toLowerCase() === 'admin') {
                navigate('/admin', { replace: true });
            } else {
                navigate(from, { replace: true });
            }

        } catch (err: any) {
            toast.error(err?.message || 'Login failed due to network/server error.');
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        if (user.role.toLowerCase() === 'admin') return <Navigate to="/admin" replace />;
        return <Navigate to={from} replace />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <img src={LoginImage} alt="Bank Login" className="absolute inset-0 w-full h-full object-cover" />
            <div className="w-full max-w-md p-6 bg-white rounded shadow-xl absolute">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                        autoComplete="email"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                        autoComplete="current-password"
                        minLength={6}
                    />
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="rememberThisDevice"
                            checked={form.rememberThisDevice}
                            onChange={handleChange}
                        />
                        <label htmlFor="rememberThisDevice" className="text-sm text-gray-600">Remember this device</label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className={`w-full p-2 rounded text-white transition ${loading || !isFormValid
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {loading ? <Spinner size="small" /> : 'Login'}
                    </button>
                </form>

                <div className="text-center mt-4 text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
                </div>
                <div className="text-center mt-2 text-sm text-gray-600">
                    Forgot password?{' '}
                    <a href="/forgot-password" className="text-blue-600 hover:underline">Reset Password</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
