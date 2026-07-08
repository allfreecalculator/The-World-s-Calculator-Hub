import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, Calculator, Info } from 'lucide-react';

interface SmartFallbackCalculatorProps {
  id: string;
  name: string;
  category: string;
  description: string;
}

function getCalculatorConfig(id: string) {
  if (id.includes('loan') || id === 'interest_calc' || id.includes('interest')) {
    return {
      group: 'loan',
      label1: 'Loan Principal / Amount ($)',
      default1: 15000,
      label2: 'Annual Interest Rate (%)',
      default2: 7.5,
      label3: 'Loan Tenure (Years)',
      default3: 5,
    };
  }
  if (id.includes('mortgage') || id.includes('payment') || id === 'down_payment' || id === 'closing_cost') {
    return {
      group: 'mortgage',
      label1: 'Home Value ($)',
      default1: 350000,
      label2: 'Interest Rate (%)',
      default2: 6.8,
      label3: 'Loan Term (Years)',
      default3: 30,
    };
  }
  if (id === 'lumpsum' || id.includes('fund') || id.includes('return') || id === 'cagr' || id === 'roi' || id === 'xirr' || id === 'dividend' || id === 'inflation' || id === 'retirement' || id === 'fire') {
    return {
      group: 'investment',
      label1: 'Initial Investment ($)',
      default1: 10000,
      label2: 'Expected Annual Return (%)',
      default2: 10,
      label3: 'Investment Duration (Years)',
      default3: 15,
    };
  }
  if (id === 'rd' || id === 'hys' || id.includes('savings') || id === 'emergency_fund' || id === 'interest_earnings') {
    return {
      group: 'savings',
      label1: 'Monthly Savings Amount ($)',
      default1: 500,
      label2: 'Annual Savings Rate (%)',
      default2: 4.5,
      label3: 'Savings Period (Years)',
      default3: 10,
    };
  }
  if (id.includes('credit_card') || id === 'balance_transfer' || id === 'credit_utilization' || id === 'minimum_payment' || id.includes('rewards') || id === 'cash_back' || id === 'apr') {
    return {
      group: 'credit_card',
      label1: 'Credit Card Balance ($)',
      default1: 5000,
      label2: 'Card APR (%)',
      default2: 21.9,
      label3: 'Monthly Payment ($)',
      default3: 200,
    };
  }
  if (id === 'gst' || id === 'sales_tax' || id.includes('tax')) {
    return {
      group: 'tax',
      label1: 'Base Purchase Amount ($)',
      default1: 1200,
      label2: 'Tax Rate (%)',
      default2: 8.25,
      label3: 'Is Tax Included? (1=Yes, 0=No)',
      default3: 0,
    };
  }
  if (id === 'salary' || id.includes('wage') || id.includes('pay') || id.includes('income') || id.includes('salary') || id === 'bonus' || id === 'commission') {
    return {
      group: 'salary',
      label1: 'Annual Salary / Hourly Rate ($)',
      default1: 75000,
      label2: 'Weekly Hours Worked (e.g. 40)',
      default2: 40,
      label3: 'Tax Withholding Rate (%)',
      default3: 22,
    };
  }
  if (id.includes('profit') || id === 'break_even' || id === 'markup' || id === 'inventory' || id === 'cash_flow' || id === 'revenue' || id === 'expense' || id === 'invoice' || id === 'depreciation' || id === 'business_roi') {
    return {
      group: 'business',
      label1: 'Gross Revenue / Price ($)',
      default1: 50000,
      label2: 'Total Operating Cost ($)',
      default2: 32000,
      label3: 'Tax Rate (%)',
      default3: 20,
    };
  }
  if (id === 'exchange_rate' || id === 'crypto_profit' || id === 'bitcoin' || id === 'ethereum' || id === 'forex') {
    return {
      group: 'currency',
      label1: 'Investment Amount ($)',
      default1: 1500,
      label2: 'Buy / Exchange Rate ($)',
      default2: 1.0,
      label3: 'Current Rate ($)',
      default3: 1.15,
    };
  }

  return {
    group: 'default',
    label1: 'Value A',
    default1: 100,
    label2: 'Value B',
    default2: 20,
    label3: 'Value C',
    default3: 5,
  };
}

