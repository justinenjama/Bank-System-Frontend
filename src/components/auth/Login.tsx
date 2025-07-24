import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../service/Service';
import { useAuth } from '../../components/AuthContext';
import Spinner from '../Spinner';
import { v4 as uuidv4 } from 'uuid';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberDevice, setRememberDevice] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Get or generate device ID
        let deviceId = localStorage.getItem("device_id");
        if (!deviceId) {
            deviceId = uuidv4();
            localStorage.setItem("device_id", deviceId);
        }

        // Get GPS coordinates
        const coords = await getCoordinates();

        // Get Public IP
        const ipAddress = await fetch("https://api.ipify.org?format=json")
            .then(res => res.json())
            .then(data => data.ip)
            .catch(() => "Unknown");

        try {
            const res = await login({
                email,
                password,
                deviceId,
                rememberThisDevice: rememberDevice,
                latitude: coords.lat,
                longitude: coords.lon,
                ipAddress
            });

            const code = res.responseCode;

            if (code === "401" || code === "403") {
                toast.error(res.responseMessage);
                return;
            }

            if (code === "206") {
                sessionStorage.setItem("otp_email", email);
                toast.info("OTP required for new device. Check your email.");
                navigate("/verify-otp", { state: { email, deviceId } });
                return;
            }

            if (code === "200" && res.user) {
                const user = res.user;
                const fullName = `${user.firstName} ${user.otherName}`;
                const updatedUser = { ...user, fullName, role: user.role };

                // Save to AuthContext
                setUser(updatedUser);

                // Persist to localStorage
                localStorage.setItem("bank_user", JSON.stringify(updatedUser));

                toast.success("Login successful");
                navigate(user.role.toLowerCase() === "admin" ? "/admin" : "/");
            }
            else {
                toast.error(res.responseMessage || "Login failed");
            }

        } catch (error: any) {
            toast.error(error?.message || "Login error occurred");
        } finally {
            setLoading(false);
        }
    };

    const getCoordinates = (): Promise<{ lat: number; lon: number }> => {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude });
                    },
                    () => resolve({ lat: 0, lon: 0 }),
                    { timeout: 5000 }
                );
            } else {
                resolve({ lat: 0, lon: 0 });
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            checked={rememberDevice}
                            onChange={(e) => setRememberDevice(e.target.checked)}
                        />
                        <span>Remember this device</span>
                    </label>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? <Spinner size="small" /> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
