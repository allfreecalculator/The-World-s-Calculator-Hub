export type CategoryId = 'home' | 'finance' | 'health' | 'math' | 'education' | 'conversion' | 'utility';

export interface CalculatorInfo {
  id: string;
  name: string;
  category: CategoryId;
  icon: string; // Lucide icon name
  description: string;
  popular?: boolean;
  trending?: boolean;
  tags: string[];
}

export interface SavedCalculation {
  id: string;
  calculatorId: string;
  calculatorName: string;
  date: string;
  title: string;
  summary: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
}

export interface Guide {
  title: string;
  category: CategoryId;
  content: string;
  calculatorId?: string;
}
