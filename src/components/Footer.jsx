import React from 'react';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-neutral-light py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">QR Code Generator</h5>
            <p className="text-sm">
              Create, customize, and download QR codes for all your needs. Simple, fast, and effective.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-secondary transition-colors">Features</a></li>
              <li><a href="#demo" className="hover:text-secondary transition-colors">Demo</a></li>
              <li><a href="#pricing" className="hover:text-secondary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Connect With xBesh Labs</h5>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://xbesh.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="xBesh Website"><Globe size={24} /></a>
              <a href="https://github.com/xbesh" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="xBesh GitHub"><Github size={24} /></a>
              <a href="https://linkedin.com/company/xbesh" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="xBesh LinkedIn"><Linkedin size={24} /></a>
              {/* <a href="https://twitter.com/xbesh" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="xBesh Twitter"><Twitter size={24} /></a> */}
            </div>
          </div>
        </div>
        <hr className="border-neutral mb-8" />
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} QR Code Generator. Built by <a href="https://xbesh.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary hover:underline">xBesh Labs, LLC</a>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
