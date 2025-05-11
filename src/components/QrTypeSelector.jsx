import React from 'react';
import { LinkIcon, Type, Mail, MessageSquare, Wifi, Info } from 'lucide-react';

const QrTypeSelector = ({ currentType, onTypeChange }) => {
  const types = [
    { value: 'url', label: 'URL', icon: <LinkIcon size={18} /> },
    { value: 'text', label: 'Text', icon: <Type size={18} /> },
    { value: 'email', label: 'Email', icon: <Mail size={18} /> },
    { value: 'sms', label: 'SMS', icon: <MessageSquare size={18} /> },
    { value: 'wifi', label: 'WiFi', icon: <Wifi size={18} /> },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
        <Info size={16} className="mr-2 text-secondary" /> QR Code Type
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {types.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            className={`flex flex-col sm:flex-row items-center justify-center p-3 border rounded-lg transition-all duration-150 ease-in-out
              ${currentType === type.value
                ? 'bg-secondary text-white shadow-md ring-2 ring-offset-1 ring-secondary'
                : 'bg-white hover:bg-neutral-light text-neutral-dark border-gray-300 hover:shadow-sm'
              }`}
            title={type.label}
          >
            {React.cloneElement(type.icon, { className: `mb-1 sm:mb-0 sm:mr-2 ${currentType === type.value ? 'text-white' : 'text-secondary'}` })}
            <span className="text-xs sm:text-sm">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QrTypeSelector;
