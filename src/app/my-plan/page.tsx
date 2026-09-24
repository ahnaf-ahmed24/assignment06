'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlan } from '../../context/PlanContext';
import { Clock, Flame, Star, Check, X, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function MyPlan() {
  const { planList, savedList, completedIds, removeFromPlan, removeFromSaved, markAsDone, toggleDone } = usePlan() as any;
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState<'duration' | 'caloriesBurned' | 'rating'>('duration');
  const [toastMessage, setToastMessage] = useState<string | null>(null);



  const currentList = activeTab === 'plan' ? planList : savedList;


  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'caloriesBurned') {
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    }
    return (b[sortBy] || 0) - (a[sortBy] || 0);
  });


  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc: number, curr: any) => acc + (curr.duration || 0), 0);
  const totalCalories = currentList.reduce((acc: number, curr: any) => acc + (curr.caloriesBurned || 0), 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };


  const handleToggleStatus = (id: string | number, isCurrentlyDone: boolean) => {
    if (typeof toggleDone === 'function') {
      toggleDone(id);
    } else {
      markAsDone(id);
    }
    showToast(isCurrentlyDone ? 'Marked as incomplete' : 'Marked as done!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#ccff00] text-black px-4 py-3 rounded-xl font-bold shadow-xl flex items-center gap-2 z-50">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold uppercase tracking-wide">MY PLAN</h1>
        <p className="text-gray-400 text-sm mt-1">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0e1015] p-8 rounded-2xl border border-gray-800/80 mb-8">
        <div>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Exercises</span>
          <p className="text-4xl font-extrabold text-[#ccff00] mt-2">{totalExercises}</p>
        </div>
        <div>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Minutes</span>
          <p className="text-4xl font-extrabold text-white mt-2">{totalMinutes}</p>
        </div>
        <div>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Calories</span>
          <p className="text-4xl font-extrabold text-white mt-2">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs & Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        {/* Tab Buttons */}
        <div className="flex bg-[#0e1015] p-1.5 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'plan' ? 'bg-[#1a1d24] text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'saved' ? 'bg-[#1a1d24] text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>Sort By</span>
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0e1015] border border-gray-800 rounded-xl px-4 py-2 text-white appearance-none pr-9 cursor-pointer focus:outline-none focus:border-gray-600"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      {/* Workout Cards  */}
      {sortedList.length === 0 ? (
        <div className="bg-[#0e1015] border border-dashed border-gray-800 rounded-2xl p-16 text-center">
          <h2 className="text-xl font-bold uppercase mb-2">NOTHING HERE YET</h2>
          <p className="text-gray-400 text-xs mb-6">Browse the library and add a lift to get today moving.</p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-black font-extrabold px-6 py-2.5 rounded-xl text-xs hover:bg-[#b3e600] transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => {
            const isDone = completedIds?.map(String).includes(String(item.id));

            return (
              <div
                key={item.id}
                className="bg-[#0e1015] border border-gray-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-gray-700 transition"
              >
                {/* Image & Details */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-28 h-20 relative bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wide">{item.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">{item.equipment}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {item.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-orange-500" /> {item.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link
                    href={`/fitlog/${item.id}`}
                    className="border border-gray-800 hover:border-gray-600 bg-[#161920] text-xs font-bold px-5 py-2.5 rounded-xl transition text-white"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button
                      onClick={() => handleToggleStatus(item.id, isDone)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer ${isDone
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-[#ccff00] text-black hover:bg-[#b3e600]'
                        }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {isDone ? 'Completed' : 'Mark as Done'}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (activeTab === 'plan') {
                        removeFromPlan(item.id);
                        showToast('Removed from plan');
                      } else {
                        removeFromSaved(item.id);
                        showToast('Removed from saved');
                      }
                    }}
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-xl transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}