import React, { useState, useMemo } from 'react';
import { Info, HelpCircle, Receipt, ArrowRight, CheckCircle, Scale, Shield, Landmark } from 'lucide-react';

export default function IncomeTaxCalculator() {
  // Input states
  const [assessmentYear, setAssessmentYear] = useState<'2025-26' | '2024-25'>('2025-26');
  const [ageGroup, setAgeGroup] = useState<'under60' | 'senior' | 'supersenior'>('under60');
  const [employmentType, setEmploymentType] = useState<'salaried' | 'others'>('salaried');

  // Income sources
  const [basicSalary, setBasicSalary] = useState<number>(1200000); // 12 Lakhs default
  const [otherIncome, setOtherIncome] = useState<number>(50000); // Interest/Dividends, etc.
  const [rentalIncome, setRentalIncome] = useState<number>(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0);

  // Deductions (Old Regime)
  const [deduction80C, setDeduction80C] = useState<number>(150000); // Max 1.5L
  const [deduction80D, setDeduction80D] = useState<number>(25000); // Health insurance max 25k/50k
  const [deduction80CCD, setDeduction80CCD] = useState<number>(0); // NPS additional max 50k
  const [hraDeduction, setHraDeduction] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

  // FAQ state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Helper formatting
  const formatINR = (val: number) => {
    return val.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
  };

  // Tax calculations for both Regimes
  const calculations = useMemo(() => {
    // 1. Gross Income Calculation
    const totalGross = basicSalary + otherIncome + rentalIncome;

    // --- NEW REGIME CALCULATIONS ---
    // Standard deduction under New Regime (Budget 2024 increased it to 75,000 for AY 2025-26)
    const newStdDeduction = employmentType === 'salaried' ? (assessmentYear === '2025-26' ? 75000 : 50000) : 0;
    const newNetTaxable = Math.max(0, totalGross - newStdDeduction);

    // New Regime Slabs (Budget 2024 revised for AY 2025-26)
    const newSlabs2526 = [
      { limit: 300000, rate: 0 },
      { limit: 700000, rate: 0.05 },
      { limit: 1000000, rate: 0.10 },
      { limit: 1200000, rate: 0.15 },
      { limit: 1500000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];

    const newSlabs2425 = [
      { limit: 300000, rate: 0 },
      { limit: 600000, rate: 0.05 },
      { limit: 900000, rate: 0.10 },
      { limit: 1200000, rate: 0.15 },
      { limit: 1500000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];

    const activeNewSlabs = assessmentYear === '2025-26' ? newSlabs2526 : newSlabs2425;

    let newBaseTax = 0;
    let prevLimitNew = 0;
    const newSlabBreakdowns: { slab: string; taxable: number; tax: number; rate: number }[] = [];

    for (const slab of activeNewSlabs) {
      if (newNetTaxable > prevLimitNew) {
        const taxableInSlab = Math.min(newNetTaxable - prevLimitNew, slab.limit - prevLimitNew);
        const taxInSlab = taxableInSlab * slab.rate;
        newBaseTax += taxInSlab;

        if (taxableInSlab > 0) {
          const limitText = slab.limit === Infinity ? `Above ₹${(prevLimitNew/100000).toFixed(1)}L` : `₹${(prevLimitNew/100000).toFixed(1)}L - ₹${(slab.limit/100000).toFixed(1)}L`;
          newSlabBreakdowns.push({
            slab: limitText,
            taxable: taxableInSlab,
            tax: taxInSlab,
            rate: slab.rate * 100
          });
        }
        prevLimitNew = slab.limit;
      } else {
        break;
      }
    }

    // New Regime Rebate Sec 87A (Nil tax up to 7,00,000)
    let newRebate = 0;
    if (newNetTaxable <= 700000) {
      newRebate = newBaseTax;
    } else if (assessmentYear === '2025-26' && newNetTaxable > 700000 && newNetTaxable <= 727770) {
      // Marginal relief under Section 87A
      const maxTax = newNetTaxable - 700000;
      if (newBaseTax > maxTax) {
        newRebate = newBaseTax - maxTax;
      }
    }

    const newTaxAfterRebate = Math.max(0, newBaseTax - newRebate);

    // New Regime Surcharge (Budget 2024 caps highest surcharge under New Regime at 25% instead of 37%)
    let newSurchargeRate = 0;
    if (newNetTaxable > 5000000 && newNetTaxable <= 10000000) newSurchargeRate = 0.10;
    else if (newNetTaxable > 10000000 && newNetTaxable <= 20000000) newSurchargeRate = 0.15;
    else if (newNetTaxable > 20000000) newSurchargeRate = 0.25;

    const newSurcharge = newTaxAfterRebate * newSurchargeRate;
    const newCess = (newTaxAfterRebate + newSurcharge) * 0.04;
    const newTotalTax = newTaxAfterRebate + newSurcharge + newCess;

    // --- OLD REGIME CALCULATIONS ---
    // Standard Deduction
    const oldStdDeduction = employmentType === 'salaried' ? 50000 : 0;
    
    // Capped Deductions
    const capped80C = Math.min(150000, deduction80C);
    const max80D = ageGroup === 'under60' ? 25000 : 50000;
    const capped80D = Math.min(max80D, deduction80D);
    const capped80CCD = Math.min(50000, deduction80CCD);
    const cappedHomeLoan = Math.min(200000, homeLoanInterest);

    const totalOldDeductions = oldStdDeduction + capped80C + capped80D + capped80CCD + cappedHomeLoan + hraDeduction + otherDeductions;
    const oldNetTaxable = Math.max(0, totalGross - totalOldDeductions);

    // Old Regime Slabs based on Age
    let oldSlabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];

    if (ageGroup === 'senior') {
      oldSlabs = [
        { limit: 300000, rate: 0 },
        { limit: 500000, rate: 0.05 },
        { limit: 1000000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 }
      ];
    } else if (ageGroup === 'supersenior') {
      oldSlabs = [
        { limit: 500000, rate: 0 },
        { limit: 1000000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 }
      ];
    }

    let oldBaseTax = 0;
    let prevLimitOld = 0;
    const oldSlabBreakdowns: { slab: string; taxable: number; tax: number; rate: number }[] = [];

    for (const slab of oldSlabs) {
      if (oldNetTaxable > prevLimitOld) {
        const taxableInSlab = Math.min(oldNetTaxable - prevLimitOld, slab.limit - prevLimitOld);
        const taxInSlab = taxableInSlab * slab.rate;
        oldBaseTax += taxInSlab;

        if (taxableInSlab > 0) {
          const limitText = slab.limit === Infinity ? `Above ₹${(prevLimitOld/100000).toFixed(1)}L` : `₹${(prevLimitOld/100000).toFixed(1)}L - ₹${(slab.limit/100000).toFixed(1)}L`;
          oldSlabBreakdowns.push({
            slab: limitText,
            taxable: taxableInSlab,
            tax: taxInSlab,
            rate: slab.rate * 100
          });
        }
        prevLimitOld = slab.limit;
      } else {
        break;
      }
    }

    // Old Regime Rebate Sec 87A (Nil tax up to 5,00,000)
    const oldRebate = oldNetTaxable <= 500000 ? oldBaseTax : 0;
    const oldTaxAfterRebate = Math.max(0, oldBaseTax - oldRebate);

    // Old Regime Surcharge
    let oldSurchargeRate = 0;
    if (oldNetTaxable > 5000000 && oldNetTaxable <= 10000000) oldSurchargeRate = 0.10;
    else if (oldNetTaxable > 10000000 && oldNetTaxable <= 20000000) oldSurchargeRate = 0.15;
    else if (oldNetTaxable > 20000000 && oldNetTaxable <= 50000000) oldSurchargeRate = 0.25;
    else if (oldNetTaxable > 50000000) oldSurchargeRate = 0.37;

    const oldSurcharge = oldTaxAfterRebate * oldSurchargeRate;
    const oldCess = (oldTaxAfterRebate + oldSurcharge) * 0.04;
    const oldTotalTax = oldTaxAfterRebate + oldSurcharge + oldCess;

    // Savings analysis
    const isNewRegimeBetter = newTotalTax <= oldTotalTax;
    const taxSavings = Math.abs(oldTotalTax - newTotalTax);

    return {
      totalGross,
      newRegime: {
        stdDeduction: newStdDeduction,
        netTaxable: newNetTaxable,
        baseTax: newBaseTax,
        rebate: newRebate,
        surcharge: newSurcharge,
        cess: newCess,
        totalTax: newTotalTax,
        takeHome: Math.max(0, totalGross - newTotalTax),
        breakdowns: newSlabBreakdowns
      },
      oldRegime: {
        stdDeduction: oldStdDeduction,
        totalDeductions: totalOldDeductions,
        netTaxable: oldNetTaxable,
        baseTax: oldBaseTax,
        rebate: oldRebate,
        surcharge: oldSurcharge,
        cess: oldCess,
        totalTax: oldTotalTax,
        takeHome: Math.max(0, totalGross - oldTotalTax),
        breakdowns: oldSlabBreakdowns
      },
      isNewRegimeBetter,
      taxSavings
    };
  }, [assessmentYear, ageGroup, employmentType, basicSalary, otherIncome, rentalIncome, homeLoanInterest, deduction80C, deduction80D, deduction80CCD, hraDeduction, otherDeductions]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Visual Identity Title & Settings */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Receipt className="w-40 h-40" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-white/10 rounded-2xl">
              <Receipt className="w-6 h-6 text-white" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Income Tax Calculator</h2>
              <p className="text-xs text-emerald-100 font-medium">AY {assessmentYear} Indian Tax Regime Assessment & Savings Comparison</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {/* Assessment Year Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-wider uppercase text-emerald-200">Assessment Year</label>
              <div className="grid grid-cols-2 bg-emerald-800/40 p-1 rounded-xl">
                <button
                  onClick={() => setAssessmentYear('2025-26')}
                  className={`py-1 text-xs font-bold rounded-lg transition-all ${
                    assessmentYear === '2025-26' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/5'
                  }`}
                >
                  AY 2025-26 (Latest)
                </button>
                <button
                  onClick={() => setAssessmentYear('2024-25')}
                  className={`py-1 text-xs font-bold rounded-lg transition-all ${
                    assessmentYear === '2024-25' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/5'
                  }`}
                >
                  AY 2024-25
                </button>
              </div>
            </div>

            {/* Age Group */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-wider uppercase text-emerald-200">Age Bracket</label>
              <div className="grid grid-cols-3 bg-emerald-800/40 p-1 rounded-xl text-[11px]">
                <button
                  onClick={() => setAgeGroup('under60')}
                  className={`py-1 font-bold rounded-lg transition-all ${
                    ageGroup === 'under60' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/5'
                  }`}
                >
                  &lt; 60 Yrs
                </button>
                <button
                  onClick={() => setAgeGroup('senior')}
                  className={`py-1 font-bold rounded-lg transition-all ${
                    ageGroup === 'senior' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/5'
                  }`}
                >
                  60 - 80 Yrs
                </button>
                <button
                  onClick={() => setAgeGroup('supersenior')}
                  className={`py-1 font-bold rounded-lg transition-all ${
                    ageGroup === 'supersenior' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/5'
                  }`}
                >
                  80+ Yrs
                </button>
              </div>
            </div>

            {/* Employment Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold tracking-wider uppercase text-emerald-200">Employment Category</label>
              <div className="grid grid-cols-2 bg-emerald-800/40 p-1 rounded-xl">
                <button
                  onClick={() => setEmploymentType('salaried')}
                  className={`py-1 text-xs font-bold rounded-lg transition-all ${
                    employmentType === 'salaried' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/5'
                  }`}
                >
                  Salaried
                </button>
                <button
                  onClick={() => setEmploymentType('others')}
                  className={`py-1 text-xs font-bold rounded-lg transition-all ${
                    employmentType === 'others' ? 'bg-white text-emerald-800 shadow-xs' : 'text-white hover:bg-white/5'
                  }`}
                >
                  Self-Employed/Other
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Recommendation Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-12">
          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-zinc-900 dark:to-zinc-850/60 border border-emerald-150 dark:border-emerald-950/40 rounded-2xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 block">Optimal Tax Strategy</span>
                <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 block">
                  Choose the <span className="text-teal-600 dark:text-teal-400">{calculations.isNewRegimeBetter ? 'New Tax Regime' : 'Old Tax Regime'}</span>
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Your inputs indicate the {calculations.isNewRegimeBetter ? 'New' : 'Old'} Regime saves you money.
                </p>
              </div>
            </div>
            <div className="bg-emerald-500 text-white rounded-xl px-4 py-2.5 shadow-xs text-right">
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-100 block">Annual Tax Savings</span>
              <span className="text-lg font-black">{formatINR(calculations.taxSavings)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column - Inputs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Income Sources Panel */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <Landmark className="w-4 h-4 text-emerald-500" />
              Annual Earnings & Income
            </h3>

            {/* Basic Salary / Business Gross */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Basic Annual Income</label>
                <span className="font-mono text-zinc-500">{formatINR(basicSalary)}</span>
              </div>
              <input
                type="number"
                min="0"
                step="10000"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 text-right focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1"
              />
            </div>

            {/* Other Income Sources */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Income from Other Sources</label>
                <span className="font-mono text-zinc-500">{formatINR(otherIncome)}</span>
              </div>
              <input
                type="number"
                min="0"
                step="5000"
                value={otherIncome}
                onChange={(e) => setOtherIncome(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 text-right focus:outline-none"
              />
            </div>

            {/* Rental Income */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Net Rental Income Received</label>
                <span className="font-mono text-zinc-500">{formatINR(rentalIncome)}</span>
              </div>
              <input
                type="number"
                min="0"
                step="5000"
                value={rentalIncome}
                onChange={(e) => setRentalIncome(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 text-right focus:outline-none"
              />
            </div>

            {/* Home Loan Interest (Sec 24b) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Home Loan Interest Paid (Self-Occupied)</label>
                <span className="font-mono text-zinc-500">{formatINR(homeLoanInterest)}</span>
              </div>
              <input
                type="number"
                min="0"
                max="200000"
                step="5000"
                value={homeLoanInterest}
                onChange={(e) => setHomeLoanInterest(Math.min(200000, Math.max(0, Number(e.target.value))))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 text-right focus:outline-none"
              />
              <p className="text-[10px] text-zinc-400">Max deductible home loan interest is capped at ₹2,00,000 per year (Old Regime only).</p>
            </div>
          </div>

          {/* Deductions Panel (Old Regime Only) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Tax Deductions (Old Regime)
              </h3>
              <span className="text-[9px] font-bold uppercase bg-amber-100 text-amber-700 dark:bg-zinc-800 dark:text-amber-400 px-2 py-0.5 rounded-full">Old Regime Only</span>
            </div>

            {/* Section 80C */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Section 80C (PPF, EPF, ELSS, Insurance)</label>
                <span className="font-mono text-zinc-500">{formatINR(deduction80C)}</span>
              </div>
              <input
                type="number"
                min="0"
                max="150000"
                step="5000"
                value={deduction80C}
                onChange={(e) => setDeduction80C(Math.min(150000, Math.max(0, Number(e.target.value))))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 text-right focus:outline-none"
              />
              <p className="text-[10px] text-zinc-400">Capped at a maximum of ₹1,50,000 per year.</p>
            </div>

            {/* Section 80D */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Section 80D (Health Insurance Premium)</label>
                <span className="font-mono text-zinc-500">{formatINR(deduction80D)}</span>
              </div>
              <input
                type="number"
                min="0"
                max={ageGroup === 'under60' ? 25000 : 50000}
                step="1000"
                value={deduction80D}
                onChange={(e) => setDeduction80D(Math.min(ageGroup === 'under60' ? 25000 : 50000, Math.max(0, Number(e.target.value))))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 text-right focus:outline-none"
              />
              <p className="text-[10px] text-zinc-400">Capped at ₹25,000 (Self) / ₹50,000 (Seniors) under Old Regime.</p>
            </div>

            {/* Section 80CCD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Section 80CCD(1B) (NPS Additional)</label>
                <span className="font-mono text-zinc-500">{formatINR(deduction80CCD)}</span>
              </div>
              <input
                type="number"
                min="0"
                max="50000"
                step="1000"
                value={deduction80CCD}
                onChange={(e) => setDeduction80CCD(Math.min(50000, Math.max(0, Number(e.target.value))))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 text-right focus:outline-none"
              />
              <p className="text-[10px] text-zinc-400">Additional National Pension Scheme deduction capped at ₹50,000.</p>
            </div>

            {/* HRA Deduction */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">House Rent Allowance (HRA) Exemption</label>
                <span className="font-mono text-zinc-500">{formatINR(hraDeduction)}</span>
              </div>
              <input
                type="number"
                min="0"
                step="5000"
                value={hraDeduction}
                onChange={(e) => setHraDeduction(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 px-3 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 text-right focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right column - Slabs & Side-by-side Comparative details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Side by side comparison table */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <Scale className="w-4 h-4 text-emerald-500" />
              Side-by-Side Regime Evaluation
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-bold text-[11px]">
                    <th className="py-2.5">Component</th>
                    <th className="py-2.5 text-right">Old Regime</th>
                    <th className="py-2.5 text-right">New Regime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/60 font-medium">
                  {/* Gross Income */}
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20">
                    <td className="py-3 font-semibold text-zinc-800 dark:text-zinc-200">Gross Annual Income</td>
                    <td className="py-3 text-right font-mono">{formatINR(calculations.totalGross)}</td>
                    <td className="py-3 text-right font-mono">{formatINR(calculations.totalGross)}</td>
                  </tr>

                  {/* Standard Deduction */}
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20">
                    <td className="py-3 font-semibold text-zinc-800 dark:text-zinc-200">Standard Deduction</td>
                    <td className="py-3 text-right text-rose-500 font-mono">-{formatINR(calculations.oldRegime.stdDeduction)}</td>
                    <td className="py-3 text-right text-rose-500 font-mono">-{formatINR(calculations.newRegime.stdDeduction)}</td>
                  </tr>

                  {/* Other Deductions & Exemptions */}
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20">
                    <td className="py-3 font-semibold text-zinc-800 dark:text-zinc-200">Deductions (80C, 80D, HRA etc.)</td>
                    <td className="py-3 text-right text-rose-500 font-mono">
                      -{formatINR(calculations.oldRegime.totalDeductions - calculations.oldRegime.stdDeduction)}
                    </td>
                    <td className="py-3 text-right text-zinc-400 font-mono">Not Allowed</td>
                  </tr>

                  {/* Net Taxable Income */}
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20 bg-zinc-50/30 dark:bg-zinc-850/10">
                    <td className="py-3 font-bold text-zinc-900 dark:text-zinc-100">Net Taxable Income</td>
                    <td className="py-3 text-right font-bold font-mono text-zinc-900 dark:text-zinc-100">
                      {formatINR(calculations.oldRegime.netTaxable)}
                    </td>
                    <td className="py-3 text-right font-bold font-mono text-zinc-900 dark:text-zinc-100">
                      {formatINR(calculations.newRegime.netTaxable)}
                    </td>
                  </tr>

                  {/* Base Income Tax */}
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20">
                    <td className="py-3 font-semibold text-zinc-800 dark:text-zinc-200">Base Tax (Slab calculations)</td>
                    <td className="py-3 text-right font-mono">{formatINR(calculations.oldRegime.baseTax)}</td>
                    <td className="py-3 text-right font-mono">{formatINR(calculations.newRegime.baseTax)}</td>
                  </tr>

                  {/* Rebate Sec 87A */}
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20">
                    <td className="py-3 font-semibold text-zinc-800 dark:text-zinc-200">Tax Rebate (Sec 87A)</td>
                    <td className="py-3 text-right text-emerald-500 font-mono">-{formatINR(calculations.oldRegime.rebate)}</td>
                    <td className="py-3 text-right text-emerald-500 font-mono">-{formatINR(calculations.newRegime.rebate)}</td>
                  </tr>

                  {/* Surcharge */}
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20">
                    <td className="py-3 font-semibold text-zinc-800 dark:text-zinc-200">Surcharge</td>
                    <td className="py-3 text-right font-mono">{formatINR(calculations.oldRegime.surcharge)}</td>
                    <td className="py-3 text-right font-mono">{formatINR(calculations.newRegime.surcharge)}</td>
                  </tr>

                  {/* Cess 4% */}
                  <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/20">
                    <td className="py-3 font-semibold text-zinc-800 dark:text-zinc-200">Health & Education Cess (4%)</td>
                    <td className="py-3 text-right font-mono">{formatINR(calculations.oldRegime.cess)}</td>
                    <td className="py-3 text-right font-mono">{formatINR(calculations.newRegime.cess)}</td>
                  </tr>

                  {/* Total Tax Liability */}
                  <tr className="bg-emerald-50/20 dark:bg-emerald-950/10">
                    <td className="py-3.5 font-extrabold text-zinc-900 dark:text-zinc-100">Total Tax Liability</td>
                    <td className={`py-3.5 text-right font-black font-mono text-sm ${!calculations.isNewRegimeBetter ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-zinc-600 dark:text-zinc-400'}`}>
                      {formatINR(calculations.oldRegime.totalTax)}
                    </td>
                    <td className={`py-3.5 text-right font-black font-mono text-sm ${calculations.isNewRegimeBetter ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-zinc-600 dark:text-zinc-400'}`}>
                      {formatINR(calculations.newRegime.totalTax)}
                    </td>
                  </tr>

                  {/* Annual Take Home */}
                  <tr className="bg-zinc-50/50 dark:bg-zinc-850/40">
                    <td className="py-3 font-extrabold text-zinc-900 dark:text-zinc-100">Annual Take-Home Income</td>
                    <td className="py-3 text-right font-bold font-mono text-zinc-800 dark:text-zinc-200">
                      {formatINR(calculations.oldRegime.takeHome)}
                    </td>
                    <td className="py-3 text-right font-bold font-mono text-zinc-800 dark:text-zinc-200">
                      {formatINR(calculations.newRegime.takeHome)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Slab Breakdowns panel */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <Info className="w-4 h-4 text-emerald-500" />
              Your New Regime Progressive Slab Breakdown
            </h3>

            <div className="space-y-2">
              {calculations.newRegime.breakdowns.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{item.slab}</span>
                    <span className="text-[10px] text-zinc-400 block">Taxable in this slab: {formatINR(item.taxable)}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-rose-500 block">{formatINR(item.tax)}</span>
                    <span className="text-[10px] font-bold text-zinc-500">at {item.rate}%</span>
                  </div>
                </div>
              ))}
              {calculations.newRegime.breakdowns.length === 0 && (
                <div className="p-4 text-center text-xs text-zinc-500">
                  No taxable income under the New Tax Regime.
                </div>
              )}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              Frequently Asked Questions (Indian Tax AY 2025-26)
            </h3>

            <div className="space-y-2">
              {[
                {
                  q: "What is the key update in New Tax Regime in Budget 2024?",
                  a: "The standard deduction for salaried individuals is increased to ₹75,000 (from ₹50,000). Also, the tax slabs are revised. Under the new slabs, tax rates are lower for middle-income ranges, meaning no tax is charged on income up to ₹3,00,000, 5% on ₹3L-₹7L, 10% on ₹7L-₹10L, 15% on ₹10L-₹12L, 20% on ₹12L-₹15L, and 30% above ₹15L."
                },
                {
                  q: "Is there any rebate under Section 87A in AY 2025-26?",
                  a: "Yes! Under the New Regime, individuals with taxable income not exceeding ₹7,00,000 are eligible for a 100% tax rebate, meaning ₹0 tax. Marginal relief is also introduced for incomes up to ₹7,27,770, where tax is restricted so it doesn't exceed the income above ₹7L."
                },
                {
                  q: "What deductions are allowed in the Old Regime vs New Regime?",
                  a: "The Old Regime allows popular deductions like Section 80C (up to ₹1.5 Lakhs), Section 80D (health insurance), House Rent Allowance (HRA), and home loan interest (up to ₹2 Lakhs). In contrast, the New Regime eliminates almost all of these deductions except standard deduction for salaried employees, but compensates with much lower tax slab rates."
                },
                {
                  q: "What is the Health & Education Cess?",
                  a: "A standard health & education cess of 4% is applied to the total income tax payable under both the old and new regimes. It is computed as 4% of (Income Tax + Surcharge - Rebates)."
                }
              ].map((faq, index) => {
                const isOpen = expandedFaqIndex === index;
                return (
                  <div key={index} className="border border-zinc-100 dark:border-zinc-800/80 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                      className="w-full flex justify-between items-center p-3 text-left bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-850/60 transition-colors text-xs font-bold text-zinc-700 dark:text-zinc-300"
                    >
                      <span>{faq.q}</span>
                      <span className="text-zinc-400 font-normal text-sm">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="p-3 text-xs text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
