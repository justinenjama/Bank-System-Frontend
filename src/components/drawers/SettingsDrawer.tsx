import { Dialog } from '@headlessui/react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import {
  changePassword,
  changePin,
  verifyOldPassword,
  verifyPasswordOtp,
  verifyOldPin,
  verifyPinOtp,
} from '../../service/Service';
import { useTheme } from '../../components/ThemeContext';
import Spinner from '../../components/Spinner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();

  const [activeSection, setActiveSection] = useState<'profile' | 'security'>('profile');
  const [securityTab, setSecurityTab] = useState<'password' | 'pin'>('password');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Profile
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // PIN
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');

  // Visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const resetFlow = () => {
    setStep(1);
    setOtp('');
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setOldPin('');
    setNewPin('');
    setConfirmNewPin('');
    setStatus('');
  };

  const handleStartFlow = async () => {
    try {
      setLoading(true);
      if (securityTab === 'password') {
        const res = await verifyOldPassword({ oldPassword });
        setStatus(res.responseMessage);
      } else {
        const res = await verifyOldPin({ oldPin });
        setStatus(res.responseMessage);
      }
      setStep(2);
    } catch (err: any) {
      setStatus(err?.response?.data?.responseMessage || 'Step 1 failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    try {
      setLoading(true);
      const res =
        securityTab === 'password'
          ? await verifyPasswordOtp(otp)
          : await verifyPinOtp(otp);
      setStatus(res.responseMessage);
      setStep(3);
    } catch (err: any) {
      setStatus(err?.response?.data?.responseMessage || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalChange = async () => {
    try {
      setLoading(true);
      let res;

      if (securityTab === 'password') {
        const passwordPayload = {
          oldPassword,
          newPassword,
          confirmNewPassword,
        };
        res = await changePassword(passwordPayload);
      } else {
        const pinPayload = {
          oldPin,
          newPin,
          confirmNewPin,
        };
        res = await changePin(pinPayload);
      }

      setStatus(res.responseMessage);
      if (res.responseCode === '200') {
        resetFlow();
        onClose();
      }
    } catch (err: any) {
      setStatus(err?.response?.data?.responseMessage || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    console.log('Saved Profile:', { fullName, email });
    setStatus('Profile changes saved!');
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="relative space-y-4">
          <div className="relative">
            <input
              type={securityTab === 'password' ? (showOldPassword ? 'text' : 'password') : (showOldPin ? 'text' : 'password')}
              placeholder={securityTab === 'password' ? 'Old Password' : 'Old PIN'}
              value={securityTab === 'password' ? oldPassword : oldPin}
              onChange={(e) =>
                securityTab === 'password'
                  ? setOldPassword(e.target.value)
                  : setOldPin(e.target.value)
              }
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500"
              onClick={() =>
                securityTab === 'password'
                  ? setShowOldPassword(!showOldPassword)
                  : setShowOldPin(!showOldPin)
              }
            >
              {securityTab === 'password'
                ? showOldPassword
                  ? <EyeSlashIcon className="h-5 w-5" />
                  : <EyeIcon className="h-5 w-5" />
                : showOldPin
                  ? <EyeSlashIcon className="h-5 w-5" />
                  : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          <button
            onClick={handleStartFlow}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
          >
            {loading ? <Spinner size="small" /> : 'Send OTP'}
          </button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP sent to email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleOtpVerify}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition flex items-center justify-center"
          >
            {loading ? <Spinner size="small" /> : 'Verify OTP'}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {[{ label: 'New', value: securityTab === 'password' ? newPassword : newPin, set: securityTab === 'password' ? setNewPassword : setNewPin, show: securityTab === 'password' ? showNewPassword : showNewPin, toggle: securityTab === 'password' ? setShowNewPassword : setShowNewPin }, { label: 'Confirm New', value: securityTab === 'password' ? confirmNewPassword : confirmNewPin, set: securityTab === 'password' ? setConfirmNewPassword : setConfirmNewPin, show: securityTab === 'password' ? showConfirmPassword : showConfirmPin, toggle: securityTab === 'password' ? setShowConfirmPassword : setShowConfirmPin }].map(({ label, value, set, show, toggle }, idx) => (
          <div className="relative" key={idx}>
            <input
              type={show ? 'text' : 'password'}
              placeholder={`${label} ${securityTab === 'password' ? 'Password' : 'PIN'}`}
              value={value}
              onChange={(e) => set(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500"
              onClick={() => toggle(!show)}
            >
              {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        ))}
        <button
          onClick={handleFinalChange}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition flex items-center justify-center"
        >
          {loading ? <Spinner size="small" /> : securityTab === 'password' ? 'Change Password' : 'Change PIN'}
        </button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white dark:bg-gray-900 shadow-xl transition-all">
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Account Settings</h2>
            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-red-600" />
            </button>
          </div>

          <div className="p-4">
            <div className="flex space-x-3 mb-4">
              {['profile', 'security'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section as any);
                    resetFlow();
                  }}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    activeSection === section
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white'
                  }`}
                >
                  {section === 'profile' ? 'Profile' : 'Security'}
                </button>
              ))}
            </div>

            {status && (
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-3">{status}</div>
            )}

            {activeSection === 'profile' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Save Profile
                </button>
              </div>
            )}

            {activeSection === 'security' && (
              <>
                <div className="flex space-x-3 mb-4">
                  {['password', 'pin'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setSecurityTab(tab as any);
                        resetFlow();
                      }}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        securityTab === tab
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-white'
                      }`}
                    >
                      {tab === 'password' ? 'Change Password' : 'Change PIN'}
                    </button>
                  ))}
                </div>
                {renderStepContent()}
              </>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SettingsDrawer;
