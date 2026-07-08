import { CalculatorInfo, Guide } from './types';

export const CATEGORIES = [
  { id: 'home', name: 'Home', icon: 'Home', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40' },
  { id: 'finance', name: 'Finance', icon: 'Coins', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' },
  { id: 'health', name: 'Health', icon: 'HeartPulse', color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40' },
  { id: 'math', name: 'Math', icon: 'Calculator', color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40' },
  { id: 'education', name: 'Education', icon: 'GraduationCap', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40' },
  { id: 'conversion', name: 'Conversion', icon: 'RefreshCw', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40' },
  { id: 'utility', name: 'Everyday Tools', icon: 'Sparkles', color: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40' },
] as const;

export const POPULAR_SEARCHES = [
  'EMI', 'Mortgage', 'BMI', 'Age', 'Loan', 'GST', 'Percentage', 'SIP', 'SWP', 'Calories', 'VAT'
];

export const CALCULATORS: CalculatorInfo[] = [
  // FINANCE
  {
    id: 'emi',
    name: 'EMI Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'Calculate Equated Monthly Installments for personal loans, home loans, and car loans.',
    popular: true,
    trending: true,
    tags: ['loan', 'monthly payment', 'finance', 'emi', 'car loan', 'personal loan']
  },
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    category: 'finance',
    icon: 'HomeIcon',
    description: 'Estimate your monthly mortgage payments with taxes, insurance, interest, and amortization.',
    popular: true,
    trending: true,
    tags: ['house', 'home loan', 'property', 'mortgage', 'interest']
  },
  {
    id: 'loan',
    name: 'Loan Calculator',
    category: 'finance',
    icon: 'DollarSign',
    description: 'Plan your loan repayments, compare schedules, and check the impact of extra payments.',
    popular: true,
    trending: true,
    tags: ['credit', 'borrow', 'repayment', 'loan', 'amortization']
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Calculate future wealth and estimated returns for your Systematic Investment Plans (SIP).',
    popular: true,
    trending: true,
    tags: ['mutual fund', 'sip', 'investment', 'wealth', 'compound interest']
  },
  {
    id: 'swp',
    name: 'SWP Calculator',
    category: 'finance',
    icon: 'TrendingDown',
    description: 'Calculate your Systematic Withdrawal Plan (SWP) payouts, final balance, and withdrawal duration.',
    popular: true,
    trending: true,
    tags: ['swp', 'systematic withdrawal', 'payout', 'pension', 'retirement', 'monthly income', 'mutual fund']
  },
  {
    id: 'investment',
    name: 'Investment Calculator',
    category: 'finance',
    icon: 'LineChart',
    description: 'Compound interest and growth estimator for long term stock market or mutual fund investments.',
    popular: true,
    trending: true,
    tags: ['stocks', 'savings', 'interest', 'compound', 'growth']
  },
  {
    id: 'savings',
    name: 'Savings Calculator',
    category: 'finance',
    icon: 'PiggyBank',
    description: 'Plan how much you need to save periodically to reach your financial goals.',
    popular: false,
    tags: ['goal', 'budget', 'emergency fund', 'savings']
  },
  {
    id: 'fd',
    name: 'Fixed Deposit (FD) Calculator',
    category: 'finance',
    icon: 'Briefcase',
    description: 'Find maturity amounts and interest earned on Fixed Deposits with banks.',
    popular: false,
    tags: ['fd', 'fixed deposit', 'bank', 'low risk']
  },
  {
    id: 'vat',
    name: 'VAT Calculator',
    category: 'finance',
    icon: 'PercentCircle',
    description: 'Quickly add or remove Value Added Tax (VAT) from prices with standard rates.',
    popular: true,
    trending: true,
    tags: ['tax', 'vat', 'sales tax', 'business', 'invoice']
  },
  {
    id: 'tax',
    name: 'Income Tax Calculator',
    category: 'finance',
    icon: 'ReceiptText',
    description: 'Estimate your progressive annual income tax and net take-home salary.',
    popular: true,
    trending: true,
    tags: ['tax', 'salary', 'deduction', 'irs', 'income']
  },

  // NEW LOANS
  {
    id: 'personal_loan',
    name: 'Personal Loan Calculator',
    category: 'finance',
    icon: 'User',
    description: 'Calculate monthly payments, interest, and payoff timeline for personal signature loans.',
    tags: ['personal', 'loan', 'credit', 'interest']
  },
  {
    id: 'home_loan',
    name: 'Home Loan Calculator',
    category: 'finance',
    icon: 'Home',
    description: 'Estimate home loan payments with customized interest rates and amortization periods.',
    tags: ['home', 'mortgage', 'loan', 'property']
  },
  {
    id: 'car_loan',
    name: 'Car Loan Calculator',
    category: 'finance',
    icon: 'Car',
    description: 'Calculate monthly auto loan payments, interest, and total car cost including sales tax.',
    tags: ['car', 'auto', 'vehicle', 'loan']
  },
  {
    id: 'education_loan',
    name: 'Education Loan Calculator',
    category: 'finance',
    icon: 'GraduationCap',
    description: 'Plan student loan repayments, estimate interest subsidies, and check grace periods.',
    tags: ['student', 'education', 'college', 'loan']
  },
  {
    id: 'business_loan',
    name: 'Business Loan Calculator',
    category: 'finance',
    icon: 'Briefcase',
    description: 'Estimate capital loan repayments and interest expenses for commercial and business loans.',
    tags: ['business', 'commercial', 'loan', 'startup']
  },
  {
    id: 'loan_affordability',
    name: 'Loan Affordability Calculator',
    category: 'finance',
    icon: 'CheckSquare',
    description: 'Find out how much you can afford to borrow based on your monthly income and debt ratios.',
    tags: ['affordability', 'borrow', 'budget', 'loan']
  },
  {
    id: 'loan_comparison',
    name: 'Loan Comparison Calculator',
    category: 'finance',
    icon: 'Scale',
    description: 'Compare multiple loan offers side-by-side to find the lowest interest and monthly cost.',
    tags: ['compare', 'loan', 'interest', 'amortization']
  },
  {
    id: 'interest_calc',
    name: 'Interest Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'Find interest earned or paid over any time period using simple or compound methods.',
    tags: ['interest', 'simple', 'compound', 'yield']
  },
  {
    id: 'simple_interest',
    name: 'Simple Interest Calculator',
    category: 'finance',
    icon: 'Divide',
    description: 'Calculate interest using the simple I = P * r * t formula.',
    tags: ['simple', 'interest', 'formula']
  },
  {
    id: 'compound_interest',
    name: 'Compound Interest Calculator',
    category: 'finance',
    icon: 'Plus',
    description: 'Estimate investment growth with compounding frequencies from daily to annually.',
    tags: ['compound', 'interest', 'growth', 'savings']
  },

  // NEW MORTGAGES
  {
    id: 'mortgage_payment',
    name: 'Mortgage Payment Calculator',
    category: 'finance',
    icon: 'DollarSign',
    description: 'Detailed analysis of monthly principal, interest, taxes, insurance, and HOA fees.',
    tags: ['mortgage', 'payment', 'piti']
  },
  {
    id: 'mortgage_interest',
    name: 'Mortgage Interest Calculator',
    category: 'finance',
    icon: 'TrendingDown',
    description: 'Calculate the total interest you will pay over the life of your mortgage.',
    tags: ['mortgage', 'interest', 'total cost']
  },
  {
    id: 'mortgage_refinance',
    name: 'Mortgage Refinance Calculator',
    category: 'finance',
    icon: 'RefreshCw',
    description: 'Find out if refinancing your home mortgage will save you money on interest.',
    tags: ['refinance', 'mortgage', 'savings']
  },
  {
    id: 'mortgage_amortization',
    name: 'Mortgage Amortization Calculator',
    category: 'finance',
    icon: 'Calendar',
    description: 'Generate a full month-by-month amortization schedule for your home mortgage.',
    tags: ['amortization', 'schedule', 'principal', 'interest']
  },
  {
    id: 'mortgage_affordability',
    name: 'Mortgage Affordability Calculator',
    category: 'finance',
    icon: 'ShieldAlert',
    description: 'Determine your home purchase budget based on income, down payment, and debt levels.',
    tags: ['home budget', 'affordability', 'house hunting']
  },
  {
    id: 'down_payment',
    name: 'Down Payment Calculator',
    category: 'finance',
    icon: 'ArrowDown',
    description: 'Estimate target down payment amounts and check how they affect your interest rate and PMI.',
    tags: ['down payment', 'pmi', 'home buying']
  },
  {
    id: 'extra_payment',
    name: 'Extra Payment Calculator',
    category: 'finance',
    icon: 'PlusCircle',
    description: 'See how making extra monthly or annual payments shortens your mortgage term.',
    tags: ['extra payment', 'prepayment', 'early payoff']
  },
  {
    id: 'closing_cost',
    name: 'Closing Cost Calculator',
    category: 'finance',
    icon: 'Receipt',
    description: 'Estimate closing fees, lender points, title fees, and transfer taxes for home buyers.',
    tags: ['closing', 'escrow', 'fees', 'taxes']
  },
  {
    id: 'refinance_savings',
    name: 'Refinance Savings Calculator',
    category: 'finance',
    icon: 'PiggyBank',
    description: 'Compare current vs. refinanced mortgage terms to find the break-even month.',
    tags: ['refinance', 'break-even', 'savings']
  },

  // NEW INVESTMENTS
  {
    id: 'lumpsum',
    name: 'Lumpsum Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Estimate future returns on a one-time lump sum mutual fund or stock investment.',
    tags: ['lumpsum', 'one-time', 'mutual fund', 'investment']
  },
  {
    id: 'mutual_fund',
    name: 'Mutual Fund Calculator',
    category: 'finance',
    icon: 'LineChart',
    description: 'Calculate compound returns and expense ratio drag for equity and debt mutual funds.',
    tags: ['mutual fund', 'returns', 'investing']
  },
  {
    id: 'stock_return',
    name: 'Stock Return Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Calculate annualized returns, dividend yields, and capital gains on your stock portfolio.',
    tags: ['stocks', 'portfolio', 'returns', 'dividends']
  },
  {
    id: 'cagr',
    name: 'CAGR Calculator',
    category: 'finance',
    icon: 'Compass',
    description: 'Find the Compound Annual Growth Rate of any investment over any time horizon.',
    tags: ['cagr', 'compound', 'annualized', 'returns']
  },
  {
    id: 'roi',
    name: 'ROI Calculator',
    category: 'finance',
    icon: 'BarChart2',
    description: 'Determine the return on investment (ROI) for general capital allocations and purchases.',
    tags: ['roi', 'return', 'profitability']
  },
  {
    id: 'xirr',
    name: 'XIRR Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'Calculate internal rate of return for irregular cash inflows and outflows.',
    tags: ['xirr', 'irr', 'cashflow', 'returns']
  },
  {
    id: 'dividend',
    name: 'Dividend Calculator',
    category: 'finance',
    icon: 'CheckCircle2',
    description: 'Estimate future dividend income and projected growth with dividend reinvestment (DRIP).',
    tags: ['dividends', 'drip', 'passive income']
  },
  {
    id: 'inflation',
    name: 'Inflation Calculator',
    category: 'finance',
    icon: 'ArrowUpRight',
    description: 'Measure purchasing power changes over time using historical or custom inflation rates.',
    tags: ['inflation', 'purchasing power', 'cpi']
  },
  {
    id: 'retirement',
    name: 'Retirement Calculator',
    category: 'finance',
    icon: 'Timer',
    description: 'Determine if your current savings rate will meet your retirement spending goals.',
    tags: ['retirement', 'pension', '401k', 'savings']
  },
  {
    id: 'fire',
    name: 'FIRE Calculator',
    category: 'finance',
    icon: 'Flame',
    description: 'Find your Financial Independence, Retire Early (FIRE) number and target timeline.',
    tags: ['fire', 'independence', 'early retirement', 'leverage']
  },

  // NEW SAVINGS
  {
    id: 'rd',
    name: 'Recurring Deposit (RD) Calculator',
    category: 'finance',
    icon: 'CalendarClock',
    description: 'Estimate maturity yields and total interest earned on monthly Recurring Deposits.',
    tags: ['rd', 'recurring deposit', 'savings', 'bank']
  },
  {
    id: 'hys',
    name: 'High Yield Savings Calculator',
    category: 'finance',
    icon: 'PercentCircle',
    description: 'See how interest compounds in a High-Yield Savings Account (HYSA) vs. standard accounts.',
    tags: ['hysa', 'savings', 'high yield', 'interest']
  },
  {
    id: 'goal_savings',
    name: 'Goal Savings Calculator',
    category: 'finance',
    icon: 'Target',
    description: 'Find the required monthly savings amount to hit your target financial goals.',
    tags: ['goal', 'savings', 'target', 'budget']
  },
  {
    id: 'emergency_fund',
    name: 'Emergency Fund Calculator',
    category: 'finance',
    icon: 'Shield',
    description: 'Calculate 3 to 6 months of essential living expenses to size your safety net.',
    tags: ['emergency', 'safety net', 'savings', 'expenses']
  },
  {
    id: 'interest_earnings',
    name: 'Interest Earnings Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Project interest payouts monthly, quarterly, semi-annually, or annually.',
    tags: ['earnings', 'interest', 'yield']
  },
  {
    id: 'savings_growth',
    name: 'Savings Growth Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Visualize your savings account compound trajectory over the next 10-40 years.',
    tags: ['savings', 'growth', 'compound']
  },
  {
    id: 'time_to_save',
    name: 'Time to Save Calculator',
    category: 'finance',
    icon: 'Clock',
    description: 'Calculate exactly how many months it will take to save a specific target amount.',
    tags: ['savings', 'time', 'goal']
  },

  // NEW CREDIT CARDS
  {
    id: 'credit_card_payoff',
    name: 'Credit Card Payoff Calculator',
    category: 'finance',
    icon: 'CreditCard',
    description: 'Find the monthly payment required to clear credit card balances by a target date.',
    tags: ['credit card', 'debt', 'payoff', 'interest']
  },
  {
    id: 'balance_transfer',
    name: 'Balance Transfer Calculator',
    category: 'finance',
    icon: 'RefreshCw',
    description: 'Check if transferring credit card balances to a 0% APR card saves money after fees.',
    tags: ['balance transfer', 'apr', 'fees', 'credit card']
  },
  {
    id: 'credit_utilization',
    name: 'Credit Utilization Calculator',
    category: 'finance',
    icon: 'PercentCircle',
    description: 'Calculate your debt-to-limit ratio and find how it impacts your credit score.',
    tags: ['credit utilization', 'score', 'debt', 'credit limit']
  },
  {
    id: 'credit_card_interest',
    name: 'Credit Card Interest Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'See how much credit card interest is calculated using average daily balance methods.',
    tags: ['credit card', 'interest', 'daily rate']
  },
  {
    id: 'minimum_payment',
    name: 'Minimum Payment Calculator',
    category: 'finance',
    icon: 'ArrowDownCircle',
    description: 'Find out how long it takes and how much interest you pay if you only make minimum payments.',
    tags: ['minimum', 'credit card', 'interest trap']
  },
  {
    id: 'rewards',
    name: 'Rewards Calculator',
    category: 'finance',
    icon: 'Gift',
    description: 'Optimize travel points, miles, and cashback rewards based on credit card spend.',
    tags: ['rewards', 'points', 'miles', 'credit card']
  },
  {
    id: 'cash_back',
    name: 'Cash Back Calculator',
    category: 'finance',
    icon: 'DollarSign',
    description: 'Calculate annual cashback cash earnings based on segmented categories of monthly spend.',
    tags: ['cashback', 'credit card', 'earnings']
  },
  {
    id: 'apr',
    name: 'APR Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'Find the true annual percentage rate (APR) of any loan or credit product.',
    tags: ['apr', 'interest rate', 'true rate']
  },

  // NEW TAXES
  {
    id: 'gst',
    name: 'GST Calculator',
    category: 'finance',
    icon: 'Percent',
    description: 'Calculate Good and Services Tax (GST) added or removed from any item rate.',
    tags: ['gst', 'tax', 'invoice', 'sales tax']
  },
  {
    id: 'sales_tax',
    name: 'Sales Tax Calculator',
    category: 'finance',
    icon: 'ShoppingBag',
    description: 'Find the final purchase price of goods after adding state and local sales tax rates.',
    tags: ['sales tax', 'shopping', 'tax']
  },
  {
    id: 'capital_gains_tax',
    name: 'Capital Gains Tax Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Estimate taxes owed on profits from stock sales, property, or digital assets.',
    tags: ['capital gains', 'tax', 'stocks', 'real estate']
  },
  {
    id: 'property_tax',
    name: 'Property Tax Calculator',
    category: 'finance',
    icon: 'Home',
    description: 'Calculate annual property taxes based on assessed home values and local millage rates.',
    tags: ['property tax', 'mortgage', 'housing', 'tax']
  },
  {
    id: 'payroll_tax',
    name: 'Payroll Tax Calculator',
    category: 'finance',
    icon: 'Users',
    description: 'Estimate FICA (Social Security and Medicare) and federal payroll withholding taxes.',
    tags: ['payroll', 'fica', 'withholding', 'tax']
  },
  {
    id: 'self_employment_tax',
    name: 'Self Employment Tax Calculator',
    category: 'finance',
    icon: 'Briefcase',
    description: 'Calculate self-employment tax obligations (15.3% SE tax) and deductions.',
    tags: ['self employed', 'tax', 'freelancer', '1099']
  },
  {
    id: 'tax_refund',
    name: 'Tax Refund Calculator',
    category: 'finance',
    icon: 'ArrowLeftCircle',
    description: 'Estimate tax refund size or tax balance due for the current filing year.',
    tags: ['refund', 'tax return', 'withholding']
  },
  {
    id: 'tax_bracket',
    name: 'Tax Bracket Calculator',
    category: 'finance',
    icon: 'Sliders',
    description: 'Find your marginal and effective tax brackets based on filing status and taxable income.',
    tags: ['tax bracket', 'progressive tax', 'bracket']
  },

  // NEW SALARY & INCOME
  {
    id: 'salary',
    name: 'Salary Calculator',
    category: 'finance',
    icon: 'Briefcase',
    description: 'Convert annual salary to hourly, daily, weekly, bi-weekly, and monthly wages.',
    tags: ['salary', 'wage', 'paycheck', 'convert']
  },
  {
    id: 'hourly_wage',
    name: 'Hourly Wage Calculator',
    category: 'finance',
    icon: 'Clock',
    description: 'Find hourly rate from annual income or calculate weekly paycheck earnings.',
    tags: ['hourly', 'wage', 'rate']
  },
  {
    id: 'overtime_pay',
    name: 'Overtime Pay Calculator',
    category: 'finance',
    icon: 'Timer',
    description: 'Calculate time-and-a-half or double-time overtime earnings for extra hours.',
    tags: ['overtime', 'hourly', 'paycheck']
  },
  {
    id: 'annual_income',
    name: 'Annual Income Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Aggregate hourly pay, commissions, and bonuses to find total annual earnings.',
    tags: ['annual', 'income', 'salary']
  },
  {
    id: 'monthly_salary',
    name: 'Monthly Salary Calculator',
    category: 'finance',
    icon: 'Calendar',
    description: 'Translate salary packages to exact monthly cash flows before and after standard deductions.',
    tags: ['monthly', 'paycheck', 'salary']
  },
  {
    id: 'net_income',
    name: 'Net Income Calculator',
    category: 'finance',
    icon: 'ArrowDown',
    description: 'Calculate total net income after subtractive taxes, insurance, and retirement cost.',
    tags: ['net income', 'take home', 'paycheck']
  },
  {
    id: 'take_home_pay',
    name: 'Take Home Pay Calculator',
    category: 'finance',
    icon: 'DollarSign',
    description: 'Calculate final take-home salary of individual earnings after local tax withholdings.',
    tags: ['take home', 'salary', 'paycheck']
  },
  {
    id: 'bonus',
    name: 'Bonus Calculator',
    category: 'finance',
    icon: 'Gift',
    description: 'Estimate net bonus payout size using supplemental tax or aggregate tax methods.',
    tags: ['bonus', 'supplemental tax', 'commission']
  },
  {
    id: 'commission',
    name: 'Commission Calculator',
    category: 'finance',
    icon: 'PercentCircle',
    description: 'Find commission earnings based on tiered structures and sales revenue targets.',
    tags: ['commission', 'sales', 'earnings']
  },

  // NEW BUSINESS
  {
    id: 'profit_margin',
    name: 'Profit Margin Calculator',
    category: 'finance',
    icon: 'TrendingUp',
    description: 'Calculate gross profit, net profit margin, and markup percentages instantly.',
    tags: ['margin', 'profit', 'markup', 'business']
  },
  {
    id: 'break_even',
    name: 'Break Even Calculator',
    category: 'finance',
    icon: 'BarChart2',
    description: 'Find the exact unit sales or revenue needed to cover fixed and variable business costs.',
    tags: ['break even', 'units', 'fixed cost', 'variable cost']
  },
  {
    id: 'markup',
    name: 'Markup Calculator',
    category: 'finance',
    icon: 'ArrowUpCircle',
    description: 'Calculate target retail prices and profit margins based on wholesale item cost.',
    tags: ['markup', 'price', 'margin', 'business']
  },
  {
    id: 'inventory',
    name: 'Inventory Calculator',
    category: 'finance',
    icon: 'Clipboard',
    description: 'Estimate average inventory, turn rates, and holding costs for retail and wholesale business.',
    tags: ['inventory', 'holding cost', 'retail']
  },
  {
    id: 'cash_flow',
    name: 'Cash Flow Calculator',
    category: 'finance',
    icon: 'ArrowRightLeft',
    description: 'Track operational, investment, and financial cash flows to check company liquidity.',
    tags: ['cash flow', 'liquidity', 'working capital']
  },
  {
    id: 'revenue',
    name: 'Revenue Calculator',
    category: 'finance',
    icon: 'DollarSign',
    description: 'Find gross business revenue based on price-volume metrics and sales pipelines.',
    tags: ['revenue', 'sales', 'business']
  },
  {
    id: 'expense',
    name: 'Expense Calculator',
    category: 'finance',
    icon: 'ArrowDown',
    description: 'Aggregate monthly operating expenses (OpEx) to find total cash outflow.',
    tags: ['expense', 'opex', 'cost']
  },
  {
    id: 'invoice',
    name: 'Invoice Calculator',
    category: 'finance',
    icon: 'ReceiptText',
    description: 'Build and check invoice sub-totals, discounts, taxes, and grand totals.',
    tags: ['invoice', 'tax', 'discounts']
  },
  {
    id: 'depreciation',
    name: 'Depreciation Calculator',
    category: 'finance',
    icon: 'TrendingDown',
    description: 'Calculate annual asset depreciation using straight-line or declining balance methods.',
    tags: ['depreciation', 'assets', 'write-off']
  },
  {
    id: 'business_roi',
    name: 'Business ROI Calculator',
    category: 'finance',
    icon: 'LineChart',
    description: 'Project returns on commercial expenditures, marketing ads, and capital hires.',
    tags: ['roi', 'investment', 'business']
  },

  // NEW CURRENCY
  {
    id: 'exchange_rate',
    name: 'Exchange Rate Calculator',
    category: 'finance',
    icon: 'RefreshCw',
    description: 'Estimate conversion values between top global fiat currency rates.',
    tags: ['exchange rate', 'forex', 'currency']
  },
  {
    id: 'crypto_profit',
    name: 'Crypto Profit Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Calculate capital returns on crypto token holdings based on buy, sell, and fee rates.',
    tags: ['crypto', 'profit', 'token', 'gains']
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Track purchasing power and conversion of Bitcoin (BTC) to global fiat currencies.',
    tags: ['bitcoin', 'btc', 'crypto']
  },
  {
    id: 'ethereum',
    name: 'Ethereum Calculator',
    category: 'finance',
    icon: 'Coins',
    description: 'Track capital value and conversion of Ethereum (ETH) to global fiat currencies.',
    tags: ['ethereum', 'eth', 'crypto']
  },
  {
    id: 'forex',
    name: 'Forex Calculator',
    category: 'finance',
    icon: 'Globe',
    description: 'Calculate lot sizes, pip values, and leverage margins for currency pair trading.',
    tags: ['forex', 'pip', 'margin', 'lot size']
  },

  // HEALTH
  {
    id: 'bmi',
    name: 'BMI Calculator',
    category: 'health',
    icon: 'Scale',
    description: 'Calculate your Body Mass Index (BMI) and discover if your weight falls within a healthy range.',
    popular: true,
    trending: true,
    tags: ['weight', 'height', 'bmi', 'fitness', 'diet']
  },
  {
    id: 'calories',
    name: 'Calories Calculator',
    category: 'health',
    icon: 'Flame',
    description: 'Estimate daily calorie requirements based on your height, weight, activity levels, and goals.',
    popular: true,
    trending: true,
    tags: ['diet', 'energy', 'tdee', 'bmr', 'weight loss']
  },
  {
    id: 'bmr',
    name: 'BMR Calculator',
    category: 'health',
    icon: 'Heart',
    description: 'Determine your Basal Metabolic Rate—the calories your body burns at complete rest.',
    popular: false,
    tags: ['bmr', 'metabolism', 'calories', 'rest']
  },
  {
    id: 'water',
    name: 'Water Intake Calculator',
    category: 'health',
    icon: 'Droplet',
    description: 'Calculate your recommended daily hydration needs and log your cups interactively.',
    popular: false,
    tags: ['drink', 'water', 'hydration', 'health', 'fitness']
  },
  {
    id: 'body_fat',
    name: 'Body Fat Calculator',
    category: 'health',
    icon: 'Ruler',
    description: 'Estimate your body fat percentage using US Navy circumference metrics.',
    popular: false,
    tags: ['fat', 'muscle', 'composition', 'waist', 'neck']
  },
  {
    id: 'ideal_weight',
    name: 'Ideal Weight Calculator',
    category: 'health',
    icon: 'UserCheck',
    description: 'Find your healthy target weight based on scientific formulas (Devine, Robinson, Miller).',
    popular: false,
    tags: ['weight', 'ideal', 'height', 'goals']
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy Due Date Calculator',
    category: 'health',
    icon: 'Baby',
    description: 'Estimate your baby due date and track your gestational timeline and trimesters.',
    popular: false,
    tags: ['baby', 'pregnant', 'due date', 'maternity', 'conception']
  },
  {
    id: 'heart_rate',
    name: 'Heart Rate Calculator',
    category: 'health',
    icon: 'HeartHandshake',
    description: 'Find your maximum heart rate and ideal cardiovascular training zones (aerobic, fat burn).',
    popular: false,
    tags: ['cardio', 'heart', 'pulse', 'workout', 'training']
  },
  {
    id: 'tdee',
    name: 'TDEE Calculator',
    category: 'health',
    icon: 'Activity',
    description: 'Calculate Total Daily Energy Expenditure (TDEE) to align nutrition with your physical output.',
    popular: false,
    tags: ['tdee', 'activity', 'calories', 'macro']
  },

  // MATH
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    category: 'math',
    icon: 'Hash',
    description: 'Calculate percentage values, percentage differences, and absolute changes instantly.',
    popular: true,
    trending: true,
    tags: ['math', 'fraction', 'percent increase', 'ratio']
  },
  {
    id: 'scientific',
    name: 'Scientific Calculator',
    category: 'math',
    icon: 'Binary',
    description: 'A fully responsive scientific calculator for arithmetic, trigonometry, logs, and roots.',
    popular: true,
    tags: ['scientific', 'calculator', 'sin', 'cos', 'log', 'math']
  },
  {
    id: 'fraction',
    name: 'Fraction Calculator',
    category: 'math',
    icon: 'Split',
    description: 'Perform arithmetic operations on fractions and simplify results to lowest terms.',
    popular: false,
    tags: ['fraction', 'math', 'simplify', 'divide', 'multiply']
  },
  {
    id: 'average',
    name: 'Average Calculator',
    category: 'math',
    icon: 'BarChart2',
    description: 'Find the mean, median, mode, range, and standard deviation of a dataset.',
    popular: false,
    tags: ['mean', 'median', 'mode', 'average', 'statistics']
  },
  {
    id: 'ratio',
    name: 'Ratio Calculator',
    category: 'math',
    icon: 'Scaling',
    description: 'Simplify ratios, find missing values, and scale proportions up or down.',
    popular: false,
    tags: ['ratio', 'proportion', 'scale', 'math']
  },
  {
    id: 'equation',
    name: 'Equation Solver',
    category: 'math',
    icon: 'Equal',
    description: 'Solve linear, quadratic, and systems of algebraic equations with step-by-step methods.',
    popular: false,
    tags: ['algebra', 'solve', 'quadratic', 'equation', 'x']
  },
  {
    id: 'decimal',
    name: 'Decimal to Fraction Converter',
    category: 'math',
    icon: 'ArrowLeftRight',
    description: 'Convert terminating and repeating decimal numbers to clean, simplified fractions.',
    popular: false,
    tags: ['decimal', 'fraction', 'math', 'convert']
  },
  {
    id: 'matrix',
    name: 'Matrix Calculator',
    category: 'math',
    icon: 'Grid',
    description: 'Perform addition, subtraction, multiplication, determinants, and matrix inversions.',
    popular: false,
    tags: ['matrix', 'linear algebra', 'array', 'determinant']
  },

  // EDUCATION
  {
    id: 'gpa',
    name: 'GPA Calculator',
    category: 'education',
    icon: 'GraduationCap',
    description: 'Calculate your semester grade point average (GPA) with weighted course credits.',
    popular: true,
    tags: ['college', 'gpa', 'university', 'grades', 'gpa scale']
  },
  {
    id: 'cgpa',
    name: 'CGPA Calculator',
    category: 'education',
    icon: 'BookOpen',
    description: 'Estimate cumulative CGPA across multiple semesters or convert CGPA to percentage.',
    popular: false,
    tags: ['cgpa', 'cumulative', 'gpa', 'grades']
  },
  {
    id: 'grade',
    name: 'Grade Calculator',
    category: 'education',
    icon: 'ClipboardCheck',
    description: 'Determine the minimum final exam score required to achieve your target course grade.',
    popular: false,
    tags: ['test', 'exam', 'final grade', 'target score']
  },
  {
    id: 'marks',
    name: 'Marks Percentage Calculator',
    category: 'education',
    icon: 'Award',
    description: 'Convert test marks and subject scores into percentages and letter grades.',
    popular: false,
    tags: ['exam', 'score', 'percentage', 'marks']
  },
  {
    id: 'attendance',
    name: 'Attendance Calculator',
    category: 'education',
    icon: 'CalendarClock',
    description: 'Calculate your current attendance percentage and find out how many classes you can skip or must attend.',
    popular: false,
    tags: ['class', 'skip', 'bunk', 'college', 'attendance target']
  },
  {
    id: 'study_time',
    name: 'Study Time Optimizer',
    category: 'education',
    icon: 'Timer',
    description: 'Plan your study schedules, breaks, and intervals based on the Pomodoro and Spaced Repetition techniques.',
    popular: false,
    tags: ['pomodoro', 'productivity', 'study tracker', 'schedule']
  },

  // CONVERSION
  {
    id: 'unit_converter_length',
    name: 'Length Converter',
    category: 'conversion',
    icon: 'Ruler',
    description: 'Convert between metric and imperial lengths (meters, feet, inches, miles, etc.).',
    popular: false,
    tags: ['length', 'height', 'meters', 'feet', 'inch', 'conversion']
  },
  {
    id: 'unit_converter_weight',
    name: 'Weight Converter',
    category: 'conversion',
    icon: 'Weight',
    description: 'Convert mass units quickly (kilograms, grams, pounds, ounces, stones).',
    popular: false,
    tags: ['weight', 'mass', 'kg', 'lbs', 'pounds', 'conversion']
  },
  {
    id: 'unit_converter_temp',
    name: 'Temperature Converter',
    category: 'conversion',
    icon: 'Thermometer',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin temperature scales.',
    popular: false,
    tags: ['temperature', 'celsius', 'fahrenheit', 'weather']
  },
  {
    id: 'unit_converter_area',
    name: 'Area Converter',
    category: 'conversion',
    icon: 'Square',
    description: 'Convert land and structural measurements (square meters, square feet, acres, hectares).',
    popular: false,
    tags: ['area', 'land', 'sq ft', 'acre', 'conversion']
  },
  {
    id: 'unit_converter_volume',
    name: 'Volume Converter',
    category: 'conversion',
    icon: 'GlassWater',
    description: 'Convert liquid and dry volumes (liters, milliliters, gallons, cups, fluid ounces).',
    popular: false,
    tags: ['volume', 'liters', 'gallons', 'cooking', 'cup']
  },
  {
    id: 'unit_converter_speed',
    name: 'Speed Converter',
    category: 'conversion',
    icon: 'Gauge',
    description: 'Convert speeds (kilometers per hour, miles per hour, meters per second, knots).',
    popular: false,
    tags: ['speed', 'velocity', 'kmh', 'mph', 'wind']
  },
  {
    id: 'currency',
    name: 'Currency Converter',
    category: 'conversion',
    icon: 'Globe',
    description: 'Interactive global currency values calculator with popular conversion pairs.',
    popular: false,
    tags: ['forex', 'money', 'dollar', 'euro', 'rupee', 'exchange']
  },
  {
    id: 'unit_converter_time',
    name: 'Time Converter',
    category: 'conversion',
    icon: 'Clock',
    description: 'Convert between milliseconds, seconds, minutes, hours, days, weeks, and years.',
    popular: false,
    tags: ['time', 'seconds', 'hours', 'calendar']
  },
  {
    id: 'unit_converter_storage',
    name: 'Digital Storage Converter',
    category: 'conversion',
    icon: 'HardDrive',
    description: 'Convert digital data sizes (Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, Petabytes).',
    popular: true,
    tags: ['data', 'bytes', 'mb', 'gb', 'tb', 'storage', 'file size']
  },
  {
    id: 'unit_converter_pressure',
    name: 'Pressure Converter',
    category: 'conversion',
    icon: 'Gauge',
    description: 'Convert pressure metrics (Pascals, Kilopascals, Bar, PSI, Atmospheres, Torr).',
    popular: false,
    tags: ['pressure', 'psi', 'bar', 'pascal', 'physics', 'atmosphere']
  },
  {
    id: 'unit_converter_energy',
    name: 'Energy Converter',
    category: 'conversion',
    icon: 'Zap',
    description: 'Convert physical energy metrics (Joules, Calories, Kilocalories, Watt-hours, BTUs).',
    popular: false,
    tags: ['energy', 'joules', 'calories', 'power', 'btu', 'physics']
  },
  {
    id: 'unit_converter_power',
    name: 'Power Converter',
    category: 'conversion',
    icon: 'Zap',
    description: 'Convert power outputs (Watts, Kilowatts, Horsepower, Megawatts, BTU/hr).',
    popular: false,
    tags: ['power', 'watts', 'horsepower', 'hp', 'btu/hr', 'electricity']
  },
  {
    id: 'unit_converter_angle',
    name: 'Angle Converter',
    category: 'conversion',
    icon: 'Compass',
    description: 'Convert angle measurements (Degrees, Radians, Gradians).',
    popular: false,
    tags: ['angle', 'degrees', 'radians', 'geometry', 'trigonometry']
  },

  // EVERYDAY / UTILITY TOOLS
  {
    id: 'age',
    name: 'Age Calculator',
    category: 'utility',
    icon: 'Calendar',
    description: 'Calculate your exact age in years, months, days, hours, and minutes, and check your next birthday countdown.',
    popular: true,
    trending: true,
    tags: ['birthday', 'age', 'years', 'birth date']
  },
  {
    id: 'days_between',
    name: 'Days Between Dates',
    category: 'utility',
    icon: 'CalendarRange',
    description: 'Calculate the exact number of calendar days, business days, and weeks between two dates.',
    popular: true,
    trending: true,
    tags: ['date', 'days between', 'timeline', 'duration', 'work days']
  },
  {
    id: 'discount',
    name: 'Discount Calculator',
    category: 'utility',
    icon: 'Tag',
    description: 'Find out exactly how much you will save on sales items with percent off and additional taxes.',
    popular: true,
    trending: true,
    tags: ['sale', 'shopping', 'percent off', 'discount', 'save']
  },
  {
    id: 'tip',
    name: 'Tip Calculator',
    category: 'utility',
    icon: 'CupSoda',
    description: 'Quickly calculate table service tips, split the bill among friends, and find totals per person.',
    popular: true,
    trending: true,
    tags: ['restaurant', 'food', 'split', 'tip', 'bill']
  },
  {
    id: 'random',
    name: 'Random Number Generator',
    category: 'utility',
    icon: 'Dices',
    description: 'Generate customizable lists of random numbers, pick items from an list, or roll dice.',
    popular: false,
    tags: ['random', 'picker', 'roll', 'dice', 'luck']
  },
  {
    id: 'password',
    name: 'Secure Password Generator',
    category: 'utility',
    icon: 'Key',
    description: 'Create cryptographically secure, random passwords with custom lengths and character filters.',
    popular: false,
    tags: ['security', 'password', 'key', 'cybersecurity']
  }
];

export const POPULAR_GUIDES: Guide[] = [
  {
    title: 'Mortgage Guide',
    category: 'finance',
    calculatorId: 'mortgage',
    content: `### Understanding Your Mortgage Payment
When you buy a house, your monthly mortgage payment typically consists of four main components, collectively known as **PITI**:

1. **Principal (P)**: The actual amount you borrowed that goes toward paying down the balance of your loan.
2. **Interest (I)**: The fee charged by the lender for borrowing the money, determined by your annual percentage rate (APR).
3. **Taxes (T)**: Real estate property taxes assessed by your local government, usually stored in an escrow account and paid yearly.
4. **Insurance (I)**: Homeowner's insurance policy to protect your home against damage.

#### How to Reduce Your Monthly Payment
* **Increase the Down Payment**: Putting down 20% or more helps you avoid **Private Mortgage Insurance (PMI)**, which can save hundreds monthly.
* **Shop for a Lower Interest Rate**: Even a 0.5% difference in your rate can save you tens of thousands over the life of a 30-year loan.
* **Choose a Longer Loan Term**: A 30-year term has lower monthly payments than a 15-year term, though you will pay more in total interest.`
  },
  {
    title: 'Investment & SIP Guide',
    category: 'finance',
    calculatorId: 'sip',
    content: `### The Power of Compound Interest
**Compound interest** is the concept of earning interest on your interest. Over long horizons, it turns modest periodic savings into massive wealth.

#### Systematic Investment Plans (SIP)
An SIP is an investment method where you contribute a fixed sum of money into mutual funds or stocks at regular intervals (usually monthly).

#### Key Benefits of SIP:
1. **Rupee/Dollar Cost Averaging**: When markets are down, your fixed amount buys more units. When markets are up, it buys fewer. Over time, this averages down your cost per unit.
2. **Disciplined Savings**: Automated monthly transfers ensure you prioritize investing before spending.
3. **Compound Effect**: Starting just 5 years earlier can double your eventual retirement nest egg due to the exponential compounding curve.`
  },
  {
    title: 'BMI & TDEE Guide',
    category: 'health',
    calculatorId: 'bmi',
    content: `### Managing Body Composition
Your physical weight is a function of calories in versus calories out, combined with genetic predispositions and activity levels.

#### Body Mass Index (BMI)
BMI is a quick screening metric calculated as **Weight (kg) / Height (m²)**. It provides a generalized classification:
* **Underweight**: < 18.5
* **Normal Weight**: 18.5 – 24.9
* **Overweight**: 25.0 – 29.9
* **Obese**: ≥ 30.0

*Note: BMI is a general indicator and may not be accurate for high-muscle athletes, since muscle is denser than fat.*

#### TDEE (Total Daily Energy Expenditure)
TDEE represents the actual number of calories your body burns in a 24-hour period. It is composed of:
1. **BMR (Basal Metabolic Rate)**: Energy required to keep organs running at rest (60-70% of energy).
2. **NEAT**: Daily non-exercise activity (walking, typing, fidgeting).
3. **TEF**: Thermic effect of digesting food.
4. **EAT**: Active deliberate exercise.

#### Weight Management Rules:
* **Caloric Deficit (Eat below TDEE)**: Weight Loss
* **Caloric Surplus (Eat above TDEE)**: Weight Gain
* **Maintenance (Eat equal to TDEE)**: Conserve current weight`
  },
  {
    title: 'Income Tax Guide',
    category: 'finance',
    calculatorId: 'tax',
    content: `### Demystifying Progressive Tax Systems
Many taxpayers misunderstand how **tax brackets** work, fearing that a raise will bump them into a higher bracket and leave them with less take-home pay. This is a myth!

#### Progressive vs. Flat Taxes
Most modern economies use **progressive tax systems**, where income is segmented into buckets, and each bucket is taxed at its own unique, increasing rate:

* If the first $10,000 is taxed at 10%, and the next $30,000 is taxed at 15%:
  * If you earn $12,000, you do NOT pay 15% on the entire $12,000.
  * Instead, you pay 10% on the first $10,000 ($1,000) + 15% only on the remaining $2,000 ($300). Your total tax is $1,300, and your **Effective Tax Rate** is 10.83%.

#### Effective vs. Marginal Tax Rate
* **Marginal Rate**: The tax rate charged on the very last dollar of your income.
* **Effective Rate**: The actual percentage of your total income paid in taxes (Total Tax / Gross Income). Your effective rate is always lower than or equal to your marginal rate.`
  },
  {
    title: 'Percentage Calculations Guide',
    category: 'math',
    calculatorId: 'percentage',
    content: `### Percentage Rules and Shortcuts
Percentages are fractions out of 100. Understanding how they operate is crucial for shopping, tip calculations, and checking financial returns.

#### 1. Reversibility Principle (A% of B = B% of A)
Need to find **8% of 50** in your head? It sounds tricky.
But because multiplication is commutative, that is exactly the same as **50% of 8**, which is a simple **4**!

#### 2. Percentage Difference vs Percentage Points
* **Percentage Change**: Measures the relative rate of change. If an interest rate goes from 4% to 5%, that represents a **25% increase** in the rate itself: \`((5 - 4) / 4) * 100\`.
* **Percentage Points**: Measures the absolute difference. Going from 4% to 5% is an absolute increase of **1 percentage point**.`
  },
  {
    title: 'Weight Loss & Hydration Guide',
    category: 'health',
    calculatorId: 'calories',
    content: `### Science-backed Weight Control
To achieve sustainable body recomposition, pair accurate caloric budgeting with optimal hydration.

#### Hydration's Secret Role
Water is essential for metabolic rate efficiency and kidney filtration.
* When hydrated, kidneys work optimally, freeing up your liver to metabolize stored fat efficiently.
* Drinking water 30 minutes before meals naturally reduces caloric consumption by increasing satiety.
* Aim for approximately **30 to 35 ml of water per kg of body weight**, increasing this on hot days or intense training sessions.`
  }
];
