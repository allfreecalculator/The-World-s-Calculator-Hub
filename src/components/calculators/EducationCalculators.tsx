import React, { useState, useMemo, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  ClipboardCheck, 
  Award, 
  Calendar, 
  Timer, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Percent, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface EducationCalculatorsProps {
  id: string;
}

export default function EducationCalculators({ id }: EducationCalculatorsProps) {
  const [toastMessage, setToastMessage] = useState<string>('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // ==========================================
  // 1. GPA CALCULATOR STATE & LOGIC
  // ==========================================
  const gpaScale: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const [gpaCourses, setGpaCourses] = useState<Array<{ id: string; name: string; grade: string; credits: number }>>(() => {
    try {
      const saved = localStorage.getItem('edu_gpa_courses');
      if (saved) return JSON.parse(saved);
    } catch (e) { /* ignored */ }
    return [
      { id: '1', name: 'Mathematics 101', grade: 'A', credits: 4 },
      { id: '2', name: 'Physics Laboratory', grade: 'B+', credits: 3 },
      { id: '3', name: 'English Composition', grade: 'A-', credits: 3 },
      { id: '4', name: 'Computer Science', grade: 'B', credits: 4 },
    ];
  });

  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseGrade, setNewCourseGrade] = useState('A');
  const [newCourseCredits, setNewCourseCredits] = useState(3);

  useEffect(() => {
    localStorage.setItem('edu_gpa_courses', JSON.stringify(gpaCourses));
  }, [gpaCourses]);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCourseName.trim() || `Course #${gpaCourses.length + 1}`;
    const newCourse = {
      id: Date.now().toString(),
      name,
      grade: newCourseGrade,
      credits: Number(newCourseCredits) || 3
    };
    setGpaCourses([...gpaCourses, newCourse]);
    setNewCourseName('');
    triggerToast('Course added successfully!');
  };

  const handleRemoveCourse = (id: string) => {
    setGpaCourses(gpaCourses.filter(c => c.id !== id));
    triggerToast('Course removed');
  };

  const gpaResult = useMemo(() => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    gpaCourses.forEach(c => {
      const gp = gpaScale[c.grade] || 0;
      totalGradePoints += gp * c.credits;
      totalCredits += c.credits;
    });

    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    
    let standing = 'Satisfactory';
    let color = 'text-slate-600 dark:text-zinc-400';
    let bgColor = 'bg-slate-50 dark:bg-zinc-800/50';
    let borderColor = 'border-slate-200 dark:border-zinc-800';

    if (gpa >= 3.8) {
      standing = "Summa Cum Laude / Perfect standing!";
      color = 'text-amber-600 dark:text-amber-400';
      bgColor = 'bg-amber-50 dark:bg-amber-950/20';
      borderColor = 'border-amber-200 dark:border-amber-800';
    } else if (gpa >= 3.5) {
      standing = "Dean's List Standing!";
      color = 'text-emerald-600 dark:text-emerald-400';
      bgColor = 'bg-emerald-50 dark:bg-emerald-950/20';
      borderColor = 'border-emerald-200 dark:border-emerald-800';
    } else if (gpa >= 3.0) {
      standing = 'Good Standing';
      color = 'text-sky-600 dark:text-sky-400';
      bgColor = 'bg-sky-50 dark:bg-sky-950/20';
      borderColor = 'border-sky-200 dark:border-sky-800';
    } else if (gpa < 2.0 && totalCredits > 0) {
      standing = 'Academic Warning';
      color = 'text-rose-600 dark:text-rose-400';
      bgColor = 'bg-rose-50 dark:bg-rose-950/20';
      borderColor = 'border-rose-200 dark:border-rose-800';
    }

    return {
      gpa,
      totalCredits,
      totalGradePoints,
      standing,
      color,
      bgColor,
      borderColor
    };
  }, [gpaCourses]);


  // ==========================================
  // 2. CGPA CALCULATOR STATE & LOGIC
  // ==========================================
  const [semesters, setSemesters] = useState<Array<{ id: string; name: string; gpa: number; credits: number }>>(() => {
    try {
      const saved = localStorage.getItem('edu_cgpa_semesters');
      if (saved) return JSON.parse(saved);
    } catch (e) { /* ignored */ }
    return [
      { id: '1', name: 'Semester 1', gpa: 3.60, credits: 15 },
      { id: '2', name: 'Semester 2', gpa: 3.45, credits: 16 },
      { id: '3', name: 'Semester 3', gpa: 3.75, credits: 14 },
    ];
  });

  const [newSemName, setNewSemName] = useState('');
  const [newSemGpa, setNewSemGpa] = useState<number>(3.5);
  const [newSemCredits, setNewSemCredits] = useState<number>(15);

  // Target CGPA sub-calculator state
  const [currentCgpa, setCurrentCgpa] = useState<number>(3.3);
  const [creditsCompleted, setCreditsCompleted] = useState<number>(45);
  const [targetCgpa, setTargetCgpa] = useState<number>(3.6);
  const [remainingCredits, setRemainingCredits] = useState<number>(15);

  useEffect(() => {
    localStorage.setItem('edu_cgpa_semesters', JSON.stringify(semesters));
  }, [semesters]);

  const handleAddSemester = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newSemName.trim() || `Semester ${semesters.length + 1}`;
    const newSem = {
      id: Date.now().toString(),
      name,
      gpa: Number(newSemGpa) || 3.0,
      credits: Number(newSemCredits) || 15
    };
    setSemesters([...semesters, newSem]);
    setNewSemName('');
    triggerToast('Semester added!');
  };

  const handleRemoveSemester = (id: string) => {
    setSemesters(semesters.filter(s => s.id !== id));
    triggerToast('Semester removed');
  };

  const cgpaResult = useMemo(() => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    semesters.forEach(s => {
      totalGradePoints += s.gpa * s.credits;
      totalCredits += s.credits;
    });

    const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    const percentageCbse = cgpa * 9.5;
    const percentageLinear = (cgpa / 4.0) * 100;

    return {
      cgpa,
      totalCredits,
      percentageCbse,
      percentageLinear
    };
  }, [semesters]);

  const targetRequiredGpa = useMemo(() => {
    if (remainingCredits <= 0) return 0;
    const totalCreditsNeeded = creditsCompleted + remainingCredits;
    const totalPointsNeeded = totalCreditsNeeded * targetCgpa;
    const currentPoints = creditsCompleted * currentCgpa;
    const neededPointsFromRemaining = totalPointsNeeded - currentPoints;
    const requiredGpa = neededPointsFromRemaining / remainingCredits;
    return isFinite(requiredGpa) ? requiredGpa : 0;
  }, [currentCgpa, creditsCompleted, targetCgpa, remainingCredits]);


  // ==========================================
  // 3. GRADE & FINAL GRADE CALCULATOR
  // ==========================================
  const [currentClassGrade, setCurrentClassGrade] = useState<number>(82.5);
  const [finalExamWeight, setFinalExamWeight] = useState<number>(20);
  const [desiredTargetGrade, setDesiredTargetGrade] = useState<number>(85);

  const [courseworkItems, setCourseworkItems] = useState<Array<{ id: string; category: string; weight: number; score: number }>>([
    { id: '1', category: 'Homework', weight: 20, score: 95 },
    { id: '2', category: 'Midterm Exam', weight: 30, score: 78 },
    { id: '3', category: 'Projects', weight: 30, score: 85 },
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [newCatWeight, setNewCatWeight] = useState<number>(10);
  const [newCatScore, setNewCatScore] = useState<number>(90);

  const handleAddCatItem = (e: React.FormEvent) => {
    e.preventDefault();
    const category = newCatName.trim() || `Assessment ${courseworkItems.length + 1}`;
    setCourseworkItems([...courseworkItems, {
      id: Date.now().toString(),
      category,
      weight: Number(newCatWeight) || 10,
      score: Number(newCatScore) || 90
    }]);
    setNewCatName('');
    triggerToast('Assessment item added!');
  };

  const handleRemoveCatItem = (id: string) => {
    setCourseworkItems(courseworkItems.filter(item => item.id !== id));
    triggerToast('Assessment removed');
  };

  const currentComputedGrade = useMemo(() => {
    let totalWeight = 0;
    let weightedSum = 0;

    courseworkItems.forEach(item => {
      totalWeight += item.weight;
      weightedSum += item.score * (item.weight / 100);
    });

    const grade = totalWeight > 0 ? (weightedSum / (totalWeight / 100)) : 0;
    return {
      grade,
      totalWeight
    };
  }, [courseworkItems]);

  const requiredFinalExamScore = useMemo(() => {
    const finalWeightFraction = finalExamWeight / 100;
    if (finalWeightFraction <= 0 || finalWeightFraction >= 1) return 0;
    const requiredScore = (desiredTargetGrade - currentClassGrade * (1 - finalWeightFraction)) / finalWeightFraction;
    return isFinite(requiredScore) ? requiredScore : 0;
  }, [currentClassGrade, finalExamWeight, desiredTargetGrade]);


  // ==========================================
  // 4. MARKS PERCENTAGE CALCULATOR
  // ==========================================
  const [marksObtained, setMarksObtained] = useState<number>(415);
  const [maxMarks, setMaxMarks] = useState<number>(500);
  const [passingGradeThreshold, setPassingGradeThreshold] = useState<number>(40);

  // List Analyzer States
  const [marksListInput, setMarksListInput] = useState<string>('78, 85, 92, 60, 44, 91, 55, 73, 80');

  const rawMarksResult = useMemo(() => {
    const total = maxMarks || 1;
    const percent = (marksObtained / total) * 100;
    
    let letter = 'F';
    let feedback = 'Failed';
    let color = 'text-rose-500';

    if (percent >= 90) { letter = 'A'; feedback = 'Excellent!'; color = 'text-emerald-500'; }
    else if (percent >= 80) { letter = 'B'; feedback = 'Very Good!'; color = 'text-teal-500'; }
    else if (percent >= 70) { letter = 'C'; feedback = 'Good / Satisfactory'; color = 'text-sky-500'; }
    else if (percent >= 60) { letter = 'D'; feedback = 'Passable / Fair'; color = 'text-amber-500'; }
    else if (percent >= passingGradeThreshold) { letter = 'E'; feedback = 'Conditional Pass'; color = 'text-amber-600'; }

    return {
      percent,
      letter,
      feedback,
      color,
      passed: percent >= passingGradeThreshold
    };
  }, [marksObtained, maxMarks, passingGradeThreshold]);

  const listAnalysis = useMemo(() => {
    const rawNumbers = marksListInput
      .split(',')
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v));

    if (rawNumbers.length === 0) return null;

    const count = rawNumbers.length;
    const sum = rawNumbers.reduce((a, b) => a + b, 0);
    const average = sum / count;
    const min = Math.min(...rawNumbers);
    const max = Math.max(...rawNumbers);

    const passes = rawNumbers.filter(n => n >= passingGradeThreshold).length;
    const passPercentage = (passes / count) * 100;

    // Standard deviation
    const variance = rawNumbers.reduce((a, b) => a + Math.pow(b - average, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    return {
      count,
      average,
      min,
      max,
      passes,
      passPercentage,
      stdDev
    };
  }, [marksListInput, passingGradeThreshold]);


  // ==========================================
  // 5. ATTENDANCE & BUNK CALCULATOR
  // ==========================================
  const [totalClasses, setTotalClasses] = useState<number>(42);
  const [attendedClasses, setAttendedClasses] = useState<number>(33);
  const [targetAttendance, setTargetAttendance] = useState<number>(75);

  const attendanceResult = useMemo(() => {
    const total = totalClasses || 1;
    const currentPercent = (attendedClasses / total) * 100;
    const targetFraction = targetAttendance / 100;

    const status = currentPercent >= targetAttendance ? 'safe' : 'bunking_danger';

    let skipConsecutive = 0;
    if (status === 'safe') {
      // Find S where: attendedClasses / (totalClasses + S) >= targetFraction
      // attendedClasses / targetFraction >= totalClasses + S
      // S <= attendedClasses / targetFraction - totalClasses
      skipConsecutive = Math.floor(attendedClasses / targetFraction - totalClasses);
      if (skipConsecutive < 0) skipConsecutive = 0;
    }

    let attendConsecutive = 0;
    if (status === 'bunking_danger') {
      // Find A where: (attendedClasses + A) / (totalClasses + A) >= targetFraction
      // attendedClasses + A >= targetFraction * (totalClasses + A)
      // attendedClasses + A >= targetFraction * totalClasses + targetFraction * A
      // A * (1 - targetFraction) >= targetFraction * totalClasses - attendedClasses
      // A >= (targetFraction * totalClasses - attendedClasses) / (1 - targetFraction)
      attendConsecutive = Math.ceil((targetFraction * totalClasses - attendedClasses) / (1 - targetFraction));
      if (attendConsecutive < 0) attendConsecutive = 0;
    }

    return {
      currentPercent,
      status,
      skipConsecutive,
      attendConsecutive
    };
  }, [totalClasses, attendedClasses, targetAttendance]);


  // ==========================================
  // 6. STUDY TIME OPTIMIZER & POMODORO TIMER
  // ==========================================
  const [studyMinutes, setStudyMinutes] = useState<number>(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState<number>(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState<number>(15);

  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(25 * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'study' | 'short_break' | 'long_break'>('study');

  // Spaced Repetition Dates generator
  const [spacedStart, setSpacedStart] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const spacedDates = useMemo(() => {
    const d = new Date(spacedStart);
    if (isNaN(d.getTime())) return [];

    const intervals = [
      { name: 'First Review (Day 1)', days: 1, desc: 'Reinforce primary memory nodes.' },
      { name: 'Second Review (Day 3)', days: 3, desc: 'Retrieve details before decay.' },
      { name: 'Third Review (Day 7)', days: 7, desc: 'Establish robust connections.' },
      { name: 'Fourth Review (Day 14)', days: 14, desc: 'Solidify long-term recall structures.' },
      { name: 'Fifth Review (Day 30)', days: 30, desc: 'Integrate into core academic inventory.' },
      { name: 'Sixth Review (Day 60)', days: 60, desc: 'Permanent structural mastery.' },
    ];

    return intervals.map(item => {
      const targetDate = new Date(spacedStart);
      targetDate.setDate(targetDate.getDate() + item.days);
      return {
        ...item,
        dateString: targetDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
      };
    });
  }, [spacedStart]);

  // Pomodoro timer ticking logic
  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSecondsLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            // Alert sound or state change
            const nextMode = timerMode === 'study' ? 'short_break' : 'study';
            setTimerMode(nextMode);
            const nextTime = nextMode === 'study' ? studyMinutes : shortBreakMinutes;
            triggerToast(timerMode === 'study' ? '🔔 Study Session Finished! Time for a short break.' : '🔔 Break Over! Let’s get back to work.');
            return nextTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerMode, studyMinutes, shortBreakMinutes]);

  const handleResetTimer = () => {
    setTimerActive(false);
    const mins = timerMode === 'study' 
      ? studyMinutes 
      : timerMode === 'short_break' 
      ? shortBreakMinutes 
      : longBreakMinutes;
    setTimerSecondsLeft(mins * 60);
    triggerToast('Timer Reset');
  };

  const handleSwitchMode = (mode: 'study' | 'short_break' | 'long_break') => {
    setTimerActive(false);
    setTimerMode(mode);
    const mins = mode === 'study' 
      ? studyMinutes 
      : mode === 'short_break' 
      ? shortBreakMinutes 
      : longBreakMinutes;
    setTimerSecondsLeft(mins * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };


  // ==========================================
  // RENDER SELECTION HANDLER
  // ==========================================
  return (
    <div className="space-y-8 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. GPA CALCULATOR PANEL */}
      {id === 'gpa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form & Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-zinc-800">
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-500" />
                  Course List & Letter Grades
                </h4>
                <button
                  onClick={() => {
                    setGpaCourses([
                      { id: '1', name: 'Mathematics 101', grade: 'A', credits: 4 },
                      { id: '2', name: 'Physics Laboratory', grade: 'B+', credits: 3 },
                      { id: '3', name: 'English Composition', grade: 'A-', credits: 3 },
                    ]);
                    triggerToast('Default course list loaded');
                  }}
                  className="text-xs text-slate-400 hover:text-amber-500 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Defaults
                </button>
              </div>

              {/* Add Course Form */}
              <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 dark:bg-zinc-850/40 p-4 rounded-2xl border border-slate-150 dark:border-zinc-800">
                <div className="md:col-span-5 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Course Name</label>
                  <input
                    type="text"
                    required
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="e.g. History 101"
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden font-medium"
                  />
                </div>
                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Letter Grade</label>
                  <select
                    value={newCourseGrade}
                    onChange={(e) => setNewCourseGrade(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden font-semibold"
                  >
                    {Object.keys(gpaScale).map((g) => (
                      <option key={g} value={g}>{g} ({gpaScale[g].toFixed(1)} pts)</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Credits</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={newCourseCredits}
                    onChange={(e) => setNewCourseCredits(Math.max(1, Number(e.target.value)))}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </form>

              {/* Course Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="pb-3 pl-2">Course Name</th>
                      <th className="pb-3">Credits</th>
                      <th className="pb-3">Grade</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-zinc-850">
                    {gpaCourses.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-medium">
                          No courses added yet. Use the fields above to track your classes!
                        </td>
                      </tr>
                    ) : (
                      gpaCourses.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50">
                          <td className="py-3.5 pl-2 font-bold text-slate-950 dark:text-white">{c.name}</td>
                          <td className="py-3.5 font-medium text-slate-600 dark:text-zinc-300">{c.credits} Credit Hours</td>
                          <td className="py-3.5">
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 font-bold rounded text-slate-700 dark:text-zinc-300">
                              {c.grade} ({gpaScale[c.grade].toFixed(1)})
                            </span>
                          </td>
                          <td className="py-3.5 text-right pr-2">
                            <button
                              onClick={() => handleRemoveCourse(c.id)}
                              className="p-1 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                              title="Delete Course"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs text-center space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Semester Results
              </span>
              <div className="space-y-1.5">
                <span className="text-5xl font-black text-amber-500 tracking-tight">{gpaResult.gpa.toFixed(2)}</span>
                <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wide">Semester Grade Point Average</span>
              </div>

              {/* Status Box */}
              <div className={`p-4 border rounded-2xl text-left ${gpaResult.bgColor} ${gpaResult.borderColor}`}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Academic Standing</span>
                <span className={`text-xs font-bold flex items-center gap-1 ${gpaResult.color}`}>
                  🎓 {gpaResult.standing}
                </span>
                <div className="mt-3 grid grid-cols-2 gap-4 border-t border-slate-200/50 dark:border-zinc-800/50 pt-2.5 text-left">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Total Credits</span>
                    <span className="text-xs font-black text-slate-800 dark:text-zinc-200">{gpaResult.totalCredits} Hrs</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Grade Points</span>
                    <span className="text-xs font-black text-slate-800 dark:text-zinc-200">{gpaResult.totalGradePoints.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-normal">
                Standard US 4.0 weighted system. Your course information is persisted safely on this device.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. CGPA CALCULATOR PANEL */}
      {id === 'cgpa' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Semester list */}
            <div className="lg:col-span-8 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-zinc-800">
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  Semester List for CGPA
                </h4>
              </div>

              {/* Add Semester Form */}
              <form onSubmit={handleAddSemester} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 dark:bg-zinc-850/40 p-4 rounded-2xl border border-slate-150 dark:border-zinc-800">
                <div className="md:col-span-5 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Semester Label</label>
                  <input
                    type="text"
                    required
                    value={newSemName}
                    onChange={(e) => setNewSemName(e.target.value)}
                    placeholder="e.g. Fall Year 1"
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden"
                  />
                </div>
                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Semester GPA (0.0 - 4.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    required
                    value={newSemGpa}
                    onChange={(e) => setNewSemGpa(Math.min(4, Math.max(0, Number(e.target.value))))}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden font-bold"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Credits Completed</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    required
                    value={newSemCredits}
                    onChange={(e) => setNewSemCredits(Math.max(1, Number(e.target.value)))}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </form>

              {/* Semester Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="pb-3 pl-2">Semester Label</th>
                      <th className="pb-3">Credits Weight</th>
                      <th className="pb-3">GPA</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-zinc-850">
                    {semesters.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-medium">
                          No semester averages registered. Enter semester GPAs above.
                        </td>
                      </tr>
                    ) : (
                      semesters.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50">
                          <td className="py-3.5 pl-2 font-bold text-slate-950 dark:text-white">{s.name}</td>
                          <td className="py-3.5 font-medium text-slate-600 dark:text-zinc-300">{s.credits} Credits</td>
                          <td className="py-3.5 font-bold text-amber-500">{s.gpa.toFixed(2)}</td>
                          <td className="py-3.5 text-right pr-2">
                            <button
                              onClick={() => handleRemoveSemester(s.id)}
                              className="p-1 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right cumulative side */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs text-center space-y-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  Cumulative Summary
                </span>
                <div className="space-y-1.5">
                  <span className="text-5xl font-black text-amber-500 tracking-tight">{cgpaResult.cgpa.toFixed(2)}</span>
                  <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wide">Overall CGPA Average</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 rounded-2xl text-left space-y-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Conversions Overview</span>
                  <div>
                    <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">CBSE Percentage (9.5 multiplier):</span>
                    <span className="text-sm font-black text-amber-500">{cgpaResult.percentageCbse.toFixed(1)}%</span>
                  </div>
                  <div className="border-t border-slate-200/50 dark:border-zinc-800/50 pt-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">Linear Percentage (US Scale):</span>
                    <span className="text-sm font-black text-sky-500">{cgpaResult.percentageLinear.toFixed(1)}%</span>
                  </div>
                  <div className="border-t border-slate-200/50 dark:border-zinc-800/50 pt-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">Total Combined Credits:</span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-zinc-200">{cgpaResult.totalCredits} Credit Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Target CGPA Goal Planner Sub-Widget */}
          <div className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Target CGPA & Academic Goal Planner
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              Calculate the required average GPA you need in your upcoming semesters/credits to hit a target cumulative CGPA.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={currentCgpa}
                  onChange={(e) => setCurrentCgpa(Number(e.target.value))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed Credits</label>
                <input
                  type="number"
                  min="1"
                  value={creditsCompleted}
                  onChange={(e) => setCreditsCompleted(Math.max(1, Number(e.target.value)))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target CGPA Goal</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={targetCgpa}
                  onChange={(e) => setTargetCgpa(Number(e.target.value))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Remaining Credits</label>
                <input
                  type="number"
                  min="1"
                  value={remainingCredits}
                  onChange={(e) => setRemainingCredits(Math.max(1, Number(e.target.value)))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden"
                />
              </div>
            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Target GPA Required</h5>
                <p className="text-[11px] text-slate-500">
                  You need an average of <strong className="text-amber-500">{targetRequiredGpa.toFixed(2)}</strong> across your next {remainingCredits} credits to achieve a CGPA of {targetCgpa}.
                </p>
              </div>
              <div className="px-5 py-2.5 bg-white dark:bg-zinc-950 rounded-xl border border-amber-500/30 shrink-0">
                <span className={`text-xl font-black ${targetRequiredGpa > 4.0 ? 'text-rose-500' : 'text-amber-500'}`}>
                  {targetRequiredGpa > 4.0 ? 'Impossible (>4.0)' : targetRequiredGpa <= 0 ? 'Guaranteed (0.0)' : targetRequiredGpa.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. GRADE & FINAL GRADE CALCULATOR */}
      {id === 'grade' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          {/* Workcourse items */}
          <div className="lg:col-span-8 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <ClipboardCheck className="w-5 h-5 text-amber-500" />
              Weight Class Grades & Coursework Analyzer
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Calculate your current aggregate class grade using different weighted categories (e.g. Quizzes, Projects).
            </p>

            {/* Add item */}
            <form onSubmit={handleAddCatItem} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-50 dark:bg-zinc-850/40 p-4 rounded-2xl border border-slate-150 dark:border-zinc-800">
              <div className="md:col-span-5 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Category / Homework Item</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Quizzes, Midterm"
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden"
                />
              </div>
              <div className="md:col-span-3 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Weight (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={newCatWeight}
                  onChange={(e) => setNewCatWeight(Math.max(1, Number(e.target.value)))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Score (%)</label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  required
                  value={newCatScore}
                  onChange={(e) => setNewCatScore(Math.max(0, Number(e.target.value)))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-500 outline-hidden"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </form>

            {/* Assessment table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-zinc-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Category Name</th>
                    <th className="pb-3">Syllabus Weight</th>
                    <th className="pb-3">Your Grade</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-zinc-850">
                  {courseworkItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/50">
                      <td className="py-3 pl-2 font-bold text-slate-950 dark:text-white">{item.category}</td>
                      <td className="py-3 font-semibold text-slate-600 dark:text-zinc-300">{item.weight}% of grade</td>
                      <td className="py-3 font-bold text-amber-500">{item.score.toFixed(1)}%</td>
                      <td className="py-3 text-right pr-2">
                        <button
                          onClick={() => handleRemoveCatItem(item.id)}
                          className="p-1 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total feedback bar */}
            <div className="p-4 bg-slate-50 dark:bg-zinc-850 border border-slate-150 dark:border-zinc-800 rounded-2xl flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 font-bold block uppercase tracking-wide text-[10px]">Total Configured Weight</span>
                <span className="font-extrabold text-slate-800 dark:text-zinc-200">{currentComputedGrade.totalWeight}% (Should ideally sum to 100%)</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 font-bold block uppercase tracking-wide text-[10px]">Computed Current Grade</span>
                <span className="font-black text-amber-500 text-sm">{currentComputedGrade.grade.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* Final Exam Required score widget */}
          <div className="lg:col-span-4 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
            <div className="text-center pb-4 border-b border-slate-100 dark:border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Final Exam Target
              </span>
              <h4 className="font-extrabold text-sm text-slate-950 dark:text-white mt-4">Required Final Exam Score</h4>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Class Grade (%)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={currentClassGrade}
                    onChange={(e) => setCurrentClassGrade(Number(e.target.value))}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs font-bold outline-hidden"
                  />
                  <button
                    onClick={() => setCurrentClassGrade(Math.round(currentComputedGrade.grade * 10) / 10)}
                    className="px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl text-[10px] font-bold shrink-0 text-slate-500 transition-colors"
                    title="Use computed value from table"
                  >
                    Copy Table
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Final Exam Weight (%)</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={finalExamWeight}
                  onChange={(e) => setFinalExamWeight(Number(e.target.value))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs font-bold outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Desired Overall Grade (%)</label>
                <input
                  type="number"
                  value={desiredTargetGrade}
                  onChange={(e) => setDesiredTargetGrade(Number(e.target.value))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs font-bold outline-hidden"
                />
              </div>
            </div>

            {/* Required exam output card */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide block">Required Score on Final</span>
              <span className={`text-3xl font-black block tracking-tight ${requiredFinalExamScore > 100 ? 'text-rose-500' : 'text-amber-500'}`}>
                {requiredFinalExamScore > 100 ? 'Impossible' : requiredFinalExamScore <= 0 ? 'Guaranteed 0.0%' : `${requiredFinalExamScore.toFixed(1)}%`}
              </span>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed pt-1.5">
                {requiredFinalExamScore > 100 
                  ? `An overall grade of ${desiredTargetGrade}% is impossible. You need more than 100% on the final.` 
                  : requiredFinalExamScore <= 0 
                  ? `You will achieve your target grade of ${desiredTargetGrade}% even with a 0% score on the final exam!`
                  : `You need at least a ${requiredFinalExamScore.toFixed(1)}% on your final exam to secure a ${desiredTargetGrade}% class grade.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. MARKS PERCENTAGE CALCULATOR */}
      {id === 'marks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          {/* Main inputs */}
          <div className="lg:col-span-6 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <Award className="w-5 h-5 text-amber-500" />
              Raw Marks to Percent Conversion
            </h4>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Marks Obtained</label>
                  <input
                    type="number"
                    min="0"
                    value={marksObtained}
                    onChange={(e) => setMarksObtained(Math.max(0, Number(e.target.value)))}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs font-bold outline-hidden"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Max / Out of Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(Math.max(1, Number(e.target.value)))}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs font-bold outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Passing Grade Threshold (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={passingGradeThreshold}
                  onChange={(e) => setPassingGradeThreshold(Number(e.target.value))}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs outline-hidden"
                />
              </div>

              {/* Conversion Output Card */}
              <div className="p-5 bg-slate-50 dark:bg-zinc-850 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Computed Score</span>
                <span className="text-4xl font-black text-amber-500 block">{rawMarksResult.percent.toFixed(2)}%</span>
                
                <div className="flex justify-center gap-3 pt-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 ${rawMarksResult.color}`}>
                    Letter Grade: <strong className="text-sm font-black">{rawMarksResult.letter}</strong>
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-md border ${rawMarksResult.passed ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 border-emerald-200' : 'bg-rose-50 dark:bg-rose-950/20 text-rose-500 border-rose-200'}`}>
                    {rawMarksResult.passed ? 'Passed ✓' : 'Failed ✗'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium pt-1.5">{rawMarksResult.feedback}</p>
              </div>
            </div>
          </div>

          {/* List analyzer widget */}
          <div className="lg:col-span-6 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <FileText className="w-5 h-5 text-amber-500" />
              Class Marks List & Distribution Analyzer
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Analyze a list of grades/test scores to find average marks, passing rates, and distribution variance.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Test Scores (comma-separated)</label>
                <textarea
                  value={marksListInput}
                  onChange={(e) => setMarksListInput(e.target.value)}
                  rows={2}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs outline-hidden font-mono"
                  placeholder="e.g. 80, 45, 90, 75, 62"
                />
              </div>

              {listAnalysis && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-zinc-850 rounded-2xl border border-slate-200 dark:border-zinc-800 text-xs font-medium">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wide block">Total Tests</span>
                    <span className="text-sm font-black text-slate-800 dark:text-zinc-200">{listAnalysis.count} Students</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wide block">Average Mark</span>
                    <span className="text-sm font-black text-amber-500">{listAnalysis.average.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wide block">Pass Rate</span>
                    <span className="text-sm font-black text-emerald-500">{listAnalysis.passPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="border-t border-slate-200/50 dark:border-zinc-800/50 pt-2.5">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wide block">Lowest Score</span>
                    <span className="text-xs font-bold text-rose-500">{listAnalysis.min}%</span>
                  </div>
                  <div className="border-t border-slate-200/50 dark:border-zinc-800/50 pt-2.5">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wide block">Highest Score</span>
                    <span className="text-xs font-bold text-emerald-500">{listAnalysis.max}%</span>
                  </div>
                  <div className="border-t border-slate-200/50 dark:border-zinc-800/50 pt-2.5">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wide block">Std Deviation</span>
                    <span className="text-xs font-bold text-sky-500">±{listAnalysis.stdDev.toFixed(1)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. ATTENDANCE & BUNK CALCULATOR */}
      {id === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          {/* Configuration Inputs */}
          <div className="lg:col-span-7 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <Calendar className="w-5 h-5 text-amber-500" />
              Class Attendance & Bunk Scheduler
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track your lecture attendance percentage, and instantly evaluate how many future lectures you can safely bunk (skip) or must attend consecutively to remain compliant.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Classes Attended So Far</label>
                  <input
                    type="number"
                    min="0"
                    value={attendedClasses}
                    onChange={(e) => setAttendedClasses(Math.max(0, Number(e.target.value)))}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs font-bold outline-hidden"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Total Lectures Conducted</label>
                  <input
                    type="number"
                    min="1"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(Math.max(1, Number(e.target.value)))}
                    className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs font-bold outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Required Target Threshold (%)</label>
                <div className="flex gap-2">
                  {[75, 80, 85, 90].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTargetAttendance(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        targetAttendance === t
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-slate-50 dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800'
                      }`}
                    >
                      {t}%
                    </button>
                  ))}
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={targetAttendance}
                    onChange={(e) => setTargetAttendance(Math.min(100, Math.max(1, Number(e.target.value))))}
                    className="block w-20 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-1.5 text-xs font-bold outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Result card */}
          <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              Attendance Evaluation
            </span>

            <div className="space-y-1">
              <span className={`text-5xl font-black block tracking-tight ${attendanceResult.currentPercent >= targetAttendance ? 'text-emerald-500' : 'text-rose-500'}`}>
                {attendanceResult.currentPercent.toFixed(1)}%
              </span>
              <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Current Attendance Rate</span>
            </div>

            {/* Bunk Action Panel */}
            {attendanceResult.status === 'safe' ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-left space-y-2">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">✓ Status compliant!</span>
                <h5 className="text-xs font-extrabold text-slate-900 dark:text-white leading-normal">
                  You are above your target threshold of {targetAttendance}%.
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                  You can safely skip <strong className="text-emerald-500 text-sm">{attendanceResult.skipConsecutive}</strong> consecutive classes without dropping below the requested limit.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-left space-y-2">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">✗ Below Threshold</span>
                <h5 className="text-xs font-extrabold text-slate-900 dark:text-white leading-normal">
                  You do not meet the minimum {targetAttendance}% required attendance.
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                  You must attend the next <strong className="text-rose-500 text-sm">{attendanceResult.attendConsecutive}</strong> consecutive classes to get your attendance rate back compliant.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. STUDY TIME OPTIMIZER & TIMER */}
      {id === 'study_time' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          {/* Pomodoro controls */}
          <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6 text-center flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-zinc-800">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-amber-500" /> Pomodoro Study Loop
                </h4>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleSwitchMode('study')}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${timerMode === 'study' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'}`}
                  >
                    Study
                  </button>
                  <button
                    onClick={() => handleSwitchMode('short_break')}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${timerMode === 'short_break' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'}`}
                  >
                    Break
                  </button>
                </div>
              </div>

              {/* Timer Display */}
              <div className="py-8 space-y-1">
                <span className="text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white block">
                  {formatTime(timerSecondsLeft)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {timerMode === 'study' ? '✍️ STUDY SESSION ACTIVE' : '☕ RESTING BREAK ACTIVE'}
                </span>
              </div>
            </div>

            {/* Timer Actions */}
            <div className="space-y-4">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setTimerActive(!timerActive)}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {timerActive ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> Start
                    </>
                  )}
                </button>
                <button
                  onClick={handleResetTimer}
                  className="px-4 py-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-850 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              {/* Customize Times */}
              <div className="grid grid-cols-2 gap-3 border-t border-slate-100 dark:border-zinc-800/60 pt-4 text-left">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Study Time (min)</span>
                  <input
                    type="number"
                    min="1"
                    value={studyMinutes}
                    onChange={(e) => {
                      const m = Math.max(1, Number(e.target.value));
                      setStudyMinutes(m);
                      if (timerMode === 'study') setTimerSecondsLeft(m * 60);
                    }}
                    className="block w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 text-xs outline-hidden"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Break Time (min)</span>
                  <input
                    type="number"
                    min="1"
                    value={shortBreakMinutes}
                    onChange={(e) => {
                      const m = Math.max(1, Number(e.target.value));
                      setShortBreakMinutes(m);
                      if (timerMode === 'short_break') setTimerSecondsLeft(m * 60);
                    }}
                    className="block w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 text-xs outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Spaced repetition */}
          <div className="lg:col-span-7 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-6">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-zinc-800">
              <Calendar className="w-5 h-5 text-amber-500" />
              Spaced Repetition Schedule Generator
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Input your primary study date or learning start, and our algorithm will generate the mathematically optimal recall milestones based on cognitive decay curves.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Primary Learning / Exam Topic Start Date</label>
                <input
                  type="date"
                  value={spacedStart}
                  onChange={(e) => setSpacedStart(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs font-bold outline-hidden text-slate-800 dark:text-white"
                />
              </div>

              {/* Milestones list */}
              <div className="space-y-3">
                {spacedDates.map((item) => (
                  <div key={item.name} className="p-3 bg-slate-50 dark:bg-zinc-850 border border-slate-150 dark:border-zinc-800 rounded-xl flex items-start gap-3">
                    <div className="p-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2">
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">{item.name}</span>
                        <span className="px-2 py-0.5 bg-white dark:bg-zinc-950 border border-slate-150 dark:border-zinc-800 rounded text-[10px] font-bold text-amber-500">
                          {item.dateString}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
