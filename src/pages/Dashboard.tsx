import React from 'react';
import { getSession, type UserType } from '../services/session.service';

const Dashboard: React.FC = () => {
  let { user } = getSession();
  user = user as UserType;
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">Dashboard</h1>
      {user && (
        <p className="mt-2 text-lg text-gray-700 text-center">Welcome, <span className="font-semibold text-indigo-600">{user.email}</span>!</p>
      )}
    </div>
  );
};

export default Dashboard; 