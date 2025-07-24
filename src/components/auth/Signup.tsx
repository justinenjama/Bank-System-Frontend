import React, { useState, useEffect } from 'react';
import { signUp as signUpAPI, validateEmail, validatePhoneNumber } from '../../service/Service';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import registerImage from "../../assets/img/loan-bg.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const isValidEmailFormat = (email: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const isValidPhoneNumber = (phone: string) =>
    /^\+\d{10,15}$/.test(phone);

const getPasswordStrength = (password: string) => {
    const rules = {
        length: password.length >= 6,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const passedRules = Object.values(rules).filter(Boolean).length;
    let strength: 'Weak' | 'Medium' | 'Strong' = 'Weak';
    if (passedRules >= 4) strength = 'Strong';
    else if (passedRules >= 3) strength = 'Medium';

    return { strength, rules };
};

const countryCodes = [
    { code: '+251', country: 'Ethiopia' },
    { code: '+256', country: 'Uganda' },
    { code: '+255', country: 'Tanzania' },
    { code: '+250', country: 'Rwanda' },
    { code: '+254', country: 'Kenya' },
];

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [form, setForm] = useState({
        email: '',
        phoneCountryCode: '+254',
        phoneNumber: '',
        altPhoneCountryCode: '+254',
        alternativePhoneNumber: '',
        firstName: '',
        lastName: '',
        otherName: '',
        gender: '',
        country: '',
        address: '',
        city: '',
        job: '',
        dateOfBirth: null as Date | null,
        nextOfKin: '',
        nextOfKinRelationship: '',
        nationalIdentityCardNumber: '',
        district: '',
        location: '',
        subLocation: '',
        password: '',
        confirmPassword: '',
    });

    const [emailStatus, setEmailStatus] = useState<'valid' | 'invalid' | 'checking' | 'error' | ''>('');
    const [phoneStatus, setPhoneStatus] = useState<'valid' | 'invalid' | 'checking' | 'error' | ''>('');
    const [altPhoneStatus, setAltPhoneStatus] = useState<'valid' | 'invalid' | 'error' | ''>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (name === 'email') setEmailStatus('');
        if (name === 'phoneNumber') setPhoneStatus('');
        if (name === 'alternativePhoneNumber') setAltPhoneStatus('');
        setError(null);
    };

    const normalizePhoneNumber = (countryCode: string, phone: string): string => {
        let trimmed = phone.trim().replace(/\s+/g, '');
        if (trimmed.startsWith('0')) trimmed = trimmed.slice(1);
        return countryCode + trimmed;
    };

    useEffect(() => {
        const validateEmailFormat = async () => {
            if (!form.email.trim()) {
                setEmailStatus('');
                return;
            }
            if (!isValidEmailFormat(form.email.trim())) {
                setEmailStatus('invalid');
                return;
            }
            setEmailStatus('checking');
            try {
                const { exists } = await validateEmail(form.email.trim());
                setEmailStatus(exists ? 'invalid' : 'valid');
            } catch {
                setEmailStatus('error');
            }
        };
        validateEmailFormat();
    }, [form.email]);

    useEffect(() => {
        const validatePhone = async () => {
            const fullPhone = normalizePhoneNumber(form.phoneCountryCode, form.phoneNumber);
            if (!form.phoneNumber.trim()) {
                setPhoneStatus('');
                return;
            }
            if (!isValidPhoneNumber(fullPhone)) {
                setPhoneStatus('invalid');
                return;
            }
            setPhoneStatus('checking');
            try {
                const { exists } = await validatePhoneNumber(fullPhone);
                setPhoneStatus(exists ? 'invalid' : 'valid');
            } catch {
                setPhoneStatus('error');
            }
        };
        validatePhone();
    }, [form.phoneNumber, form.phoneCountryCode]);

    useEffect(() => {
        const fullAlt = normalizePhoneNumber(form.altPhoneCountryCode, form.alternativePhoneNumber);
        if (!form.alternativePhoneNumber.trim()) {
            setAltPhoneStatus('');
            return;
        }
        setAltPhoneStatus(isValidPhoneNumber(fullAlt) ? 'valid' : 'invalid');
    }, [form.alternativePhoneNumber, form.altPhoneCountryCode]);

    const isStepValid = () => {
        switch (step) {
            case 1:
                return form.firstName && form.lastName && form.otherName && form.gender && form.nationalIdentityCardNumber && /^\d{6,10}$/.test(form.nationalIdentityCardNumber);
            case 2:
                return form.email && emailStatus === 'valid' &&
                    form.phoneNumber && phoneStatus === 'valid' &&
                    (!form.alternativePhoneNumber || altPhoneStatus === 'valid');
            case 3:
                return form.country && form.address && form.city && form.job && form.dateOfBirth;
            case 4:
                return form.nextOfKin && form.nextOfKinRelationship && form.district && form.location && form.subLocation;
            case 5:
                return form.password.length >= 6 && form.password === form.confirmPassword;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (isStepValid()) {
            setError(null);
            setStep((s) => s + 1);
        } else {
            setError('Please correct the highlighted fields before proceeding.');
        }
    };

    const handleBack = () => {
        setError(null);
        setStep((s) => s - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isStepValid()) {
            setError('Please correct the highlighted fields.');
            return;
        } 
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        const normalizedForm = {
            ...form,
            phoneNumber: normalizePhoneNumber(form.phoneCountryCode, form.phoneNumber),
            alternativePhoneNumber: normalizePhoneNumber(form.altPhoneCountryCode, form.alternativePhoneNumber),
            dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth) : null,
        };

        try {
            const res = await signUpAPI(normalizedForm);
            setSuccessMessage(res.message || 'Signup successful!');
            toast.success(res.responseMessage || 'Signup successful!');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const { strength: passwordStrength, rules: passwordRules } = getPasswordStrength(form.password);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
            <img src={registerImage} alt="Bank Register" className="absolute inset-0 w-full h-full object-cover" />
            {loading && <Spinner />}
            <div className="w-full max-w-md p-6 bg-white rounded shadow-xl absolute z-10">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up - Step {step} of 5</h2>
                {error && (
                    <p className="text-red-600 text-sm text-center mb-2" role="alert">
                        {error}
                    </p>
                )}
                {successMessage && (
                    <p className="text-green-600 text-sm text-center mb-2">
                        {successMessage}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {step === 1 && (
                        <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 px-2">User Info</legend>

                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!form.firstName.trim() && error ? 'border-red-600' : 'border-gray-300'
                                        }`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!form.lastName.trim() && error ? 'border-red-600' : 'border-gray-300'
                                        }`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="otherName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Other Name
                                </label>
                                <input
                                    type="text"
                                    id="otherName"
                                    name="otherName"
                                    value={form.otherName}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!form.otherName.trim() && error ? 'border-red-600' : 'border-gray-300'
                                        }`}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="nationalIdentityCardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    National ID Number
                                </label>
                                <input
                                    type="number"
                                    id="nationalIdentityCardNumber"
                                    name="nationalIdentityCardNumber"
                                    value={form.nationalIdentityCardNumber}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${!form.nationalIdentityCardNumber && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!form.gender && error ? 'border-red-600' : 'border-gray-300'
                                        }`}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Next
                                </button>
                            </div>
                        </fieldset>
                    )}

                    {step === 2 && (
                        <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 px-2">Contact Info</legend>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${(emailStatus === 'invalid' || emailStatus === 'error') && error
                                        ? 'border-red-600'
                                        : 'border-gray-300'
                                        }`}
                                    required
                                />
                                {emailStatus === 'checking' && (
                                    <p className="text-blue-600 text-sm mt-1">Checking email...</p>
                                )}
                                {emailStatus === 'invalid' && (
                                    <p className="text-red-600 text-sm mt-1">Email is invalid or already taken.</p>
                                )}
                                {emailStatus === 'error' && (
                                    <p className="text-red-600 text-sm mt-1">Error validating email.</p>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                <div className="flex-1">
                                    <label htmlFor="phoneCountryCode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Country Code
                                    </label>
                                    <select
                                        id="phoneCountryCode"
                                        name="phoneCountryCode"
                                        value={form.phoneCountryCode}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-lg border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {countryCodes.map(({ code, country }) => (
                                            <option key={code} value={code}>
                                                {code} ({country})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${(phoneStatus === 'invalid' || phoneStatus === 'error') && error
                                            ? 'border-red-600'
                                            : 'border-gray-300'
                                            }`}
                                        required
                                    />
                                    {phoneStatus === 'checking' && (
                                        <p className="text-blue-600 text-sm mt-1">Checking phone number...</p>
                                    )}
                                    {phoneStatus === 'invalid' && (
                                        <p className="text-red-600 text-sm mt-1">Phone number is invalid or already taken.</p>
                                    )}
                                    {phoneStatus === 'error' && (
                                        <p className="text-red-600 text-sm mt-1">Error validating phone number.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                <div className="flex-1">
                                    <label htmlFor="altPhoneCountryCode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Alternative Phone Country Code
                                    </label>
                                    <select
                                        id="altPhoneCountryCode"
                                        name="altPhoneCountryCode"
                                        value={form.altPhoneCountryCode}
                                        onChange={handleChange}
                                        className="w-full border p-2 rounded-lg border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {countryCodes.map(({ code, country }) => (
                                            <option key={code} value={code}>
                                                {code} ({country})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label htmlFor="alternativePhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Alternative Phone Number (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        id="alternativePhoneNumber"
                                        name="alternativePhoneNumber"
                                        value={form.alternativePhoneNumber}
                                        onChange={handleChange}
                                        className={`w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${altPhoneStatus === 'invalid' && error ? 'border-red-600' : 'border-gray-300'
                                            }`}
                                    />
                                    {altPhoneStatus === 'invalid' && (
                                        <p className="text-red-600 text-sm mt-1">Alternative phone number is invalid.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Next
                                </button>
                            </div>
                        </fieldset>
                    )}

                    {step === 3 && (
                        <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 px-2">Additional Info</legend>

                            <div>
                                <label htmlFor="country" className="block font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.country.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.address.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block font-medium text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.city.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="job" className="block font-medium text-gray-700 mb-1">Job</label>
                                <input
                                    type="text"
                                    id="job"
                                    name="job"
                                    value={form.job}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.job.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="dateOfBirth" className="block font-medium text-gray-700 mb-1">Date of Birth</label>
                                <DatePicker
                                    id="dateOfBirth"
                                    selected={form.dateOfBirth}
                                    onChange={(date: Date | null) => setForm({ ...form, dateOfBirth: date })}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="Select date of birth"
                                    className={`w-full border p-2 rounded ${!form.dateOfBirth && error ? 'border-red-600' : 'border-gray-300'}`}
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Next
                                </button>
                            </div>
                        </fieldset>
                    )}


                    {step === 4 && (
                        <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 px-2">Residence & Next of Kin</legend>

                            <div>
                                <label htmlFor="nextOfKin" className="block font-medium text-gray-700 mb-1">Next of Kin</label>
                                <input
                                    type="text"
                                    id="nextOfKin"
                                    name="nextOfKin"
                                    value={form.nextOfKin}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.nextOfKin.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="nextOfKinRelationship" className="block font-medium text-gray-700 mb-1">Relationship with Next of Kin</label>
                                <input
                                    type="text"
                                    id="nextOfKinRelationship"
                                    name="nextOfKinRelationship"
                                    value={form.nextOfKinRelationship}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.nextOfKinRelationship.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="district" className="block font-medium text-gray-700 mb-1">District</label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    value={form.district}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.district.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.location.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subLocation" className="block font-medium text-gray-700 mb-1">Sub Location</label>
                                <input
                                    type="text"
                                    id="subLocation"
                                    name="subLocation"
                                    value={form.subLocation}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${!form.subLocation.trim() && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Next
                                </button>
                            </div>
                        </fieldset>
                    )}


                    {step === 5 && (
                        <fieldset className="border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                            <legend className="text-xl font-semibold text-gray-700 px-2">Create Password</legend>

                            <div>
                                <label htmlFor="password" className="block font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${(form.password.length < 6 || form.password !== form.confirmPassword) && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                                <p className={`mt-1 text-sm ${passwordStrength === 'Strong' ? 'text-green-600' : passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                                    Password Strength: {passwordStrength}
                                </p>
                                <ul className="text-xs list-disc ml-5 text-gray-600">
                                    <li className={passwordRules.length ? 'text-green-600' : ''}>At least 6 characters</li>
                                    <li className={passwordRules.lowercase ? 'text-green-600' : ''}>Contains lowercase letter</li>
                                    <li className={passwordRules.uppercase ? 'text-green-600' : ''}>Contains uppercase letter</li>
                                    <li className={passwordRules.number ? 'text-green-600' : ''}>Contains number</li>
                                    <li className={passwordRules.specialChar ? 'text-green-600' : ''}>Contains special character</li>
                                </ul>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block font-medium text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${(form.password !== form.confirmPassword) && error ? 'border-red-600' : 'border-gray-300'}`}
                                    required
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Register
                                </button>
                            </div>
                        </fieldset>
                    )}

                </form>
            </div>
        </div>
    );
};

export default Signup;
