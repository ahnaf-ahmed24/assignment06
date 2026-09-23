'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Workout } from '../types/workout';
import { Clock, Flame, Star, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import HeroImg from '../assets/banner.png'

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error('Failed to fetch workouts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8">
      {/* Hero Banner */}
      <div className="bg-[#12141a] rounded-2xl p-8 md:p-12 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div className="max-w-xl">
          <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">WORKOUT LIBRARY</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2 mb-4 font-sans uppercase">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <Link
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-xl hover:bg-[#b3e600] transition"
          >
            BROWSE WORKOUTS <ArrowDown className="w-4 h-4" />
          </Link>
        </div>
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src={HeroImg}
            alt="Logo"
            className="w-full flex justify-center"
          />
        </div>
      </div>

      {/* Library Section */}
      <div id="library" className="scroll-mt-24">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold uppercase tracking-wide">THE LIBRARY</h2>
          <p className="text-gray-400 text-sm">Twelve lifts covering every major muscle group.</p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ccff00]"></div>
            <span className="ml-4 text-gray-400">Loading workouts...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/fitlog/${workout.id}`}
                className="bg-[#12141a] border border-gray-800 hover:border-gray-600 rounded-xl overflow-hidden transition group flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 w-full relative bg-[#1a1d24] overflow-hidden">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {(workout.muscleGroups || []).map((cat, idx) => (
                        <span key={idx} className="bg-[#ccff00] text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold uppercase text-white mb-1 group-hover:text-[#ccff00] transition">{workout.name}</h3>
                    <p className="text-gray-400 text-xs mb-4">{workout.equipment}</p>
                  </div>
                </div>

                {/* Stat Row */}
                <div className="px-5 pb-5 pt-0 flex items-center gap-4 text-xs text-gray-400 border-t border-gray-800/50 mt-auto pt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {workout.duration} min</span>
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-400" /> {workout.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {workout.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}