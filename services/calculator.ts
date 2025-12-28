
import { 
  EquipmentType, 
  CalculationInput, 
  CalculationResult,
  SingleApproachResult,
  KpConstants
} from '../types';
import { 
  PRESSURE_CONVERSION, 
  ATM_PRESSURE,
  REFORMER_CONSTANTS,
  SHIFT_CONSTANTS,
  METHANATOR_CO_CONSTANTS,
  METHANATOR_CO2_CONSTANTS,
  AMMONIA_CONSTANTS
} from '../constants';

const solveForT = (qp: number, constants: KpConstants, pAbsBar: number = 0): number => {
  const { kp1, kp2, kp3 = 0, kp4 = 0 } = constants;
  const lnQp = Math.log(qp);

  if (kp4 === 0) {
    const x = (lnQp - kp1) / (kp2 + pAbsBar * kp3);
    return 1 / x;
  } else {
    const a = pAbsBar * kp4;
    const b = kp2 + pAbsBar * kp3;
    const c = kp1 - lnQp;
    const disc = b * b - 4 * a * c;
    if (disc < 0) return 0;
    const x1 = (-b + Math.sqrt(disc)) / (2 * a);
    const x2 = (-b - Math.sqrt(disc)) / (2 * a);
    const x = x1 > 0 ? x1 : (x2 > 0 ? x2 : 0);
    return x !== 0 ? 1 / x : 0;
  }
};

export const calculateApproach = (input: CalculationInput): CalculationResult => {
  // Convert string inputs to numbers for calculation
  const ch4 = parseFloat(input.ch4) || 0;
  const h2 = parseFloat(input.h2) || 0;
  const co = parseFloat(input.co) || 0;
  const co2 = parseFloat(input.co2) || 0;
  const h2o = parseFloat(input.h2o) || 0;
  const n2 = parseFloat(input.n2) || 0;
  const nh3 = parseFloat(input.nh3) || 0;
  const pressureGauge = parseFloat(input.pressureGauge) || 0;
  const exitTemperature = parseFloat(input.exitTemperature) || 0;

  const pAbsBar = (pressureGauge * PRESSURE_CONVERSION) + ATM_PRESSURE;

  const partialPressures = {
    ch4: (ch4 / 100) * pAbsBar,
    h2: (h2 / 100) * pAbsBar,
    co: (co / 100) * pAbsBar,
    co2: (co2 / 100) * pAbsBar,
    h2o: (h2o / 100) * pAbsBar,
    n2: (n2 / 100) * pAbsBar,
    nh3: (nh3 / 100) * pAbsBar,
  };

  const pp = partialPressures;
  const results: SingleApproachResult[] = [];

  switch (input.equipment) {
    case EquipmentType.PRIMARY_REFORMER:
    case EquipmentType.SECONDARY_REFORMER: {
      const qp = (pp.co * Math.pow(pp.h2, 3)) / (pp.ch4 * pp.h2o);
      const teqK = solveForT(qp, REFORMER_CONSTANTS);
      results.push({
        qp,
        tEqK: teqK,
        tEqC: teqK - 273.15,
        approach: teqK - 273.15 - exitTemperature
      });
      break;
    }

    case EquipmentType.HT_SHIFT:
    case EquipmentType.LT_SHIFT: {
      const qp = (pp.co2 * pp.h2) / (pp.co * pp.h2o);
      const teqK = solveForT(qp, SHIFT_CONSTANTS);
      results.push({
        qp,
        tEqK: teqK,
        tEqC: teqK - 273.15,
        approach: teqK - 273.15 - exitTemperature
      });
      break;
    }

    case EquipmentType.METHANATOR: {
      const qpCO = (pp.ch4 * pp.h2o) / (pp.co * Math.pow(pp.h2, 3));
      const teqK_CO = solveForT(qpCO, METHANATOR_CO_CONSTANTS);
      results.push({
        label: 'With respect to CO',
        qp: qpCO,
        tEqK: teqK_CO,
        tEqC: teqK_CO - 273.15,
        approach: teqK_CO - 273.15 - exitTemperature
      });

      const qpCO2 = (pp.ch4 * Math.pow(pp.h2o, 2)) / (pp.co2 * Math.pow(pp.h2, 4));
      const teqK_CO2 = solveForT(qpCO2, METHANATOR_CO2_CONSTANTS);
      results.push({
        label: 'With respect to CO2',
        qp: qpCO2,
        tEqK: teqK_CO2,
        tEqC: teqK_CO2 - 273.15,
        approach: teqK_CO2 - 273.15 - exitTemperature
      });
      break;
    }

    case EquipmentType.AMMONIA_REACTOR: {
      const qp = Math.pow(pp.nh3, 2) / (pp.n2 * Math.pow(pp.h2, 3));
      const teqK = solveForT(qp, AMMONIA_CONSTANTS, pAbsBar);
      results.push({
        qp,
        tEqK: teqK,
        tEqC: teqK - 273.15,
        approach: teqK - 273.15 - exitTemperature
      });
      break;
    }
  }

  return {
    pAbsBar,
    partialPressures,
    results
  };
};
