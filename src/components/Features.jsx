import React from 'react';
import { LinkIcon, Type, Mail, MessageSquare, Wifi, Palette, Minimize2, ShieldCheck } from 'lucide-react';

const featureItems = [
  { icon: <LinkIcon size={32} className="text-secondary" />, title: 'Multiple Data Types', description: 'Support for URLs, plain text, email addresses, SMS messages, WiFi credentials, and more.' },
  { icon: <Palette size={32} className="text-secondary" />, title: 'Color Customization', description: 'Personalize your QR codes with custom foreground and background colors to match your brand.' },
  { icon: <Minimize2 size={32} className="text-secondary" />, title: 'Adjustable Size', description: 'Generate QR codes in various sizes, from small for print to large for displays.' },
  { icon: <ShieldCheck size={32} className="text-secondary" />, title: 'Error Correction', description: 'Choose from different error correction levels to ensure scannability even if partially damaged.' },
  { icon: <Wifi size={32} className="text-secondary" />, title: 'WiFi Sharing', description: 'Easily share your WiFi network details without typing complex passwords.' },
  { icon: <Type size={32} className="text-secondary" />, title: 'Versatile Use Cases', description: 'Perfect for marketing, business cards, event tickets, product information, and personal use.' },
];

const Features = () => {
  return (
    <section id="features" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10 md:mb-16">
          Powerful Features at Your Fingertips
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature, index) => (
            <div key={index} className="bg-neutral-light p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-neutral-dark ml-3">{feature.title}</h3>
              </div>
              <p className="text-neutral-dark">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
