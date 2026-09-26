'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Workout } from '../../../types/workout';
import { usePlan } from '../../../context/PlanContext';
import { Plus, Bookmark, CheckCircle2 } from 'lucide-react';

export default function WorkoutDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetail();
  }, [id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddPlan = () => {
    if (!workout) return;
    const result = addToPlan(workout);

    if (result && result.success) {
      showToast("Added to today's plan!");
    } else if (result && result.reason === 'already') {
      showToast("Already added to your plan!");
    } 
  };

  const handleSaveLater = () => {
    if (!workout) return;
    const result = addToSaved(workout);

    if (result && result.success) {
      showToast("Saved for later!");
    } else if (result && result.reason === 'already') {
      showToast("Already in your saved list!");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading details...</div>;
  }

  if (!workout) {
    return <div className="text-center py-20 text-red-400">Workout not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#ccff00] text-black px-4 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 z-50">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#12141a] p-6 md:p-10 rounded-2xl border border-gray-800">
        {/* Left Side — Image */}
        <div className="w-full h-full min-h-[350px] bg-[#1a1d24] rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center">
          <img src={workout.image} alt={workout.name} className="w-full h-full object-cover max-h-[500px]" />
        </div>

        {/* Right Side  */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-wide mb-2">{workout.name}</h1>
            <p className="text-gray-400 text-sm mb-4">{workout.description}</p>

            <div className="flex gap-2 mb-6">
              {(workout.muscleGroups || []).map((cat, i) => (
                <span key={i} className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-md uppercase">
                  {cat}
                </span>
              ))}
            </div>

            {/* Key  Panel */}
            <div className="bg-[#161920] border border-gray-800 rounded-xl p-4 mb-6 divide-y divide-gray-800/60 text-xs">
              <div className="flex justify-between py-2"><span className="text-gray-400 font-bold uppercase">EQUIPMENT</span><span>{workout.equipment}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 font-bold uppercase">DIFFICULTY</span><span>{workout.difficulty}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 font-bold uppercase">SETS</span><span>{workout.sets}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 font-bold uppercase">REPS</span><span>{workout.reps}</span></div>
              <div className="flex justify-between py-2"><span className="text-gray-400 font-bold uppercase">DURATION</span><span>{workout.duration} min</span></div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400 font-bold uppercase">CALORIES</span>
                <span className="font-semibold text-white">{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex justify-between py-2"><span className="text-gray-400 font-bold uppercase">RATING</span><span>{workout.rating}</span></div>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">INSTRUCTIONS</h3>
              <ol className="space-y-2 text-xs text-gray-300">
                {(workout.instructions || []).map((step, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-bold text-[#ccff00]">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-800">
            <button
              onClick={handleAddPlan}
              className="flex-1 bg-[#ccff00] text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b3e600] transition text-sm"
            >
              <Plus className="w-4 h-4" /> Add to today's plan
            </button>
            <button
              onClick={handleSaveLater}
              className="flex-1 border border-gray-700 hover:border-gray-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition text-sm"
            >
              <Bookmark className="w-4 h-4" /> Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}