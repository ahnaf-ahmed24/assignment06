'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlan } from '../context/PlanContext';
import Logo from '../assets/logo.png'
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = usePlan();

  return (
    <header className="w-full bg-[#0d0f12] border-b border-gray-800 sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* Left Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-wider">
          <Image
            src={Logo}
            alt='Logo'
            className="w-6 h-6"
          />
          <span>FITLOG</span>
        </Link>

        {/* Middle Navigation Links */}
        <div className="flex items-center gap-2 bg-[#16191e] p-1 rounded-full border border-gray-800">
          <Link
            href="/"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition ${
              pathname === '/' ? 'bg-[#ccff00] text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition ${
              pathname === '/my-plan' ? 'bg-[#ccff00] text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Status Badges */}
        <div className="flex items-center gap-3">
          <Link href="/my-plan" className="flex items-center gap-2 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold">
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] w-5 h-5 rounded-full flex items-center justify-center font-extrabold text-[10px]">
              {planList.length}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2 border border-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold hover:border-[#ccff00] transition">
            <span>Saved</span>
            <span className="bg-gray-800 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]">
              {savedList.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}