import React, { type JSX } from 'react';
import {
  UserPlusIcon,
  ShieldExclamationIcon,
  CheckBadgeIcon,
  BanknotesIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowUpRightIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/solid';

interface Activity {
  id: number;
  timestamp: string;
  icon: JSX.Element;
  message: string;
}

const activities: Activity[] = [
  { id: 1, timestamp: '2025-05-28 10:15 AM', icon: <UserPlusIcon className="w-5 h-5 text-blue-600" />, message: 'John Doe applied for a $10,000 loan' },
  { id: 2, timestamp: '2025-05-28 09:40 AM', icon: <ShieldExclamationIcon className="w-5 h-5 text-red-600" />, message: 'Fraud alert triggered on account #3821' },
  { id: 3, timestamp: '2025-05-27 04:22 PM', icon: <CheckBadgeIcon className="w-5 h-5 text-green-600" />, message: 'Admin approved $500 loan for Jane Smith' },
  { id: 4, timestamp: '2025-05-27 02:10 PM', icon: <BanknotesIcon className="w-5 h-5 text-green-600" />, message: '$1,200 deposit processed for Michael Lee' },
  { id: 5, timestamp: '2025-05-27 11:55 AM', icon: <ChartBarIcon className="w-5 h-5 text-indigo-600" />, message: 'Monthly revenue up 5%' },
  { id: 6, timestamp: '2025-05-26 08:45 PM', icon: <ClockIcon className="w-5 h-5 text-yellow-600" />, message: '45 transactions pending approval' },
  { id: 7, timestamp: '2025-05-26 03:30 PM', icon: <ArrowUpRightIcon className="w-5 h-5 text-purple-600" />, message: 'Outgoing transfer: $3,000 from account #9101' },
  { id: 8, timestamp: '2025-05-26 12:10 PM', icon: <ArrowPathIcon className="w-5 h-5 text-teal-600" />, message: 'Loan repayment: $450 from Sarah Connor' },
  { id: 9, timestamp: '2025-05-25 09:00 AM', icon: <EnvelopeIcon className="w-5 h-5 text-blue-500" />, message: 'Message sent to compliance team' },
  { id: 10, timestamp: '2025-05-25 08:30 AM', icon: <Cog6ToothIcon className="w-5 h-5 text-gray-600" />, message: 'Settings updated by admin' },
];

const RecentActivities: React.FC = () => {
  return (
    <div className='mb-8'>
      <h2 className='text-xl font-semibold mb-4'>Recent Activities</h2>
      <div className='bg-white shadow-md rounded-lg overflow-x-auto'>
        <table className='min-w-full text-left text-sm'>
          <thead className='bg-gray-100 border-b'>
            <tr>
              <th className='px-4 py-3'>Time</th>
              <th className='px-4 py-3'>Activity</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className='border-b hover:bg-gray-50'>
                <td className='px-4 py-3 whitespace-nowrap text-gray-500'>{activity.timestamp}</td>
                <td className='px-4 py-3 flex items-center gap-2'>
                  {activity.icon}
                  <span>{activity.message}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivities;
