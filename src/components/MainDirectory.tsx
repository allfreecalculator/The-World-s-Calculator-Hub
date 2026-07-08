import React, { useMemo } from 'react';
import { Search, Sparkles, BookOpen, Star, Shield, Smartphone, Heart, Zap, RefreshCw, CheckCircle, X } from 'lucide-react';
import { CALCULATORS, CATEGORIES, POPULAR_SEARCHES, POPULAR_GUIDES } from '../data';
import { CategoryId, CalculatorInfo } from '../types';

const FINANCE_SECTIONS = [
  {
    name: 'Loans',
    desc: 'EMI, Personal, Home, Car, and Education loan amortizations.',
    ids: ['emi', 'loan', 'personal_loan', 'home_loan', 'car_loan', 'education_loan', 'business_loan', 'loan_affordability', 'loan_comparison', 'interest_calc', 'simple_interest', 'compound_interest']
  },
  {
    name: 'Mortgage',
    desc: 'PITI estimators, interest calculators, refinancing, and down payment tools.',
    ids: ['mortgage', 'mortgage_payment', 'mortgage_interest', 'mortgage_refinance', 'mortgage_amortization', 'mortgage_affordability', 'down_payment', 'extra_payment', 'closing_cost', 'refinance_savings']
  },
  {
    name: 'Investments',
    desc: 'SIP, lumpsum, stock return, mutual fund, CAGR, and dividend projection tools.',
    ids: ['sip', 'swp', 'investment', 'lumpsum', 'mutual_fund', 'stock_return', 'cagr', 'roi', 'xirr', 'dividend', 'inflation', 'retirement', 'fire']
  },
  {
    name: 'Savings',
    desc: 'FD, RD, HYS, target goal savings, and compound emergency fund builders.',
    ids: ['savings', 'fd', 'rd', 'hys', 'goal_savings', 'emergency_fund', 'interest_earnings', 'savings_growth', 'time_to_save']
  },
  {
    name: 'Credit Cards',
    desc: 'Payoff trackers, credit utilization ratios, rewards, cashback, and balance transfers.',
    ids: ['credit_card_payoff', 'balance_transfer', 'credit_utilization', 'credit_card_interest', 'minimum_payment', 'rewards', 'cash_back', 'apr']
  },
  {
    name: 'Taxes',
    desc: 'Progressive annual income tax, GST, VAT, and capital gains tax estimations.',
    ids: ['tax', 'vat', 'gst', 'sales_tax', 'capital_gains_tax', 'property_tax', 'payroll_tax', 'self_employment_tax', 'tax_refund', 'tax_bracket']
  },
  {
    name: 'Salary & Income',
    desc: 'Paycheck translations, wage conversions, net vs. gross take-home and bonuses.',
    ids: ['salary', 'hourly_wage', 'overtime_pay', 'annual_income', 'monthly_salary', 'net_income', 'take_home_pay', 'bonus', 'commission']
  },
  {
    name: 'Business',
    desc: 'Profit margins, markups, break-even unit calculations, and OpEx planners.',
    ids: ['profit_margin', 'break_even', 'markup', 'inventory', 'cash_flow', 'revenue', 'expense', 'invoice', 'depreciation', 'business_roi']
  },
  {
    name: 'Currency',
    desc: 'Fiat rate exchanges, crypto profits, and Bitcoin & Forex calculators.',
    ids: ['exchange_rate', 'crypto_profit', 'bitcoin', 'ethereum', 'forex']
  }
];

const FINANCE_GUIDES = [
  {
    title: 'How EMI is Calculated: Step-by-Step Guide',
    content: 'Equated Monthly Installment (EMI) calculations use the reducing balance method. The mathematical formula is E = P * r * (1 + r)^n / ((1 + r)^n - 1), where P is the Principal loan amount, r is the monthly interest rate (annual rate divided by 12 and 100), and n is the loan tenure in months. Understanding EMIs helps you optimize prepayments to minimize total interest paid.',
    calcId: 'emi'
  },
  {
    title: 'Mortgage Basics: Understanding PITI & Down Payments',
    content: 'PITI stands for Principal, Interest, Taxes, and Insurance—the four components of a monthly mortgage payment. A larger down payment (e.g., 20%) reduces your loan-to-value ratio, lowers your principal amount, helps you secure a lower interest rate, and avoids the cost of Private Mortgage Insurance (PMI). Use our Mortgage calculators to see the trade-offs of down payments.',
    calcId: 'mortgage'
  },
  {
    title: 'The Power of SIP: Compounding Your Small Investments',
    content: 'Systematic Investment Plans (SIP) leverage dollar-cost averaging and compounding interest. By investing a fixed amount regularly (e.g. monthly), you buy more units when prices are low and fewer units when prices are high. Over decades, compounding reinvestments can exponentially accelerate your capital wealth. Learn more using our SIP calculator.',
    calcId: 'sip'
  },
  {
    title: 'Understanding GST/VAT: A Business Owner\'s Guide',
    content: 'Goods and Services Tax (GST) and Value Added Tax (VAT) are consumption taxes levied on goods and services. When calculating tax-inclusive prices, divide the price by 1 + (tax rate / 100). When calculating tax-exclusive prices, multiply the base amount by the tax rate. Business owners must accurately separate GST/VAT from revenue to comply with tax filings.',
    calcId: 'gst'
  },
  {
    title: 'Investment Planning: Asset Allocation for Beginners',
    content: 'Asset allocation is the strategy of dividing your investment portfolio among different asset classes, such as stocks, bonds, and cash. The goal is to balance risk and reward based on your personal financial goals, risk tolerance, and investment horizon. Compounding interest and diversified assets are key to wealth growth.',
    calcId: 'investment'
  },
  {
    title: 'Debt Repayment Strategies: Snowball vs. Avalanche',
    content: 'Two popular debt repayment strategies are the Debt Snowball and Debt Avalanche. The Snowball method focuses on paying off the smallest balances first to build psychological momentum, while the Avalanche method targets the highest interest rate debts first to mathematically minimize total interest expenses over time.',
    calcId: 'loan_comparison'
  },
  {
    title: 'Retirement Planning: How Much Do You Really Need?',
    content: 'Most financial planners suggest aiming to replace 70% to 80% of your pre-retirement income. The "Rule of 25" suggests saving 25 times your annual expenses, which allows you to safely withdraw 4% annually in retirement (The 4% Rule). Project your retirement balance using our custom Retirement & FIRE calculators.',
    calcId: 'retirement'
  },
  {
    title: 'Salary Tax Withholding: How to Read Your Paycheck',
    content: 'Your take-home pay is your gross income minus federal, state, and local tax withholdings, plus contributions for insurance and retirement (e.g. 401k). Marginal tax rates apply in tiers—only income within a specific bracket is taxed at that bracket\'s rate. Use our Income Tax & Salary calculators to calculate your net.',
    calcId: 'tax'
  },
  {
    title: 'Business Margins vs. Markup: Profit Optimization',
    content: 'Margin is the percentage of selling price that is profit, calculated as (Price - Cost) / Price. Markup is the percentage added to the cost price to determine selling price, calculated as (Price - Cost) / Cost. While related, a 50% markup yields only a 33.3% profit margin. Mastering this distinction is crucial for product pricing.',
    calcId: 'profit_margin'
  },
  {
    title: 'Crypto Portfolio Management: Risk & Return Analysis',
    content: 'Digital assets offer extreme upside alongside high volatility. Calculating purchase average price, gas/exchange fees, and potential capital gains taxes is critical before selling tokens. Track Bitcoin, Ethereum, and altcoin profitability utilizing our Crypto & Fiat conversion calculators.',
    calcId: 'crypto_profit'
  }
];

const HEALTH_SECTIONS = [
  {
    name: 'Body Weight',
    emoji: '⚖️',
    desc: 'BMI, Ideal Weight, Body Fat, Lean Body Mass, and Waist-to-Hip Ratio metrics.',
    items: [
      { name: 'BMI Calculator', id: 'bmi' },
      { name: 'Ideal Weight', id: 'ideal_weight' },
      { name: 'Body Fat', id: 'body_fat' },
      { name: 'Lean Body Mass', id: 'body_fat' },
      { name: 'Waist-to-Hip Ratio', id: 'body_fat' },
      { name: 'Healthy Weight Range', id: 'bmi' },
      { name: 'Obesity Calculator', id: 'bmi' },
      { name: 'Weight Gain', id: 'calories' },
      { name: 'Weight Loss', id: 'calories' }
    ]
  },
  {
    name: 'Calories & Nutrition',
    emoji: '🔥',
    desc: 'Determine daily calorie requirements, macronutrient breakdown, and hydration levels.',
    items: [
      { name: 'Calories Calculator', id: 'calories' },
      { name: 'BMR', id: 'bmr' },
      { name: 'TDEE', id: 'tdee' },
      { name: 'Protein Intake', id: 'calories' },
      { name: 'Carbohydrate Intake', id: 'calories' },
      { name: 'Fat Intake', id: 'calories' },
      { name: 'Macro Calculator', id: 'calories' },
      { name: 'Meal Calories', id: 'calories' },
      { name: 'Water Intake', id: 'water' }
    ]
  },
  {
    name: 'Heart & Health',
    emoji: '❤️',
    desc: 'Monitor cardiovascular vital signs, training heart rate zones, and blood sugar stats.',
    items: [
      { name: 'Heart Rate', id: 'heart_rate' },
      { name: 'Blood Pressure', id: 'heart_rate' },
      { name: 'Cholesterol', id: 'heart_rate' },
      { name: 'Cardiac Risk', id: 'heart_rate' },
      { name: 'Pulse Rate', id: 'heart_rate' },
      { name: 'Blood Sugar', id: 'heart_rate' }
    ]
  },
  {
    name: 'Pregnancy',
    emoji: '👶',
    desc: 'Track gestations, trimesters, due dates, ovulation timelines, and baby growth indices.',
    items: [
      { name: 'Pregnancy Calculator', id: 'pregnancy' },
      { name: 'Due Date', id: 'pregnancy' },
      { name: 'Ovulation', id: 'pregnancy' },
      { name: 'Conception Date', id: 'pregnancy' },
      { name: 'Fertility', id: 'pregnancy' },
      { name: 'Baby Growth', id: 'pregnancy' }
    ]
  },
  {
    name: 'Fitness',
    emoji: '🏃',
    desc: 'Plan running paces, workout physical burn rate, and calculate peak weights.',
    items: [
      { name: 'Running Pace', id: 'calories' },
      { name: 'Walking Calories', id: 'calories' },
      { name: 'Cycling Calories', id: 'calories' },
      { name: 'Swimming Calories', id: 'calories' },
      { name: 'Workout Calories', id: 'calories' },
      { name: 'One Rep Max', id: 'calories' }
    ]
  }
];

