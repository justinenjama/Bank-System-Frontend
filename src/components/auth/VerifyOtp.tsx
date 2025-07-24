import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { useAuth } from '../../components/AuthContext';
import { verifyOtp, resendOtp } from '../../service/Service';

const VerifyOtp: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();

    const email = (location.state as any)?.email || sessionStorage.getItem("otp_email");
    const deviceId = localStorage.getItem("device_id");
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(300);
    const [resendCount, setResendCount] = useState(() => {
        const count = sessionStorage.getItem("otp_resend_count");
        return count ? parseInt(count, 10) : 0;
    });

    const [ip, setIp] = useState('Unknown');
    const [userAgent, setUserAgent] = useState('Unknown');

    useEffect(() => {
        if (!email || !deviceId) {
            toast.error("Missing OTP context.");
            navigate("/login");
            return;
        }

        fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => setIp(data.ip))
            .catch(() => setIp("Unknown"));

        setUserAgent(navigator.userAgent);

        const countdown = setInterval(() => {
            if (resendCount < 5) {
                setTimer(prev => (prev > 0 ? prev - 1 : 0));
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [email, deviceId, navigate, resendCount]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.trim().length < 4) {
            toast.error("Enter a valid OTP (min 4 digits).");
            return;
        }

        setLoading(true);
        try {
            const res = await verifyOtp({
                email,
                otp,
                ipAddress: ip,
                userAgent,
                deviceId: deviceId || "Unknown",
            });

            if (res.responseCode !== "200" || !res.user) {
                toast.error(res.responseMessage || "OTP verification failed.");
                return;
            }

            const user = res.user;
            const fullName = `${user.firstName} ${user.otherName}`;
            const userObject = {
                ...user,
                fullName,
                role: user.role,
            };

            setUser(userObject);
            sessionStorage.removeItem("otp_email");
            sessionStorage.removeItem("otp_resend_count");

            toast.success("OTP verified. Welcome!");
            navigate(user.role.toLowerCase() === "admin" ? "/admin" : "/", { replace: true });

        } catch (err: any) {
            toast.error(err?.message || "OTP verification failed.");
        } finally {
            setLoading(false);
        }
    };


    const handleResend = async () => {
        if (resendCount >= 5) {
            toast.error("Resend limit reached.");
            return;
        }

        setResending(true);
        try {
            const res = await resendOtp(email);
            if (res.responseCode !== "200") {
                toast.error(res.responseMessage || "Failed to resend OTP.");
                return;
            }

            toast.success("OTP resent.");
            const newCount = resendCount + 1;
            setResendCount(newCount);
            sessionStorage.setItem("otp_resend_count", newCount.toString());
            setTimer(300);
        } catch {
            toast.error("Failed to resend OTP.");
        } finally {
            setResending(false);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
                <p className="text-sm text-gray-600 mb-4 text-center">
                    Enter the OTP sent to <strong>{email}</strong>
                </p>
                <p className="text-xs text-gray-500 text-center mb-2">
                    IP: <strong>{ip}</strong><br />
                    Device: <strong>{userAgent}</strong>
                </p>
                <form onSubmit={handleVerify} className="space-y-4">
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        placeholder="Enter OTP"
                        className="w-full border border-gray-300 p-2 rounded text-center tracking-widest text-lg"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading || otp.trim().length < 4}
                        className={`w-full p-2 rounded text-white transition ${loading || otp.trim().length < 4
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {loading ? <Spinner size="small" /> : 'Verify'}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-500">
                    {resendCount >= 5 ? (
                        <p className="text-red-500">You’ve reached the maximum resend limit.</p>
                    ) : timer > 0 ? (
                        <p>Resend code in <strong>{formatTime(timer)}</strong></p>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="text-blue-600 hover:underline"
                        >
                            {resending ? 'Resending...' : `Resend OTP (${5 - resendCount} left)`}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
