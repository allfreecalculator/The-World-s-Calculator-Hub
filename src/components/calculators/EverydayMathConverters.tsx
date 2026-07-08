import React, { useState, useMemo } from 'react';
import { Hash, Binary, GraduationCap, RefreshCw, Tag, CupSoda, Calendar, CalendarRange, Key, Copy, Check, Equal, Delete, Plus, Trash2, Globe } from 'lucide-react';

interface EverydayMathConvertersProps {
  id: string;
}

export default function EverydayMathConverters({ id }: EverydayMathConvertersProps) {
  const [copied, setCopied] = useState<boolean>(false);

  // 1. PERCENTAGE CALCULATOR STATES
  const [p1, setP1] = useState<number>(10);
  const [y1, setY1] = useState<number>(150);
  const [p2Val1, setP2Val1] = useState<number>(30);
  const [p2Val2, setP2Val2] = useState<number>(120);
  const [p3Val1, setP3Val1] = useState<number>(50);
  const [p3Val2, setP3Val2] = useState<number>(80);

  // 2. SCIENTIFIC CALCULATOR STATES
  const [calcDisplay, setCalcDisplay] = useState<string>('');
  const [calcResult, setCalcResult] = useState<string>('0');
  const [calcHistory, setCalcHistory] = useState<string[]>([]);

  // 3. GPA CALCULATOR STATES
  const [courses, setCourses] = useState<Array<{ id: string; name: string; grade: string; credits: number }>>([
    { id: '1', name: 'Mathematics 101', grade: 'A', credits: 4 },
    { id: '2', name: 'Physics Lab', grade: 'B+', credits: 3 },
    { id: '3', name: 'Intro to Philosophy', grade: 'A-', credits: 3 },
  ]);
  const [newCourseName, setNewCourseName] = useState<string>('');
  const [newCourseGrade, setNewCourseGrade] = useState<string>('A');
  const [newCourseCredits, setNewCourseCredits] = useState<number>(3);

  // 4. UNIT CONVERTER STATES
  const [convCategory, setConvCategory] = useState<string>('length');
  const [convVal, setConvVal] = useState<number>(1);
  const [convFrom, setConvFrom] = useState<string>('m');
  const [convTo, setConvTo] = useState<string>('ft');

  // 5. DISCOUNT CALCULATOR STATES
  const [originalPrice, setOriginalPrice] = useState<number>(80);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [taxPercent, setTaxPercent] = useState<number>(8);

  // 6. TIP CALCULATOR STATES
  const [billAmount, setBillAmount] = useState<number>(120);
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [splitPeople, setSplitPeople] = useState<number>(4);

  // 7. AGE CALCULATOR STATES
  const [dob, setDob] = useState<string>('1998-05-15');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // 8. DAYS BETWEEN DATES STATES
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-12-31');
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(true);

  // 9. PASSWORD GENERATOR STATES
  const [passLength, setPassLength] = useState<number>(16);
  const [passUpper, setPassUpper] = useState<boolean>(true);
  const [passLower, setPassLower] = useState<boolean>(true);
  const [passNum, setPassNum] = useState<boolean>(true);
  const [passSym, setPassSym] = useState<boolean>(true);
  const [generatedPass, setGeneratedPass] = useState<string>('p@ssw0rd_Str0ng_99');

  // Copy helper
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ==================== CALCULATION ENGINES ====================

  // 1. PERCENTAGE
  const percentageResults = useMemo(() => {
    // Mode 1: What is X% of Y?
    const r1 = (p1 / 100) * y1;
    // Mode 2: X is what percent of Y?
    const r2 = y1 > 0 ? (p2Val1 / p2Val2) * 100 : 0;
    // Mode 3: Percent increase/decrease from X to Y
    const r3 = p3Val1 > 0 ? ((p3Val2 - p3Val1) / p3Val1) * 100 : 0;

    return {
      r1: isFinite(r1) ? r1 : 0,
      r2: isFinite(r2) ? r2 : 0,
      r3: isFinite(r3) ? r3 : 0,
    };
  }, [p1, y1, p2Val1, p2Val2, p3Val1, p3Val2]);

  // 2. SCIENTIFIC CALCULATOR BUTTON HANDLERS
  const handleCalcPress = (btn: string) => {
    if (btn === 'C') {
      setCalcDisplay('');
      setCalcResult('0');
    } else if (btn === '⌫') {
      setCalcDisplay((prev) => prev.slice(0, -1));
    } else if (btn === '=') {
      try {
        // Sanitize and replace math syntax safely
        let mathExpression = calcDisplay
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/√\(/g, 'Math.sqrt(');

        // Basic safety evaluation
        // eslint-disable-next-line no-eval
        const result = eval(mathExpression);
        const formattedResult = Number(result).toLocaleString('en-US', { maximumFractionDigits: 6 });
        setCalcResult(formattedResult);
        setCalcHistory((prev) => [...prev.slice(-4), `${calcDisplay} = ${formattedResult}`]);
      } catch (err) {
        setCalcResult('Syntax Error');
      }
    } else {
      setCalcDisplay((prev) => prev + btn);
    }
  };

  // 3. GPA CALCULATOR
  const gpaScale: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const gpaResult = useMemo(() => {
    let totalGradePoints = 0;
    let totalCredits = 0;
    courses.forEach((c) => {
      const gp = gpaScale[c.grade] || 0;
      totalGradePoints += gp * c.credits;
      totalCredits += c.credits;
    });

    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    return {
      gpa: isFinite(gpa) ? gpa : 0,
      totalCredits
    };
  }, [courses]);

  const handleAddCourse = () => {
    if (!newCourseName.trim()) return;
    const newCourse = {
      id: Date.now().toString(),
      name: newCourseName,
      grade: newCourseGrade,
      credits: Number(newCourseCredits)
    };
    setCourses((prev) => [...prev, newCourse]);
    setNewCourseName('');
  };

  const handleRemoveCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // 4. UNIT CONVERTER
  // Map unit categories to their scaling multipliers relative to a base unit
  const unitsData: Record<string, { base: string; labels: Record<string, string>; rates: Record<string, number> }> = {
    length: {
      base: 'm',
      labels: { m: 'Meter (m)', cm: 'Centimeter (cm)', km: 'Kilometer (km)', inch: 'Inch (in)', ft: 'Feet (ft)', yd: 'Yard (yd)', mi: 'Mile (mi)' },
      rates: { m: 1, cm: 0.01, km: 1000, inch: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34 }
    },
    weight: {
      base: 'kg',
      labels: { kg: 'Kilogram (kg)', g: 'Gram (g)', lbs: 'Pounds (lbs)', oz: 'Ounce (oz)' },
      rates: { kg: 1, g: 0.001, lbs: 0.45359237, oz: 0.028349523 }
    },
    temp: {
      base: 'C',
      labels: { C: 'Celsius (°C)', F: 'Fahrenheit (°F)', K: 'Kelvin (K)' },
      // Custom handler needed for offset conversions
      rates: {}
    },
    area: {
      base: 'sq_m',
      labels: { sq_m: 'Sq Meter (m²)', sq_ft: 'Sq Feet (ft²)', acre: 'Acre', hectare: 'Hectare', sq_km: 'Sq Kilometer (km²)' },
      rates: { sq_m: 1, sq_ft: 0.09290304, acre: 4046.85642, hectare: 10000, sq_km: 1000000 }
    },
    volume: {
      base: 'liter',
      labels: { liter: 'Liter (L)', ml: 'Milliliter (ml)', gallon: 'US Gallon (gal)', cup: 'Cup', fl_oz: 'Fluid Ounce (oz)' },
      rates: { liter: 1, ml: 0.001, gallon: 3.78541, cup: 0.236588, fl_oz: 0.0295735 }
    },
    speed: {
      base: 'mps',
      labels: { mps: 'Meter/Sec (m/s)', kmh: 'Kilometer/Hour (km/h)', mph: 'Miles/Hour (mph)', knots: 'Knots' },
      rates: { mps: 1, kmh: 0.27777778, mph: 0.44704, knots: 0.514444 }
    },
    time: {
      base: 'sec',
      labels: { sec: 'Second (s)', min: 'Minute (min)', hr: 'Hour (h)', day: 'Day (d)', week: 'Week (w)', yr: 'Year (y)' },
      rates: { sec: 1, min: 60, hr: 3600, day: 86400, week: 604800, yr: 31536000 }
    },
    storage: {
      base: 'B',
      labels: { B: 'Bytes (B)', KB: 'Kilobytes (KB)', MB: 'Megabytes (MB)', GB: 'Gigabytes (GB)', TB: 'Terabytes (TB)', PB: 'Petabytes (PB)' },
      rates: { B: 1, KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024, TB: 1024 * 1024 * 1024 * 1024, PB: 1024 * 1024 * 1024 * 1024 * 1024 }
    },
    pressure: {
      base: 'Pa',
      labels: { Pa: 'Pascal (Pa)', kPa: 'Kilopascal (kPa)', bar: 'Bar', psi: 'PSI (lb/in²)', atm: 'Atmosphere (atm)', torr: 'Torr (mmHg)' },
      rates: { Pa: 1, kPa: 1000, bar: 100000, psi: 6894.75729, atm: 101325, torr: 133.322368 }
    },
    energy: {
      base: 'J',
      labels: { J: 'Joule (J)', cal: 'Calorie (cal)', kcal: 'Kilocalorie (kcal)', Wh: 'Watt-hour (Wh)', BTU: 'British Thermal Unit (BTU)' },
      rates: { J: 1, cal: 4.184, kcal: 4184, Wh: 3600, BTU: 1055.05585 }
    },
    power: {
      base: 'W',
      labels: { W: 'Watt (W)', kW: 'Kilowatt (kW)', hp: 'Horsepower (hp)', MW: 'Megawatt (MW)', btuh: 'BTU/hr' },
      rates: { W: 1, kW: 1000, hp: 745.699872, MW: 1000000, btuh: 0.29307107 }
    },
    angle: {
      base: 'deg',
      labels: { deg: 'Degree (°)', rad: 'Radian (rad)', grad: 'Gradian (grad)' },
      rates: { deg: 1, rad: 57.2957795, grad: 0.9 }
    }
  };

  // Detect converter id type
  const activeConvCategory = useMemo(() => {
    if (id === 'unit_converter_length') return 'length';
    if (id === 'unit_converter_weight') return 'weight';
    if (id === 'unit_converter_temp') return 'temp';
    if (id === 'unit_converter_area') return 'area';
    if (id === 'unit_converter_volume') return 'volume';
    if (id === 'unit_converter_speed') return 'speed';
    if (id === 'unit_converter_time') return 'time';
    if (id === 'unit_converter_storage') return 'storage';
    if (id === 'unit_converter_pressure') return 'pressure';
    if (id === 'unit_converter_energy') return 'energy';
    if (id === 'unit_converter_power') return 'power';
    if (id === 'unit_converter_angle') return 'angle';
    return convCategory;
  }, [id, convCategory]);

  // Sync unit select inputs on converter change
  React.useEffect(() => {
    const keys = Object.keys(unitsData[activeConvCategory]?.labels || {});
    if (keys.length > 0) {
      if (!keys.includes(convFrom)) {
        setConvFrom(keys[0]);
      }
      if (!keys.includes(convTo)) {
        setConvTo(keys[1] || keys[0]);
      }
    }
  }, [activeConvCategory]);

  const convertedValue = useMemo(() => {
    const cat = activeConvCategory;
    const value = convVal;
    const from = convFrom;
    const to = convTo;

    if (cat === 'temp') {
      // Celsius base conversions
      let celsius = value;
      if (from === 'F') celsius = (value - 32) * (5 / 9);
      if (from === 'K') celsius = value - 273.15;

      let result = celsius;
      if (to === 'F') result = celsius * (9 / 5) + 32;
      if (to === 'K') result = celsius + 273.15;

      return isFinite(result) ? result : 0;
    }

    const categoryObj = unitsData[cat];
    if (!categoryObj) return 0;

    const rates = categoryObj.rates as Record<string, number>;
    const rateFrom = rates[from] || 1;
    const rateTo = rates[to] || 1;

    // Convert from unit -> base -> to unit
    const baseValue = value * rateFrom;
    const finalVal = baseValue / rateTo;

    return isFinite(finalVal) ? finalVal : 0;
  }, [activeConvCategory, convVal, convFrom, convTo]);

  // Fallback defaults on category change
  const handleCategoryChange = (cat: string) => {
    setConvCategory(cat);
    const keys = Object.keys(unitsData[cat].labels);
    setConvFrom(keys[0]);
    setConvTo(keys[1] || keys[0]);
  };

  // 5. DISCOUNT
  const discountResults = useMemo(() => {
    const discAmount = (originalPrice * discountPercent) / 100;
    const salesPrice = originalPrice - discAmount;
    const taxAmount = (salesPrice * taxPercent) / 100;
    const finalPrice = salesPrice + taxAmount;

    return {
      discAmount,
      salesPrice,
      taxAmount,
      finalPrice
    };
  }, [originalPrice, discountPercent, taxPercent]);

  // 6. TIP
  const tipResults = useMemo(() => {
    const totalTip = (billAmount * tipPercent) / 100;
    const grandTotal = billAmount + totalTip;
    const tipPerPerson = totalTip / splitPeople;
    const totalPerPerson = grandTotal / splitPeople;

    return {
      totalTip,
      grandTotal,
      tipPerPerson: isFinite(tipPerPerson) ? tipPerPerson : 0,
      totalPerPerson: isFinite(totalPerPerson) ? totalPerPerson : 0
    };
  }, [billAmount, tipPercent, splitPeople]);

  // 7. AGE
  const ageResults = useMemo(() => {
    const dBirth = new Date(dob);
    const dTarget = new Date(targetDate);
    if (isNaN(dBirth.getTime()) || isNaN(dTarget.getTime())) return null;
    if (dTarget < dBirth) {
      return {
        years: 0,
        months: 0,
        days: 0,
        totalMonths: 0,
        totalWeeks: 0,
        remainingDaysOfWeek: 0,
        totalDays: 0,
        totalHours: 0,
        totalMinutes: 0,
        totalSeconds: 0,
        birthDayOfWeek: '',
        targetDayOfWeek: '',
        daysToBday: 0,
        bdayMonths: 0,
        bdayDays: 0,
        error: 'Date of Birth must be before or equal to the target date.'
      };
    }

    let years = dTarget.getFullYear() - dBirth.getFullYear();
    let months = dTarget.getMonth() - dBirth.getMonth();
    let days = dTarget.getDate() - dBirth.getDate();

    if (days < 0) {
      months -= 1;
      // Get days in previous month
      const prevMonth = new Date(dTarget.getFullYear(), dTarget.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total counts
    const msDiff = dTarget.getTime() - dBirth.getTime();
    const totalDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysOfWeek = totalDays % 7;
    
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Day of birth
    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const birthDayOfWeek = weekdayNames[dBirth.getDay()];
    const targetDayOfWeek = weekdayNames[dTarget.getDay()];

    // Next birthday calculation
    let nextBdayYear = dTarget.getFullYear();
    let nextBday = new Date(nextBdayYear, dBirth.getMonth(), dBirth.getDate());
    if (nextBday < dTarget) {
      nextBdayYear += 1;
      nextBday = new Date(nextBdayYear, dBirth.getMonth(), dBirth.getDate());
    }
    const msToBday = nextBday.getTime() - dTarget.getTime();
    const daysToBday = Math.ceil(msToBday / (1000 * 60 * 60 * 24));
    
    // Breakdown of next birthday countdown in months and days
    let bdayMonths = nextBday.getMonth() - dTarget.getMonth();
    let bdayDays = nextBday.getDate() - dTarget.getDate();
    if (bdayDays < 0) {
      bdayMonths -= 1;
      const prevMonth = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0);
      bdayDays += prevMonth.getDate();
    }
    if (bdayMonths < 0) {
      bdayMonths += 12;
    }

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      remainingDaysOfWeek,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      birthDayOfWeek,
      targetDayOfWeek,
      daysToBday,
      bdayMonths,
      bdayDays,
      error: null
    };
  }, [dob, targetDate]);

  // 8. DAYS BETWEEN DATES
  const daysBetweenCount = useMemo(() => {
    const dStart = new Date(startDate);
    const dEnd = new Date(endDate);
    if (isNaN(dStart.getTime()) || isNaN(dEnd.getTime())) return 0;

    const msDiff = dEnd.getTime() - dStart.getTime();
    let days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    if (includeEndDate) days += 1;

    // Calculate business days only (Monday to Friday)
    let businessDays = 0;
    const tempDate = new Date(dStart);
    const stopDate = new Date(dEnd);
    if (includeEndDate) stopDate.setDate(stopDate.getDate() + 1);

    while (tempDate < stopDate) {
      const dayOfWeek = tempDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return {
      totalDays: days,
      businessDays
    };
  }, [startDate, endDate, includeEndDate]);

  // 9. PASSWORD GENERATOR FUNCTION
  const generatePassword = () => {
    let chars = '';
    if (passUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (passLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (passNum) chars += '0123456789';
    if (passSym) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setGeneratedPass('Please select at least 1 option');
      return;
    }

    let pass = '';
    for (let i = 0; i < passLength; i++) {
      const randIdx = Math.floor(Math.random() * chars.length);
      pass += chars[randIdx];
    }
    setGeneratedPass(pass);
  };

  return (
    <div className="space-y-6">
      {/* 1. PERCENTAGE CALCULATOR PANEL */}
      {id === 'percentage' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mode 1 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Mode 1: Value Yield</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">What is X% of Y?</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 w-6">X:</span>
                    <input
                      type="number"
                      value={p1}
                      onChange={(e) => setP1(Number(e.target.value))}
                      className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm text-right"
                    />
                    <span className="text-xs font-bold text-zinc-500">%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 w-6">Y:</span>
                    <input
                      type="number"
                      value={y1}
                      onChange={(e) => setY1(Number(e.target.value))}
                      className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm text-right"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <span className="text-xs text-zinc-400 block mb-1">Result</span>
                <span className="text-2xl font-black text-sky-600 dark:text-sky-400">{percentageResults.r1.toFixed(2)}</span>
              </div>
            </div>

            {/* Mode 2 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Mode 2: Proportions</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">X is what % of Y?</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 w-6">X:</span>
                    <input
                      type="number"
                      value={p2Val1}
                      onChange={(e) => setP2Val1(Number(e.target.value))}
                      className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm text-right"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 w-6">Y:</span>
                    <input
                      type="number"
                      value={p2Val2}
                      onChange={(e) => setP2Val2(Number(e.target.value))}
                      className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm text-right"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <span className="text-xs text-zinc-400 block mb-1">Result</span>
                <span className="text-2xl font-black text-sky-600 dark:text-sky-400">{percentageResults.r2.toFixed(1)}%</span>
              </div>
            </div>

            {/* Mode 3 */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">Mode 3: Rate of Change</span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">From X to Y percentage difference?</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 w-6">X:</span>
                    <input
                      type="number"
                      value={p3Val1}
                      onChange={(e) => setP3Val1(Number(e.target.value))}
                      className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm text-right"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 w-6">Y:</span>
                    <input
                      type="number"
                      value={p3Val2}
                      onChange={(e) => setP3Val2(Number(e.target.value))}
                      className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm text-right"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <span className="text-xs text-zinc-400 block mb-1">Result Difference</span>
                <span className={`text-2xl font-black ${percentageResults.r3 >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {percentageResults.r3 >= 0 ? '+' : ''}{percentageResults.r3.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SCIENTIFIC CALCULATOR PANEL */}
      {id === 'scientific' && (
        <div className="max-w-md mx-auto bg-zinc-900 dark:bg-black rounded-3xl p-6 shadow-xl border border-zinc-800 space-y-4">
          <div className="text-right space-y-1 p-3 bg-zinc-950 rounded-2xl min-h-[80px] flex flex-col justify-end border border-zinc-800/50">
            <div className="text-xs text-zinc-500 overflow-x-auto whitespace-nowrap scrollbar-none font-mono">
              {calcDisplay || 'Ready'}
            </div>
            <div className="text-3xl font-bold text-white font-mono overflow-x-auto whitespace-nowrap scrollbar-none">
              {calcResult}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {/* Scientific features */}
            {(['sin(', 'cos(', 'tan(', '√('] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcPress(btn)}
                className="py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold font-mono text-xs hover:bg-zinc-700 transition-colors"
              >
                {btn.replace('(', '')}
              </button>
            ))}

            {(['log(', 'ln(', 'π', 'e'] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcPress(btn)}
                className="py-2.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold font-mono text-xs hover:bg-zinc-700 transition-colors"
              >
                {btn.replace('(', '')}
              </button>
            ))}

            {/* Main Numeric Pad */}
            {(['(', ')', '⌫', 'C'] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcPress(btn)}
                className={`py-3 rounded-xl font-bold font-mono text-sm transition-colors ${
                  btn === 'C' ? 'bg-rose-950/40 text-rose-400 hover:bg-rose-900/30' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {btn}
              </button>
            ))}

            {(['7', '8', '9', '÷'] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcPress(btn)}
                className={`py-4 rounded-xl font-bold font-mono text-sm transition-colors ${
                  btn === '÷' ? 'bg-sky-900/50 text-sky-400 hover:bg-sky-900/30' : 'bg-zinc-850 text-white hover:bg-zinc-750'
                }`}
              >
                {btn}
              </button>
            ))}

            {(['4', '5', '6', '×'] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcPress(btn)}
                className={`py-4 rounded-xl font-bold font-mono text-sm transition-colors ${
                  btn === '×' ? 'bg-sky-900/50 text-sky-400 hover:bg-sky-900/30' : 'bg-zinc-850 text-white hover:bg-zinc-750'
                }`}
              >
                {btn}
              </button>
            ))}

            {(['1', '2', '3', '-'] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcPress(btn)}
                className={`py-4 rounded-xl font-bold font-mono text-sm transition-colors ${
                  btn === '-' ? 'bg-sky-900/50 text-sky-400 hover:bg-sky-900/30' : 'bg-zinc-850 text-white hover:bg-zinc-750'
                }`}
              >
                {btn}
              </button>
            ))}

            {(['0', '.', '=', '+'] as const).map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcPress(btn)}
                className={`py-4 rounded-xl font-bold font-mono text-sm transition-colors ${
                  btn === '='
                    ? 'bg-sky-500 text-white hover:bg-sky-600'
                    : btn === '+'
                    ? 'bg-sky-900/50 text-sky-400 hover:bg-sky-900/30'
                    : 'bg-zinc-850 text-white hover:bg-zinc-750'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* History lines */}
          {calcHistory.length > 0 && (
            <div className="pt-2 border-t border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase block tracking-wider">Computation Log</span>
              {calcHistory.map((h, i) => (
                <div key={i} className="text-[10px] text-zinc-400 font-mono text-right truncate">
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. GPA / CGPA CALCULATOR PANEL */}
      {id === 'gpa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              Semester Courses Spreadsheet
            </h3>

            {/* Semester course table list */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead>
                  <tr className="text-left text-xs font-semibold text-zinc-500 uppercase">
                    <th className="pb-3">Course Name</th>
                    <th className="pb-3 text-center">Grade</th>
                    <th className="pb-3 text-center">Credit Hours</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
                  {courses.map((c) => (
                    <tr key={c.id} className="text-sm">
                      <td className="py-3 font-medium text-zinc-800 dark:text-zinc-200">{c.name}</td>
                      <td className="py-3 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-100 dark:border-amber-900/30">
                          {c.grade}
                        </span>
                      </td>
                      <td className="py-3 text-center font-semibold text-zinc-900 dark:text-zinc-100">{c.credits}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleRemoveCourse(c.id)}
                          className="text-zinc-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add course sub-form */}
            <div className="bg-zinc-50 dark:bg-zinc-900/40 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Add Course Entry</span>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="e.g. Physics 101"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                  />
                </div>
                <div>
                  <select
                    value={newCourseGrade}
                    onChange={(e) => setNewCourseGrade(e.target.value)}
                    className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                  >
                    {Object.keys(gpaScale).map((g) => (
                      <option key={g} value={g}>{g} Grade</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={newCourseCredits}
                    onChange={(e) => setNewCourseCredits(Number(e.target.value))}
                    className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((cr) => (
                      <option key={cr} value={cr}>{cr} Credits</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleAddCourse}
                className="w-full md:w-auto px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-xs font-bold hover:opacity-90 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Course
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-6">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase text-center">
              GPA Summary
            </h4>

            <div className="text-center p-6 bg-white dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-2">
              <span className="text-xs text-zinc-500 block">Calculated Semester GPA</span>
              <span className="text-5xl font-black text-amber-500">{gpaResult.gpa.toFixed(2)}</span>
              <span className="text-xs text-zinc-400 block">out of 4.0 scale</span>
            </div>

            <div className="text-center text-xs text-zinc-500">
              Evaluated across <span className="font-bold text-zinc-800 dark:text-zinc-200">{gpaResult.totalCredits} credit hours</span>.
            </div>
          </div>
        </div>
      )}

      {/* 4. MULTI-UNIT CONVERTERS PANEL */}
      {(id.startsWith('unit_converter_') || id === 'currency') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Interactive Unit Dimension Converter
            </h3>

            {/* Custom selectors */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500">Value to Convert</label>
                  <input
                    type="number"
                    value={convVal}
                    onChange={(e) => setConvVal(Number(e.target.value))}
                    className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-500">From Dimension Unit</label>
                  <select
                    value={convFrom}
                    onChange={(e) => setConvFrom(e.target.value)}
                    className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                  >
                    {Object.entries(unitsData[activeConvCategory]?.labels || {}).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center py-1">
                <button
                  onClick={() => {
                    const temp = convFrom;
                    setConvFrom(convTo);
                    setConvTo(temp);
                  }}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200"
                  title="Swap Units"
                >
                  <RefreshCw className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500">To Target Unit</label>
                <select
                  value={convTo}
                  onChange={(e) => setConvTo(e.target.value)}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                >
                  {Object.entries(unitsData[activeConvCategory]?.labels || {}).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase text-center">
              Converted output Result
            </h4>

            <div className="text-center p-6 bg-white dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-1">
              <span className="text-xs text-zinc-400 block">Calculation Yield</span>
              <span className="text-3xl font-black text-purple-600 dark:text-purple-400 block break-words">
                {convertedValue.toLocaleString('en-US', { maximumFractionDigits: 6 })}
              </span>
              <span className="text-xs text-zinc-500 font-bold block">
                {((unitsData[activeConvCategory] as any)?.labels?.[convTo] || convTo)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. DISCOUNT CALCULATOR PANEL */}
      {id === 'discount' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Tag className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              Shopping Sales Parameters
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Original Price ($)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Discount Percent (%)</label>
                <input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Sales Tax Rate (%)</label>
                <input
                  type="number"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">
              Sales Price Invoices
            </h4>

            <div className="space-y-3 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-5">
              <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800 text-xs">
                <span className="text-zinc-500">Original Base</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold">${originalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800 text-xs">
                <span className="text-zinc-500">Discount Savings ({discountPercent}%)</span>
                <span className="text-emerald-500 font-semibold">-${discountResults.discAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800 text-xs">
                <span className="text-zinc-500">Sales Tax (+{taxPercent}%)</span>
                <span className="text-rose-400 font-semibold">+${discountResults.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Final Checkout Price</span>
                <span className="text-2xl font-black text-teal-600 dark:text-teal-400">${discountResults.finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TIP CALCULATOR PANEL */}
      {id === 'tip' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <CupSoda className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              Bill & Gratuity Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Bill Total ($)</label>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tip Percentage (%)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 18, 20].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTipPercent(t)}
                      className={`py-1.5 rounded-lg text-xs font-bold border ${
                        tipPercent === t ? 'bg-teal-600 border-teal-600 text-white' : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      {t}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Split Bill (People)</label>
                <input
                  type="number"
                  value={splitPeople}
                  onChange={(e) => setSplitPeople(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">
              Gratuity Breakdowns
            </h4>

            <div className="space-y-3 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-5">
              <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800 text-xs">
                <span className="text-zinc-500">Total Tip Amount</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold">${tipResults.totalTip.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800 text-xs">
                <span className="text-zinc-500">Tip per Person</span>
                <span className="text-emerald-500 font-semibold">${tipResults.tipPerPerson.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Total Per Person</span>
                <span className="text-2xl font-black text-teal-600 dark:text-teal-400">${tipResults.totalPerPerson.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. AGE CALCULATOR PANEL */}
      {id === 'age' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              Birthday Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Target Comparison Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-start space-y-5">
            {ageResults ? (
              ageResults.error ? (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-xl space-y-2 h-full">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">{ageResults.error}</p>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">Age Calculation Result</h4>
                    <div className="bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-2xl p-5 text-center space-y-1">
                      <div className="text-3xl sm:text-4xl font-black text-teal-600 dark:text-teal-400 tracking-tight">
                        {ageResults.years} <span className="text-xl sm:text-2xl font-semibold text-zinc-600 dark:text-zinc-400">years</span> {ageResults.months} <span className="text-xl sm:text-2xl font-semibold text-zinc-600 dark:text-zinc-400">months</span> {ageResults.days} <span className="text-xl sm:text-2xl font-semibold text-zinc-600 dark:text-zinc-400">days</span>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium pt-1">
                        Born on <span className="font-semibold text-zinc-700 dark:text-zinc-300">{ageResults.birthDayOfWeek}</span> • Age at target date (<span className="font-semibold text-zinc-700 dark:text-zinc-300">{ageResults.targetDayOfWeek}</span>)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Alternative Units</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                        <span className="text-zinc-500 dark:text-zinc-400">In Months & Days:</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-100">{ageResults.totalMonths.toLocaleString()} months {ageResults.days} days</span>
                      </div>
                      <div className="bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                        <span className="text-zinc-500 dark:text-zinc-400">In Weeks & Days:</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-100">{ageResults.totalWeeks.toLocaleString()} weeks {ageResults.remainingDaysOfWeek} days</span>
                      </div>
                      <div className="bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                        <span className="text-zinc-500 dark:text-zinc-400">Total Days:</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-100">{ageResults.totalDays.toLocaleString()} days</span>
                      </div>
                      <div className="bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                        <span className="text-zinc-500 dark:text-zinc-400">Total Hours:</span>
                        <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100">{ageResults.totalHours.toLocaleString()} hrs</span>
                      </div>
                      <div className="bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                        <span className="text-zinc-500 dark:text-zinc-400">Total Minutes:</span>
                        <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100">{ageResults.totalMinutes.toLocaleString()} mins</span>
                      </div>
                      <div className="bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                        <span className="text-zinc-500 dark:text-zinc-400">Total Seconds:</span>
                        <span className="font-mono font-bold text-zinc-800 dark:text-zinc-100">{ageResults.totalSeconds.toLocaleString()} secs</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-4 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <span className="text-amber-500">🎂</span> Next Birthday:
                      </span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-100">
                        {ageResults.bdayMonths > 0 ? `${ageResults.bdayMonths} months ` : ''}
                        {ageResults.bdayDays > 0 ? `${ageResults.bdayDays} days` : (ageResults.bdayMonths === 0 ? 'Today! 🎉' : '')}
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-amber-500 h-1.5 rounded-full" 
                        style={{ width: `${Math.max(0, Math.min(100, ((365 - ageResults.daysToBday) / 365) * 100))}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-[10px] text-zinc-400 font-medium">
                      {ageResults.daysToBday} days remaining
                    </p>
                  </div>
                </>
              )
            ) : (
              <div className="text-center p-8 text-zinc-500">
                Please input valid birth details.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. DAYS BETWEEN DATES PANEL */}
      {id === 'days_between' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <CalendarRange className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              Duration Parameters
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="includeEndDate"
                  checked={includeEndDate}
                  onChange={(e) => setIncludeEndDate(e.target.checked)}
                  className="rounded border-zinc-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
                />
                <label htmlFor="includeEndDate" className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  Include end date in calculation (add 1 day)
                </label>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-6">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase text-center">
              Duration Results
            </h4>

            <div className="text-center p-6 bg-white dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-1">
              <span className="text-xs text-zinc-400 block">Total Calendar Days</span>
              <span className="text-5xl font-black text-teal-600 dark:text-teal-400">
                {daysBetweenCount.totalDays || 0}
              </span>
              <span className="text-xs text-zinc-500 block">Days</span>
            </div>

            <div className="p-4 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl flex justify-between text-xs">
              <span className="text-zinc-500">Business Days (Mon – Fri only)</span>
              <span className="font-extrabold text-teal-600 dark:text-teal-400">{daysBetweenCount.businessDays || 0} Working Days</span>
            </div>
          </div>
        </div>
      )}

      {/* 9. PASSWORD GENERATOR PANEL */}
      {id === 'password' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Key className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              Security Settings
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password Length: {passLength}</label>
                </div>
                <input
                  type="range"
                  min="6"
                  max="40"
                  value={passLength}
                  onChange={(e) => setPassLength(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Include Filters</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-150 dark:border-zinc-750 cursor-pointer">
                    <input type="checkbox" checked={passUpper} onChange={(e) => setPassUpper(e.target.checked)} className="rounded text-teal-600 h-4 w-4" />
                    <span className="text-xs font-semibold">A-Z Caps</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-150 dark:border-zinc-750 cursor-pointer">
                    <input type="checkbox" checked={passLower} onChange={(e) => setPassLower(e.target.checked)} className="rounded text-teal-600 h-4 w-4" />
                    <span className="text-xs font-semibold">a-z Lower</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-150 dark:border-zinc-750 cursor-pointer">
                    <input type="checkbox" checked={passNum} onChange={(e) => setPassNum(e.target.checked)} className="rounded text-teal-600 h-4 w-4" />
                    <span className="text-xs font-semibold">0-9 Numbers</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-150 dark:border-zinc-750 cursor-pointer">
                    <input type="checkbox" checked={passSym} onChange={(e) => setPassSym(e.target.checked)} className="rounded text-teal-600 h-4 w-4" />
                    <span className="text-xs font-semibold">Symbols (!@#)</span>
                  </label>
                </div>
              </div>

              <button
                onClick={generatePassword}
                className="w-full py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-lg text-xs"
              >
                Generate Password
              </button>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase text-center">
              Generated Key Output
            </h4>

            <div className="bg-white dark:bg-zinc-850 p-4 border border-zinc-150 dark:border-zinc-800 rounded-xl space-y-3">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-lg select-all text-center font-mono text-sm break-all text-zinc-850 dark:text-zinc-150">
                {generatedPass}
              </div>

              <button
                onClick={() => handleCopyToClipboard(generatedPass)}
                className="w-full py-2 bg-teal-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied Key!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Password
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
