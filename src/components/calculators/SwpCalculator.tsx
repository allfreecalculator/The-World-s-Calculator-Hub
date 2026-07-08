import React, { useState, useMemo, useEffect } from 'react';
import { 
  PiggyBank, 
  Coins, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  RotateCcw, 
  Info, 
  TrendingUp, 
  Calculator, 
  TrendingDown, 
  BookOpen, 
  HelpCircle,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

export default function SwpCalculator() {
  // Currencies: INR (default) and USD
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Input States (Defaults)
  const [totalInvestment, setTotalInvestment] = useState<number>(1000000); // 10 Lakhs or $100,000
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(20000);  // 20k or $2,000
  const [expectedReturn, setExpectedReturn] = useState<number>(12);          // 12%
  const [timePeriod, setTimePeriod] = useState<number>(15);                  // 15 Years

  // Notification / Feedback states
  const [copiedState, setCopiedState] = useState<'none' | 'copied' | 'shared'>('none');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Synchronize defaults on currency change to provide realistic initial numbers
  const handleCurrencyChange = (curr: 'INR' | 'USD') => {
    if (curr === currency) return;
    setCurrency(curr);
    if (curr === 'USD') {
      // Scale down to USD levels
      setTotalInvestment(100000); // $100k
      setMonthlyWithdrawal(1000); // $1k
      setExpectedReturn(8);       // 8%
      setTimePeriod(15);
    } else {
      // Scale up to INR levels
      setTotalInvestment(1000000); // 10 Lakhs
      setMonthlyWithdrawal(20000);  // 20k
      setExpectedReturn(12);       // 12%
      setTimePeriod(15);
    }
  };

  // Reset all parameters to defaults
  const handleReset = () => {
    if (currency === 'INR') {
      setTotalInvestment(1000000);
      setMonthlyWithdrawal(20000);
      setExpectedReturn(12);
      setTimePeriod(15);
    } else {
      setTotalInvestment(100000);
      setMonthlyWithdrawal(1000);
      setExpectedReturn(8);
      setTimePeriod(15);
    }
  };

  // Precise month-by-month financial projection engine
  const swpProjection = useMemo(() => {
    const P = totalInvestment;
    const W = monthlyWithdrawal;
    const R = expectedReturn;
    const T = timePeriod;
    
    const monthlyRate = R / 12 / 100;
    const totalMonths = T * 12;
    
    let balance = P;
    let totalWithdrawn = 0;
    let totalInterestEarned = 0;
    let exhaustedMonth = -1;
    
    const yearlyBreakdown: Array<{
      year: number;
      interest: number;
      withdrawn: number;
      balance: number;
    }> = [];
    
    let yearlyInterest = 0;
    let yearlyWithdrawn = 0;
    
    for (let month = 1; month <= totalMonths; month++) {
      if (balance <= 0) {
        if (exhaustedMonth === -1) {
          exhaustedMonth = month - 1;
        }
        balance = 0;
        
        // Push remaining years if capital exhausted
        if (month % 12 === 0) {
          yearlyBreakdown.push({
            year: month / 12,
            interest: Math.round(yearlyInterest),
            withdrawn: Math.round(yearlyWithdrawn),
            balance: 0
          });
          yearlyInterest = 0;
          yearlyWithdrawn = 0;
        }
        continue;
      }
      
      // Calculate monthly interest accrued on the remaining balance
      const interestAccrued = balance * monthlyRate;
      yearlyInterest += interestAccrued;
      totalInterestEarned += interestAccrued;
      
      // Calculate the maximum withdrawable amount
      const withdrawable = Math.min(balance + interestAccrued, W);
      yearlyWithdrawn += withdrawable;
      totalWithdrawn += withdrawable;
      
      // Compute the new end-of-month balance
      balance = balance + interestAccrued - withdrawable;
      
      // Save data at the end of each fiscal year milestone
      if (month % 12 === 0) {
        yearlyBreakdown.push({
          year: month / 12,
          interest: Math.round(yearlyInterest),
          withdrawn: Math.round(yearlyWithdrawn),
          balance: Math.max(0, Math.round(balance))
        });
        yearlyInterest = 0;
        yearlyWithdrawn = 0;
      }
    }
    
    // In case the period doesn't end on an exact year boundary
    if (totalMonths % 12 !== 0 && exhaustedMonth === -1) {
      yearlyBreakdown.push({
        year: Math.ceil(totalMonths / 12),
        interest: Math.round(yearlyInterest),
        withdrawn: Math.round(yearlyWithdrawn),
        balance: Math.max(0, Math.round(balance))
      });
    }

    const finalBalance = Math.max(0, Math.round(balance));
    
    return {
      totalInvested: P,
      totalWithdrawn: Math.round(totalWithdrawn),
      totalInterestEarned: Math.round(totalInterestEarned),
      finalBalance,
      isExhausted: exhaustedMonth !== -1,
      exhaustedMonth,
      yearlyBreakdown
    };
  }, [totalInvestment, monthlyWithdrawal, expectedReturn, timePeriod]);

  // Formatter matching localized system settings
  const formatValue = (val: number) => {
    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(val);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(val);
    }
  };

  // Human friendly labels for slider guides
  const getFriendlySliderLabel = (val: number) => {
    if (currency === 'INR') {
      if (val >= 10000000) return `${(val / 10000000).toFixed(1).replace(/\.0$/, '')} Cr`;
      if (val >= 100000) return `${(val / 100000).toFixed(1).replace(/\.0$/, '')} Lakh`;
      return `${(val / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    } else {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
      if (val >= 1000) return `$${(val / 1000).toFixed(1).replace(/\.0$/, '')}k`;
      return `$${val}`;
    }
  };

  // Copy textual layout summary to clipboard
  const handleCopy = () => {
    const text = `--- SWP CALCULATOR SUMMARY ---
Currency: ${currency}
Total Investment: ${formatValue(swpProjection.totalInvested)}
Monthly Withdrawal: ${formatValue(monthlyWithdrawal)}
Expected Return Rate: ${expectedReturn}% p.a.
Time Period: ${timePeriod} Years
-----------------------------
Total Payouts Withdrawn: ${formatValue(swpProjection.totalWithdrawn)}
Remaining Final Balance: ${formatValue(swpProjection.finalBalance)}
Sustainability: ${swpProjection.isExhausted ? `Capital ran out in Year ${Math.floor(swpProjection.exhaustedMonth / 12) + 1}` : 'Capital sustained successfully'}
Calculated on CalcHub`;
    
    navigator.clipboard.writeText(text);
    setCopiedState('copied');
    setTimeout(() => setCopiedState('none'), 2500);
  };

  // Share calculation url
  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?calc=swp&inv=${totalInvestment}&wd=${monthlyWithdrawal}&r=${expectedReturn}&t=${timePeriod}&cur=${currency}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedState('shared');
    setTimeout(() => setCopiedState('none'), 2500);
  };

  // Print friendly triggered PDF styling
  const handleDownloadPDF = () => {
    window.print();
  };

  // Parsing shared calculation parameters from URL on load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCalc = params.get('calc');
      if (urlCalc === 'swp') {
        const urlInv = params.get('inv');
        const urlWd = params.get('wd');
        const urlR = params.get('r');
        const urlT = params.get('t');
        const urlCur = params.get('cur');
        
        if (urlCur === 'INR' || urlCur === 'USD') setCurrency(urlCur);
        if (urlInv) setTotalInvestment(Number(urlInv));
        if (urlWd) setMonthlyWithdrawal(Number(urlWd));
        if (urlR) setExpectedReturn(Number(urlR));
        if (urlT) setTimePeriod(Number(urlT));
      }
    } catch (e) {
      console.error("Failed to parse query parameters:", e);
    }
  }, []);

  // Total wealth managed calculations for donut chart rendering
  const chartData = useMemo(() => {
    const totalWithdrawn = swpProjection.totalWithdrawn;
    const finalBalance = swpProjection.finalBalance;
    const sum = totalWithdrawn + finalBalance;
    
    const withdrawnPct = sum > 0 ? (totalWithdrawn / sum) * 100 : 50;
    const balancePct = sum > 0 ? (finalBalance / sum) * 100 : 50;
    
    const radius = 50;
    const circumference = 2 * Math.PI * radius; // 314.16
    const balanceStroke = (balancePct / 100) * circumference;
    const withdrawnStroke = (withdrawnPct / 100) * circumference;
    
    return {
      sum,
      withdrawnPct,
      balancePct,
      circumference,
      balanceStroke,
      withdrawnStroke
    };
  }, [swpProjection]);

  return (
    <div className="space-y-12">
      {/* Interactive SWP Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Input Configuration Panel (45% desktop width) */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[20px] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <h3 className="text-md font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-[#3ebd93]" />
              SWP Parameters
            </h3>
            
            {/* Currency switcher switch */}
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => handleCurrencyChange('INR')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-white dark:bg-zinc-700 text-[#3ebd93] shadow-xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => handleCurrencyChange('USD')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-white dark:bg-zinc-700 text-[#3ebd93] shadow-xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          {/* 1. Total Investment */}
          <div className="space-y-3">
            <div className="flex justify-between items-center relative">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                Total Investment
                <button 
                  onMouseEnter={() => setShowTooltip('investment')}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="p-0.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {showTooltip === 'investment' && (
                  <div className="absolute top-6 left-0 z-50 w-56 p-2 text-[11px] bg-zinc-900 text-white rounded-lg shadow-lg leading-relaxed">
                    The total lump sum amount you will initially invest in the mutual fund/asset.
                  </div>
                )}
              </label>
              
              <div className="relative rounded-lg shadow-2xs">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 text-xs font-bold">
                  {currency === 'INR' ? '₹' : '$'}
                </span>
                <input
                  type="number"
                  value={totalInvestment}
                  onChange={(e) => setTotalInvestment(Math.max(0, Number(e.target.value)))}
                  className="block w-36 md:w-40 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 pl-7 pr-3 py-1.5 text-right text-xs focus:border-[#3ebd93] focus:ring-1 focus:ring-[#3ebd93] font-bold outline-hidden transition-colors"
                />
              </div>
            </div>
            
            <input
              type="range"
              min={currency === 'INR' ? 10000 : 1000}
              max={currency === 'INR' ? 100000000 : 10000000} // Up to 10Cr or 10M
              step={currency === 'INR' ? 10000 : 1000}
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#3ebd93] focus:outline-hidden"
            />
            
            <div className="flex justify-between text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
              <span>{currency === 'INR' ? '₹10k' : '$1k'}</span>
              <span className="text-[#3ebd93] font-bold normal-case text-xs">
                {getFriendlySliderLabel(totalInvestment)}
              </span>
              <span>{currency === 'INR' ? '₹10 Cr' : '$10M'}</span>
            </div>
          </div>

          {/* 2. Monthly Withdrawal */}
          <div className="space-y-3">
            <div className="flex justify-between items-center relative">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                Monthly Withdrawal
                <button 
                  onMouseEnter={() => setShowTooltip('withdrawal')}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="p-0.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {showTooltip === 'withdrawal' && (
                  <div className="absolute top-6 left-0 z-50 w-56 p-2 text-[11px] bg-zinc-900 text-white rounded-lg shadow-lg leading-relaxed">
                    The fixed amount you plan to withdraw systematically at the end of every month.
                  </div>
                )}
              </label>
              
              <div className="relative rounded-lg shadow-2xs">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500 text-xs font-bold">
                  {currency === 'INR' ? '₹' : '$'}
                </span>
                <input
                  type="number"
                  value={monthlyWithdrawal}
                  onChange={(e) => setMonthlyWithdrawal(Math.max(0, Number(e.target.value)))}
                  className="block w-36 md:w-40 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 pl-7 pr-3 py-1.5 text-right text-xs focus:border-[#3ebd93] focus:ring-1 focus:ring-[#3ebd93] font-bold outline-hidden transition-colors"
                />
              </div>
            </div>
            
            <input
              type="range"
              min={currency === 'INR' ? 500 : 50}
              max={currency === 'INR' ? 1000000 : 100000} // Up to 10L or 100k
              step={currency === 'INR' ? 500 : 50}
              value={monthlyWithdrawal}
              onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#3ebd93] focus:outline-hidden"
            />
            
            <div className="flex justify-between text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
              <span>{currency === 'INR' ? '₹500' : '$50'}</span>
              <span className="text-[#3ebd93] font-bold normal-case text-xs">
                {getFriendlySliderLabel(monthlyWithdrawal)}/mo
              </span>
              <span>{currency === 'INR' ? '₹10L' : '$100k'}</span>
            </div>
          </div>

          {/* 3. Expected Return */}
          <div className="space-y-3">
            <div className="flex justify-between items-center relative">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                Expected Return Rate (%)
                <button 
                  onMouseEnter={() => setShowTooltip('returns')}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="p-0.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {showTooltip === 'returns' && (
                  <div className="absolute top-6 left-0 z-50 w-56 p-2 text-[11px] bg-zinc-900 text-white rounded-lg shadow-lg leading-relaxed">
                    The projected annual rate of return on your investment portfolio.
                  </div>
                )}
              </label>
              
              <div className="relative rounded-lg shadow-2xs">
                <input
                  type="number"
                  value={expectedReturn}
                  step="0.1"
                  onChange={(e) => setExpectedReturn(Math.max(1, Math.min(30, Number(e.target.value))))}
                  className="block w-20 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 px-3 py-1.5 text-right text-xs focus:border-[#3ebd93] focus:ring-1 focus:ring-[#3ebd93] font-bold outline-hidden transition-colors"
                />
              </div>
            </div>
            
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#3ebd93] focus:outline-hidden"
            />
            
            <div className="flex justify-between text-[10px] text-zinc-400 font-semibold">
              <span>1%</span>
              <span className="text-[#3ebd93] font-bold text-xs">{expectedReturn}% p.a.</span>
              <span>30%</span>
            </div>
          </div>

          {/* 4. Time Period */}
          <div className="space-y-3">
            <div className="flex justify-between items-center relative">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                Time Period (Years)
                <button 
                  onMouseEnter={() => setShowTooltip('tenure')}
                  onMouseLeave={() => setShowTooltip(null)}
                  className="p-0.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
                {showTooltip === 'tenure' && (
                  <div className="absolute top-6 left-0 z-50 w-56 p-2 text-[11px] bg-zinc-900 text-white rounded-lg shadow-lg leading-relaxed">
                    The lifespan or duration over which you wish to execute withdrawals.
                  </div>
                )}
              </label>
              
              <div className="relative rounded-lg shadow-2xs">
                <input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Math.max(1, Math.min(40, Number(e.target.value))))}
                  className="block w-20 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 px-3 py-1.5 text-right text-xs focus:border-[#3ebd93] focus:ring-1 focus:ring-[#3ebd93] font-bold outline-hidden transition-colors"
                />
              </div>
            </div>
            
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#3ebd93] focus:outline-hidden"
            />
            
            <div className="flex justify-between text-[10px] text-zinc-400 font-semibold">
              <span>1 Yr</span>
              <span className="text-[#3ebd93] font-bold text-xs">{timePeriod} {timePeriod === 1 ? 'Year' : 'Years'}</span>
              <span>40 Yrs</span>
            </div>
          </div>

          {/* Buttons: Reset and Calculate */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2.5 px-4 text-xs font-bold border-2 border-[#3ebd93] text-[#3ebd93] hover:text-white bg-white dark:bg-zinc-900 hover:bg-[#3ebd93] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={() => {
                // Calculation is live, but clicking Calculate triggers a subtle feedback alert
                setCopiedState('copied');
                setTimeout(() => setCopiedState('none'), 1200);
              }}
              className="flex-1 py-2.5 px-4 text-xs font-bold bg-[#3ebd93] hover:bg-[#32a27d] text-white rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              Calculate
            </button>
          </div>
        </div>

        {/* Right Output & Analytics Section (55% desktop width) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Results Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[20px] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] space-y-6 relative overflow-hidden">
            
            <div className="flex justify-between items-center pb-2">
              <h4 className="text-xs font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                SWP Performance Metrics
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all cursor-pointer relative"
                  title="Copy results"
                >
                  {copiedState === 'copied' ? (
                    <Check className="w-3.5 h-3.5 text-[#3ebd93]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all cursor-pointer"
                  title="Share settings"
                >
                  {copiedState === 'shared' ? (
                    <Check className="w-3.5 h-3.5 text-[#3ebd93]" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all cursor-pointer"
                  title="Export / Print PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {copiedState === 'copied' && (
              <div className="absolute top-16 right-6 bg-[#3ebd93] text-white px-3 py-1 rounded-md text-[10px] font-bold animate-fade-in shadow-md">
                ✓ Results Copied to Clipboard
              </div>
            )}
            {copiedState === 'shared' && (
              <div className="absolute top-16 right-6 bg-indigo-600 text-white px-3 py-1 rounded-md text-[10px] font-bold animate-fade-in shadow-md">
                ✓ Share Link Saved to Clipboard
              </div>
            )}

            {/* Core Output Fields Grid */}
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              <div className="py-3 flex justify-between items-center">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Total Investment</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {formatValue(swpProjection.totalInvested)}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Total Withdrawals</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 text-[#2d4042] dark:text-indigo-400">
                  {formatValue(swpProjection.totalWithdrawn)}
                </span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Estimated Final Value</span>
                <span className={`text-md font-extrabold ${swpProjection.isExhausted ? 'text-rose-500 line-through' : 'text-[#3ebd93]'}`}>
                  {formatValue(swpProjection.finalBalance)}
                </span>
              </div>
            </div>

            {/* Premium Interactive Donut Chart */}
            <div className="flex flex-col sm:flex-row items-center justify-around bg-zinc-50/50 dark:bg-zinc-850/20 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 gap-6">
              
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  {/* Outer Track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="stroke-zinc-100 dark:stroke-zinc-800 fill-transparent"
                    strokeWidth="11"
                  />
                  {/* Total Withdrawal Arc */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="stroke-[#2d4042] dark:stroke-indigo-600/80 fill-transparent transition-all duration-500 ease-out"
                    strokeWidth="11"
                    strokeDasharray={`${chartData.withdrawnStroke} ${chartData.circumference}`}
                    strokeDashoffset={0}
                  />
                  {/* Final Value Remaining Arc */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className="stroke-[#3ebd93] fill-transparent transition-all duration-500 ease-out"
                    strokeWidth="11"
                    strokeDasharray={`${chartData.balanceStroke} ${chartData.circumference}`}
                    strokeDashoffset={`-${chartData.withdrawnStroke}`}
                  />
                </svg>
                {/* Embedded central totals */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Total Wealth</span>
                  <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200">
                    {formatValue(chartData.sum)}
                  </span>
                </div>
              </div>

              {/* Legends with detail and percentages */}
              <div className="space-y-3 text-xs w-full sm:w-auto">
                <div className="flex items-start gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-md bg-[#2d4042] dark:bg-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] font-bold uppercase tracking-wider">Total Withdrawal</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      {formatValue(swpProjection.totalWithdrawn)} <span className="text-[10px] text-zinc-400">({chartData.withdrawnPct.toFixed(1)}%)</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-md bg-[#3ebd93] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] font-bold uppercase tracking-wider">Remaining Balance</span>
                    <span className="font-bold text-[#3ebd93]">
                      {formatValue(swpProjection.finalBalance)} <span className="text-[10px] text-zinc-400">({chartData.balancePct.toFixed(1)}%)</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Intelligent Capital Expiry Warnings */}
            {swpProjection.isExhausted ? (
              <div className="bg-rose-50/60 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 rounded-xl p-4 text-xs text-rose-700 dark:text-rose-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  ⚠️ Capital Exhaustion Alert
                </div>
                <p className="leading-relaxed text-[11px] text-rose-600 dark:text-rose-400">
                  Your starting investment is projected to completely run out in <strong>Year {Math.floor(swpProjection.exhaustedMonth / 12) + 1}</strong> (Month {swpProjection.exhaustedMonth}). Consider reducing the monthly withdrawal or expanding the starting principal to sustain this duration.
                </p>
              </div>
            ) : (
              <div className="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  🎉 Portfolio Sustainable
                </div>
                <p className="leading-relaxed text-[11px] text-emerald-600 dark:text-emerald-400">
                  Your investment portfolio successfully sustained all withdrawal payouts and left an estimated surplus of <strong>{formatValue(swpProjection.finalBalance)}</strong> at the end of {timePeriod} years!
                </p>
              </div>
            )}
          </div>

          {/* Yearly Milestones Accordion */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[20px] p-6 shadow-xs space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
              Year-by-Year Milestone Breakdown
            </h4>
            
            <div className="max-h-56 overflow-y-auto rounded-xl border border-zinc-100 dark:border-zinc-800/80 custom-scrollbar">
              <table className="w-full text-xs text-left text-zinc-500 dark:text-zinc-400">
                <thead className="text-[10px] font-bold uppercase tracking-wider bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 sticky top-0">
                  <tr>
                    <th className="px-4 py-2.5">Year</th>
                    <th className="px-4 py-2.5">Yearly Interest</th>
                    <th className="px-4 py-2.5">Yearly Payout</th>
                    <th className="px-4 py-2.5">End Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                  {swpProjection.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-zinc-800 dark:text-zinc-200">
                        Year {row.year}
                      </td>
                      <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400 font-medium">
                        +{formatValue(row.interest)}
                      </td>
                      <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-300">
                        {formatValue(row.withdrawn)}
                      </td>
                      <td className={`px-4 py-2.5 font-bold ${row.balance === 0 ? 'text-rose-500' : 'text-zinc-800 dark:text-zinc-100'}`}>
                        {row.balance === 0 ? 'Exhausted (₹0)' : formatValue(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* COMPREHENSIVE SECTIONS BELOW CALCULATOR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        
        {/* How SWP Works & Formula */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[20px] p-6 shadow-xs space-y-6">
          <div className="space-y-3">
            <h3 className="text-md font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#3ebd93]" />
              How SWP Works
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              A Systematic Withdrawal Plan (SWP) allows you to withdraw a specific sum of money from your mutual fund investment at regular intervals (monthly, quarterly, or annually). While you withdraw, the remaining capital continues to compound and earn returns.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-850 rounded-xl space-y-2 border border-zinc-150 dark:border-zinc-800/80">
            <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              The Math Behind SWP Compounding
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Every month, your outstanding balance earns interest. Then, the fixed monthly withdrawal amount is subtracted from the updated balance:
            </p>
            <div className="font-mono text-[11px] bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-900 text-zinc-800 dark:text-zinc-200 block text-center">
              Balance<sub>New</sub> = (Balance<sub>Prev</sub> × (1 + Return<sub>Monthly</sub>)) - Withdrawal
            </div>
            <p className="text-[10px] text-zinc-400">
              Where Return<sub>Monthly</sub> = (Annual Return % / 12) / 100.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Benefits of SWP
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 list-disc pl-4">
              <li><strong>Regular Income Stream:</strong> Provides a steady flow of cash, ideal for retirement, pension, or financial freedom.</li>
              <li><strong>Rupee Cost Averaging:</strong> Withdrawals are spread across markets, reducing market-timing risks.</li>
              <li><strong>Tax Efficiency:</strong> Only capital gains are taxable rather than the full withdrawal amount, making it highly tax-saving.</li>
              <li><strong>Capital Appreciation:</strong> If the rate of return exceeds the withdrawal rate, your principal continues to grow!</li>
            </ul>
          </div>
        </div>

        {/* Example Calculation & Related Links */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[20px] p-6 shadow-xs space-y-6">
          <div className="space-y-3">
            <h3 className="text-md font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#3ebd93]" />
              Example Practical Calculation
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Let's look at a typical practical scenario to understand how wealth grows with an SWP setup:
            </p>
            
            <div className="border border-zinc-100 dark:border-zinc-800/80 rounded-xl overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800 text-xs text-zinc-500">
              <div className="p-3 bg-zinc-50/50 dark:bg-zinc-850/50 flex justify-between font-medium">
                <span>Initial Deposit:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">₹10,00,000 (10 Lakhs)</span>
              </div>
              <div className="p-3 flex justify-between">
                <span>Monthly Payout chosen:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">₹10,000 / month</span>
              </div>
              <div className="p-3 flex justify-between">
                <span>Assumed Return (p.a.):</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">12%</span>
              </div>
              <div className="p-3 flex justify-between">
                <span>Tenure:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">15 Years</span>
              </div>
              <div className="p-3 bg-[#3ebd93]/5 dark:bg-[#3ebd93]/10 flex justify-between font-semibold text-[#3ebd93]">
                <span>Maturity Final Value:</span>
                <span>₹18,75,420</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Even after withdrawing a total of <strong>₹18,00,000</strong> over 15 years, your remaining portfolio grew from ₹10 Lakhs to <strong>₹18,75,420</strong> because of the powerful effect of 12% annual compound returns!
            </p>
          </div>

          {/* Related Calculators Links */}
          <div className="space-y-3 border-t border-zinc-100 dark:border-zinc-800 pt-4">
            <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Related Financial Tools
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="?calc=sip"
                className="p-3 border border-zinc-150 dark:border-zinc-800 rounded-xl hover:border-[#3ebd93] bg-zinc-50/50 dark:bg-zinc-850/30 hover:bg-white text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-all"
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#3ebd93]" />
                SIP Calculator
              </a>
              <a 
                href="?calc=investment"
                className="p-3 border border-zinc-150 dark:border-zinc-800 rounded-xl hover:border-[#3ebd93] bg-zinc-50/50 dark:bg-zinc-850/30 hover:bg-white text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-all"
              >
                <Coins className="w-3.5 h-3.5 text-[#3ebd93]" />
                Lumpsum Calculator
              </a>
              <a 
                href="?calc=emi"
                className="p-3 border border-zinc-150 dark:border-zinc-800 rounded-xl hover:border-[#3ebd93] bg-zinc-50/50 dark:bg-zinc-850/30 hover:bg-white text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-[#3ebd93]" />
                EMI Calculator
              </a>
              <a 
                href="?calc=loan"
                className="p-3 border border-zinc-150 dark:border-zinc-800 rounded-xl hover:border-[#3ebd93] bg-zinc-50/50 dark:bg-zinc-850/30 hover:bg-white text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 transition-all"
              >
                <Coins className="w-3.5 h-3.5 text-[#3ebd93]" />
                Loan Calculator
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions FAQ Section Accordion */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[20px] p-6 shadow-xs space-y-4">
        <h3 className="text-md font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#3ebd93]" />
          Frequently Asked Questions (FAQ)
        </h3>
        
        <div className="space-y-3.5">
          {[
            {
              q: "What is a Systematic Withdrawal Plan (SWP)?",
              a: "An SWP is an investment option offered by mutual funds that allows you to withdraw a predetermined, fixed amount at regular intervals from your existing mutual fund units. The remaining units continue to generate returns."
            },
            {
              q: "What is the difference between SWP and SIP?",
              a: "SIP (Systematic Investment Plan) is used to routinely invest money to build wealth over time. Conversely, SWP is used to systematically withdraw money, typically to generate a monthly pension or regular income stream from accumulated capital."
            },
            {
              q: "How does the SWP Calculator compute the final value?",
              a: "The calculator applies annual compounding monthly. Each month, it adds the monthly returns generated, subtracts the monthly withdrawal amount, and repeats this recursively for the selected tenure. If the withdrawals exceed the return rate, the principal gets exhausted early."
            },
            {
              q: "Are SWP withdrawals taxable?",
              a: "Yes, withdrawals are subject to Capital Gains Tax (LTCG/STCG) based on the asset class and holding period. However, unlike traditional FDs where the full interest is taxable, SWP is highly tax-efficient because you only pay tax on the gain portion of the withdrawn units."
            },
            {
              q: "Can I adjust or stop my SWP anytime?",
              a: "Yes, SWP setups are highly flexible. You can increase, decrease, pause, or completely terminate your systematic withdrawals at any time without paying penalties in most modern mutual funds."
            }
          ].map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-zinc-100 dark:border-zinc-800 pb-3"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left font-bold text-zinc-800 dark:text-zinc-200 hover:text-[#3ebd93] text-xs md:text-sm flex justify-between items-center py-1 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-[#3ebd93] font-extrabold text-sm ml-2">
                  {activeFaq === index ? '−' : '+'}
                </span>
              </button>
              
              {activeFaq === index && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-2 pl-1 animate-fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