const HEALTH_GUIDES = [
  {
    title: 'BMI Guide: Tracking Body Composition',
    content: 'Body Mass Index (BMI) is a general screening metric comparing weight to height. While a highly reliable initial baseline tool, it has boundaries because it does not isolate skeletal muscle mass from fat cells. Our interactive BMI calculator maps index thresholds to guide body composition.',
    calcId: 'bmi'
  },
  {
    title: 'Weight Loss Guide: Safe and Sustainable Deficits',
    content: 'Healthy weight loss centers on creating a manageable, progressive calorie deficit of 300 to 500 calories daily. Rapid starvation triggers defensive muscle wasting and metabolic slowdowns. Track sustainable, high-fidelity targets utilizing our integrated Calories calculator.',
    calcId: 'calories'
  },
  {
    title: 'Healthy Diet Guide: Macronutrient Optimization',
    content: 'An optimized diet balances proteins, carbohydrates, and healthy fats. Active individuals require elevated protein intakes to sustain muscle fibers, while carbs fuel intense physical stamina. Our Calories & TDEE engine calculates target daily macro splits automatically.',
    calcId: 'calories'
  },
  {
    title: 'Calories Guide: Understanding BMR vs. TDEE',
    content: 'Your Basal Metabolic Rate (BMR) represents the absolute number of calories your body burns at rest to perform vital clinical tasks. Total Daily Energy Expenditure (TDEE) scales BMR with your custom active multipliers. Calculate your precise active physical energy demands today.',
    calcId: 'tdee'
  },
  {
    title: 'Body Fat Guide: Military Composition Benchmarks',
    content: 'Body fat percentages isolate true lipid tissue volume from bone and lean muscle. Our estimator applies standard US Navy circumference formulas using waist, neck, and hip dimensions to map body fat classes precisely without premium clinical equipment.',
    calcId: 'body_fat'
  },
  {
    title: 'Water Intake Guide: Mastering Hydration Balance',
    content: 'Adequate hydration stabilizes body heat, fuels cells, and supports recovery. Standard hydration targets scale with body weight, local climate temperatures, and athletic exercise duration. Track and log your exact daily cup requirements dynamically.',
    calcId: 'water'
  }
];

const MATH_SECTIONS = [
  {
    name: 'Basic Math',
    emoji: '➗',
    desc: 'Solve basic calculations including percentage, fractions, addition, average, and ratios.',
    items: [
      { name: 'Addition', id: 'scientific' },
      { name: 'Subtraction', id: 'scientific' },
      { name: 'Multiplication', id: 'scientific' },
      { name: 'Division', id: 'scientific' },
      { name: 'Percentage', id: 'percentage' },
      { name: 'Average', id: 'average' },
      { name: 'Ratio', id: 'ratio' },
      { name: 'Proportion', id: 'ratio' }
    ]
  },
  {
    name: 'Algebra',
    emoji: '📐',
    desc: 'Solve simple and complex algebra equations, quadratics, polynomials, and systems.',
    items: [
      { name: 'Equation Solver', id: 'equation' },
      { name: 'Quadratic Equation', id: 'equation' },
      { name: 'Linear Equation', id: 'equation' },
      { name: 'Polynomial', id: 'equation' },
      { name: 'Factoring', id: 'equation' },
      { name: 'Functions', id: 'equation' }
    ]
  },
  {
    name: 'Statistics',
    emoji: '📊',
    desc: 'Determine standard deviations, statistical averages, mean, median, mode, and ranges.',
    items: [
      { name: 'Mean', id: 'average' },
      { name: 'Median', id: 'average' },
      { name: 'Mode', id: 'average' },
      { name: 'Variance', id: 'average' },
      { name: 'Standard Deviation', id: 'average' },
      { name: 'Probability', id: 'average' }
    ]
  },
  {
    name: 'Geometry',
    emoji: '📏',
    desc: 'Calculate area, perimeters, surface dimensions, volumes of spheres, cylinders, and triangles.',
    items: [
      { name: 'Area', id: 'unit_converter_area' },
      { name: 'Perimeter', id: 'unit_converter_length' },
      { name: 'Volume', id: 'unit_converter_volume' },
      { name: 'Circle', id: 'scientific' },
      { name: 'Triangle', id: 'scientific' },
      { name: 'Rectangle', id: 'scientific' },
      { name: 'Cylinder', id: 'scientific' },
      { name: 'Sphere', id: 'scientific' }
    ]
  },
  {
    name: 'Advanced Math',
    emoji: '🔢',
    desc: 'Work out logarithms, matrix transformations, complex numbers, factorials, and prime bases.',
    items: [
      { name: 'Scientific', id: 'scientific' },
      { name: 'Logarithm', id: 'scientific' },
      { name: 'Matrix', id: 'matrix' },
      { name: 'Complex Numbers', id: 'scientific' },
      { name: 'Prime Numbers', id: 'scientific' },
      { name: 'Factorial', id: 'scientific' }
    ]
  }
];

const MATH_GUIDES = [
  {
    title: 'Percentage Guide: Understanding Proportions',
    content: 'Percentages express numbers as fractions of 100. Calculating percentage increase/decrease is vital for tracking growth, discounts, interest rates, and proportional metrics in business and everyday mathematics.',
    calcId: 'percentage'
  },
  {
    title: 'Fraction Guide: Performing Operations',
    content: 'Fractions represent parts of a whole with a numerator and denominator. Multiplying, dividing, adding, and simplifying fractions require finding common denominators and reducing values to their lowest terms.',
    calcId: 'fraction'
  },
  {
    title: 'Algebra Guide: Mastering Variables and Equations',
    content: 'Algebra introduces variables as symbols to represent numbers in equations. Solving linear and quadratic equations involves isolating the unknown variable using inverse mathematical operations systematically.',
    calcId: 'equation'
  },
  {
    title: 'Geometry Guide: Calculating Area and Volume',
    content: 'Geometry measures dimensions, areas, and volumes of geometric shapes. Standard formulas like πr² for circle area or base × height for rectangles provide key spatial calculations for structural and physical modeling.',
    calcId: 'unit_converter_area'
  },
  {
    title: 'Statistics Guide: Descriptive Metrics & Standard Deviation',
    content: 'Statistics summarizes dataset characteristics using measures of central tendency (mean, median, mode) and dispersion (variance, standard deviation). These are fundamental for analyzing data distributions and probabilities.',
    calcId: 'average'
  }
];

const EDUCATION_SECTIONS = [
  {
    name: 'Grades',
    emoji: '📚',
    desc: 'Calculate GPA, cumulative performance, standard letter scales, and minimum grade thresholds.',
    items: [
      { name: 'GPA', id: 'gpa' },
      { name: 'CGPA', id: 'cgpa' },
      { name: 'Grade Calculator', id: 'grade' },
      { name: 'Semester GPA', id: 'gpa' },
      { name: 'Final Grade', id: 'grade' },
      { name: 'Percentage to GPA', id: 'cgpa' }
    ]
  },
  {
    name: 'Exams',
    emoji: '📝',
    desc: 'Check test scores, pass thresholds, grade weight contributions, and average markings.',
    items: [
      { name: 'Marks Percentage', id: 'marks' },
      { name: 'Pass Percentage', id: 'marks' },
      { name: 'Exam Score', id: 'grade' },
      { name: 'Weighted Grade', id: 'grade' },
      { name: 'Average Marks', id: 'average' }
    ]
  },
  {
    name: 'School',
    emoji: '🏫',
    desc: 'Track attendance status, required lectures, chronological age, and classroom metrics.',
    items: [
      { name: 'Attendance', id: 'attendance' },
      { name: 'Study Time', id: 'study_time' },
      { name: 'Age Calculator', id: 'age' },
      { name: 'Class Rank', id: 'gpa' },
      { name: 'Homework Time', id: 'study_time' }
    ]
  },
  {
    name: 'Learning',
    emoji: '📖',
    desc: 'Analyze words per minute, typing speeds, reading duration estimation, and age indices.',
    items: [
      { name: 'Reading Time', id: 'study_time' },
      { name: 'Typing Speed', id: 'study_time' },
      { name: 'Words Per Minute', id: 'study_time' },
      { name: 'Reading Age', id: 'study_time' },
      { name: 'Learning Hours', id: 'study_time' }
    ]
  }
];

