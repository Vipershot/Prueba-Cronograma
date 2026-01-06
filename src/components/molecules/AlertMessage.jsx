// components/molecules/AlertMessage.js
import React from 'react';

const AlertMessage = ({ type = 'error', message, className = '' }) => {
  const icons = {
    error: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )
  };

  const styles = {
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  return (
    <div className={`flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border ${styles[type]} ${className}`}>
      <div className={`flex-shrink-0 ${type === 'error' ? 'text-red-500' : 'text-yellow-500'}`}>
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm break-words">{message}</p>
      </div>
    </div>
  );
};

export default AlertMessage;