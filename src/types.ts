
export type MetricType = 'economy' | 'comfort' | 'education' | 'budget';

export interface Option {
  id: string;
  text: string;
  consequence: string;
  changes: Partial<Record<MetricType, number>>;
  question: string;
  answer: string;
}

export interface Situation {
  id: number;
  title: string;
  description: string;
  options: Option[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targets: Partial<Record<MetricType, number>>;
}

export interface GameState {
  userName: string;
  stepIndex: number;
  activeSituations: number[]; // Store IDs of randomized situations for this session
  currentGoal: Goal | null;
  metrics: {
    economy: number;
    comfort: number;
    education: number;
    budget: number;
  };
  history: {
    situationTitle: string;
    selectedOption: string;
    consequence: string;
  }[];
}