const EDUCATION_GUIDES = [
  {
    title: 'GPA Guide: GPA Scales and Systems',
    content: 'Grade Point Average (GPA) translates course grades into a numerical value (typically on a 4.0 scale). Standard 4.0 scales weight an A as 4.0, B as 3.0, C as 2.0, D as 1.0, and F as 0.0, which are then averaged against credit hours.',
    calcId: 'gpa'
  },
  {
    title: 'CGPA Guide: Cumulative Conversion Techniques',
    content: 'Cumulative Grade Point Average (CGPA) aggregates all semester averages to represent overall academic achievement. To convert CGPA to percentage, a common multiplier like 9.5 is standard, or dividing by scale max and multiplying by 100.',
    calcId: 'cgpa'
  },
  {
    title: 'Attendance Guide: Class Benchmarks and Bunk Rules',
    content: 'Most institutions mandate a minimum 75% attendance. Our attendance tracking determines if you are above this threshold and computes the exact count of classes you can safely skip (bunk) or are required to attend next.',
    calcId: 'attendance'
  },
  {
    title: 'Study Tips: Spaced Repetition and Active Recall',
    content: 'Optimize retention by combining the Pomodoro technique (25 minutes study, 5 minutes break) with Active Recall (testing yourself instead of passive reading) and Spaced Repetition (reviewing concepts at expanding intervals).',
    calcId: 'study_time'
  },
  {
    title: 'Exam Preparation: Final Grade Planning',
    content: 'A strategic final grade calculator computes the exact grade you need on your final exam to maintain your desired grade. The formula accounts for existing coursework weights and desired course thresholds.',
    calcId: 'grade'
  }
];

const CONVERSION_SECTIONS = [
  {
    name: 'Length',
    emoji: '📏',
    desc: 'Convert length and distance units.',
    items: [
      { name: 'Meter', id: 'unit_converter_length' },
      { name: 'Kilometer', id: 'unit_converter_length' },
      { name: 'Mile', id: 'unit_converter_length' },
      { name: 'Inch', id: 'unit_converter_length' },
      { name: 'Foot', id: 'unit_converter_length' },
      { name: 'Yard', id: 'unit_converter_length' },
    ]
  },
  {
    name: 'Weight',
    emoji: '⚖️',
    desc: 'Convert mass and weight units.',
    items: [
      { name: 'Kilogram', id: 'unit_converter_weight' },
      { name: 'Gram', id: 'unit_converter_weight' },
      { name: 'Pound', id: 'unit_converter_weight' },
      { name: 'Ounce', id: 'unit_converter_weight' },
      { name: 'Ton', id: 'unit_converter_weight' },
    ]
  },
  {
    name: 'Temperature',
    emoji: '🌡',
    desc: 'Convert between heat scales.',
    items: [
      { name: 'Celsius', id: 'unit_converter_temp' },
      { name: 'Fahrenheit', id: 'unit_converter_temp' },
      { name: 'Kelvin', id: 'unit_converter_temp' },
    ]
  },
  {
    name: 'Volume',
    emoji: '📦',
    desc: 'Convert capacity and liquid volume units.',
    items: [
      { name: 'Liter', id: 'unit_converter_volume' },
      { name: 'Milliliter', id: 'unit_converter_volume' },
      { name: 'Gallon', id: 'unit_converter_volume' },
      { name: 'Cup', id: 'unit_converter_volume' },
      { name: 'Pint', id: 'unit_converter_volume' },
    ]
  },
  {
    name: 'Area',
    emoji: '📐',
    desc: 'Convert surface and land measurements.',
    items: [
      { name: 'Square Meter', id: 'unit_converter_area' },
      { name: 'Square Foot', id: 'unit_converter_area' },
      { name: 'Acre', id: 'unit_converter_area' },
      { name: 'Hectare', id: 'unit_converter_area' },
    ]
  },
  {
    name: 'Speed',
    emoji: '🚗',
    desc: 'Convert velocities and speeds.',
    items: [
      { name: 'KM/H', id: 'unit_converter_speed' },
      { name: 'MPH', id: 'unit_converter_speed' },
      { name: 'Meter/Second', id: 'unit_converter_speed' },
      { name: 'Knots', id: 'unit_converter_speed' },
    ]
  },
  {
    name: 'Time',
    emoji: '⏰',
    desc: 'Convert chronological and duration intervals.',
    items: [
      { name: 'Seconds', id: 'unit_converter_time' },
      { name: 'Minutes', id: 'unit_converter_time' },
      { name: 'Hours', id: 'unit_converter_time' },
      { name: 'Days', id: 'unit_converter_time' },
      { name: 'Weeks', id: 'unit_converter_time' },
      { name: 'Months', id: 'unit_converter_time' },
      { name: 'Years', id: 'unit_converter_time' },
    ]
  },
  {
    name: 'Currency',
    emoji: '💱',
    desc: 'Convert global currencies, exchange rates, and crypto.',
    items: [
      { name: 'Currency Converter', id: 'currency' },
      { name: 'Exchange Rate', id: 'currency' },
      { name: 'Crypto Converter', id: 'currency' },
    ]
  }
];

const CONVERSION_GUIDES = [
  {
    title: 'Length Guide: Imperial vs. Metric System',
    content: 'The metric system uses base 10 (meter, kilometer, millimeter) for logical scalability. The imperial system uses historic benchmarks like inches (based on thumb width), feet, and miles. 1 inch is exactly 2.54 centimeters.',
    calcId: 'unit_converter_length'
  },
  {
    title: 'Weight Guide: Understanding Mass, Weight, and Grams',
    content: 'Mass is the constant quantity of matter in an object, while weight is the force exerted on it by gravity. On Earth, we use them interchangeably. 1 kilogram equals approximately 2.20462 pounds.',
    calcId: 'unit_converter_weight'
  },
  {
    title: 'Temperature Guide: Formulas for Thermal Conversion',
    content: 'Converting Celsius to Fahrenheit uses the formula: (C * 9/5) + 32. Kelvin is the thermodynamic absolute temperature scale where absolute zero is 0 Kelvin (-273.15 Celsius). K = C + 273.15.',
    calcId: 'unit_converter_temp'
  },
  {
    title: 'Area Guide: Land Measurement and Surface Conversions',
    content: 'An acre is a historic unit of land area equal to 43,560 square feet. A hectare is a metric unit equal to 10,000 square meters. 1 hectare is approximately 2.47105 acres.',
    calcId: 'unit_converter_area'
  },
  {
    title: 'Currency Guide: Exchange Rates and Spread Margin',
    content: 'Global exchange rates fluctuate based on market supply and demand. When converting currency, look out for the spread: the difference between buy and sell prices, which banks use as a built-in fee.',
    calcId: 'currency'
  }
];

const UTILITY_SECTIONS = [
  {
    name: 'Date & Time',
    emoji: '📅',
    desc: 'Calculate ages, days between, times, and dates.',
    items: [
      { name: 'Age Calculator', id: 'age' },
      { name: 'Date Difference', id: 'days_between' },
      { name: 'Days Between', id: 'days_between' },
      { name: 'Week Calculator', id: 'days_between' },
      { name: 'Time Calculator', id: 'days_between' },
      { name: 'Time Zone', id: 'days_between' },
    ]
  },
  {
    name: 'Shopping',
    emoji: '💰',
    desc: 'Solve discount, sales tax, tip, and margin problems.',
    items: [
      { name: 'Discount Calculator', id: 'discount' },
      { name: 'Sales Tax', id: 'discount' },
      { name: 'Tip Calculator', id: 'tip' },
      { name: 'Price Comparison', id: 'discount' },
      { name: 'Profit Margin', id: 'percentage' },
    ]
  },
  {
    name: 'Security',
    emoji: '🔐',
    desc: 'Generate passwords and check credentials security.',
    items: [
      { name: 'Password Generator', id: 'password' },
      { name: 'Password Strength', id: 'password' },
      { name: 'Random Password', id: 'password' },
      { name: 'PIN Generator', id: 'password' },
    ]
  },
  {
    name: 'Random Tools',
    emoji: '🎲',
    desc: 'Generate random numbers, names, colors, flips, and rolls.',
    items: [
      { name: 'Random Number', id: 'password' },
      { name: 'Random Name', id: 'password' },
      { name: 'Random Letter', id: 'password' },
      { name: 'Random Color', id: 'password' },
      { name: 'Coin Flip', id: 'password' },
      { name: 'Dice Roller', id: 'password' },
    ]
  },
  {
    name: 'Productivity',
    emoji: '📝',
    desc: 'Manage timers, work hours, stopwatches, and duration counts.',
    items: [
      { name: 'Time Duration', id: 'days_between' },
      { name: 'Countdown', id: 'days_between' },
      { name: 'Stopwatch', id: 'days_between' },
      { name: 'Work Hours', id: 'days_between' },
      { name: 'Pomodoro Timer', id: 'study_time' },
    ]
  }
];

