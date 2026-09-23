import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '../assets/logo.png'


const Navbar = () => {
    return (
        <header className="w-full bg-[#0d0f12] border-b border-gray-800 sticky top-0 z-50">
            <nav className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
                {/* Left Logo */}
                <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-wider">
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="w-6 h-6 object-contain"
                    />
                    <span>FITLOG</span>
                </Link>


                {/* Middle Navigation Link */}
                <div className="flex items-center gap-2 bg-[#16191e] p-1 rounded-full border border-gray-800">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition `}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition `}
          >
            My Plan
          </Link>
        </div>



                {/* Right Status Bades */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold">
                        <span>Plan</span>
                    </Link>

                    <Link href="/" className="flex items-center gap-2 border border-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold hover:border-[#ccff00] transition">
                        <span>
                            Saved
                        </span>
                    </Link>

                </div>


            </nav>
        </header>
    );
};

export default Navbar;