
import { EquipmentType, KpConstants } from './types';

export const REFORMER_CONSTANTS: KpConstants = { kp1: 30.545, kp2: -27278 };
// Both HT and LT shift now use the same constants as per latest prompt
export const SHIFT_CONSTANTS: KpConstants = { kp1: -4.2939, kp2: 4546 };
export const METHANATOR_CO_CONSTANTS: KpConstants = { kp1: -29.254, kp2: 26251 };
export const METHANATOR_CO2_CONSTANTS: KpConstants = { kp1: -24.845, kp2: 21627 };
export const AMMONIA_CONSTANTS: KpConstants = { kp1: -27.366, kp2: 12500, kp3: -1.42, kp4: 2100 };

export const PRESSURE_CONVERSION = 0.980665; // 1 kg/cm2 = 0.980665 bar
export const ATM_PRESSURE = 1.01325; // bar

export interface GasCpConstant {
  name: string;
  formula: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
}

export const GAS_CP_CONSTANTS: Record<string, GasCpConstant> = {
  CH4: { name: 'Methane (CH₄)', formula: 'CH₄', A: 34.942, B: -0.039957, C: 0.00019184, D: -1.5303e-7, E: 3.9321e-11 },
  CO2: { name: 'Carbon Dioxide (CO₂)', formula: 'CO₂', A: 27.437, B: 0.042315, C: -0.000019555, D: 3.9968e-9, E: -2.9872e-13 },
  CO: { name: 'Carbon Monoxide (CO)', formula: 'CO', A: 29.556, B: -0.0065807, C: 0.00002013, D: -1.2227e-8, E: 2.2617e-12 },
  N2: { name: 'Nitrogen (N₂)', formula: 'N₂', A: 29.342, B: -0.0035395, C: 0.000010076, D: -4.3116e-9, E: 2.5935e-13 },
  H2: { name: 'Hydrogen (H₂)', formula: 'H₂', A: 25.399, B: 0.020178, C: -0.000038549, D: 3.188e-8, E: -8.7585e-12 },
  C2H6: { name: 'Ethane (C₂H₆)', formula: 'C₂H₆', A: 28.146, B: 0.043447, C: 0.00018946, D: -1.9082e-7, E: 5.3349e-11 },
  H2O: { name: 'Water Vapor (H₂O)', formula: 'H₂O', A: 33.933, B: -0.0084186, C: 0.000029906, D: -1.7825e-8, E: 3.6934e-12 },
  O2: { name: 'Oxygen (O₂)', formula: 'O₂', A: 29.526, B: -8.8999e-3, C: 3.8083e-5, D: -3.2629e-8, E: 8.8607e-12 },
  H2S: { name: 'Hydrogen Sulfide (H₂S)', formula: 'H₂S', A: 33.878, B: -1.1216e-2, C: 5.2578e-5, D: -3.8397e-8, E: 9.0281e-12 },
  NH3: { name: 'Ammonia (NH₃)', formula: 'NH₃', A: 33.573, B: -1.2581e-2, C: 8.8906e-5, D: -7.1783e-8, E: 1.8569e-11 }
};

export interface GasHofConstant {
  name: string;
  formula: string;
  isFormulaBased: boolean;
  fixedStdHofKJ?: number;
  A?: number;
  B?: number;
  C?: number;
}

export const GAS_HOF_CONSTANTS: Record<string, GasHofConstant> = {
  CH4: { name: 'Methane (CH₄)', formula: 'CH₄', isFormulaBased: true, A: -63.4, B: -0.0434, C: 1.72e-5 },
  CO2: { name: 'Carbon Dioxide (CO₂)', formula: 'CO₂', isFormulaBased: false, fixedStdHofKJ: -393.5 },
  CO: { name: 'Carbon Monoxide (CO)', formula: 'CO', isFormulaBased: false, fixedStdHofKJ: -110.5 },
  N2: { name: 'Nitrogen (N₂)', formula: 'N₂', isFormulaBased: true, A: 0.0, B: 0.0, C: 0.0 },
  H2: { name: 'Hydrogen (H₂)', formula: 'H₂', isFormulaBased: true, A: 0.0, B: 0.0, C: 0.0 },
  C2H6: { name: 'Ethane (C₂H₆)', formula: 'C₂H₆', isFormulaBased: true, A: -66.735, B: -0.069337, C: 3.0379e-5 },
  H2O: { name: 'Water Vapor (H₂O)', formula: 'H₂O', isFormulaBased: true, A: -238.41, B: -0.012256, C: 2.7656e-6 },
  O2: { name: 'Oxygen (O₂)', formula: 'O₂', isFormulaBased: true, A: 0.0, B: 0.0, C: 0.0 },
  H2S: { name: 'Hydrogen Sulfide (H₂S)', formula: 'H₂S', isFormulaBased: false, fixedStdHofKJ: -20.6 },
  NH3: { name: 'Ammonia (NH₃)', formula: 'NH₃', isFormulaBased: false, fixedStdHofKJ: -45.9 }
};

export interface KodGasComponent {
  id: string;
  name: string;
  formula: string;
  mw: number;
}

export const KOD_GAS_COMPONENTS: KodGasComponent[] = [
  { id: 'h2', name: 'Hydrogen', formula: 'H₂', mw: 2.016 },
  { id: 'n2', name: 'Nitrogen', formula: 'N₂', mw: 28.0134 },
  { id: 'co2', name: 'Carbon Dioxide', formula: 'CO₂', mw: 44.01 },
  { id: 'co', name: 'Carbon Monoxide', formula: 'CO', mw: 28.01 },
  { id: 'ar', name: 'Argon', formula: 'Ar', mw: 39.948 },
  { id: 'ch4', name: 'Methane', formula: 'CH₄', mw: 16.043 },
  { id: 'h2o', name: 'Water', formula: 'H₂O', mw: 18.015 },
  { id: 'c2h6', name: 'Ethane', formula: 'C₂H₆', mw: 30.07 }
];
