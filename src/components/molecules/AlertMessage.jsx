import React from 'react';

const AlertMessage = ({ type = 'error', message, className = '' }) => {
  const icons = {
    error: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )
  };

  const styles = {
    error: 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-300/60 shadow-red-100/50',
    warning: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-300/60 shadow-yellow-100/50'
  };

  return (
    <div className={`flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-xl border shadow-md hover:shadow-lg transition-all duration-200 ${styles[type]} ${className}`}>
      <div className={`flex-shrink-0 ${type === 'error' ? 'text-red-600' : 'text-yellow-600'}`}>
        {icons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm sm:text-base break-words font-medium leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default AlertMessage;
