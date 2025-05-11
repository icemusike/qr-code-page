import React from 'react';
import { QrCode } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary to-secondary text-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <QrCode size={64} className="mx-auto mb-6 text-accent" />
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Create Custom QR Codes Instantly
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Generate QR codes for URLs, text, email, SMS, WiFi, and more. Fully customizable, easy to use, and free!
        </p>
        <a
          href="#demo"
          className="bg-accent hover:bg-amber-500 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition duration-300"
        >
          Try the Generator
        </a>
      </div>
    </section>
  );
};
export default Hero;
