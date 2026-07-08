import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, TrendingUp, Calendar, ArrowRight, ReceiptText, PiggyBank, Briefcase, Coins } from 'lucide-react';
import SwpCalculator from './SwpCalculator';
import IncomeTaxCalculator from './IncomeTaxCalculator';

interface FinanceCalculatorsProps {
  id: string;
}

export default function FinanceCalculators({ id }: FinanceCalculatorsProps) {
  // Common states for calculators
  // EMI / Loan / Mortgage
  const [principal, setPrincipal] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(15);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [downPayment, setDownPayment] = useState<number>(10000);
  const [propertyTax, setPropertyTax] = useState<number>(1.2); // annual %
  const [homeInsurance, setHomeInsurance] = useState<number>(1200); // annual $
  const [hoa, setHoa] = useState<number>(150); // monthly $

  // SIP / Investment
  const [sipMonthly, setSipMonthly] = useState<number>(500);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [sipTenure, setSipTenure] = useState<number>(10);
  const [compoundingFreq, setCompoundingFreq] = useState<number>(12); // 12=monthly, 4=quarterly, 1=annually
  const [initialInvestment, setInitialInvestment] = useState<number>(5000);

  // FD
  const [fdPrincipal, setFdPrincipal] = useState<number>(10000);
  const [fdRate, setFdRate] = useState<number>(6.5);
  const [fdTenure, setFdTenure] = useState<number>(5);

  // VAT
  const [vatPrice, setVatPrice] = useState<number>(120);
  const [vatRate, setVatRate] = useState<number>(15);
  const [vatType, setVatType] = useState<'add' | 'remove'>('add');

  // Income Tax
  const [grossIncome, setGrossIncome] = useState<number>(75000);
  const [deductions, setDeductions] = useState<number>(13850); // standard deduction

  // 1. EMI CALCULATIONS
  const emiData = useMemo(() => {
    const P = principal;
    const r = (interestRate / 12) / 100;
    const n = tenureType === 'years' ? tenure * 12 : tenure;

    if (r === 0) {
      const emi = P / n;
      const totalPay = P;
      return {
        emi: isFinite(emi) ? emi : 0,
        totalInterest: 0,
        totalPay: totalPay,
        principalPercent: 100,
        interestPercent: 0,
      };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    const totalInterest = totalPay - P;

    const principalPercent = totalPay > 0 ? (P / totalPay) * 100 : 100;
    const interestPercent = 100 - principalPercent;

    return {
      emi: isFinite(emi) ? emi : 0,
      totalInterest: isFinite(totalInterest) ? totalInterest : 0,
      totalPay: isFinite(totalPay) ? totalPay : 0,
      principalPercent: isFinite(principalPercent) ? principalPercent : 100,
      interestPercent: isFinite(interestPercent) ? interestPercent : 0,
    };
  }, [principal, interestRate, tenure, tenureType]);

  // 2. MORTGAGE CALCULATIONS
  const mortgageData = useMemo(() => {
    const loanAmount = Math.max(0, principal - downPayment);
    const monthlyRate = (interestRate / 12) / 100;
    const totalMonths = tenure * 12;

    let monthlyPI = 0;
    if (monthlyRate === 0) {
      monthlyPI = loanAmount / totalMonths;
    } else {
      monthlyPI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
    if (!isFinite(monthlyPI)) monthlyPI = 0;

    const monthlyTax = (principal * (propertyTax / 100)) / 12;
    const monthlyIns = homeInsurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + hoa;

    const totalPIPaid = monthlyPI * totalMonths;
    const totalInterest = Math.max(0, totalPIPaid - loanAmount);

    const piPct = totalMonthly > 0 ? (monthlyPI / totalMonthly) * 100 : 0;
    const taxPct = totalMonthly > 0 ? (monthlyTax / totalMonthly) * 100 : 0;
    const insPct = totalMonthly > 0 ? (monthlyIns / totalMonthly) * 100 : 0;
    const hoaPct = totalMonthly > 0 ? (hoa / totalMonthly) * 100 : 0;

    return {
      loanAmount,
      monthlyPI,
      monthlyTax,
      monthlyIns,
      totalMonthly,
      totalInterest,
      totalPIPaid,
      piPct,
      taxPct,
      insPct,
      hoaPct
    };
  }, [principal, downPayment, interestRate, tenure, propertyTax, homeInsurance, hoa]);

  // 3. SIP CALCULATIONS
  const sipData = useMemo(() => {
    const P = sipMonthly;
    const i = (expectedReturn / 12) / 100;
    const n = sipTenure * 12;

    let totalValue = 0;
    const totalInvested = P * n;

    if (i === 0) {
      totalValue = totalInvested;
    } else {
      totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }

    const wealthGain = Math.max(0, totalValue - totalInvested);
    const investedPercent = totalValue > 0 ? (totalInvested / totalValue) * 100 : 100;
    const gainPercent = 100 - investedPercent;

    // Generate yearly growth points for area chart
    const growthChartData: { year: number; invested: number; value: number }[] = [];
    for (let yr = 1; yr <= sipTenure; yr++) {
      const months = yr * 12;
      const invested = P * months;
      let value = 0;
      if (i === 0) {
        value = invested;
      } else {
        value = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
      }
      growthChartData.push({
        year: yr,
        invested,
        value: Math.round(value)
      });
    }

    return {
      totalInvested,
      totalValue: isFinite(totalValue) ? totalValue : 0,
      wealthGain: isFinite(wealthGain) ? wealthGain : 0,
      investedPercent: isFinite(investedPercent) ? investedPercent : 100,
      gainPercent: isFinite(gainPercent) ? gainPercent : 0,
      growthChartData
    };
  }, [sipMonthly, expectedReturn, sipTenure]);

  // 4. INVESTMENT / COMPOUND CALCULATIONS
  const investmentData = useMemo(() => {
    const p = initialInvestment;
    const pmt = sipMonthly;
    const r = expectedReturn / 100;
    const t = sipTenure;
    const n = compoundingFreq; // frequency per year (12, 4, 1)

    // Formula for compound interest with regular monthly additions
    // S = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)] * (compounding_multiplier)
    // To make it simple: simulate month-by-month compounding
    let totalValue = p;
    let totalInvested = p;

    const totalPeriods = t * 12;
    const monthlyRate = r / 12;

    for (let m = 1; m <= totalPeriods; m++) {
      // compound previous value
      totalValue = totalValue * (1 + monthlyRate);
      // add monthly investment
      totalValue += pmt;
      totalInvested += pmt;
    }

    const wealthGain = Math.max(0, totalValue - totalInvested);
    return {
      totalInvested,
      totalValue: isFinite(totalValue) ? totalValue : 0,
      wealthGain: isFinite(wealthGain) ? wealthGain : 0,
    };
  }, [initialInvestment, sipMonthly, expectedReturn, sipTenure, compoundingFreq]);

  // 5. FD CALCULATIONS
  const fdData = useMemo(() => {
    // A = P * (1 + r/100)^t
    // Banks compound quarterly by default: n = 4
    const P = fdPrincipal;
    const r = fdRate / 100;
    const t = fdTenure;
    const n = 4; // Quarterly compound

    const maturityValue = P * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityValue - P;

    return {
      maturityValue: isFinite(maturityValue) ? maturityValue : P,
      interestEarned: isFinite(interestEarned) ? interestEarned : 0,
    };
  }, [fdPrincipal, fdRate, fdTenure]);

  // 6. VAT CALCULATIONS
  const vatData = useMemo(() => {
    let vatAmount = 0;
    let finalPrice = 0;
    let netAmount = 0;

    if (vatType === 'add') {
      netAmount = vatPrice;
      vatAmount = (vatPrice * vatRate) / 100;
      finalPrice = vatPrice + vatAmount;
    } else {
      finalPrice = vatPrice;
      netAmount = vatPrice / (1 + vatRate / 100);
      vatAmount = finalPrice - netAmount;
    }

    return {
      netAmount: isFinite(netAmount) ? netAmount : 0,
      vatAmount: isFinite(vatAmount) ? vatAmount : 0,
      finalPrice: isFinite(finalPrice) ? finalPrice : 0,
    };
  }, [vatPrice, vatRate, vatType]);

  // 7. TAX CALCULATIONS (Simplified US Progressive Bracket 2026 Estimate)
  const taxData = useMemo(() => {
    const taxableIncome = Math.max(0, grossIncome - deductions);
    
    // 2026 standard estimated single filer brackets
    const brackets = [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ];

    let taxCalculated = 0;
    let prevLimit = 0;
    const bracketDetails: { rate: number; taxableInBracket: number; taxInBracket: number }[] = [];

    for (const b of brackets) {
      if (taxableIncome > prevLimit) {
        const taxableInBracket = Math.min(taxableIncome - prevLimit, b.limit - prevLimit);
        const taxInBracket = taxableInBracket * b.rate;
        taxCalculated += taxInBracket;
        bracketDetails.push({
          rate: b.rate * 100,
          taxableInBracket,
          taxInBracket
        });
        prevLimit = b.limit;
      } else {
        break;
      }
    }

    const takeHome = Math.max(0, grossIncome - taxCalculated);
    const effectiveRate = grossIncome > 0 ? (taxCalculated / grossIncome) * 100 : 0;

    return {
      taxableIncome,
      taxCalculated: isFinite(taxCalculated) ? taxCalculated : 0,
      takeHome: isFinite(takeHome) ? takeHome : 0,
      effectiveRate: isFinite(effectiveRate) ? effectiveRate : 0,
      bracketDetails
    };
  }, [grossIncome, deductions]);

  // Formatter helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* 1. EMI & LOAN CALCULATOR PANEL */}
      {(id === 'emi' || id === 'loan') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: Inputs */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              {id === 'emi' ? 'EMI Parameters' : 'Loan Repayment Settings'}
            </h3>

            {/* Principal */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Loan Amount</label>
                <div className="relative rounded-md shadow-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-zinc-500 text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                    className="block w-36 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 pl-7 pr-3 py-1.5 text-right text-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min="5000"
                max="1000000"
                step="5000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>$5k</span>
                <span>$500k</span>
                <span>$1M</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Annual Interest Rate (%)</label>
                <div className="relative rounded-md shadow-xs">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                    className="block w-24 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-right text-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>1%</span>
                <span>12%</span>
                <span>25%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Loan Tenure</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Math.max(1, Number(e.target.value)))}
                    className="block w-20 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-right text-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  <div className="inline-flex rounded-md shadow-xs" role="group">
                    <button
                      type="button"
                      onClick={() => setTenureType('years')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-l-md border ${
                        tenureType === 'years'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      Years
                    </button>
                    <button
                      type="button"
                      onClick={() => setTenureType('months')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-r-md border-t border-b border-r ${
                        tenureType === 'months'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      Months
                    </button>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max={tenureType === 'years' ? 40 : 360}
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>1 {tenureType}</span>
                <span>{tenureType === 'years' ? '20 Years' : '180 Months'}</span>
                <span>{tenureType === 'years' ? '40 Years' : '360 Months'}</span>
              </div>
            </div>
          </div>

          {/* Right panel: Results */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs">
            <div className="space-y-6">
              <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                Estimated Repayment Summary
              </h4>

              <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 text-center">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Monthly Payment (EMI)</span>
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(emiData.emi)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-500 block mb-0.5">Total Interest</span>
                  <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(emiData.totalInterest)}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-500 block mb-0.5">Total Payment</span>
                  <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(emiData.totalPay)}
                  </span>
                </div>
              </div>

              {/* Custom SVG Pie Chart */}
              <div className="flex flex-col items-center justify-center pt-2">
                <svg width="180" height="180" viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e4e4e7" strokeWidth="12" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - emiData.principalPercent / 100)}`}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - emiData.interestPercent / 100)}`}
                    className="origin-center rotate-180"
                    style={{ transform: `rotate(${(emiData.principalPercent / 100) * 360}deg)` }}
                  />
                </svg>

                {/* Legend */}
                <div className="flex gap-4 mt-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                    <span className="text-zinc-700 dark:text-zinc-300">Principal ({Math.round(emiData.principalPercent)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-amber-500 rounded-full" />
                    <span className="text-zinc-700 dark:text-zinc-300">Interest ({Math.round(emiData.interestPercent)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MORTGAGE CALCULATOR PANEL */}
      {id === 'mortgage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Mortgage Purchase Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Home Value */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Home Price ($)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                  className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Down Payment ($)</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                  className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.05"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              {/* Loan Term */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Loan Term (Years)</label>
                <select
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                >
                  <option value="30">30 Years Fixed</option>
                  <option value="20">20 Years Fixed</option>
                  <option value="15">15 Years Fixed</option>
                  <option value="10">10 Years Fixed</option>
                </select>
              </div>

              {/* Property Tax */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Annual Property Tax (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(Math.max(0, Number(e.target.value)))}
                  className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              {/* Home Insurance */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Annual Home Insurance ($)</label>
                <input
                  type="number"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(Math.max(0, Number(e.target.value)))}
                  className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              {/* HOA fee */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Monthly HOA Fee ($)</label>
                <input
                  type="number"
                  value={hoa}
                  onChange={(e) => setHoa(Math.max(0, Number(e.target.value)))}
                  className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              Total Monthly Mortgage PITI
            </h4>

            <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-5 text-center">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Estimated Monthly Payment</span>
              <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(mortgageData.totalMonthly)}
              </span>
            </div>

            {/* Breakdown progress bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-zinc-600 dark:text-zinc-400">Principal & Interest</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{formatCurrency(mortgageData.monthlyPI)}/mo</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${mortgageData.piPct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-zinc-600 dark:text-zinc-400">Property Taxes</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{formatCurrency(mortgageData.monthlyTax)}/mo</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: `${mortgageData.taxPct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-zinc-600 dark:text-zinc-400">Home Insurance</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{formatCurrency(mortgageData.monthlyIns)}/mo</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${mortgageData.insPct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-zinc-600 dark:text-zinc-400">HOA Dues</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{formatCurrency(hoa)}/mo</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${mortgageData.hoaPct}%` }} />
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2 text-xs text-zinc-500">
              <div className="flex justify-between">
                <span>Calculated Loan Amount:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatCurrency(mortgageData.loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Lifetime Interest Paid:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatCurrency(mortgageData.totalInterest)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SIP & INVESTMENT CALCULATOR PANEL */}
      {(id === 'sip' || id === 'investment' || id === 'savings') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Wealth Generation Parameters
            </h3>

            {id === 'investment' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Initial Deposit ($)</label>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                    className="block w-28 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-right text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            )}

            {/* Monthly SIP contribution */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {id === 'savings' ? 'Monthly Goal Contribution' : 'Monthly SIP Amount'}
                </label>
                <div className="relative rounded-md shadow-xs">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 text-sm">$</span>
                  <input
                    type="number"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Math.max(0, Number(e.target.value)))}
                    className="block w-28 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 pl-7 pr-3 py-1.5 text-right text-sm"
                  />
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="10000"
                step="50"
                value={sipMonthly}
                onChange={(e) => setSipMonthly(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>$10</span>
                <span>$5,000</span>
                <span>$10,000</span>
              </div>
            </div>

            {/* Expected Returns */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Expected Annual Return Rate (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Math.max(0, Number(e.target.value)))}
                  className="block w-20 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-right text-sm"
                />
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>1%</span>
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Time Period (Years)</label>
                <input
                  type="number"
                  value={sipTenure}
                  onChange={(e) => setSipTenure(Math.max(1, Number(e.target.value)))}
                  className="block w-20 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-right text-sm"
                />
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={sipTenure}
                onChange={(e) => setSipTenure(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-400"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>1 Year</span>
                <span>20 Years</span>
                <span>40 Years</span>
              </div>
            </div>

            {id === 'investment' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Compounding Frequency</label>
                <select
                  value={compoundingFreq}
                  onChange={(e) => setCompoundingFreq(Number(e.target.value))}
                  className="block w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                >
                  <option value="12">Compounded Monthly</option>
                  <option value="4">Compounded Quarterly</option>
                  <option value="1">Compounded Annually</option>
                </select>
              </div>
            )}
          </div>

          {/* Results Summary with area chart */}
          <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                Future Maturity Value
              </h4>

              <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 text-center">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Maturity Wealth Est.</span>
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(id === 'investment' ? investmentData.totalValue : sipData.totalValue)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-500 block mb-0.5">Total Invested</span>
                  <span className="text-md font-semibold text-zinc-800 dark:text-zinc-200">
                    {formatCurrency(id === 'investment' ? investmentData.totalInvested : sipData.totalInvested)}
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl">
                  <span className="text-xs text-zinc-500 block mb-0.5">Estimated Gain</span>
                  <span className="text-md font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(id === 'investment' ? investmentData.wealthGain : sipData.wealthGain)}
                  </span>
                </div>
              </div>
            </div>

            {/* Custom SVG Area Growth Chart */}
            {id !== 'investment' && sipData.growthChartData.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">Growth Chart Over Time</span>
                <div className="bg-white dark:bg-zinc-850 p-3 rounded-xl border border-zinc-150 dark:border-zinc-800">
                  <svg viewBox="0 0 200 100" className="w-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="20" y1="10" x2="190" y2="10" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />
                    <line x1="20" y1="50" x2="190" y2="50" stroke="#f4f4f5" strokeWidth="1" className="dark:stroke-zinc-800" />
                    <line x1="20" y1="90" x2="190" y2="90" stroke="#e4e4e7" strokeWidth="1" className="dark:stroke-zinc-800" />

                    {/* Coordinates conversion */}
                    {(() => {
                      const maxVal = Math.max(...sipData.growthChartData.map(d => d.value), 1000);
                      const pointsValue: string[] = [];
                      const pointsInvested: string[] = [];

                      sipData.growthChartData.forEach((d, index) => {
                        const x = 20 + (index / (sipData.growthChartData.length - 1)) * 170;
                        const yVal = 90 - (d.value / maxVal) * 80;
                        const yInv = 90 - (d.invested / maxVal) * 80;
                        pointsValue.push(`${x},${yVal}`);
                        pointsInvested.push(`${x},${yInv}`);
                      });

                      return (
                        <>
                          {/* Value Area / Line */}
                          <polygon
                            points={`20,90 ${pointsValue.join(' ')} 190,90`}
                            fill="url(#greenGrad)"
                            opacity="0.2"
                          />
                          <polyline
                            points={pointsValue.join(' ')}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2.5"
                          />

                          {/* Invested Area / Line */}
                          <polyline
                            points={pointsInvested.join(' ')}
                            fill="none"
                            stroke="#a1a1aa"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                          />

                          {/* Gradients */}
                          <defs>
                            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Labels */}
                          <text x="20" y="98" fontSize="6" fill="#888" textAnchor="middle">Yr 1</text>
                          <text x="105" y="98" fontSize="6" fill="#888" textAnchor="middle">Halfway</text>
                          <text x="190" y="98" fontSize="6" fill="#888" textAnchor="middle">Yr {sipTenure}</text>
                        </>
                      );
                    })()}
                  </svg>
                  <div className="flex justify-center gap-4 mt-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-0.5 bg-zinc-400 border-t border-dashed" />
                      <span className="text-zinc-500">Total Invested</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2.5 h-2 bg-emerald-500 opacity-70 rounded-xs" />
                      <span className="text-zinc-500">Maturity Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. FIXED DEPOSIT (FD) CALCULATOR */}
      {id === 'fd' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Fixed Deposit Settings
            </h3>

            {/* Principal */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">FD Principal Deposit ($)</label>
                <input
                  type="number"
                  value={fdPrincipal}
                  onChange={(e) => setFdPrincipal(Math.max(0, Number(e.target.value)))}
                  className="w-28 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-right text-sm"
                />
              </div>
              <input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={fdPrincipal}
                onChange={(e) => setFdPrincipal(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Rate */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Rate of Interest (% p.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={fdRate}
                  onChange={(e) => setFdRate(Math.max(0, Number(e.target.value)))}
                  className="w-20 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-right text-sm"
                />
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={fdRate}
                onChange={(e) => setFdRate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tenure (Years)</label>
                <input
                  type="number"
                  value={fdTenure}
                  onChange={(e) => setFdTenure(Math.max(1, Number(e.target.value)))}
                  className="w-20 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-right text-sm"
                />
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={fdTenure}
                onChange={(e) => setFdTenure(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-6">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase text-center">
              Bank FD Yield Summary
            </h4>

            <div className="text-center p-6 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mb-1">Maturity Amount</span>
              <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                {formatCurrency(fdData.maturityValue)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white dark:bg-zinc-850 rounded-lg">
                <span className="text-xs text-zinc-500 block">Principal</span>
                <span className="font-semibold text-zinc-850 dark:text-zinc-200">{formatCurrency(fdPrincipal)}</span>
              </div>
              <div className="text-center p-3 bg-white dark:bg-zinc-850 rounded-lg">
                <span className="text-xs text-zinc-500 block">Total Interest</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(fdData.interestEarned)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. VAT CALCULATOR */}
      {id === 'vat' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Percent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              VAT Parameters
            </h3>

            <div className="space-y-4">
              {/* Type toggle */}
              <div className="flex rounded-md shadow-xs">
                <button
                  type="button"
                  onClick={() => setVatType('add')}
                  className={`flex-1 px-4 py-2 text-sm font-semibold border rounded-l-md ${
                    vatType === 'add'
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  Add VAT (Exclusive Price)
                </button>
                <button
                  type="button"
                  onClick={() => setVatType('remove')}
                  className={`flex-1 px-4 py-2 text-sm font-semibold border-t border-b border-r rounded-r-md ${
                    vatType === 'remove'
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  Remove VAT (Inclusive Price)
                </button>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Base Price Amount ($)</label>
                <input
                  type="number"
                  value={vatPrice}
                  onChange={(e) => setVatPrice(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-2 text-sm"
                />
              </div>

              {/* VAT Rate */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">VAT Rate (%)</label>
                <select
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-2 text-sm"
                >
                  <option value="5">5% (Low rate)</option>
                  <option value="12">12%</option>
                  <option value="15">15%</option>
                  <option value="18">18%</option>
                  <option value="20">20% (UK Standard)</option>
                  <option value="25">25% (Schengen/Nordic)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-center space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              VAT Invoice Summary
            </h4>

            <div className="space-y-3 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-4">
              <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Net Amount (Excl. Tax)</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(vatData.netAmount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">VAT Tax Amount ({vatRate}%)</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">+{formatCurrency(vatData.vatAmount)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-md font-bold text-zinc-800 dark:text-zinc-200">Gross Price (Incl. Tax)</span>
                <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{formatCurrency(vatData.finalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. INCOME TAX CALCULATOR */}
      {id === 'tax' && (
        <IncomeTaxCalculator />
      )}

      {/* 7. SWP CALCULATOR */}
      {id === 'swp' && (
        <SwpCalculator />
      )}
    </div>
  );
}
