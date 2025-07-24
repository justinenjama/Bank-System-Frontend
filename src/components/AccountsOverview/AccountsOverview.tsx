import React from 'react';

const accounts = [
  { type: 'Checking Account', number: '****1234', balance: 4200.75 },
  { type: 'Savings Account', number: '****5678', balance: 9800.00 },
  { type: 'Business Account', number: '****9012', balance: 15320.50 },
];

const AccountsOverview: React.FC = () => {
  return (
    <div className='mb-8'>
      <h2 className='text-xl font-semibold mb-4'>Your Accounts</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {accounts.map((account, index) => (
          <div
            key={index}
            className='bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition'
          >
            <h3 className='text-lg font-medium'>{account.type}</h3>
            <p className='text-gray-500 text-sm'>{account.number}</p>
            <p className='mt-2 text-xl font-bold text-green-700'>
              ${account.balance.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsOverview;