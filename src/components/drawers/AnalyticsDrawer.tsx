import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', balance: 1200 },
  { name: 'Tue', balance: 1500 },
  { name: 'Wed', balance: 1000 },
  { name: 'Thu', balance: 1800 },
  { name: 'Fri', balance: 1600 },
  { name: 'Sat', balance: 2000 },
  { name: 'Sun', balance: 2200 },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AnalyticsDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white dark:bg-gray-900 shadow-xl">
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold">Analytics</h2>
            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-red-600" />
            </button>
          </div>
          <div className="p-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AnalyticsDrawer;