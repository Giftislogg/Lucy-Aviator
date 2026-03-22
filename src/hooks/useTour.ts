import { create } from 'zustand';

export type TourStep = {
  target: string;
  title: string;
  description: string;
};

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="packages"]',
    title: "Packages",
    description: "Choose between Free and VIP sections to generate signals.",
  },
  {
    target: '[data-tour="signal-display"]',
    title: "Signal Display",
    description: "Your generated signal times and multipliers appear here.",
  },
  {
    target: '[data-tour="platforms"]',
    title: "Betting Platforms",
    description: "Select your preferred platform to generate a signal.",
  },
  {
    target: '[data-tour="nav-videos"]',
    title: "Videos",
    description: "Watch tutorial and strategy videos.",
  },
  {
    target: '[data-tour="nav-purchase"]',
    title: "Purchase",
    description: "Upgrade to VIP for unlimited signals.",
  },
  {
    target: '[data-tour="nav-profile"]',
    title: "Profile",
    description: "View your signal history and user ID.",
  },
  {
    target: '[data-tour="nav-favorites"]',
    title: "Favorites",
    description: "Access your saved favorite signals.",
  },
];

type TourState = {
  isActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
};

export const useTour = create<TourState>((set, get) => ({
  isActive: false,
  currentStep: 0,
  steps: tourSteps,
  startTour: () => set({ isActive: true, currentStep: 0 }),
  nextStep: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1 });
    } else {
      set({ isActive: false, currentStep: 0 });
    }
  },
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },
  endTour: () => set({ isActive: false, currentStep: 0 }),
}));
