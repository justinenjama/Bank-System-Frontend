import React, { useState, useEffect } from 'react';
import { requestResetCode, verifyResetCode, resetPassword } from '../../service/Service';
import { toast } from 'react-toastify';
import passwordResetImage from "../../assets/img/loan-bg.png";

function getPasswordStrength(password: string) {
    const rules = {
        length: password.length >= 6,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const passedRulesCount = Object.values(rules).filter(Boolean).length;

    let strength = 'Weak';
    if (passedRulesCount >= 5) strength = 'Strong';
    else if (passedRulesCount >= 3) strength = 'Medium';

    return { strength, rules };
}

const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [form, setForm] = useState({ password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(300);

    // Timer countdown for resend
    useEffect(() => {
        if (step === 2 && timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRequestCode = async () => {
        if (!email) {
            toast.error('Please enter your email.');
            return;
        }
        setLoading(true);
        try {
            const res = await requestResetCode(email);
            if (res.responseCode === '200' || res.responseCode === 200) {
                toast.success('Reset code sent to your email.');
                setStep(2);
                setTimer(300);
            } else {
                toast.error(res.responseMessage || 'Failed to send reset code.');
            }
        } catch {
            toast.error('Error sending reset code. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setTimer(300);
        await handleRequestCode();
    };

    const handleVerifyCode = async () => {
        if (!code) {
            toast.error('Please enter reset code.');
            return;
        }
        setLoading(true);
        try {
            const res = await verifyResetCode(email, Number(code));
            if (res.responseCode === '200' || res.responseCode === 200) {
                toast.success('Code verified. Please reset your password.');
                setStep(3);
            } else {
                toast.error(res.responseMessage || 'Invalid or expired code.');
            }
        } catch {
            toast.error('Error verifying code. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (form.password !== form.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        const { strength } = getPasswordStrength(form.password);
        if (strength === 'Weak') {
            toast.warn('Password is too weak. Please follow the requirements.');
            return;
        }

        setLoading(true);
        try {
            const res = await resetPassword({
                email,
                code: Number(code),
                newPassword: form.password,
                confirmNewPassword: form.confirmPassword,
            });
            if (res.responseCode === '200' || res.responseCode === 200) {
                toast.success('Password reset successful! You can now log in.');
                setStep(4);
            } else {
                toast.error(res.responseMessage || 'Failed to reset password.');
            }
        } catch {
            toast.error('Error resetting password. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    const formatTimer = () => {
        const mins = Math.floor(timer / 60).toString().padStart(2, '0');
        const secs = (timer % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <img src={passwordResetImage} alt="Reset Background" className="absolute inset-0 w-full h-full object-cover" />
            <div className='w-full max-w-md p-6 bg-white rounded shadow-xl absolute'>
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
                {step === 1 && (
                    <div>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 rounded mb-4 focus:outline-primary"
                            autoComplete="email"
                            required
                        />
                        <button
                            onClick={handleRequestCode}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            {loading ? 'Sending...' : 'Send Reset Code'}
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter reset code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full border p-2 rounded mb-4 focus:outline-primary"
                            autoComplete="one-time-code"
                        />
                        <button
                            onClick={handleVerifyCode}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-2"
                        >
                            {loading ? 'Verifying...' : 'Verify Code'}
                        </button>
                        <p className="text-sm text-gray-600 text-center">
                            Code expires in <span className="font-semibold">{formatTimer()}</span>
                        </p>
                        <button
                            onClick={handleResendCode}
                            disabled={timer > 0}
                            className="w-full mt-2 text-blue-500 underline disabled:opacity-40"
                        >
                            Resend Code
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <>
                        <div className="mb-4">
                            <input
                                name="password"
                                type="password"
                                placeholder="New Password"
                                value={form.password}
                                onChange={handleChange}
                                className={`w-full border p-2 rounded focus:outline-primary ${form.password && form.password.length < 6 ? 'border-red-500' : ''
                                    }`}
                            />
                            {form.password && (() => {
                                const { strength, rules } = getPasswordStrength(form.password);
                                return (
                                    <>
                                        <p
                                            className={`text-sm mt-1 ${strength === 'Strong'
                                                ? 'text-green-600'
                                                : strength === 'Medium'
                                                    ? 'text-yellow-600'
                                                    : 'text-red-500'
                                                }`}
                                        >
                                            Password Strength: {strength}
                                        </p>
                                        <ul className="text-xs mt-1 space-y-1">
                                            <li className={rules.length ? 'text-green-600' : 'text-red-500'}>✔️ Min 6 characters</li>
                                            <li className={rules.lowercase ? 'text-green-600' : 'text-red-500'}>✔️ Lowercase letter</li>
                                            <li className={rules.uppercase ? 'text-green-600' : 'text-red-500'}>✔️ Uppercase letter</li>
                                            <li className={rules.number ? 'text-green-600' : 'text-red-500'}>✔️ Number</li>
                                            <li className={rules.specialChar ? 'text-green-600' : 'text-red-500'}>✔️ Special character</li>
                                        </ul>
                                    </>
                                );
                            })()}
                        </div>

                        <div className="mb-4">
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className={`w-full border p-2 rounded focus:outline-primary ${form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-500' : ''
                                    }`}
                            />
                            {form.confirmPassword && form.password !== form.confirmPassword && (
                                <p className="text-red-500 text-sm">Passwords do not match.</p>
                            )}
                        </div>

                        <button
                            onClick={handleResetPassword}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </>
                )}
                {step === 4 && (
                    <div className="text-center">
                        <p className="text-green-600 mb-4">Your password has been reset successfully!</p>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
