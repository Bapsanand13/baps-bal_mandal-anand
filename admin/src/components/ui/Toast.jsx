import React from 'react';

const typeStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
};

export default function Toast({ message, type = 'info' }) {
  return (
    <div className={`px-4 py-2 rounded shadow ${typeStyles[type] || typeStyles.info}`}>{message}</div>
  );
} 