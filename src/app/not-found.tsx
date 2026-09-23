import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col justify-center items-center px-4">
      <h1 className="text-6xl font-extrabold text-[#ccff00] mb-2">404</h1>
      <h2 className="text-xl font-bold uppercase mb-4">Page Not Found</h2>
      <p className="text-gray-400 text-xs mb-6">The page you are looking for does not exist.</p>
      <Link href="/" className="bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#b3e600] transition">
        Return Home
      </Link>
    </div>
  );
}