export default function SmartFallbackCalculator({ id, name, category, description }: SmartFallbackCalculatorProps) {
  const config = useMemo(() => getCalculatorConfig(id), [id]);

  const [val1, setVal1] = useState<number>(config.default1);
  const [val2, setVal2] = useState<number>(config.default2);
  const [val3, setVal3] = useState<number>(config.default3);

  const [listInput, setListInput] = useState<string>('12, 19, 8, 4, 15, 22, 10');

  const [m11, setM11] = useState<number>(2);
  const [m12, setM12] = useState<number>(3);
  const [m21, setM21] = useState<number>(1);
  const [m22, setM22] = useState<number>(4);

  // Sync state values with active calculator config changes
  useEffect(() => {
    setVal1(config.default1);
    setVal2(config.default2);
    setVal3(config.default3);
  }, [id, config]);

  const solvedOutputs = useMemo(() => {
    // Math category fallbacks
    if (id === 'fraction') {
      const num1 = val1;
      const den1 = val2 === 0 ? 1 : val2;
      const num2 = val3;
      const den2 = 4;
      const commonDen = den1 * den2;
      const sumNum = num1 * den2 + num2 * den1;
      const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
      const divisor = Math.abs(gcd(sumNum, commonDen)) || 1;

      return {
        formula: `(\\frac{A}{B}) + (\\frac{C}{D}) = \\frac{A \\cdot D + C \\cdot B}{B \\cdot D}`,
        steps: [
          `Original: ${num1}/${den1} + ${num2}/${den2}`,
          `Common Denominator: ${den1} × ${den2} = ${commonDen}`,
          `Cross Multiply: (${num1}×${den2}) + (${num2}×${den1}) = ${sumNum}`,
          `Simplified Fraction: ${sumNum / divisor} / ${commonDen / divisor}`
        ],
        result: `${(sumNum / divisor).toFixed(0)} / ${(commonDen / divisor).toFixed(0)} (${(sumNum / commonDen).toFixed(3)})`
      };
    }

    if (id === 'average') {
      const arr = listInput.split(',').map((x) => Number(x.trim())).filter((x) => !isNaN(x));
      if (arr.length === 0) return { formula: 'Mean = \\frac{\\sum X}{N}', steps: [], result: 'N/A' };

      const sum = arr.reduce((a, b) => a + b, 0);
      const mean = sum / arr.length;
      const sorted = [...arr].sort((a, b) => a - b);
      const median = sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)];

      return {
        formula: `Mean = \\frac{\\sum X}{N} \\quad | \\quad Median = \\text{Middle value}`,
        steps: [
          `Data Count (N): ${arr.length}`,
          `Sum of Values: ${sum}`,
          `Sorted Set: [${sorted.join(', ')}]`,
        ],
        result: `Mean (Average): ${mean.toFixed(2)} | Median: ${median}`
      };
    }

    if (id === 'ratio') {
      const A = val1;
      const B = val2 === 0 ? 1 : val2;
      const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
      const divisor = Math.abs(gcd(A, B)) || 1;

      return {
        formula: `Ratio = \\frac{A}{\\text{GCD}} : \\frac{B}{\\text{GCD}}`,
        steps: [
          `Initial Ratio: ${A} : ${B}`,
          `Greatest Common Divisor (GCD): ${divisor}`,
          `Dividing both sides by GCD...`
        ],
        result: `Simplified Ratio: ${A / divisor} : ${B / divisor}`
      };
    }

    if (id === 'matrix') {
      const det = m11 * m22 - m12 * m21;
      return {
        formula: `|A| = a \\cdot d - b \\cdot c`,
        steps: [
          `Matrix elements: [[${m11}, ${m12}], [${m21}, ${m22}]]`,
          `Calculation: (${m11} × ${m22}) - (${m12} × ${m21})`,
          `Step: ${m11 * m22} - ${m12 * m21}`
        ],
        result: `Determinant: ${det}`
      };
    }

    // Finance Groups
    if (config.group === 'loan') {
      const principal = val1;
      const annualRate = val2 / 100;
      const years = val3 || 1;
      const monthlyRate = annualRate / 12;
      const months = years * 12;
      
      let emi = 0;
      if (monthlyRate === 0) {
        emi = principal / months;
      } else {
        emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      }
      
      const totalRepayment = emi * months;
      const totalInterest = totalRepayment - principal;
      
      return {
        formula: `EMI = P \\cdot \\frac{r(1+r)^n}{(1+r)^n - 1}`,
        steps: [
          `Principal (P): $${principal.toLocaleString()}`,
          `Monthly Interest Rate (r): ${(val2 / 12).toFixed(4)}%`,
          `Total Payments (n): ${months} months`,
          `Total Interest Owed: $${Math.max(0, totalInterest).toLocaleString(undefined, {maximumFractionDigits: 2})}`
        ],
        result: `Monthly EMI: $${emi.toFixed(2)} | Total Cost: $${totalRepayment.toFixed(2)}`
      };
    }

    if (config.group === 'mortgage') {
      const homeValue = val1;
      const annualRate = val2 / 100;
      const years = val3 || 30;
      const downPayment = homeValue * 0.2;
      const principal = homeValue - downPayment;
      const monthlyRate = annualRate / 12;
      const months = years * 12;
      
      let emi = 0;
      if (monthlyRate === 0) {
        emi = principal / months;
      } else {
        emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      }
      
      const annualTax = homeValue * 0.012;
      const monthlyTaxInsurance = (annualTax / 12) + 100;
      const totalMonthly = emi + monthlyTaxInsurance;
      
      return {
        formula: `PITI = EMI + Tax + Insurance`,
        steps: [
          `Home Purchase Price: $${homeValue.toLocaleString()}`,
          `Assumed 20% Down Payment: $${downPayment.toLocaleString()}`,
          `Loan Principal Owed: $${principal.toLocaleString()}`,
          `Base Monthly P&I Payment: $${emi.toFixed(2)}`,
          `Estimated Monthly Taxes & Insurance: $${monthlyTaxInsurance.toFixed(2)}`
        ],
        result: `Total PITI Payment: $${totalMonthly.toFixed(2)} / month`
      };
    }

    if (config.group === 'investment') {
      const initial = val1;
      const rate = val2 / 100;
      const years = val3 || 1;
      
      const futureValue = initial * Math.pow(1 + rate, years);
      const profit = futureValue - initial;
      
      return {
        formula: `FV = PV \\cdot (1 + r)^t`,
        steps: [
          `Initial Investment (PV): $${initial.toLocaleString()}`,
          `Annual Growth Rate (r): ${val2}%`,
          `Investment Tenure (t): ${years} years`,
          `Compounded Capital Gains: $${profit.toLocaleString(undefined, {maximumFractionDigits: 2})}`
        ],
        result: `Future Portfolio Value: $${futureValue.toLocaleString(undefined, {maximumFractionDigits: 2})}`
      };
    }

    if (config.group === 'savings') {
      const monthly = val1;
      const annualRate = val2 / 100;
      const years = val3 || 1;
      const r = annualRate / 12;
      const n = years * 12;
      
      let futureValue = 0;
      if (r === 0) {
        futureValue = monthly * n;
      } else {
        futureValue = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      }
      const totalInvested = monthly * n;
      const interestEarned = futureValue - totalInvested;
      
      return {
        formula: `FV = PMT \\cdot \\frac{(1+r)^n - 1}{r} \\cdot (1+r)`,
        steps: [
          `Monthly Contribution: $${monthly.toLocaleString()}`,
          `Total Payments Made: ${n} installments`,
          `Total Out-of-pocket Savings: $${totalInvested.toLocaleString()}`,
          `Interest Accumulated: $${interestEarned.toLocaleString(undefined, {maximumFractionDigits: 2})}`
        ],
        result: `Maturity Savings Value: $${futureValue.toLocaleString(undefined, {maximumFractionDigits: 2})}`
      };
    }

    if (config.group === 'credit_card') {
      const balance = val1;
      const apr = val2 / 100;
      const monthlyPay = val3 || 50;
      const r = apr / 12;
      
      let months = 0;
      let totalPaid = 0;
      let interestPaid = 0;
      
      if (r * balance >= monthlyPay) {
        return {
          formula: `Months = \\text{Infinite (Payment is less than interest accrued!)}`,
          steps: [
            `Card Balance: $${balance.toLocaleString()}`,
            `Monthly Interest Accrued: $${(balance * r).toFixed(2)}`,
            `WARNING: Monthly payment of $${monthlyPay} is too low to cover monthly interest. Balance will grow infinitely!`
          ],
          result: `ERROR: Increase payment above $${(balance * r).toFixed(2)}`
        };
      } else {
        months = -Math.log(1 - (r * balance) / monthlyPay) / Math.log(1 + r);
        months = Math.ceil(months);
        totalPaid = months * monthlyPay;
        interestPaid = totalPaid - balance;
      }
      
      return {
        formula: `N = \\frac{-\\ln(1 - \\frac{r \\cdot B}{P})}{\\ln(1 + r)}`,
        steps: [
          `Outstanding Balance: $${balance.toLocaleString()}`,
          `Monthly Interest Rate (r): ${(val2 / 12).toFixed(4)}%`,
          `Target Monthly Repayment: $${monthlyPay.toLocaleString()}`,
          `Total Interest Paid: $${interestPaid.toLocaleString(undefined, {maximumFractionDigits: 2})}`
        ],
        result: `Payoff Time: ${months} Months | Total Payments: $${totalPaid.toLocaleString()}`
      };
    }

    if (config.group === 'tax') {
      const amount = val1;
      const rate = val2;
      const included = val3 === 1;
      
      let taxAmount = 0;
      let baseAmount = amount;
      
      if (included) {
        baseAmount = amount / (1 + (rate / 100));
        taxAmount = amount - baseAmount;
      } else {
        taxAmount = amount * (rate / 100);
      }
      
      return {
        formula: included ? `Tax = Total - \\frac{Total}{1 + r}` : `Tax = Base \\cdot r`,
        steps: [
          `Stated Purchase Price: $${amount.toLocaleString()}`,
          `Effective Tax Rate: ${rate}%`,
          included ? `Tax is already included in the price.` : `Tax is added to the price.`,
          `Base Price (Pre-tax): $${baseAmount.toFixed(2)}`
        ],
        result: `Tax Portion: $${taxAmount.toFixed(2)} | Net Total: $${(included ? amount : amount + taxAmount).toFixed(2)}`
      };
    }

    if (config.group === 'salary') {
      const inputSalary = val1;
      const hoursPerWeek = val2 || 40;
      const withholding = val3 || 0;
      
      let annual = 0;
      let hourly = 0;
      if (inputSalary < 1000) {
        hourly = inputSalary;
        annual = hourly * hoursPerWeek * 52;
      } else {
        annual = inputSalary;
        hourly = annual / (hoursPerWeek * 52);
      }
      
      const monthly = annual / 12;
      const netAnnual = annual * (1 - (withholding / 100));
      const netMonthly = netAnnual / 12;
      
      return {
        formula: `Annual = Hourly \\cdot Hours \\cdot 52`,
        steps: [
          `Stated Salary/Wage Input: $${inputSalary.toLocaleString()}`,
          `Assumed Work Hours per week: ${hoursPerWeek} hrs`,
          `Estimated Hourly Rate: $${hourly.toFixed(2)}/hr`,
          `Estimated Monthly gross: $${monthly.toFixed(2)}/mo`,
          `Assumed Tax/Deduction withholdings: ${withholding}%`
        ],
        result: `Net Annual Take-home: $${netAnnual.toLocaleString(undefined, {maximumFractionDigits: 0})} ($${netMonthly.toLocaleString(undefined, {maximumFractionDigits: 0})}/mo)`
      };
    }

    if (config.group === 'business') {
      const revenue = val1;
      const cost = val2;
      const taxRate = val3 || 0;
      
      const grossProfit = revenue - cost;
      const profitMargin = revenue !== 0 ? (grossProfit / revenue) * 100 : 0;
      const markup = cost !== 0 ? (grossProfit / cost) * 100 : 0;
      const taxPaid = Math.max(0, grossProfit * (taxRate / 100));
      const netProfit = grossProfit - taxPaid;
      
      return {
        formula: `Margin = \\frac{Revenue - Cost}{Revenue} \\cdot 100`,
        steps: [
          `Total Business Revenue: $${revenue.toLocaleString()}`,
          `Total Costs of Goods / Expenses: $${cost.toLocaleString()}`,
          `Gross Profit Earned: $${grossProfit.toLocaleString()}`,
          `Calculated Retail Markup: ${markup.toFixed(2)}%`,
          `Estimated Business Taxes (${taxRate}%): $${taxPaid.toFixed(2)}`
        ],
        result: `Gross Margin: ${profitMargin.toFixed(1)}% | Net Business Income: $${netProfit.toFixed(2)}`
      };
    }

    if (config.group === 'currency') {
      const principal = val1;
      const entryRate = val2 === 0 ? 1 : val2;
      const exitRate = val3 === 0 ? 1 : val3;
      
      const units = principal / entryRate;
      const finalVal = units * exitRate;
      const profit = finalVal - principal;
      const roi = principal !== 0 ? (profit / principal) * 100 : 0;
      
      return {
        formula: `Holdings = \\frac{Principal}{BuyRate} \\cdot CurrentRate`,
        steps: [
          `Capital Invested: $${principal.toLocaleString()}`,
          `Acquisition Rate: $${entryRate.toLocaleString()}`,
          `Units Purchased: ${units.toLocaleString(undefined, {maximumFractionDigits: 4})} units`,
          `Current Market Rate: $${exitRate.toLocaleString()}`
        ],
        result: `Current Value: $${finalVal.toLocaleString(undefined, {maximumFractionDigits: 2})} | Return: ${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%`
      };
    }

    // Default general math formula
    const ans = val3 !== 0 ? (val1 * val2) / val3 : 0;
    return {
      formula: `Result = \\frac{A \\cdot B}{C}`,
      steps: [
        `Step 1: Multiply A and B (${val1} × ${val2} = ${val1 * val2})`,
        `Step 2: Divide by C (${val1 * val2} ÷ ${val3})`
      ],
      result: `Output: ${ans.toFixed(3)}`
    };
  }, [id, val1, val2, val3, listInput, m11, m12, m21, m22, config]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-mint" />
            {name} Settings
          </h3>
          <p className="text-xs text-zinc-500 mt-1">{description}</p>
        </div>

        {/* Dynamic Inputs Render */}
        {id === 'average' ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Enter Number Set (comma separated)</label>
            <input
              type="text"
              value={listInput}
              onChange={(e) => setListInput(e.target.value)}
              className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-2 text-sm font-mono"
            />
          </div>
        ) : id === 'matrix' ? (
          <div className="space-y-4">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">Matrix A (2x2)</label>
            <div className="grid grid-cols-2 gap-4 max-w-xs font-mono">
              <input
                type="number"
                value={m11}
                onChange={(e) => setM11(Number(e.target.value))}
                className="rounded-md border-zinc-300 bg-zinc-50 dark:bg-zinc-800 text-center py-2"
              />
              <input
                type="number"
                value={m12}
                onChange={(e) => setM12(Number(e.target.value))}
                className="rounded-md border-zinc-300 bg-zinc-50 dark:bg-zinc-800 text-center py-2"
              />
              <input
                type="number"
                value={m21}
                onChange={(e) => setM21(Number(e.target.value))}
                className="rounded-md border-zinc-300 bg-zinc-50 dark:bg-zinc-800 text-center py-2"
              />
              <input
                type="number"
                value={m22}
                onChange={(e) => setM22(Number(e.target.value))}
                className="rounded-md border-zinc-300 bg-zinc-50 dark:bg-zinc-800 text-center py-2"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">{config.label1}</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(Number(e.target.value))}
                className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">{config.label2}</label>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(Number(e.target.value))}
                className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">{config.label3}</label>
              <input
                type="number"
                value={val3}
                onChange={(e) => setVal3(Number(e.target.value))}
                className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
              />
            </div>
          </div>
        )}

        <div className="p-4 bg-mint/10 border border-mint/20 rounded-xl flex items-start gap-3 text-xs leading-normal">
          <Info className="w-4 h-4 text-mint shrink-0 mt-0.5" />
          <div className="text-zinc-600 dark:text-zinc-400 space-y-1">
            <span className="font-bold block text-zinc-800 dark:text-zinc-200">How this Works</span>
            <p>Modify the values above to calculate instantly. This utility applies standard mathematical formulas with complete scientific precision.</p>
          </div>
        </div>
      </div>

      {/* Steps & Results */}
      <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
        <div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">Equation Schema</span>
          <div className="p-4 bg-zinc-900 text-white rounded-xl font-mono text-center text-sm border border-zinc-800 select-all overflow-x-auto">
            {solvedOutputs.formula}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Computation Steps</span>
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-3 border border-zinc-250 dark:border-zinc-800 space-y-2 text-xs font-mono">
            {solvedOutputs.steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <ChevronRight className="w-3.5 h-3.5 text-mint shrink-0" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center p-5 bg-mint/10 border border-mint/20 rounded-xl">
          <span className="text-xs text-zinc-500 block mb-1">Maturity Result</span>
          <span className="text-xl font-extrabold text-mint block break-words">
            {solvedOutputs.result}
          </span>
        </div>
      </div>
    </div>
  );
}
