export enum CalculatorId {
  CARBON_NO = 'carbon-no',
  FRONT_END_LOAD = 'front-end-load',
  BACK_END_LOAD = 'back-end-load',
  HYDROGEN_NO = 'hydrogen-no',
  STEAM_TO_CARBON = 'steam-to-carbon',
  GAS_TO_AIR = 'gas-to-air',
  HYDROGEN_TO_AIR = 'hydrogen-to-air',
  ATE = 'ate',
  PRODUCTION_LOSS = 'production-loss'
}

export enum EquipmentType {
  PRIMARY_REFORMER = 'Primary Reformer (F-201)',
  SECONDARY_REFORMER = 'Secondary Reformer (R-203)',
  HT_SHIFT = 'High temperature shift converter (R-204)',
  LT_SHIFT = 'Low temperature shift converter (R-205)',
  METHANATOR = 'Methanator (R-311)',
  AMMONIA_REACTOR = 'Ammonia Reactor (R-501)',
}

export interface KpConstants {
  kp1: number;
  kp2: number;
  kp3?: number;
  kp4?: number;
}

export interface CalculationInput {
  equipment: EquipmentType;
  ch4: string; 
  h2: string;  
  co: string;  
  co2: string; 
  h2o: string; 
  n2: string;  
  nh3: string; 
  pressureGauge: string;
  exitTemperature: string;
}

export interface CarbonNoInput {
  ch4: string;
  c2h6: string;
  co2: string;
  co: string;
}

export interface HydrogenNoInput {
  h2: string;
  ch4: string;
  c2h6: string;
  nh3: string;
}

export interface SteamToCarbonInput {
  steamFlow: string;
  processGasFlow: string;
  ch4: string;
  c2h6: string;
  co2: string;
  co: string;
}

export interface FrontEndLoadInput {
  designGasFlow: string;
  designCH4: string;
  designC2H6: string;
  designCO2: string;
  designCO: string;
  currentGasFlow: string;
  currentCH4: string;
  currentC2H6: string;
  currentCO2: string;
  currentCO: string;
}

export interface BackendLoadInput {
  designProduction: string;
  currentProduction: string;
}

export interface GasToAirInput {
  processGasFlow: string;
  airFlow: string;
}

export interface HydrogenToAirInput {
  processGasFlow: string;
  h2: string;
  ch4: string;
  c2h6: string;
  nh3: string;
  airFlow: string;
}

export interface ProductionLossInputs {
  ch4Slip: {
    gasFlow: string;
    initialSlip: string;
    finalSlip: string;
  };
  coSlip: {
    gasFlow: string;
    initialSlip: string;
    finalSlip: string;
  };
  co2Slip: {
    gasFlow: string;
    initialSlip: string;
    finalSlip: string;
  };
}

export interface SingleApproachResult {
  qp: number;
  tEqK: number;
  tEqC: number;
  approach: number;
  label?: string;
}

export interface CalculationResult {
  pAbsBar: number;
  partialPressures: {
    ch4: number;
    h2: number;
    co: number;
    co2: number;
    h2o: number;
    n2: number;
    nh3: number;
  };
  results: SingleApproachResult[];
}