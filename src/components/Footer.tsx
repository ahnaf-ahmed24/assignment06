import React from 'react';
import Logo from '../assets/logo.png'
import Image from 'next/image';


export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0f12] border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <div className="flex items-center gap-2 text-white font-bold tracking-wider">
          <Image
          src={Logo}
          alt="Logo"
          className="text-[#ccff00] w-5 h-5"
          />
          <span>FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}