const UTILITY_GUIDES = [
  {
    title: 'Age Calculator Guide: Biological Chronology & Time Passed',
    content: 'Our precise age tracker translates birth dates into exact years, months, and days of life. It also shows total hours, minutes, and upcoming birthday countdowns.',
    calcId: 'age'
  },
  {
    title: 'Date Difference Guide: Managing Timelines & Calendar Days',
    content: 'Determining exact days between two key dates is essential for project timelines, lease agreements, and event planning. Standard calculations exclude or include the end date optionally.',
    calcId: 'days_between'
  },
  {
    title: 'Discount Guide: Retail Math, Sale Deductions, and Tip Shares',
    content: 'Retailers list percentages off (e.g. 30% off). To compute the final cost, multiply the original price by (1 - discount rate). Add sales tax to get the absolute cart total.',
    calcId: 'discount'
  },
  {
    title: 'Password Security Guide: Entropy and Safe Credentials Creation',
    content: 'High-entropy passwords protect digital identity. A secure password contains upper, lower, numeric, and symbolic characters, and spans at least 12-16 characters. Avoid repeating dictionaries or names.',
    calcId: 'password'
  },
  {
    title: 'Time Management Guide: Strategic Productivity with Timers',
    content: 'Structuring daily workloads using Pomodoro block sequences (25/5 study/break intervals) minimizes executive fatigue. Tracking work hours keeps your schedule optimized.',
    calcId: 'study_time'
  }
];

