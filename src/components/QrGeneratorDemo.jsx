import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Download, LinkIcon, Settings, Palette, TextCursorInput, Type, Mail, MessageSquare, Wifi, Smartphone, KeyRound, Eye, EyeOff, Info } from 'lucide-react';
import QrTypeSelector from './QrTypeSelector';

const QrGeneratorDemo = () => {
  const [qrType, setQrType] = useState('url');
  const [qrData, setQrData] = useState({
    url: 'https://xbesh.com',
    text: 'Hello from xBesh!',
    email: { to: '', subject: '', body: '' },
    sms: { phone: '', message: '' },
    wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
  });
  const [qrValue, setQrValue] = useState('https://xbesh.com');

  const [qrSize, setQrSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [level, setLevel] = useState('L');
  const qrRef = useRef(null);
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  useEffect(() => {
    let newQrValue = '';
    switch (qrType) {
      case 'url':
        newQrValue = qrData.url;
        break;
      case 'text':
        newQrValue = qrData.text;
        break;
      case 'email':
        newQrValue = `mailto:${qrData.email.to}?subject=${encodeURIComponent(qrData.email.subject)}&body=${encodeURIComponent(qrData.email.body)}`;
        break;
      case 'sms':
        newQrValue = `SMSTO:${qrData.sms.phone}:${encodeURIComponent(qrData.sms.message)}`;
        break;
      case 'wifi':
        newQrValue = `WIFI:T:${qrData.wifi.encryption};S:${qrData.wifi.ssid};P:${qrData.wifi.password};H:${qrData.wifi.hidden ? 'true' : 'false'};`;
        break;
      default:
        newQrValue = '';
    }
    setQrValue(newQrValue);
  }, [qrType, qrData]);

  const handleInputChange = (field, value, subField = null) => {
    setQrData(prev => {
      if (subField) {
        return { ...prev, [field]: { ...prev[field], [subField]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const pngUrl = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `qrcode-${qrType}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  const renderInputs = () => {
    switch (qrType) {
      case 'url':
        return (
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
              <LinkIcon size={16} className="mr-2 text-secondary" /> URL
            </label>
            <input
              type="url"
              id="url"
              value={qrData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow"
            />
          </div>
        );
      case 'text':
        return (
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
              <Type size={16} className="mr-2 text-secondary" /> Text
            </label>
            <textarea
              id="text"
              value={qrData.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder="Enter your text"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow"
            />
          </div>
        );
      case 'email':
        return (
          <div className="space-y-3">
            <div>
              <label htmlFor="emailTo" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                <Mail size={16} className="mr-2 text-secondary" /> To
              </label>
              <input type="email" id="emailTo" value={qrData.email.to} onChange={(e) => handleInputChange('email', e.target.value, 'to')} placeholder="recipient@example.com" className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" />
            </div>
            <div>
              <label htmlFor="emailSubject" className="block text-sm font-medium text-neutral-dark mb-1.5">Subject (Optional)</label>
              <input type="text" id="emailSubject" value={qrData.email.subject} onChange={(e) => handleInputChange('email', e.target.value, 'subject')} placeholder="Email Subject" className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" />
            </div>
            <div>
              <label htmlFor="emailBody" className="block text-sm font-medium text-neutral-dark mb-1.5">Body (Optional)</label>
              <textarea id="emailBody" value={qrData.email.body} onChange={(e) => handleInputChange('email', e.target.value, 'body')} placeholder="Email body..." rows="2" className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" />
            </div>
          </div>
        );
      case 'sms':
        return (
          <div className="space-y-3">
            <div>
              <label htmlFor="smsPhone" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                <Smartphone size={16} className="mr-2 text-secondary" /> Phone Number
              </label>
              <input type="tel" id="smsPhone" value={qrData.sms.phone} onChange={(e) => handleInputChange('sms', e.target.value, 'phone')} placeholder="+1234567890" className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" />
            </div>
            <div>
              <label htmlFor="smsMessage" className="block text-sm font-medium text-neutral-dark mb-1.5">Message (Optional)</label>
              <textarea id="smsMessage" value={qrData.sms.message} onChange={(e) => handleInputChange('sms', e.target.value, 'message')} placeholder="Your SMS message..." rows="2" className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" />
            </div>
          </div>
        );
      case 'wifi':
        return (
          <div className="space-y-3">
            <div>
              <label htmlFor="wifiSSID" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                <Wifi size={16} className="mr-2 text-secondary" /> Network Name (SSID)
              </label>
              <input type="text" id="wifiSSID" value={qrData.wifi.ssid} onChange={(e) => handleInputChange('wifi', e.target.value, 'ssid')} placeholder="MyWiFiNetwork" className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" />
            </div>
            <div className="relative">
              <label htmlFor="wifiPassword" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                <KeyRound size={16} className="mr-2 text-secondary" /> Password
              </label>
              <input 
                type={showWifiPassword ? "text" : "password"} 
                id="wifiPassword" 
                value={qrData.wifi.password} 
                onChange={(e) => handleInputChange('wifi', e.target.value, 'password')} 
                placeholder="Network Password" 
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow" 
              />
              <button 
                type="button" 
                onClick={() => setShowWifiPassword(!showWifiPassword)} 
                className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-secondary"
                aria-label={showWifiPassword ? "Hide password" : "Show password"}
              >
                {showWifiPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div>
              <label htmlFor="wifiEncryption" className="block text-sm font-medium text-neutral-dark mb-1.5">Encryption</label>
              <select id="wifiEncryption" value={qrData.wifi.encryption} onChange={(e) => handleInputChange('wifi', e.target.value, 'encryption')} className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow bg-white">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="wifiHidden" checked={qrData.wifi.hidden} onChange={(e) => handleInputChange('wifi', e.target.checked, 'hidden')} className="h-4 w-4 text-secondary border-gray-300 rounded focus:ring-secondary mr-2" />
              <label htmlFor="wifiHidden" className="text-sm font-medium text-neutral-dark">Hidden Network</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isQrDataEmpty = () => {
    switch (qrType) {
      case 'url': return !qrData.url;
      case 'text': return !qrData.text;
      case 'email': return !qrData.email.to;
      case 'sms': return !qrData.sms.phone;
      case 'wifi': return !qrData.wifi.ssid;
      default: return true;
    }
  };

  return (
    <div className="bg-background rounded-xl shadow-card overflow-hidden md:flex w-full">
      {/* Control Panel */}
      <div className="md:w-1/2 p-6 sm:p-8 space-y-5 bg-gray-50 overflow-y-auto md:max-h-[700px]">
        <QrTypeSelector currentType={qrType} onTypeChange={setQrType} />
        
        <div className="space-y-4">
          {renderInputs()}
        </div>

        <hr className="my-6 border-gray-200" />
        
        <h2 className="text-xl font-semibold text-neutral-dark mb-3">Customize Style</h2>
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
            <Settings size={16} className="mr-2 text-secondary" /> Size ({qrSize}px)
          </label>
          <input
            type="range"
            id="size"
            min="128"
            max="512"
            step="16"
            value={qrSize}
            onChange={(e) => setQrSize(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fgColor" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
              <Palette size={16} className="mr-2 text-secondary" /> Foreground
            </label>
            <input
              type="color"
              id="fgColor"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-10 p-1 border border-gray-300 rounded-lg shadow-input cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="bgColor" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
              <Palette size={16} className="mr-2 text-secondary" /> Background
            </label>
            <input
              type="color"
              id="bgColor"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 p-1 border border-gray-300 rounded-lg shadow-input cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
             <TextCursorInput size={16} className="mr-2 text-secondary" /> Error Correction
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow bg-white"
          >
            <option value="L">Low (L) - approx 7%</option>
            <option value="M">Medium (M) - approx 15%</option>
            <option value="Q">Quartile (Q) - approx 25%</option>
            <option value="H">High (H) - approx 30%</option>
          </select>
        </div>
      </div>

      {/* QR Code Display */}
      <div className="md:w-1/2 p-6 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary">
        <div className="bg-background p-4 sm:p-6 rounded-lg shadow-lg mb-6" ref={qrRef} style={{ backgroundColor: bgColor }}>
          {!isQrDataEmpty() && qrValue ? (
            <QRCode
              value={qrValue}
              size={qrSize}
              fgColor={fgColor}
              bgColor={bgColor}
              level={level}
              renderAs="canvas"
            />
          ) : (
            <div 
              className="flex flex-col items-center justify-center text-neutral-dark text-center p-4"
              style={{ width: qrSize, height: qrSize, backgroundColor: bgColor }}
            >
              <Info size={qrSize/4 > 24 ? qrSize/4 : 24} className="mb-2 text-gray-400" />
              <p className="text-sm">Enter data in the panel to generate QR code.</p>
            </div>
          )}
        </div>
        <button
          onClick={handleDownload}
          disabled={isQrDataEmpty() || !qrValue}
          className="w-full max-w-xs flex items-center justify-center px-6 py-3 bg-accent hover:bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={20} className="mr-2" />
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QrGeneratorDemo;
