import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Share2, Printer, Star, Copy, Check, Save, History, Sparkles, HelpCircle } from 'lucide-react';
import { CALCULATORS, POPULAR_GUIDES } from '../data';
import FinanceCalculators from './calculators/FinanceCalculators';
import HealthCalculators from './calculators/HealthCalculators';
import EverydayMathConverters from './calculators/EverydayMathConverters';
import EducationCalculators from './calculators/EducationCalculators';
import SmartFallbackCalculator from './calculators/SmartFallbackCalculator';

function renderDynamicGuide(id: string, category: string, name: string) {
  // Check groups
  const isLoan = ['emi', 'mortgage', 'loan', 'personal_loan', 'home_loan', 'car_loan', 'education_loan', 'business_loan', 'loan_affordability', 'loan_comparison', 'interest_calc', 'simple_interest', 'compound_interest'].includes(id);
  const isInvestment = ['sip', 'investment', 'lumpsum', 'mutual_fund', 'stock_return', 'cagr', 'roi', 'xirr', 'dividend', 'inflation', 'retirement', 'fire', 'savings', 'fd', 'rd', 'hys', 'goal_savings', 'emergency_fund'].includes(id);
  const isHealth = ['bmi', 'calories', 'bmr', 'water', 'body_fat', 'ideal_weight', 'pregnancy', 'heart_rate', 'tdee'].includes(id);
  const isTax = ['tax', 'vat', 'gst', 'sales_tax', 'capital_gains_tax', 'property_tax', 'payroll_tax', 'self_employment_tax'].includes(id);
  const isConversion = category === 'conversion' || id.startsWith('unit_converter_') || ['currency', 'exchange_rate', 'crypto_profit', 'bitcoin', 'ethereum', 'forex'].includes(id);

  if (isLoan) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-mint/10 border border-mint/20 rounded-2xl">
          <span className="text-[10px] uppercase font-bold tracking-wider text-mint block mb-1">Standard Amortization Formula</span>
          <div className="font-mono text-xs md:text-sm text-slate-800 dark:text-zinc-200 py-1 bg-white dark:bg-zinc-950/60 rounded px-3 border border-slate-100 dark:border-zinc-800 inline-block">
            M = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Where <strong className="text-slate-700 dark:text-zinc-300">M</strong> is the monthly payment, <strong className="text-slate-700 dark:text-zinc-300">P</strong> is the principal loan amount, <strong className="text-slate-700 dark:text-zinc-300">r</strong> is the periodic monthly interest rate (annual rate / 12 / 100), and <strong className="text-slate-700 dark:text-zinc-300">n</strong> is the total number of monthly payments.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step-by-Step Calculation Flow</h4>
          <ol className="list-decimal pl-4 space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
            <li>
              <strong>Input Base Loan Parameters:</strong> Enter your total desired borrowing amount (principal), the annual interest rate (APR), and the repayment tenure in years or months.
            </li>
            <li>
              <strong>Rate Conversion:</strong> The annual percentage rate is automatically divided by 12 and 100 to yield the exact fractional monthly interest rate (<code className="font-mono px-1 bg-slate-50 dark:bg-zinc-850 rounded">r = APR / 12 / 100</code>).
            </li>
            <li>
              <strong>Solving for the Payment:</strong> The standard reducing-balance math solver computes the absolute, recurring monthly cash installment necessary to fully pay off the debt by maturity.
            </li>
            <li>
              <strong>Assembling the Amortization Schedule:</strong>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-500 text-[11px]">
                <li>Monthly interest charge is calculated as: <code className="font-mono">Outstanding Balance × r</code>.</li>
                <li>The balance of the monthly payment is directly applied to decrease the principal sum.</li>
                <li>The principal drops, reducing next month's accrued interest.</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="p-3 bg-mint/10 border border-mint/20 rounded-xl">
          <h5 className="font-bold text-mint text-xs mb-1">💡 Financial Optimization Tip</h5>
          <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
            Making extra or occasional prepayments goes directly toward lowering your principal loan balance. Because interest is always computed on the remaining balance, this drastically minimizes total interest expenses and speeds up your payoff date.
          </p>
        </div>
      </div>
    );
  }

  if (isInvestment) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-mint/10 border border-mint/20 rounded-2xl">
          <span className="text-[10px] uppercase font-bold tracking-wider text-mint block mb-1">Future Value Compound Interest Formula</span>
          <div className="font-mono text-xs md:text-sm text-slate-800 dark:text-zinc-200 py-1 bg-white dark:bg-zinc-950/60 rounded px-3 border border-slate-100 dark:border-zinc-800 inline-block">
            FV = PMT × [ (1 + i)ⁿ - 1 ] / i × (1 + i)
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Where <strong className="text-slate-700 dark:text-zinc-300">FV</strong> is the target future value, <strong className="text-slate-700 dark:text-zinc-300">PMT</strong> is the systematic payment, <strong className="text-slate-700 dark:text-zinc-300">i</strong> is the periodic return rate, and <strong className="text-slate-700 dark:text-zinc-300">n</strong> is the compounding intervals.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step-by-Step Calculation Flow</h4>
          <ol className="list-decimal pl-4 space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
            <li>
              <strong>Define Contributions:</strong> Specify your initial lumpsum investment amount and any regular repeating periodic deposits (monthly, quarterly, or yearly).
            </li>
            <li>
              <strong>Input Expected Growth Rate:</strong> Provide the expected annual growth rate or interest yield. For standard high-yield savings accounts, this is the APY; for diversified mutual funds, it represents typical historical averages.
            </li>
            <li>
              <strong>Determine Time Horizon:</strong> Set the timeframe in years or months. The engine maps compounding frequencies (daily, monthly, quarterly, annually) over the duration.
            </li>
            <li>
              <strong>Evaluate the Compounding Curve:</strong>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-500 text-[11px]">
                <li>At the start of each interval, the current balance accumulates interest based on the fraction of the annual rate.</li>
                <li>Your periodic systematic deposits are added directly to the total.</li>
                <li>Interest is added back to your principal balance, compounding exponentially over the remaining timeline.</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="p-3 bg-mint/10 border border-mint/20 rounded-xl">
          <h5 className="font-bold text-mint text-xs mb-1">💡 Wealth Accumulation Tip</h5>
          <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
            Compounding interest curves are heavily back-loaded, meaning the absolute growth of your wealth is far greater in the final five years than in the first fifteen. Starting your systematic plans early gives your money maximum compounding potential.
          </p>
        </div>
      </div>
    );
  }

  if (isHealth) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl">
          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 dark:text-rose-400 block mb-1">Body Composition & Basal Metabolic Rate Formulas</span>
          <div className="space-y-1 text-xs font-mono text-slate-800 dark:text-zinc-200">
            <div>BMI = Weight (kg) / [ Height (m) ]²</div>
            <div>BMR (Men) = 10W + 6.25H - 5A + 5</div>
            <div>BMR (Women) = 10W + 6.25H - 5A - 161</div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Where <strong className="text-slate-700 dark:text-zinc-300">W</strong> is body weight in kg, <strong className="text-slate-700 dark:text-zinc-300">H</strong> is height in cm, and <strong className="text-slate-700 dark:text-zinc-300">A</strong> is biological age in years.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step-by-Step Calculation Flow</h4>
          <ol className="list-decimal pl-4 space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
            <li>
              <strong>Input Physical Metrics:</strong> Enter your current biological parameters including age, gender, exact height, and weight.
            </li>
            <li>
              <strong>Calculate Baseline Metabolic Rate (BMR):</strong> The calculator uses the medically recognized Mifflin-St Jeor equation to estimate the baseline calories required to sustain organ function at complete rest.
            </li>
            <li>
              <strong>Apply Activity Multiplier:</strong> (For Calories/TDEE) The baseline BMR is scaled by your typical physical activity coefficient, ranging from 1.2 (sedentary) up to 1.9 (highly active).
            </li>
            <li>
              <strong>Determine Caloric Target:</strong> Safe weight management targets are projected by applying safe mathematical deficits (-500 kcal for safe fat loss) or surpluses (+500 kcal for controlled muscle gain).
            </li>
          </ol>
        </div>

        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-xl">
          <h5 className="font-bold text-amber-800 dark:text-amber-400 text-xs mb-1">💡 Metabolic Insight</h5>
          <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
            BMI acts as a general, mass-to-height classification screening tool. It does not measure body fat percentage directly or differentiate between skeletal muscle and adipose fat. Muscular athletes or individuals with high bone density may show an "overweight" BMI classification despite having low body fat.
          </p>
        </div>
      </div>
    );
  }

  if (isTax) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-purple-50/50 dark:bg-purple-950/10 border border-purple-100 dark:border-purple-900/30 rounded-2xl">
          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-600 dark:text-purple-400 block mb-1">Consumption and Progressive Taxation Formulas</span>
          <div className="space-y-1 text-xs font-mono text-slate-800 dark:text-zinc-200">
            <div>Tax Addition: Total Price = Base × (1 + Rate / 100)</div>
            <div>Tax Removal: Base Price = Total / (1 + Rate / 100)</div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            These standardized models enable either adding taxes onto a base invoice amount, or reverse-engineering the tax-exclusive base price from a final gross sum.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step-by-Step Calculation Flow</h4>
          <ol className="list-decimal pl-4 space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
            <li>
              <strong>Input Financial Base:</strong> Provide your taxable gross annual income, hourly wages, or wholesale transactional items.
            </li>
            <li>
              <strong>Evaluate Tax Rates or Brackets:</strong>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-slate-500 text-[11px]">
                <li>For general flat consumer sales taxes (VAT or GST), direct percentage ratios are calculated.</li>
                <li>For progressive income taxes, the system segments your earnings into statutory tax brackets, multiplying each segment by its corresponding rate.</li>
              </ul>
            </li>
            <li>
              <strong>Deductions & Withholdings:</strong> Standard deductions, social security withholdings, and credits are subtracted to compute your final net take-home salary or actual tax liabilities.
            </li>
          </ol>
        </div>

        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-xl">
          <h5 className="font-bold text-amber-800 dark:text-amber-400 text-xs mb-1">💡 Tax Mythbuster</h5>
          <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
            In progressive income tax systems, entering a higher tax bracket does NOT mean your entire income is taxed at that higher rate. Only the portion of income that exceeds that bracket's threshold is taxed at the higher marginal percentage. Consequently, getting a raise will never leave you with less take-home pay.
          </p>
        </div>
      </div>
    );
  }

  if (isConversion) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-teal-50/50 dark:bg-teal-950/10 border border-teal-100 dark:border-teal-900/30 rounded-2xl">
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 dark:text-teal-400 block mb-1">SI Physical Conversion Ratio</span>
          <div className="font-mono text-xs md:text-sm text-slate-800 dark:text-zinc-200 py-1 bg-white dark:bg-zinc-950/60 rounded px-3 border border-slate-100 dark:border-zinc-800 inline-block">
            Target_Value = Source_Value × Scaling_Factor
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Unit conversion processes scale physical quantities between different measurement standards. Temperature translations require specific offset adjustments, such as <code className="font-mono">°F = °C × 1.8 + 32</code>.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step-by-Step Calculation Flow</h4>
          <ol className="list-decimal pl-4 space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
            <li>
              <strong>Input Base Quantity:</strong> Enter the physical quantity or amount you need to convert.
            </li>
            <li>
              <strong>Select Conversion Units:</strong> Choose your starting source unit (e.g., Gallons, Kilometers, Celsius) and the target measurement unit.
            </li>
            <li>
              <strong>Reference Physical Matrix:</strong> The engine references absolute conversion constants defined by the International System of Units (SI) to complete the conversion.
            </li>
            <li>
              <strong>Precision Tuning:</strong> The output value is computed using double-precision float math and rounded to reasonable decimal places to avoid unnecessary precision noise.
            </li>
          </ol>
        </div>
      </div>
    );
  }

  // Fallback for general utility/everyday calculators
  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 border border-slate-150 dark:border-zinc-800 rounded-2xl">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Standard Calculation Logic</span>
        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
          This calculator runs optimized client-side scripts to instantly process your input fields using dedicated logic and formulas.
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-slate-900 dark:text-white text-xs">Step-by-Step Calculation Flow</h4>
        <ol className="list-decimal pl-4 space-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
          <li>
            <strong>Provide Input Parameters:</strong> Fill in the required input fields with values (such as dates, percentages, bill amounts, or specific parameters).
          </li>
          <li>
            <strong>Real-time Validation:</strong> The calculation engine validates inputs to ensure they fall within acceptable ranges and are structured correctly.
          </li>
          <li>
            <strong>Algorithm Execution:</strong> The core logic executes standard formulas in your browser. All computations happen locally on your device for absolute security.
          </li>
          <li>
            <strong>Interactive Output Breakdown:</strong> Instantly view the results, complete with visual charts or itemized breakdowns to make the data easy to understand.
          </li>
        </ol>
      </div>
    </div>
  );
}

