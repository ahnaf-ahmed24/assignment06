'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout } from '../types/workout';

export type AddResult = {
  success: boolean;
  reason?: 'added' | 'already' | 'limit';
};

interface PlanContextType {
  planList: Workout[];
  savedList: Workout[];
  completedIds: string[];
  addToPlan: (workout: Workout) => AddResult;
  addToSaved: (workout: Workout) => AddResult;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
  toggleDone: (id: string | number) => void; 
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // localStorage 
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('fitlog_plan');
      const savedSaved = localStorage.getItem('fitlog_saved');
      const savedCompleted = localStorage.getItem('fitlog_completed');

      if (savedPlan) setPlanList(JSON.parse(savedPlan));
      if (savedSaved) setSavedList(JSON.parse(savedSaved)); 
      if (savedCompleted) setCompletedIds(JSON.parse(savedCompleted));
    } catch (e) {
      console.error('LocalStorage load error:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);


  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('fitlog_plan', JSON.stringify(planList));
    }
  }, [planList, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('fitlog_saved', JSON.stringify(savedList));
    }
  }, [savedList, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('fitlog_completed', JSON.stringify(completedIds));
    }
  }, [completedIds, isInitialized]);


   // Add to Plan 
  const addToPlan = (workout: Workout): AddResult => {
    const isAlreadyAdded = planList.some((item) => String(item.id) === String(workout.id));
    if (isAlreadyAdded) {
      return { success: false, reason: 'already' };
    }

    if (planList.length >= 5) {
      return { success: false, reason: 'limit' };
    }

    setPlanList((prev) => [...prev, workout]);
    return { success: true, reason: 'added' };
  };

   // Add to Save 

  const addToSaved = (workout: Workout): AddResult => {
    const isAlreadySaved = savedList.some((item) => String(item.id) === String(workout.id));
    if (isAlreadySaved) {
      return { success: false, reason: 'already' };
    }

    setSavedList((prev) => [...prev, workout]);
    return { success: true, reason: 'added' };
  };


   // Remove From Plan 
  const removeFromPlan = (id: string | number) => {
    const stringId = String(id);
    setPlanList((prev) => prev.filter((item) => String(item.id) !== stringId));
 
    setCompletedIds((prev) => prev.filter((completedId) => completedId !== stringId));
  };


  //   Remove From Saveed 
  const removeFromSaved = (id: string | number) => {
    setSavedList((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };


   // Make As Done 
  const markAsDone = (id: string | number) => {
    const stringId = String(id);
    setCompletedIds((prev) => {
      if (!prev.includes(stringId)) {
        return [...prev, stringId];
      }
      return prev;
    });
  };


  // Toggle Function 
  const toggleDone = (id: string | number) => {
    const stringId = String(id);
    setCompletedIds((prev) =>
      prev.includes(stringId)
        ? prev.filter((item) => item !== stringId)
        : [...prev, stringId]
    );
  };

  return (
    <PlanContext.Provider
      value={{
        planList,
        savedList,
        completedIds,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        toggleDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within a PlanProvider');
  return context;
};