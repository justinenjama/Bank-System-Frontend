import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { downloadBankStatement, emailBankStatement} from '../service/Service';
import Spinner from './Spinner';
import { getSessionUser } from '../service/Service';

const presetOptions = [
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'This Month', value: 'month' },
];

const StatementDownloader: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isValidRange, setIsValidRange] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getSessionUser();
        setUserEmail(user.email);
      } catch {
        console.error('Failed to fetch user email');
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    validateRange();
  }, [fromDate, toDate]);

  const validateRange = () => {
    const diffInMs = toDate.getTime() - fromDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 0) {
      toast.warning('❌ "To Date" cannot be before "From Date".');
      setIsValidRange(false);
      return;
    }

    if (diffInDays > 90) {
      toast.warning('⚠️ The date range cannot exceed 90 days.');
      setIsValidRange(false);
    } else {
      setIsValidRange(true);
    }
  };

  const handlePresetChange = (value: number | 'month') => {
    const now = new Date();
    let from: Date;

    if (typeof value === 'number') {
      from = new Date(now.getTime() - value * 24 * 60 * 60 * 1000);
    } else {
      from = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    setFromDate(from);
    setToDate(now);
  };

  const download = () => {
    if (!isValidRange) return;
    const from = fromDate.toISOString().split('T')[0];
    const to = toDate.toISOString().split('T')[0];
    downloadBankStatement(from, to);
  };

  const email = async () => {
    if (!isValidRange) return;
    const from = fromDate.toISOString().split('T')[0];
    const to = toDate.toISOString().split('T')[0];

    try {
      setLoading(true);
      await emailBankStatement(from, to);
      toast.success('✅ Statement emailed successfully!');
    } catch {
      toast.error('❌ Failed to send email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto space-y-6 relative">
      <h2 className="text-xl font-semibold text-gray-800">📄 Download Bank Statement</h2>

      {userEmail && (
        <div className="text-sm text-gray-600 italic">Logged in as: {userEmail}</div>
      )}

      {/* Preset Dropdown */}
      <div>
        <label className="text-sm font-medium text-gray-700">Quick Range</label>
        <select
          onChange={(e) => handlePresetChange(e.target.value === 'month' ? 'month' : parseInt(e.target.value))}
          className="block mt-1 w-full p-2 border rounded shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="">Custom Range</option>
          {presetOptions.map((opt) => (
            <option key={opt.label} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Date Range Picker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">From Date</label>
          <DatePicker
            selected={fromDate}
            onChange={(d: Date | null) => d && setFromDate(d)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">To Date</label>
          <DatePicker
            selected={toDate}
            onChange={(d: Date | null) => d && setToDate(d)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 pt-4">
        <button
          onClick={download}
          disabled={!isValidRange}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition ${
            !isValidRange ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          📥 Download PDF
        </button>
        <button
          onClick={email}
          disabled={loading || !isValidRange}
          className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition ${
            loading || !isValidRange ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          ✉️ {loading ? <Spinner size="small" /> : 'Email Statement'}
        </button>
      </div>

      {loading && <Spinner size="medium" />}
    </div>
  );
};

export default StatementDownloader;