function CalculatorFAQItem({ question, answer }: { question: string; answer: string; key?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-150 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-3xs transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-zinc-855 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-zinc-200 transition-colors cursor-pointer"
      >
        <span className="pr-4">{question}</span>
        <span className="text-slate-400 text-xs select-none shrink-0">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/20 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

function renderDynamicFAQ(id: string, category: string, name: string) {
  const isLoan = ['emi', 'mortgage', 'loan', 'personal_loan', 'home_loan', 'car_loan', 'education_loan', 'business_loan', 'loan_affordability', 'loan_comparison', 'interest_calc', 'simple_interest', 'compound_interest'].includes(id);
  const isInvestment = ['sip', 'investment', 'lumpsum', 'mutual_fund', 'stock_return', 'cagr', 'roi', 'xirr', 'dividend', 'inflation', 'retirement', 'fire', 'savings', 'fd', 'rd', 'hys', 'goal_savings', 'emergency_fund'].includes(id);
  const isHealth = ['bmi', 'calories', 'bmr', 'water', 'body_fat', 'ideal_weight', 'pregnancy', 'heart_rate', 'tdee'].includes(id);
  const isTax = ['tax', 'vat', 'gst', 'sales_tax', 'capital_gains_tax', 'property_tax', 'payroll_tax', 'self_employment_tax'].includes(id);
  const isConversion = category === 'conversion' || id.startsWith('unit_converter_') || ['currency', 'exchange_rate', 'crypto_profit', 'bitcoin', 'ethereum', 'forex'].includes(id);

  let faqs = [
    {
      question: "Are my inputs stored or shared?",
      answer: "No. This application runs 100% offline-first inside your browser. None of your input data, numbers, dates, or calculations are ever uploaded to a server or shared with any third party."
    },
    {
      question: "How do I print or save my calculation results?",
      answer: "You can click the 'Print' button at the top of the calculator details page to generate a clean PDF or print layout, or use the 'Save' feature with custom titles to keep a history of your calculations."
    },
    {
      question: "What formula does this calculator use?",
      answer: "This calculator uses standard industry-standard mathematical algorithms tailored specifically to the selected tool's requirements, running entirely on your local browser engine."
    }
  ];

  if (isLoan) {
    faqs = [
      {
        question: `How is the monthly payment calculated for ${name}?`,
        answer: "We use the standard reducing balance loan amortization formula: M = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ], where P is the principal, r is the monthly interest rate, and n is the number of monthly periods."
      },
      {
        question: "What is a loan amortization schedule?",
        answer: "An amortization schedule is a complete table of periodic loan payments, showing the exact amount of principal and interest that make up each payment until the loan is fully paid off."
      },
      {
        question: "Can making extra principal prepayments save money?",
        answer: "Absolutely. Any additional payments made directly reduce the remaining principal balance. Since interest is calculated based on this outstanding principal, prepayments significantly reduce the total interest you pay and shorten the loan duration."
      },
      {
        question: "What is the difference between simple and compound interest on loans?",
        answer: "Simple interest is calculated solely on the original principal amount. Compound interest is calculated on the principal plus any accumulated interest from previous periods, which can make debt grow much faster if unpaid."
      }
    ];
  } else if (isInvestment) {
    faqs = [
      {
        question: `How does compound interest work in the ${name}?`,
        answer: "Compound interest is the addition of interest to the principal sum of an investment, or 'interest on interest.' It is calculated as FV = PV × (1 + r/n)^(nt), allowing your initial capital to grow exponentially over time."
      },
      {
        question: "What is the difference between SIP and Lumpsum investing?",
        answer: "A Systematic Investment Plan (SIP) involves investing a fixed amount at regular intervals (e.g., monthly), which averages out market volatility (dollar-cost averaging). Lumpsum refers to investing a large sum of money all at once."
      },
      {
        question: "What is the Rule of 72?",
        answer: "The Rule of 72 is a quick mental shortcut to estimate how long it will take for an investment to double at a given annual interest rate. Divide 72 by your expected annual rate of return (e.g., 72 / 8% = 9 years)."
      },
      {
        question: "How does inflation affect my future savings value?",
        answer: "Inflation reduces the purchasing power of money over time. When planning long-term investments, factoring in inflation-adjusted returns helps you understand what your future balance will actually be worth in today's money."
      }
    ];
  } else if (isHealth) {
    faqs = [
      {
        question: `How are the physical metrics calculated in ${name}?`,
        answer: "We use standard, medically recognized biological formulas, such as the Mifflin-St Jeor equation for BMR, standard World Health Organization formula for BMI, and standard Harris-Benedict formulas for daily calorie expenditure."
      },
      {
        question: "How accurate is the Body Mass Index (BMI) score?",
        answer: "BMI is a reliable general screening tool for weight category, but it has limitations. It does not measure body fat directly and can misclassify muscular athletes or older individuals with muscle loss."
      },
      {
        question: "What is BMR versus TDEE?",
        answer: "Basal Metabolic Rate (BMR) is the minimum energy your body needs to survive at rest. Total Daily Energy Expenditure (TDEE) is your BMR multiplied by an activity factor, representing total calories burned daily."
      },
      {
        question: "Should I consult a professional for health planning?",
        answer: "Yes, these calculators provide educational estimations. Always consult with a registered dietitian, certified personal trainer, or healthcare provider for personalized medical advice."
      }
    ];
  } else if (isTax) {
    faqs = [
      {
        question: "How do progressive tax brackets work?",
        answer: "In a progressive tax system, your income is taxed in layers or 'brackets.' Getting into a higher tax bracket does not mean your entire income is taxed at that rate; only the portion of your income within that specific bracket is taxed at its rate."
      },
      {
        question: "What is the difference between gross income and net income?",
        answer: "Gross income is your total earnings before any deductions, tax withholdings, or contributions. Net income is your 'take-home pay' after all federal, state, and local taxes, insurance, and retirement deductions are subtracted."
      },
      {
        question: "How does VAT or GST addition and subtraction work?",
        answer: "To add tax: Multiply the base price by (1 + tax rate / 100). To remove/extract tax from a total price: Divide the total price by (1 + tax rate / 100) to find the original base price."
      },
      {
        question: "Are these tax calculations legally binding?",
        answer: "No, these tax estimators are for planning and guidance purposes. Tax laws vary by jurisdiction, local deductions, and filing status. Always check with a certified CPA or tax official."
      }
    ];
  } else if (isConversion) {
    faqs = [
      {
        question: "How are these unit conversions calculated?",
        answer: "Our conversion engine uses exact conversion constants certified by the International System of Units (SI). All conversions are done with high floating-point precision."
      },
      {
        question: "Why do some conversions feel slightly rounded?",
        answer: "To provide clean, useful answers, we round conversion results to a reasonable number of decimal places (typically 4 to 6). This avoids showing minor floating-point precision errors."
      },
      {
        question: "How does the temperature conversion formula differ from other units?",
        answer: "Most physical units are converted using simple multiplication factors. Temperature units (like Celsius, Fahrenheit, and Kelvin) require both multiplication factors and specific offsets (such as subtracting or adding 32 or 273.15)."
      }
    ];
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <CalculatorFAQItem key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

interface CalculatorDetailsProps {
  calculatorId: string;
  onBack: () => void;
  savedCalculations: any[];
  onSaveCalculation: (title: string, inputs: any, outputs: any) => void;
  onDeleteCalculation: (id: string) => void;
}

export default function CalculatorDetails({
  calculatorId,
  onBack,
  savedCalculations,
  onSaveCalculation,
  onDeleteCalculation
}: CalculatorDetailsProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const calcInfo = CALCULATORS.find((c) => c.id === calculatorId);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [calculatorId]);

  if (!calcInfo) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">Calculator not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-semibold">
          Back to Home
        </button>
      </div>
    );
  }

  // Find associated guide
  const guide = POPULAR_GUIDES.find((g) => g.calculatorId === calculatorId);

  // Handle Share link copy
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?calc=${calculatorId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Find the correct component to render
  const renderCalculator = () => {
    const id = calcInfo.id;
    const cat = calcInfo.category;

    // Finance List
    const financeIds = ['emi', 'mortgage', 'loan', 'sip', 'investment', 'savings', 'fd', 'vat', 'tax', 'swp'];
    if (cat === 'finance' && financeIds.includes(id)) {
      return <FinanceCalculators id={id} />;
    }

    // Health List
    const healthIds = ['bmi', 'calories', 'bmr', 'water', 'body_fat', 'ideal_weight', 'pregnancy', 'heart_rate', 'tdee'];
    if (cat === 'health' && healthIds.includes(id)) {
      return <HealthCalculators id={id} />;
    }

     // Education List
     const educationIds = ['gpa', 'cgpa', 'grade', 'marks', 'attendance', 'study_time'];
     if (educationIds.includes(id)) {
       return <EducationCalculators id={id} />;
     }

     // Math & Conversions
     const customMathIds = [
       'percentage', 'scientific', 'discount', 'tip', 'age', 'days_between', 'password',
       'unit_converter_length', 'unit_converter_weight', 'unit_converter_temp',
       'unit_converter_area', 'unit_converter_volume', 'unit_converter_speed', 'unit_converter_time',
       'unit_converter_storage', 'unit_converter_pressure', 'unit_converter_energy', 'unit_converter_power', 'unit_converter_angle'
     ];
    if (customMathIds.includes(id)) {
      return <EverydayMathConverters id={id} />;
    }

    // Fallback to Smart calculations
    return (
      <SmartFallbackCalculator
        id={id}
        name={calcInfo.name}
        category={calcInfo.category}
        description={calcInfo.description}
      />
    );
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-zinc-100">
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e2e8f0] dark:border-zinc-800 pb-6">
        <div className="space-y-3">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-mint dark:hover:text-mint uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Directory
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {calcInfo.name}
              </h1>
              {calcInfo.trending && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> Trending
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1.5 max-w-2xl">
              {calcInfo.description}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e2e8f0] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied Link
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-400" /> Share Tool
              </>
            )}
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e2e8f0] dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold rounded-lg text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" /> Print
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="space-y-6">
        {renderCalculator()}
      </div>

      {/* Guide & Formulas Sheet */}
      <div className="bg-white dark:bg-zinc-900 border border-[#e2e8f0] dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-md font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-mint" />
          How This Works & Step-by-Step Guide
        </h3>
        {guide ? (
          <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-zinc-400 text-xs leading-relaxed whitespace-pre-wrap">
            {guide.content}
          </div>
        ) : (
          renderDynamicGuide(calcInfo.id, calcInfo.category, calcInfo.name)
        )}
      </div>

      {/* Frequently Asked Questions FAQ Section */}
      <div className="bg-white dark:bg-zinc-900 border border-[#e2e8f0] dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-md font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-mint" />
          Frequently Asked Questions (FAQ)
        </h3>
        {renderDynamicFAQ(calcInfo.id, calcInfo.category, calcInfo.name)}
      </div>

      {/* Quick General Tips */}
      <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-6 space-y-2">
        <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400">💡 Calculation Accuracy Notice</h4>
        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
          Our calculator models apply standard financial and biological formulas (such as Naegele’s pregnancy rule, Karvonen target vital metrics, and progressive progressive brackets). All operations occur client-side in standard high-precision float64 arrays. Consult certified experts before making substantial capital or clinical commitments.
        </p>
      </div>
    </div>
  );
}
