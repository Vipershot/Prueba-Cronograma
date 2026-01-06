import React from 'react';
import AlertMessage from '../molecules/AlertMessage';

const AlertPanel = ({ type = 'error', messages, title, className = '' }) => {
  if (!messages || messages.length === 0) return null;

  const panelStyles = {
    error: 'border-red-400/60 bg-gradient-to-br from-red-50 via-red-100 to-red-50 shadow-red-200/50',
    warning: 'border-yellow-400/60 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 shadow-yellow-200/50'
  };

  const titleStyles = {
    error: 'text-red-800',
    warning: 'text-yellow-800'
  };

  const icon = type === 'error' ? (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className={`rounded-2xl border-2 shadow-xl p-4 md:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 ${panelStyles[type]} ${className}`}>
      <div className="flex items-center mb-6">
        <div className={`mr-4 ${type === 'error' ? 'text-red-600' : 'text-yellow-600'}`}>
          {icon}
        </div>
        <h3 className={`text-xl md:text-2xl font-bold ${titleStyles[type]}`}>
          {title}
        </h3>
        <div className="ml-auto bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold shadow-md border border-gray-200">
          <span className="text-gray-700">{messages.length}</span>
          <span className="text-gray-500 ml-1">{messages.length === 1 ? 'problema' : 'problemas'}</span>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <AlertMessage key={index} type={type} message={message} />
        ))}
      </div>
    </div>
  );
};

export default AlertPanel;
