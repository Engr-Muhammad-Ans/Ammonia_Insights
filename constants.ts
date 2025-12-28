
import { EquipmentType, KpConstants } from './types';

export const REFORMER_CONSTANTS: KpConstants = { kp1: 30.545, kp2: -27278 };
// Both HT and LT shift now use the same constants as per latest prompt
export const SHIFT_CONSTANTS: KpConstants = { kp1: -4.2939, kp2: 4546 };
export const METHANATOR_CO_CONSTANTS: KpConstants = { kp1: -29.254, kp2: 26251 };
export const METHANATOR_CO2_CONSTANTS: KpConstants = { kp1: -24.845, kp2: 21627 };
export const AMMONIA_CONSTANTS: KpConstants = { kp1: -27.366, kp2: 12500, kp3: -1.42, kp4: 2100 };

export const PRESSURE_CONVERSION = 0.980665; // 1 kg/cm2 = 0.980665 bar
export const ATM_PRESSURE = 1.01325; // bar