function ExpandableGuide({ index, title, content, calcId, onSelect }: { index: number; title: string; content: string; calcId?: string; onSelect: (id: string) => void; key?: any }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-zinc-850/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-zinc-800/20 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-zinc-200 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <span className="text-mint font-bold">#{index}</span> {title}
        </span>
        <span className="text-slate-400 text-sm select-none">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-500 leading-relaxed space-y-3">
          <p>{content}</p>
          {calcId && (
            <button
              onClick={() => onSelect(calcId)}
              className="text-xs font-bold text-mint hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Open Associated Calculator →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ExpandableFAQ({ question, answer }: { question: string; answer: string; key?: any }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-slate-150 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 shadow-2xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-zinc-800/20 flex items-center justify-between text-xs font-extrabold text-slate-800 dark:text-zinc-200 transition-colors cursor-pointer"
      >
        <span>{question}</span>
        <span className="text-slate-400 text-sm select-none">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-slate-50 dark:bg-zinc-900/40 border-t border-slate-150 dark:border-zinc-800 text-xs text-slate-500 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

interface MainDirectoryProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeTab: CategoryId;
  setActiveTab: (tab: CategoryId) => void;
  onSelectCalculator: (id: string) => void;
}

export default function MainDirectory({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onSelectCalculator
}: MainDirectoryProps) {
  // Filter calculators based on search and active category tab
  const filteredCalculators = useMemo(() => {
    let result = CALCULATORS;

    // Active Category Tab filter - always apply if not on Home tab
    if (activeTab !== 'home') {
      result = result.filter((c) => c.category === activeTab);
    }

    // Search Query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      let filtered = result.filter((c) => {
        const name = c.name.toLowerCase();
        const desc = c.description.toLowerCase();
        const matchesName = name.includes(q);
        const matchesDesc = desc.includes(q);
        const matchesTag = c.tags.some((t) => t.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesTag;
      });

      // Sort by search query match relevance (e.g. starts-with has higher priority)
      filtered = [...filtered].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        const getScore = (name: string, calc: typeof a) => {
          // Exact match is highest priority
          if (name === q) return 0;
          
          // Starts with the search query
          if (name.startsWith(q)) return 1;
          
          // Any word in the name starts with the search query
          const words = name.split(/[\s_]+/);
          if (words.some((w) => w.startsWith(q))) return 2;
          
          // Name contains the search query
          if (name.includes(q)) return 3;
          
          // Tag matches exactly or starts with
          const tags = calc.tags.map((t) => t.toLowerCase());
          if (tags.some((t) => t === q || t.startsWith(q))) return 4;
          
          // Tag contains query
          if (tags.some((t) => t.includes(q))) return 5;
          
          // Description contains query
          if (calc.description.toLowerCase().includes(q)) return 6;
          
          return 7;
        };

        const scoreA = getScore(nameA, a);
        const scoreB = getScore(nameB, b);

        if (scoreA !== scoreB) {
          return scoreA - scoreB;
        }

        // Secondary sort: Alphabetical order
        return nameA.localeCompare(nameB);
      });

      result = filtered;
    }

    return result;
  }, [searchQuery, activeTab]);

  // Group popular calculators by category for homepage layout
  const calculatorsByCategory = useMemo(() => {
    const groups: Record<string, CalculatorInfo[]> = {};
    CALCULATORS.forEach((c) => {
      if (!groups[c.category]) {
        groups[c.category] = [];
      }
      // If we are on Home tab, show only the popular/prominent ones in the categories overview
      if (c.popular || groups[c.category].length < 4) {
        groups[c.category].push(c);
      }
    });
    return groups;
  }, []);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* 1. HERO SECTION */}
      <div className="text-center py-12 px-6 bg-gradient-to-b from-white to-slate-100/60 dark:from-slate-dark/40 dark:to-slate-dark/10 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-mint/10 border border-mint/20 text-mint rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> 500+ Accurate Online Calculators for Every Need
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
          The World's Calculator Hub
        </h1>
        <p className="text-[#64748b] dark:text-zinc-400 max-w-xl mx-auto text-sm md:text-base font-normal">
          Immediate, exact results configured for Finance, Health, Math, and Everyday Tasks.
        </p>

        {/* Main Search Input */}
        <div className="max-w-2xl mx-auto pt-2 relative">
          <div className="relative rounded-xl shadow-xs">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-zinc-500 text-lg">
              🔍
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What would you like to calculate today?"
              className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 py-4 pl-12 pr-32 text-sm focus:border-mint focus:ring-1 focus:ring-mint placeholder-slate-400 dark:placeholder-zinc-600 outline-hidden font-medium"
            />
            <div className="absolute inset-y-2 right-2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-lg transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                className="h-full bg-mint hover:bg-mint/90 dark:bg-mint dark:hover:bg-mint/90 text-white font-semibold px-4 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hot Tag Container */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-2 text-xs">
          <span className="font-semibold text-slate-400 dark:text-zinc-500">Hot:</span>
          {POPULAR_SEARCHES.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearchQuery(tag);
                setActiveTab('home'); // reset tab so it searches globally
              }}
              className="px-3 py-1 bg-white dark:bg-zinc-900 hover:text-mint dark:hover:text-mint border border-zinc-200 dark:border-zinc-800 rounded-full font-medium text-slate-600 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 2. DYNAMIC SEARCH RESULTS VS CATEGORIZED HOME OVERVIEW */}
      {searchQuery.trim() ? (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            🔍 Search Results ({filteredCalculators.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCalculator(c.id)}
                className="text-left p-5 bg-white dark:bg-zinc-900 hover:border-mint border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs transition-all group cursor-pointer flex flex-col h-full"
              >
                <div className="flex justify-between items-start w-full">
                  <span className="text-[10px] font-bold text-mint uppercase tracking-widest">{c.category}</span>
                  {c.trending && (
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded-sm bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100">
                      Trending
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-mint dark:group-hover:text-mint group-hover:underline">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {c.description}
                </p>
              </button>
            ))}
          </div>
          {filteredCalculators.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <p className="text-slate-500 font-medium">No custom calculators matched "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-mint hover:bg-mint/90 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      ) : activeTab === 'home' ? (
        /* Home Categorized Overview and Widgets Dashboard */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Area: Categorized Bento Boxes */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.filter(cat => cat.id !== 'home').map((cat) => {
              const items = calculatorsByCategory[cat.id] || [];
              return (
                <div key={cat.id} className="card bg-white dark:bg-zinc-900 border border-[#e2e8f0] dark:border-zinc-800 rounded-2xl p-5 flex flex-col h-full shadow-xs">
                  <div className="card-title font-bold text-base text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-lg">
                      {cat.id === 'finance' && '💰'}
                      {cat.id === 'health' && '❤️'}
                      {cat.id === 'math' && '🧮'}
                      {cat.id === 'education' && '🎓'}
                      {cat.id === 'conversion' && '🔄'}
                      {cat.id === 'utility' && '⚙️'}
                    </span>
                    {cat.name}
                  </div>

                  <ul className="calc-list space-y-2 text-slate-600 dark:text-zinc-300 font-medium">
                    {items.map((c) => (
                      <li
                        key={c.id}
                        onClick={() => onSelectCalculator(c.id)}
                        className="flex items-center gap-1.5 hover:text-mint dark:hover:text-mint hover:underline cursor-pointer transition-colors text-xs"
                      >
                        <span className="text-slate-400 select-none">•</span> {c.name}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setActiveTab(cat.id as CategoryId)}
                    className="view-all text-xs font-bold text-mint dark:text-mint mt-auto pt-6 text-left hover:underline cursor-pointer"
                  >
                    View All {cat.name} →
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Area: Trending & Educational Guides Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Trending Section */}
            <div className="sidebar-section bg-white dark:bg-zinc-900 border border-[#e2e8f0] dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
              <div className="sidebar-title font-bold text-base text-[#0f172a] dark:text-white pb-3 border-b border-slate-100 dark:border-zinc-800 mb-4">
                Trending Now
              </div>
              <div className="space-y-4">
                {CALCULATORS.filter((c) => c.trending).slice(0, 7).map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCalculator(c.id)}
                    className="w-full text-left flex items-center text-xs text-slate-700 dark:text-zinc-300 hover:text-mint dark:hover:text-mint transition-colors group cursor-pointer"
                  >
                    <span className="w-8 text-mint dark:text-mint font-bold text-sm shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-semibold group-hover:underline">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Guides Section */}
            <div className="sidebar-section bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
              <div className="sidebar-title font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-zinc-150 dark:border-zinc-800 mb-4">
                Helpful Guides
              </div>
              <div className="space-y-3 flex flex-col">
                {POPULAR_GUIDES.map((g, idx) => (
                  <button
                    key={idx}
                    onClick={() => g.calculatorId && onSelectCalculator(g.calculatorId)}
                    className="text-left text-xs font-semibold text-mint hover:underline cursor-pointer transition-colors"
                  >
                    {g.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'finance' ? (
        /* Majestic Finance Suite Page */
        <div className="space-y-12 animate-fade-in">
          {/* Finance Hero Banner */}
          <div className="p-8 bg-gradient-to-br from-[#2d4042] via-[#223133] to-[#141f20] text-white rounded-3xl border border-zinc-800 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(62,189,147,0.15),transparent_45%)]" />
            <div className="space-y-3 relative z-10">
              <span className="px-3 py-1 bg-mint/10 border border-mint/30 text-mint rounded-full text-xs font-bold tracking-wider uppercase">
                💰 Comprehensive Finance Suite
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                100+ Free Finance Calculators
              </h2>
              <p className="text-slate-300 max-w-xl text-sm leading-relaxed font-normal">
                Estimate your Loans, Mortgages, Wealth Growth, Taxes, and Salary Earnings with certified, bank-grade precision.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-800 relative z-10 text-xs">
              <div>
                <span className="text-slate-400 block">Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 mt-1">
                  ● Fully Operational
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Precision Standard</span>
                <span className="text-white font-bold block mt-1">Double-Precision Float</span>
              </div>
              <div>
                <span className="text-slate-400 block">Execution Mode</span>
                <span className="text-white font-bold block mt-1">Offline-First (In-Browser)</span>
              </div>
              <div>
                <span className="text-slate-400 block">Ad-Supported?</span>
                <span className="text-mint font-bold block mt-1">100% Free & Ad-Free</span>
              </div>
            </div>
          </div>

          {/* ⭐ Featured Finance Calculators Row */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ⭐ Featured Calculators
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {[
                { id: 'emi', name: 'EMI Calculator', desc: 'Equal Monthly Instalments' },
                { id: 'mortgage', name: 'Mortgage Calculator', desc: 'PITI Home Buying Loan' },
                { id: 'loan', name: 'Loan Calculator', desc: 'Amortization Estimator' },
                { id: 'sip', name: 'SIP Calculator', desc: 'Mutual Fund Compounding' },
                { id: 'swp', name: 'SWP Calculator', desc: 'Systematic Withdrawal Plan' },
                { id: 'investment', name: 'Investment Growth', desc: 'Project Wealth Growth' },
                { id: 'gst', name: 'GST Calculator', desc: 'Goods & Services Tax' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCalculator(c.id)}
                  className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-mint rounded-2xl text-left shadow-xs transition-all hover:-translate-y-0.5 group cursor-pointer"
                >
                  <span className="text-xs font-bold text-mint block truncate group-hover:underline">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 leading-normal">
                    {c.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Grid Sections */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-zinc-800">
              Browse by Subcategory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FINANCE_SECTIONS.map((sec) => (
                <div key={sec.name} className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center justify-between">
                      {sec.name}
                      <span className="text-xs text-mint font-semibold bg-mint/10 px-2 py-0.5 rounded-full">
                        {sec.ids.length} tools
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {sec.ids.map((id) => {
                        const info = CALCULATORS.find((calc) => calc.id === id);
                        return (
                          <button
                            key={id}
                            onClick={() => onSelectCalculator(id)}
                            className="px-2.5 py-1 bg-slate-50 dark:bg-zinc-800/50 hover:bg-mint/10 hover:text-mint dark:hover:bg-mint/10 dark:hover:text-mint text-[11px] font-semibold text-slate-600 dark:text-zinc-300 rounded-md border border-slate-200/60 dark:border-zinc-800 transition-colors cursor-pointer"
                          >
                            {info ? info.name.replace(' Calculator', '') : id.replace('_', ' ')}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 Most Popular & 📖 Finance Guides Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Most Popular */}
            <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                🔥 Most Popular
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                The most frequently consulted wealth & math tools by our users.
              </p>
              <div className="space-y-2 pt-2">
                {[
                  { id: 'emi', name: 'EMI Calculator' },
                  { id: 'tax', name: 'Income Tax Calculator (AY 2025-26)' },
                  { id: 'sip', name: 'SIP Calculator' },
                  { id: 'swp', name: 'SWP Calculator' },
                  { id: 'gst', name: 'GST Calculator' },
                  { id: 'investment', name: 'Investment Growth' },
                  { id: 'loan', name: 'Loan Calculator' },
                  { id: 'take_home_pay', name: 'Take Home Pay Calculator' },
                  { id: 'salary', name: 'Salary Calculator' },
                  { id: 'simple_interest', name: 'Simple Interest Calculator' },
                  { id: 'profit_margin', name: 'Profit Margin Calculator' }
                ].map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCalculator(c.id)}
                    className="w-full p-2.5 hover:bg-slate-50 dark:hover:bg-zinc-800/40 rounded-xl flex items-center text-xs font-semibold text-slate-700 dark:text-zinc-300 transition-all hover:translate-x-1 group text-left cursor-pointer"
                  >
                    <span className="w-6 font-bold text-mint text-xs shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="group-hover:underline group-hover:text-mint dark:group-hover:text-mint">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Finance Guides */}
            <div className="lg:col-span-7 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                📖 Finance Guides
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Educational outlines on calculations, interest dynamics, and taxes. Click to expand.
              </p>
              <div className="space-y-3 pt-2">
                {FINANCE_GUIDES.map((g, idx) => (
                  <ExpandableGuide key={idx} index={idx + 1} title={g.title} content={g.content} calcId={g.calcId} onSelect={onSelectCalculator} />
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Why Choose & Frequently Asked Questions FAQ Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-slate-150 dark:border-zinc-800">
            {/* Why Use */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                ★★★★★ Why Use Our Finance Calculators?
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Engineered from the ground up for strict absolute correctness and high-utility calculation runs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { title: '100% Free', desc: 'No locked capabilities or trial run boundaries.' },
                  { title: 'Multi-Currency', desc: 'Supports dollars, euros, pounds, yen, and custom currency signs.' },
                  { title: 'Step-by-step Formulas', desc: 'Transparent equations showing how each calculation compiles.' },
                  { title: 'Privacy Focused', desc: 'Calculations run entirely in-browser. Zero servers log your assets.' },
                  { title: 'Mobile Responsive', desc: 'Meticulously crafted fluid designs tailored for thumb-tapping.' },
                  { title: 'Custom PDF Schedules', desc: 'Perfect print layouts showing amortization payment grids.' },
                  { title: 'Zero Advertising', desc: 'Clean, distraction-free environment without ad banners.' },
                  { title: 'Bank-Grade Math', desc: 'Conforming to IRS, SEC, and international bank standards.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-zinc-800/40 border border-slate-150 dark:border-zinc-800 rounded-xl space-y-1">
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <span className="text-mint text-[10px]">✔</span> {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-normal font-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Common questions regarding the formulas and performance.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  {
                    q: 'How accurate are these calculators?',
                    a: 'Our calculators are calibrated with double-precision arithmetic conforming to IRS, SEC, and international bank-standard accounting specifications.'
                  },
                  {
                    q: 'Is my financial data secure?',
                    a: 'Absolutely. This application operates entirely offline-first in your browser. None of your inputs, net income, or loan values are ever transmitted to external servers.'
                  },
                  {
                    q: 'Can I generate repayment schedules?',
                    a: 'Yes! Our mortgage and EMI calculators compile fully customizable month-by-month payment schedules with principal vs. interest amortization.'
                  },
                  {
                    q: 'Do you support different currencies?',
                    a: 'Yes, all currency input and output fields support multi-currency formats with customizable local symbols.'
                  }
                ].map((item, idx) => (
                  <ExpandableFAQ key={idx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          </div>

          {/* Related Categories Navigation Links */}
          <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl space-y-4 shadow-2xs">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Related Categories
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'health', name: '❤️ Health Suite' },
                { id: 'math', name: '🧮 Math Suite' },
                { id: 'education', name: '🎓 Education Suite' },
                { id: 'conversion', name: '🔄 Conversion Suite' },
                { id: 'utility', name: '⚙️ Utility Suite' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as CategoryId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 hover:border-mint text-xs font-semibold text-slate-700 dark:text-zinc-200 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-2xs transition-all cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'health' ? (
        /* Majestic Health Suite Page */
        <div className="space-y-12 animate-fade-in">
          {/* Health Hero Banner */}
          <div className="p-8 bg-gradient-to-br from-[#3b1219] via-[#250b10] to-[#120508] text-white rounded-3xl border border-zinc-800 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.15),transparent_45%)]" />
            <div className="space-y-3 relative z-10 text-center md:text-left">
              <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full text-xs font-bold tracking-wider uppercase inline-block">
                ❤️ Health & Fitness Suite
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                150+ Free Health & Fitness Calculators
              </h2>
              <p className="text-slate-300 max-w-xl text-sm leading-relaxed font-normal">
                Healthy • Accurate • Easy to Use. Track BMI, daily calories, metabolism BMR, and physical activity with certified scientific precision.
              </p>
            </div>

            {/* Quick Search Health Calculator */}
            <div className="max-w-xl pt-2 relative z-10">
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-zinc-500 text-sm">
                  🔍
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Health Calculator..."
                  className="block w-full rounded-xl border border-zinc-700 bg-zinc-900/60 text-white py-3 pl-11 pr-4 text-sm focus:border-rose-500 focus:ring-1 focus:ring-rose-500 placeholder-zinc-500 outline-hidden font-medium"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-3 text-xs items-center">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  { label: 'BMI', id: 'bmi' },
                  { label: 'Calories', id: 'calories' },
                  { label: 'BMR', id: 'bmr' },
                  { label: 'TDEE', id: 'tdee' },
                  { label: 'Body Fat', id: 'body_fat' },
                  { label: 'Water Intake', id: 'water' },
                  { label: 'Pregnancy', id: 'pregnancy' },
                  { label: 'Heart Rate', id: 'heart_rate' }
                ].map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => onSelectCalculator(tag.id)}
                    className="hover:text-rose-400 transition-colors cursor-pointer text-slate-300 font-medium hover:underline"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ⭐ Featured Health Calculators */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ⭐ Featured
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { id: 'bmi', name: 'BMI Calculator', desc: 'Body Mass Index' },
                { id: 'calories', name: 'Calories Calculator', desc: 'Daily energy intake' },
                { id: 'bmr', name: 'BMR Calculator', desc: 'Metabolic rate at rest' },
                { id: 'tdee', name: 'TDEE Calculator', desc: 'Total energy expenditure' },
                { id: 'ideal_weight', name: 'Ideal Weight', desc: 'Healthy target weight' },
                { id: 'body_fat', name: 'Body Fat Calculator', desc: 'Military composition' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCalculator(c.id)}
                  className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-rose-500 dark:hover:border-rose-500 rounded-2xl text-left shadow-xs transition-all hover:-translate-y-0.5 group cursor-pointer"
                >
                  <span className="text-xs font-bold text-rose-500 block truncate group-hover:underline">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 leading-normal">
                    {c.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Grid Sections */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-zinc-800">
              Browse by Subcategory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HEALTH_SECTIONS.map((sec) => (
                <div key={sec.name} className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="text-lg">{sec.emoji}</span>
                      {sec.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {sec.items.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => onSelectCalculator(item.id)}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-zinc-800/50 hover:bg-rose-500/10 hover:text-rose-500 dark:hover:bg-rose-500/10 dark:hover:text-rose-500 text-[11px] font-semibold text-slate-600 dark:text-zinc-300 rounded-md border border-slate-200/60 dark:border-zinc-800 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/40">
                    <button
                      onClick={() => onSelectCalculator(sec.items[0].id)}
                      className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs and Guides Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* FAQs */}
            <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Common questions regarding our scientific health metrics and formulas.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  {
                    q: 'How are these health calculations modeled?',
                    a: 'All metrics are computed in-browser using standard scientific biological equations, including the Mifflin-St Jeor formula for BMR, Fox cardiovascular target equation for Max HR, and US Navy circumference rules for body composition.'
                  },
                  {
                    q: 'Are these health estimators private?',
                    a: 'Absolutely. Consistent with CalcHub standards, none of your height, weight, age, or medical details are ever sent to servers. The code executes 100% locally in your client environment.'
                  },
                  {
                    q: 'Can I use these calculators for medical diagnosis?',
                    a: 'No. These calculators provide general educational and tracking approximations. They do not replace professional clinical evaluation, medical therapy, or customized dietary plans.'
                  },
                  {
                    q: 'What is the difference between BMR and TDEE?',
                    a: 'Your BMR (Basal Metabolic Rate) is the absolute number of calories your body burns simply staying alive at complete rest. TDEE (Total Daily Energy Expenditure) adds your physical activity multiplier to show actual total daily burn.'
                  }
                ].map((item, idx) => (
                  <ExpandableFAQ key={idx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>

            {/* Expandable Guides */}
            <div className="lg:col-span-7 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                📖 Health Guides
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Educational overviews on metabolism, diet plans, and weight classifications. Click to expand.
              </p>
              <div className="space-y-3 pt-2">
                {HEALTH_GUIDES.map((g, idx) => (
                  <ExpandableGuide key={idx} index={idx + 1} title={g.title} content={g.content} calcId={g.calcId} onSelect={onSelectCalculator} />
                ))}
              </div>
            </div>
          </div>

          {/* Related Categories Navigation Links */}
          <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl space-y-4 shadow-2xs">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Related Categories
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'finance', name: '💰 Finance Suite' },
                { id: 'math', name: '🧮 Math Suite' },
                { id: 'education', name: '🎓 Education Suite' },
                { id: 'conversion', name: '🔄 Conversion Suite' },
                { id: 'utility', name: '⚙️ Utility Suite' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as CategoryId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 hover:border-mint text-xs font-semibold text-slate-700 dark:text-zinc-200 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-2xs transition-all cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'math' ? (
        /* Majestic Math Suite Page */
        <div className="space-y-12 animate-fade-in">
          {/* Math Hero Banner */}
          <div className="p-8 bg-gradient-to-br from-[#101b2e] via-[#09101d] to-[#04060b] text-white rounded-3xl border border-zinc-800 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_45%)]" />
            <div className="space-y-3 relative z-10 text-center md:text-left">
              <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-full text-xs font-bold tracking-wider uppercase inline-block">
                🧮 Math Suite
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                200+ Free Math Calculators
              </h2>
              <p className="text-slate-300 max-w-xl text-sm leading-relaxed font-normal">
                Fast • Accurate • Educational. Solve percentage metrics, algebraic equations, statistics, geometry, and matrix transformations with extreme precision.
              </p>
            </div>

            {/* Quick Search Math Calculator */}
            <div className="max-w-xl pt-2 relative z-10">
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-zinc-500 text-sm">
                  🔍
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Math Calculator..."
                  className="block w-full rounded-xl border border-zinc-700 bg-zinc-900/60 text-white py-3 pl-11 pr-4 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder-zinc-500 outline-hidden font-medium"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-3 text-xs items-center">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  { label: 'Percentage', id: 'percentage' },
                  { label: 'Fraction', id: 'fraction' },
                  { label: 'Algebra', id: 'equation' },
                  { label: 'Matrix', id: 'matrix' },
                  { label: 'Scientific', id: 'scientific' },
                  { label: 'Average', id: 'average' }
                ].map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => onSelectCalculator(tag.id)}
                    className="hover:text-sky-400 transition-colors cursor-pointer text-slate-300 font-medium hover:underline font-mono"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ⭐ Featured Math Calculators */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ⭐ Featured
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { id: 'percentage', name: 'Percentage', desc: 'Values & differences' },
                { id: 'scientific', name: 'Scientific', desc: 'Arithmetic & trig functions' },
                { id: 'fraction', name: 'Fraction', desc: 'Operations & simplifying' },
                { id: 'average', name: 'Average', desc: 'Mean, median & deviation' },
                { id: 'ratio', name: 'Ratio', desc: 'Proportions & scaling' },
                { id: 'equation', name: 'Equation', desc: 'Algebraic solver' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCalculator(c.id)}
                  className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-sky-500 dark:hover:border-sky-500 rounded-2xl text-left shadow-xs transition-all hover:-translate-y-0.5 group cursor-pointer"
                >
                  <span className="text-xs font-bold text-sky-500 block truncate group-hover:underline">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 leading-normal">
                    {c.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Grid Sections */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-zinc-800">
              Browse by Subcategory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MATH_SECTIONS.map((sec) => (
                <div key={sec.name} className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="text-lg">{sec.emoji}</span>
                      {sec.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {sec.items.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => onSelectCalculator(item.id)}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-zinc-800/50 hover:bg-sky-500/10 hover:text-sky-500 dark:hover:bg-sky-500/10 dark:hover:text-sky-500 text-[11px] font-semibold text-slate-600 dark:text-zinc-300 rounded-md border border-slate-200/60 dark:border-zinc-800 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/40">
                    <button
                      onClick={() => onSelectCalculator(sec.items[0].id)}
                      className="text-xs font-bold text-sky-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs and Guides Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* FAQs */}
            <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Common questions regarding formulas, logic, and computational methods.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  {
                    q: 'Are these calculators accurate for school homework?',
                    a: 'Yes! Our calculation engines employ double-precision floating-point arithmetic compliant with standard curriculum guidelines. Step-by-step breakdowns are available for algebra solvers.'
                  },
                  {
                    q: 'How does the Scientific Calculator compute trigonometry?',
                    a: 'It utilizes browser-optimized implementations of Taylor series and CORDIC algorithms to compute sine, cosine, tangent, logarithms, and exponential power functions instantly.'
                  },
                  {
                    q: 'Can I export the steps or print my calculations?',
                    a: 'Absolutely. Click the \'Print\' or \'Share Tool\' button on any active calculator to print out full worksheets or export customized shareable links.'
                  },
                  {
                    q: 'Is my math calculation history saved?',
                    a: 'Your calculation histories are stored entirely in your local browser cache (localStorage) for complete privacy. No data is sent to external servers.'
                  }
                ].map((item, idx) => (
                  <ExpandableFAQ key={idx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>

            {/* Expandable Guides */}
            <div className="lg:col-span-7 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                📖 Math Guides
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Educational overviews on fractions, percent formulas, and algebra equations. Click to expand.
              </p>
              <div className="space-y-3 pt-2">
                {MATH_GUIDES.map((g, idx) => (
                  <ExpandableGuide key={idx} index={idx + 1} title={g.title} content={g.content} calcId={g.calcId} onSelect={onSelectCalculator} />
                ))}
              </div>
            </div>
          </div>

          {/* Related Categories Navigation Links */}
          <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl space-y-4 shadow-2xs">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Related Categories
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'finance', name: '💰 Finance Suite' },
                { id: 'health', name: '❤️ Health Suite' },
                { id: 'education', name: '🎓 Education Suite' },
                { id: 'conversion', name: '🔄 Conversion Suite' },
                { id: 'utility', name: '⚙️ Utility Suite' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as CategoryId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 hover:border-mint text-xs font-semibold text-slate-700 dark:text-zinc-200 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-2xs transition-all cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'education' ? (
        /* Majestic Education Suite Page */
        <div className="space-y-12 animate-fade-in">
          {/* Education Hero Banner */}
          <div className="p-8 bg-gradient-to-br from-[#2d1a04] via-[#140b02] to-[#050300] text-white rounded-3xl border border-zinc-800 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_45%)]" />
            <div className="space-y-3 relative z-10 text-center md:text-left">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold tracking-wider uppercase inline-block">
                🎓 Education Suite
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                80+ Academic Calculators
              </h2>
              <p className="text-slate-300 max-w-xl text-sm leading-relaxed font-normal">
                Students • Teachers • Schools. Calculate GPA/CGPA scores, track lecture attendance, solve grade requirements, and optimize studying routines.
              </p>
            </div>

            {/* Quick Search Education Calculator */}
            <div className="max-w-xl pt-2 relative z-10">
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-zinc-500 text-sm">
                  🔍
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Education Calculator..."
                  className="block w-full rounded-xl border border-zinc-700 bg-zinc-900/60 text-white py-3 pl-11 pr-4 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-zinc-500 outline-hidden font-medium"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-3 text-xs items-center">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  { label: 'GPA', id: 'gpa' },
                  { label: 'CGPA', id: 'cgpa' },
                  { label: 'Grade', id: 'grade' },
                  { label: 'Attendance', id: 'attendance' },
                  { label: 'Marks', id: 'marks' },
                  { label: 'Age', id: 'age' }
                ].map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => onSelectCalculator(tag.id)}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-slate-300 font-medium hover:underline font-mono"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ⭐ Featured Education Calculators */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ⭐ Featured
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { id: 'gpa', name: 'GPA', desc: 'Semester average' },
                { id: 'cgpa', name: 'CGPA', desc: 'Cumulative average' },
                { id: 'attendance', name: 'Attendance', desc: 'Required class levels' },
                { id: 'marks', name: 'Marks', desc: 'Score & percentage' },
                { id: 'grade', name: 'Grade', desc: 'Final exam targets' },
                { id: 'study_time', name: 'Study Time', desc: 'Pomodoro scheduler' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCalculator(c.id)}
                  className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl text-left shadow-xs transition-all hover:-translate-y-0.5 group cursor-pointer"
                >
                  <span className="text-xs font-bold text-amber-500 block truncate group-hover:underline">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 leading-normal">
                    {c.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Grid Sections */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-zinc-800">
              Browse by Subcategory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {EDUCATION_SECTIONS.map((sec) => (
                <div key={sec.name} className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="text-lg">{sec.emoji}</span>
                      {sec.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {sec.items.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => onSelectCalculator(item.id)}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-zinc-800/50 hover:bg-amber-500/10 hover:text-amber-500 dark:hover:bg-amber-500/10 dark:hover:text-amber-500 text-[11px] font-semibold text-slate-600 dark:text-zinc-300 rounded-md border border-slate-200/60 dark:border-zinc-800 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/40">
                    <button
                      onClick={() => onSelectCalculator(sec.items[0].id)}
                      className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs and Guides Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* FAQs */}
            <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Common academic questions regarding grade weight structures and calculation logic.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  {
                    q: 'How does the Weighted Grade calculation work?',
                    a: 'A weighted grade is computed by multiplying the percentage score of each assignment category by its designated weight percentage, and summing those values to calculate the overall grade.'
                  },
                  {
                    q: 'Can the GPA Calculator handle custom scale point values?',
                    a: 'Yes! While defaulting to the standard US 4.0 scale (A=4, B=3, C=2, etc.), our underlying solver weights individual course credits proportionally to maintain perfect scaling.'
                  },
                  {
                    q: 'What is the minimum attendance requirement?',
                    a: 'Most schools and colleges require a minimum of 75% attendance to sit for final examinations. Our tracker instantly informs you how many classes you must attend to achieve this target.'
                  },
                  {
                    q: 'Are my courses and semester lists saved safely?',
                    a: 'All courses, grades, and schedules are saved strictly inside your local browser cache (localStorage) for absolute privacy. No database connection is required.'
                  }
                ].map((item, idx) => (
                  <ExpandableFAQ key={idx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>

            {/* Expandable Guides */}
            <div className="lg:col-span-7 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                📖 Education Guides
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Academic overviews, study guides, and strategic exam planning. Click to expand.
              </p>
              <div className="space-y-3 pt-2">
                {EDUCATION_GUIDES.map((g, idx) => (
                  <ExpandableGuide key={idx} index={idx + 1} title={g.title} content={g.content} calcId={g.calcId} onSelect={onSelectCalculator} />
                ))}
              </div>
            </div>
          </div>

          {/* Related Categories Navigation Links */}
          <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl space-y-4 shadow-2xs">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Related Categories
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'finance', name: '💰 Finance Suite' },
                { id: 'health', name: '❤️ Health Suite' },
                { id: 'math', name: '🧮 Math Suite' },
                { id: 'conversion', name: '🔄 Conversion Suite' },
                { id: 'utility', name: '⚙️ Utility Suite' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as CategoryId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 hover:border-mint text-xs font-semibold text-slate-700 dark:text-zinc-200 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-2xs transition-all cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'conversion' ? (
        /* Majestic Unit Conversion Suite Page */
        <div className="space-y-12 animate-fade-in">
          {/* Conversion Hero Banner */}
          <div className="p-8 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#020617] text-white rounded-3xl border border-zinc-800 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_45%)]" />
            <div className="space-y-3 relative z-10 text-center md:text-left">
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full text-xs font-bold tracking-wider uppercase inline-block">
                🔄 Unit Conversion Suite
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                150+ Unit Conversion Tools
              </h2>
              <p className="text-slate-300 max-w-xl text-sm leading-relaxed font-normal">
                Instant • Accurate • Free. Convert lengths, weights, areas, volumes, temperatures, currencies, and technical units seamlessly with zero lag.
              </p>
            </div>

            {/* Quick Search Conversion Calculator */}
            <div className="max-w-xl pt-2 relative z-10">
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-zinc-500 text-sm">
                  🔍
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Converter..."
                  className="block w-full rounded-xl border border-zinc-700 bg-zinc-900/60 text-white py-3 pl-11 pr-4 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder-zinc-500 outline-hidden font-medium"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-3 text-xs items-center">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  { label: 'Length', id: 'unit_converter_length' },
                  { label: 'Weight', id: 'unit_converter_weight' },
                  { label: 'Temperature', id: 'unit_converter_temp' },
                  { label: 'Area', id: 'unit_converter_area' },
                  { label: 'Currency', id: 'currency' },
                  { label: 'Speed', id: 'unit_converter_speed' }
                ].map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => onSelectCalculator(tag.id)}
                    className="hover:text-purple-400 transition-colors cursor-pointer text-slate-300 font-medium hover:underline font-mono"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ⭐ Featured Conversion Calculators */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ⭐ Featured
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { id: 'unit_converter_length', name: 'Length', desc: 'Meter, Mile, Inch...' },
                { id: 'unit_converter_weight', name: 'Weight', desc: 'Kg, Pound, Ounce...' },
                { id: 'unit_converter_area', name: 'Area', desc: 'Sqm, Acre, Hectare...' },
                { id: 'unit_converter_volume', name: 'Volume', desc: 'Liter, Gallon, Cup...' },
                { id: 'unit_converter_temp', name: 'Temperature', desc: 'Celsius, Fahrenheit...' },
                { id: 'currency', name: 'Currency', desc: 'Live global rates...' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCalculator(c.id)}
                  className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-purple-500 dark:hover:border-purple-500 rounded-2xl text-left shadow-xs transition-all hover:-translate-y-0.5 group cursor-pointer"
                >
                  <span className="text-xs font-bold text-purple-500 block truncate group-hover:underline">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 leading-normal">
                    {c.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Grid Sections */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-zinc-800">
              Browse by Subcategory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CONVERSION_SECTIONS.map((sec) => (
                <div key={sec.name} className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="text-lg">{sec.emoji}</span>
                      {sec.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {sec.items.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => onSelectCalculator(item.id)}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-zinc-800/50 hover:bg-purple-500/10 hover:text-purple-500 dark:hover:bg-purple-500/10 dark:hover:text-purple-500 text-[11px] font-semibold text-slate-600 dark:text-zinc-300 rounded-md border border-slate-200/60 dark:border-zinc-800 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/40">
                    <button
                      onClick={() => onSelectCalculator(sec.items[0].id)}
                      className="text-xs font-bold text-purple-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs and Guides Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* FAQs */}
            <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Common conversion questions regarding formulas and measurement standards.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  {
                    q: 'How accurate is the Currency Converter?',
                    a: 'Our converter leverages real-time exchange rates. Please note that exact bank exchange rates may vary slightly due to minor transaction fees and spreads.'
                  },
                  {
                    q: 'What is the difference between Metric and Imperial systems?',
                    a: 'The Metric system is an international decimalized system based on meters, grams, and liters, with factors of 10. The Imperial system is older and uses yards, pounds, and gallons.'
                  },
                  {
                    q: 'Can I perform conversions offline?',
                    a: 'Yes! All unit conversions (except live currency updates) are computed entirely on your local device. The conversion formulas are stored locally in your browser cache.'
                  },
                  {
                    q: 'Are custom/arbitrary units supported?',
                    a: 'Our calculator offers a vast list of scientific and specialized units, ranging from astronomical units (AU) to data packets. Simply search for your specific metric above.'
                  }
                ].map((item, idx) => (
                  <ExpandableFAQ key={idx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>

            {/* Expandable Guides */}
            <div className="lg:col-span-7 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                📖 Conversion Guides
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Practical overviews, system guidelines, and formula lists. Click to expand.
              </p>
              <div className="space-y-3 pt-2">
                {CONVERSION_GUIDES.map((g, idx) => (
                  <ExpandableGuide key={idx} index={idx + 1} title={g.title} content={g.content} calcId={g.calcId} onSelect={onSelectCalculator} />
                ))}
              </div>
            </div>
          </div>

          {/* Related Categories Navigation Links */}
          <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl space-y-4 shadow-2xs">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Related Categories
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'finance', name: '💰 Finance Suite' },
                { id: 'health', name: '❤️ Health Suite' },
                { id: 'math', name: '🧮 Math Suite' },
                { id: 'education', name: '🎓 Education Suite' },
                { id: 'utility', name: '⚙️ Utility Suite' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as CategoryId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 hover:border-mint text-xs font-semibold text-slate-700 dark:text-zinc-200 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-2xs transition-all cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'utility' ? (
        /* Everyday Tools Page */
        <div className="space-y-12 animate-fade-in">
          {/* Everyday Tools Hero Banner */}
          <div className="p-8 bg-gradient-to-br from-[#115e59] via-[#0f172a] to-[#020617] text-white rounded-3xl border border-zinc-800 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_45%)]" />
            <div className="space-y-3 relative z-10 text-center md:text-left">
              <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full text-xs font-bold tracking-wider uppercase inline-block">
                ⚙️ Everyday Tools
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                100+ Free Daily Utility Calculators & Tools
              </h2>
              <p className="text-slate-300 max-w-xl text-sm leading-relaxed font-normal">
                Simple • Fast • Useful. Track age, format dates, generate passwords, and run handy productivity trackers instantly.
              </p>
            </div>

            {/* Quick Search Everyday Tools */}
            <div className="max-w-xl pt-2 relative z-10">
              <div className="relative rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 dark:text-zinc-500 text-sm">
                  🔍
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Tools..."
                  className="block w-full rounded-xl border border-zinc-700 bg-zinc-900/60 text-white py-3 pl-11 pr-4 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 placeholder-zinc-500 outline-hidden font-medium"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-3 text-xs items-center">
                <span className="font-semibold text-slate-400">Popular:</span>
                {[
                  { label: 'Age', id: 'age' },
                  { label: 'Date', id: 'days_between' },
                  { label: 'Time', id: 'days_between' },
                  { label: 'Discount', id: 'discount' },
                  { label: 'Password', id: 'password' },
                  { label: 'Random', id: 'password' }
                ].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectCalculator(tag.id)}
                    className="hover:text-teal-400 transition-colors cursor-pointer text-slate-300 font-medium hover:underline font-mono"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ⭐ Featured Everyday Tools */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ⭐ Featured
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { id: 'age', name: 'Age Calculator', desc: 'Exact chronological age...' },
                { id: 'days_between', name: 'Date Calculator', desc: 'Days difference, counts...' },
                { id: 'days_between', name: 'Time Calculator', desc: 'Time zones and intervals...' },
                { id: 'discount', name: 'Discount Calculator', desc: 'Saves, taxes, margins...' },
                { id: 'tip', name: 'Tip Calculator', desc: 'Split bill and tips...' },
                { id: 'password', name: 'Password Generator', desc: 'Secure passwords...' }
              ].map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectCalculator(c.id)}
                  className="p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-teal-500 dark:hover:border-teal-500 rounded-2xl text-left shadow-xs transition-all hover:-translate-y-0.5 group cursor-pointer"
                >
                  <span className="text-xs font-bold text-teal-500 block truncate group-hover:underline">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 leading-normal">
                    {c.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Grid Sections */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-zinc-800">
              Browse by Subcategory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {UTILITY_SECTIONS.map((sec) => (
                <div key={sec.name} className="p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="text-lg">{sec.emoji}</span>
                      {sec.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {sec.items.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSelectCalculator(item.id)}
                          className="px-2.5 py-1 bg-slate-50 dark:bg-zinc-800/50 hover:bg-teal-500/10 hover:text-teal-500 dark:hover:bg-teal-500/10 dark:hover:text-teal-500 text-[11px] font-semibold text-slate-600 dark:text-zinc-300 rounded-md border border-slate-200/60 dark:border-zinc-800 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/40">
                    <button
                      onClick={() => onSelectCalculator(sec.items[0].id)}
                      className="text-xs font-bold text-teal-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs and Guides Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* FAQs */}
            <div className="lg:col-span-5 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Common daily math, dates, and productivity utility answers.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  {
                    q: 'How are age and days calculated?',
                    a: 'Ages are computed chronologically using standard Gregorian calendar year lengths, accounting for leap years precisely.'
                  },
                  {
                    q: 'Is my generated password saved anywhere?',
                    a: 'No. Password generation runs entirely in your local browser sandbox via secure client-side cryptographic functions. No data is sent over the internet.'
                  },
                  {
                    q: 'Can I split bills with uneven shares?',
                    a: 'Yes, our Tip Calculator supports quick bill splitting options so everyone pays their accurate proportion easily.'
                  }
                ].map((item, idx) => (
                  <ExpandableFAQ key={idx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>

            {/* Expandable Guides */}
            <div className="lg:col-span-7 p-6 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                📖 Everyday Guides
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Academic overviews, strategic planning, and security checklists. Click to expand.
              </p>
              <div className="space-y-3 pt-2">
                {UTILITY_GUIDES.map((g, idx) => (
                  <ExpandableGuide key={idx} index={idx + 1} title={g.title} content={g.content} calcId={g.calcId} onSelect={onSelectCalculator} />
                ))}
              </div>
            </div>
          </div>

          {/* Related Categories Navigation Links */}
          <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl space-y-4 shadow-2xs">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Related Categories
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'finance', name: '💰 Finance Suite' },
                { id: 'health', name: '❤️ Health Suite' },
                { id: 'math', name: '🧮 Math Suite' },
                { id: 'education', name: '🎓 Education Suite' },
                { id: 'conversion', name: '🔄 Conversion Suite' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id as CategoryId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-white dark:bg-zinc-800 hover:border-mint text-xs font-semibold text-slate-700 dark:text-zinc-200 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-2xs transition-all cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Isolated Tab Category Page */
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white capitalize flex items-center gap-2 border-b border-[#e2e8f0] dark:border-zinc-800 pb-3">
            {CATEGORIES.find((cat) => cat.id === activeTab)?.name} Suite
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCalculator(c.id)}
                className="text-left p-5 bg-white dark:bg-zinc-900 hover:border-mint border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs transition-all group cursor-pointer flex flex-col h-full"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-bold text-mint uppercase tracking-widest">{c.category}</span>
                  {c.popular && (
                    <span className="px-1.5 py-0.5 text-[8px] font-bold rounded-sm bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 group-hover:text-mint dark:group-hover:text-mint group-hover:underline">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {c.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. WHY MILLIONS CHOOSE US SECTION */}
      <div className="border-t border-[#e2e8f0] dark:border-zinc-800 pt-12 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            ★★★★★ Why Millions Choose Us
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            The world's standard offline-first suite of high-fidelity calculation routines.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { title: '500+ Calculators', desc: 'Finance, Health, Math & Everyday tools in a single hub.', icon: Star, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
            { title: 'Instant Yield', desc: 'No loading spinners. Instant math solved compiled locally.', icon: Zap, color: 'text-mint bg-mint/10' },
            { title: 'Works on Any Device', desc: 'Perfectly responsive grids for laptops, tablets, and phones.', icon: Smartphone, color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/20' },
            { title: 'No Registering', desc: 'Completely free. No accounts, profiles, or subscriptions.', icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
            { title: 'Regular Updates', desc: 'Tax rates, financial models, and vital calculators kept accurate.', icon: RefreshCw, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20' },
            { title: 'Privacy Friendly', desc: 'Your vital records and wealth calculations never leave your cache.', icon: Shield, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white dark:bg-zinc-900 border border-[#e2e8f0] dark:border-zinc-800 rounded-xl space-y-2 text-center md:text-left shadow-xs">
              <div className={`p-2 rounded-lg inline-flex ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-zinc-100">{item.title}</h4>
              <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
