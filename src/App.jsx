import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import QrGeneratorDemo from './components/QrGeneratorDemo';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      <Hero />
      <Features />
      <section id="demo" className="py-12 md:py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10 md:mb-16">
            Try Our QR Code Generator
          </h2>
          <div className="max-w-5xl mx-auto">
            <QrGeneratorDemo />
          </div>
        </div>
      </section>
      <Pricing />
      <Reviews />
      <Footer />
    </div>
  );
}
export default App;
