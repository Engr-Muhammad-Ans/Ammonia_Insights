import React, { useState, useMemo } from 'react';
import { EquipmentType, CalculationInput, CalculatorId, CarbonNoInput, HydrogenNoInput, LhvInput, CorrectedFlowInput, SteamToCarbonInput, FrontEndLoadInput, GasToAirInput, HydrogenToAirInput, ProductionLossInputs, BackendLoadInput } from './types';
import { calculateApproach } from './services/calculator';
import { 
  FlaskConical, 
  Settings2, 
  Thermometer, 
  TrendingUp,
  LayoutDashboard,
  ChevronDown,
  Wind,
  LayoutGrid,
  ChevronLeft,
  Zap,
  Droplets,
  Flame,
  ArrowDownCircle,
  Activity,
  BarChart3,
  Waves,
  Gauge,
  Scaling,
  TrendingDown,
  AlertCircle,
  Factory,
  Info,
  X,
  AlertTriangle,
  Search
} from 'lucide-react';

const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-slate-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
              <Info size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">About Ammonia Insights</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-8 space-y-6 text-slate-600">
          <div className="space-y-4 text-lg leading-relaxed font-medium">
            <p>
              Ammonia Insights is a digital process calculator developed to simplify and standardize key operational calculations in ammonia plants. It brings multiple critical plant performance calculators into one intuitive and easy-to-use interface, designed specifically for process engineers and plant operators.
            </p>
            <p>
              This calculator enables rapid calculation of essential parameters by simply entering the process inputs and getting accurate results in less than a second, eliminating manual calculations, spreadsheets, and repetitive engineering work.
            </p>
          </div>
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Developed By</p>
              <p className="text-slate-900 font-bold">Muhammad Ans</p>
              <p className="text-slate-500 text-xs font-medium">Process & Control Engineer</p>
            </div>
            <Factory className="text-slate-100 w-12 h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<CalculatorId | 'dashboard' | 'landing'>('landing');
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  // AET State
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType>(EquipmentType.PRIMARY_REFORMER);
  const [aetInputs, setAetInputs] = useState<CalculationInput>({
    equipment: EquipmentType.PRIMARY_REFORMER,
    ch4: '7.50',
    h2: '63.57',
    co: '9.09',
    co2: '13.28',
    h2o: '40.79',
    n2: '6.56',
    nh3: '0',
    pressureGauge: '32.9',
    exitTemperature: '789'
  });

  // Carbon No State
  const [carbonInputs, setCarbonInputs] = useState<CarbonNoInput>({
    ch4: '94.5',
    c2h6: '3.2',
    co2: '0.8',
    co: '0.1'
  });

  // Hydrogen No State
  const [hydrogenInputs, setHydrogenInputs] = useState<HydrogenNoInput>({
    h2: '63.57',
    ch4: '7.50',
    c2h6: '0.2',
    nh3: '0.01'
  });

  // LHV State
  const [lhvInputs, setLhvInputs] = useState<LhvInput>({
    ch4: '94.5',
    c2h6: '3.2',
    h2: '1.0',
    co: '0.1',
    nh3: '0.01'
  });

  // Corrected Flow State
  const [cfInputs, setCfInputs] = useState<CorrectedFlowInput>({
    opTemp: '35',
    opPressure: '32.9',
    measuredFlow: '50000',
    h2: '63.57',
    ar: '0.80',
    n2: '6.56',
    ch4: '7.50',
    co: '9.09',
    co2: '12.48',
    c2h6: '0',
    h2o: '0',
    nh3: '0',
    designTemp: '30',
    designPressure: '35.0',
    designMW: '10.5',
    designZ: '0.99'
  });

  // Steam to Carbon State
  const [scInputs, setScInputs] = useState<SteamToCarbonInput>({
    steamFlow: '150',
    processGasFlow: '50000',
    ch4: '94.5',
    c2h6: '3.2',
    co2: '0.8',
    co: '0.1'
  });

  // Front End Load State
  const [feInputs, setFeInputs] = useState<FrontEndLoadInput>({
    designGasFlow: '55000',
    designCH4: '95.0',
    designC2H6: '3.0',
    designCO2: '1.0',
    designCO: '0.1',
    currentGasFlow: '50000',
    currentCH4: '94.5',
    currentC2H6: '3.2',
    currentCO2: '0.8',
    currentCO: '0.1'
  });

  // Backend Load State
  const [blInputs, setBlInputs] = useState<BackendLoadInput>({
    designProduction: '1000',
    currentProduction: '950'
  });

  // Gas to Air State
  const [gaInputs, setGaInputs] = useState<GasToAirInput>({
    processGasFlow: '50000',
    airFlow: '25000'
  });

  // Hydrogen to Air State
  const [haInputs, setHaInputs] = useState<HydrogenToAirInput>({
    processGasFlow: '50000',
    h2: '63.57',
    ch4: '7.50',
    c2h6: '0.2',
    nh3: '0.01',
    airFlow: '25000'
  });

  // Production Loss State
  const [plInputs, setPlInputs] = useState<ProductionLossInputs>({
    ch4Slip: { gasFlow: '100000', initialSlip: '0.25', finalSlip: '0.35' },
    coSlip: { gasFlow: '85000', initialSlip: '0.30', finalSlip: '0.50' },
    co2Slip: { gasFlow: '80000', initialSlip: '0.10', finalSlip: '0.20' }
  });

  const aetResults = useMemo(() => calculateApproach({ ...aetInputs, equipment: selectedEquipment }), [aetInputs, selectedEquipment]);

  const carbonNoResult = useMemo(() => {
    const ch4 = parseFloat(carbonInputs.ch4) || 0;
    const c2h6 = parseFloat(carbonInputs.c2h6) || 0;
    const co2 = parseFloat(carbonInputs.co2) || 0;
    const co = parseFloat(carbonInputs.co) || 0;
    return (1 * (ch4 / 100)) + (2 * (c2h6 / 100)) + (1 * (co2 / 100)) + (1 * (co / 100));
  }, [carbonInputs]);

  const hydrogenNoResult = useMemo(() => {
    const h2 = parseFloat(hydrogenInputs.h2) || 0;
    const ch4 = parseFloat(hydrogenInputs.ch4) || 0;
    const c2h6 = parseFloat(hydrogenInputs.c2h6) || 0;
    const nh3 = parseFloat(hydrogenInputs.nh3) || 0;
    return (2 * (ch4 / 100)) + (3 * (c2h6 / 100)) + (1 * (h2 / 100)) + (1.5 * (nh3 / 100));
  }, [hydrogenInputs]);

  const lhvResult = useMemo(() => {
    const ch4 = parseFloat(lhvInputs.ch4) || 0;
    const c2h6 = parseFloat(lhvInputs.c2h6) || 0;
    const h2 = parseFloat(lhvInputs.h2) || 0;
    const co = parseFloat(lhvInputs.co) || 0;
    const nh3 = parseFloat(lhvInputs.nh3) || 0;
    return (ch4 * 85.5538) + (c2h6 * 152.26) + (h2 * 25.786) + (co * 30.19) + (nh3 * 33.79);
  }, [lhvInputs]);

  const scRatioResult = useMemo(() => {
    const steam = parseFloat(scInputs.steamFlow) || 0;
    const gas = parseFloat(scInputs.processGasFlow) || 1;
    const ch4 = parseFloat(scInputs.ch4) || 0;
    const c2h6 = parseFloat(scInputs.c2h6) || 0;
    const co2 = parseFloat(scInputs.co2) || 0;
    const co = parseFloat(scInputs.co) || 0;

    const carbonNo = (1 * (ch4 / 100)) + (2 * (c2h6 / 100)) + (1 * (co2 / 100)) + (1 * (co / 100));
    if (carbonNo === 0) return 0;
    
    return (steam * 1245.2222222) / (carbonNo * gas);
  }, [scInputs]);

  const frontEndLoadResult = useMemo(() => {
    const designGas = parseFloat(feInputs.designGasFlow) || 1;
    const curGas = parseFloat(feInputs.currentGasFlow) || 0;

    const designCarbon = (1 * (parseFloat(feInputs.designCH4) || 0) / 100) + 
                         (2 * (parseFloat(feInputs.designC2H6) || 0) / 100) + 
                         (1 * (parseFloat(feInputs.designCO2) || 0) / 100) + 
                         (1 * (parseFloat(feInputs.designCO) || 0) / 100);

    const currentCarbon = (1 * (parseFloat(feInputs.currentCH4) || 0) / 100) + 
                          (2 * (parseFloat(feInputs.currentC2H6) || 0) / 100) + 
                          (1 * (parseFloat(feInputs.currentCO2) || 0) / 100) + 
                          (1 * (parseFloat(feInputs.currentCO) || 0) / 100);

    const denominator = designCarbon * designGas;
    if (denominator === 0) return 0;

    return (currentCarbon * curGas) / denominator;
  }, [feInputs]);

  const backendLoadResult = useMemo(() => {
    const current = parseFloat(blInputs.currentProduction) || 0;
    const design = parseFloat(blInputs.designProduction) || 1;
    return (current / design) * 100;
  }, [blInputs]);

  const gasToAirResult = useMemo(() => {
    const gas = parseFloat(gaInputs.processGasFlow) || 0;
    const air = parseFloat(gaInputs.airFlow) || 1;
    return gas / air;
  }, [gaInputs]);

  const hydrogenToAirResult = useMemo(() => {
    const gas = parseFloat(haInputs.processGasFlow) || 0;
    const h2 = parseFloat(haInputs.h2) || 0;
    const ch4 = parseFloat(haInputs.ch4) || 0;
    const c2h6 = parseFloat(haInputs.c2h6) || 0;
    const nh3 = parseFloat(haInputs.nh3) || 0;
    const air = parseFloat(haInputs.airFlow) || 1;

    const hPotential = (2 * (ch4 / 100)) + (3 * (c2h6 / 100)) + (1 * (h2 / 100)) + (1.5 * (nh3 / 100));
    return (gas * hPotential) / air;
  }, [haInputs]);

  const productionLossResults = useMemo(() => {
    const calculatePl = (gasFlowStr: string, initialStr: string, finalStr: string, nh3Const: number) => {
      const gasFlow = parseFloat(gasFlowStr) || 0;
      const initial = parseFloat(initialStr) || 0;
      const final = parseFloat(finalStr) || 0;
      const increase = final - initial;
      const lossNmc = (increase * gasFlow) / 100;
      const nh3Loss = lossNmc * nh3Const;
      const ureaLoss = nh3Loss * 60 / 34;
      return { increase, lossNmc, nh3Loss, ureaLoss };
    };

    return {
      ch4: calculatePl(plInputs.ch4Slip.gasFlow, plInputs.ch4Slip.initialSlip, plInputs.ch4Slip.finalSlip, 0.048541),
      co: calculatePl(plInputs.coSlip.gasFlow, plInputs.coSlip.initialSlip, plInputs.coSlip.finalSlip, 0.0364058),
      co2: calculatePl(plInputs.co2Slip.gasFlow, plInputs.co2Slip.initialSlip, plInputs.co2Slip.finalSlip, 0.048541),
    };
  }, [plInputs]);

  const correctedFlowResult = useMemo(() => {
    const opTempC = parseFloat(cfInputs.opTemp) || 0;
    const opPressG = parseFloat(cfInputs.opPressure) || 0;
    const measuredFlow = parseFloat(cfInputs.measuredFlow) || 0;

    const h2 = parseFloat(cfInputs.h2) || 0;
    const ar = parseFloat(cfInputs.ar) || 0;
    const n2 = parseFloat(cfInputs.n2) || 0;
    const ch4 = parseFloat(cfInputs.ch4) || 0;
    const co = parseFloat(cfInputs.co) || 0;
    const co2 = parseFloat(cfInputs.co2) || 0;
    const c2h6 = parseFloat(cfInputs.c2h6) || 0;
    const h2o = parseFloat(cfInputs.h2o) || 0;
    const nh3 = parseFloat(cfInputs.nh3) || 0;

    const designTempC = parseFloat(cfInputs.designTemp) || 0;
    const designPressG = parseFloat(cfInputs.designPressure) || 0;
    const designMW = parseFloat(cfInputs.designMW) || 0;
    const designZ = parseFloat(cfInputs.designZ) || 0;

    const opTempK = opTempC + 273.15;
    const opPressAbs = opPressG + 1.03323;
    const designTempK = designTempC + 273.15;
    const designPressAbs = designPressG + 1.03323;

    const fracH2 = h2 / 100;
    const fracAr = ar / 100;
    const fracN2 = n2 / 100;
    const fracCh4 = ch4 / 100;
    const fracCo = co / 100;
    const fracCo2 = co2 / 100;
    const fracC2h6 = c2h6 / 100;
    const fracH2o = h2o / 100;
    const fracNh3 = nh3 / 100;

    const mwProcess = (fracH2 * 2) + (fracAr * 39) + (fracN2 * 28) + (fracCh4 * 16) + 
                      (fracCo * 28) + (fracCo2 * 44) + (fracC2h6 * 30) + (fracH2o * 18) + (fracNh3 * 17);

    const critPsum = (fracH2 * 13.3889236) + (fracAr * 49.9458856) + (fracN2 * 34.6092968) + 
                     (fracCh4 * 46.9479088) + (fracCo * 35.6800028) + (fracCo2 * 75.2757304) + 
                     (fracC2h6 * 49.762336) + (fracH2o * 224.899246) + (fracNh3 * 114.59);
    const critPgasAbs = critPsum + 1.03323;

    const critTgasK = (fracH2 * 33.18) + (fracAr * 150.86) + (fracN2 * 126.1) + 
                      (fracCh4 * 190.58) + (fracCo * 132.92) + (fracCo2 * 304.19) + 
                      (fracC2h6 * 305.42) + (fracH2o * 647.13) + (fracNh3 * 405.4);

    const reducedP = critPgasAbs > 0 ? opPressAbs / critPgasAbs : 0;
    const reducedT = critTgasK > 0 ? opTempK / critTgasK : 0;

    let zProc = 1;
    if (reducedT > 0) {
      const term1 = (3.52 * reducedP) / Math.pow(10, 0.9813 * reducedT);
      const term2 = 0.274 * Math.pow(reducedP, 2) * Math.exp(-1.2 * reducedT);
      const term3 = 0.027 * Math.pow(reducedP, 3) * Math.exp(-1.6 * reducedT);
      zProc = 1 - term1 + term2 + term3;
    }

    const num = opPressAbs * designTempK * designMW * designZ;
    const den = designPressAbs * opTempK * mwProcess * zProc;

    let correctedFlow = 0;
    if (den > 0 && num >= 0) {
      correctedFlow = measuredFlow * Math.sqrt(num / den);
    }

    let changeInFlow = 0;
    if (correctedFlow > 0) {
      changeInFlow = ((correctedFlow - measuredFlow) / correctedFlow) * 100;
    }

    return {
      mwProcess,
      critPgasAbs,
      critTgasK,
      reducedP,
      reducedT,
      zProc,
      correctedFlow,
      changeInFlow
    };
  }, [cfInputs]);

  const handleAetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setAetInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleCarbonInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setCarbonInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleHydrogenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setHydrogenInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleLhvInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setLhvInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleCfInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setCfInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleScInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setScInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleFeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setFeInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleBlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setBlInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleGaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setGaInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleHaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setHaInputs(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handlePlInputChange = (category: keyof ProductionLossInputs, field: string, value: string) => {
    let sanitizedValue = value;
    if (value.length > 1 && value.startsWith('0') && value[1] !== '.') sanitizedValue = value.substring(1);
    setPlInputs(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: sanitizedValue }
    }));
  };

  const dashboardItems = [
    { 
      id: CalculatorId.CARBON_NO, 
      name: 'Carbon No.', 
      icon: <Activity className="w-6 h-6" />, 
      color: 'blue', 
      disabled: false,
      description: 'Catalyst carbon formation prevention & steam reforming parameter.',
      tags: ['steam', 'reforming', 'catalyst', 'carbon formation', 'hydrocarbon', 'ratio']
    },
    { 
      id: CalculatorId.FRONT_END_LOAD, 
      name: 'Front end load', 
      icon: <Zap className="w-6 h-6" />, 
      color: 'orange', 
      disabled: false,
      description: 'Feed gas processing, reformer capacity, and front-end throughput.',
      tags: ['feed', 'throughput', 'reformer', 'capacity', 'load']
    },
    { 
      id: CalculatorId.BACK_END_LOAD, 
      name: 'Backend Load', 
      icon: <ArrowDownCircle className="w-6 h-6" />, 
      color: 'purple', 
      disabled: false,
      description: 'CO shift, methanation, and synthesis loop feed gas volume tracking.',
      tags: ['shift', 'methanation', 'synthesis', 'volume', 'load']
    },
    { 
      id: CalculatorId.HYDROGEN_NO, 
      name: 'Hydrogen No.', 
      icon: <Flame className="w-6 h-6" />, 
      color: 'emerald', 
      disabled: false,
      description: 'Hydrogen-to-nitrogen ratios, fuel gas composition, and balance.',
      tags: ['hydrogen', 'nitrogen', 'ratio', 'fuel', 'composition']
    },
    { 
      id: CalculatorId.LHV, 
      name: 'Low Heating Value (LHV)', 
      icon: <Flame className="w-6 h-6" />, 
      color: 'red', 
      disabled: false,
      description: 'Fuel gas net heat duty, heating value calculation from composition.',
      tags: ['fuel', 'heating value', 'efficiency', 'heat duty', 'calorific']
    },
    { 
      id: CalculatorId.STEAM_TO_CARBON, 
      name: 'Steam to Carbon ratio', 
      icon: <Droplets className="w-6 h-6" />, 
      color: 'cyan', 
      disabled: false,
      description: 'Primary reformer inlet steam-to-carbon molar ratio tracking.',
      tags: ['steam', 'molar ratio', 'carbon', 'inlet', 's/c']
    },
    { 
      id: CalculatorId.GAS_TO_AIR, 
      name: 'Gas to Air ratio', 
      icon: <Wind className="w-6 h-6" />, 
      color: 'slate', 
      disabled: false,
      description: 'Combustion ratio, burner fuel-air mixture, and excess air control.',
      tags: ['combustion', 'burner', 'mixture', 'air', 'fuel', 'ratio']
    },
    { 
      id: CalculatorId.HYDROGEN_TO_AIR, 
      name: 'Hydrogen to Air Ratio', 
      icon: <Flame className="w-6 h-6" />, 
      color: 'red', 
      disabled: false,
      description: 'Auto-thermal/secondary reformer flame ratio & combustion safety.',
      tags: ['secondary reformer', 'flame', 'safety', 'combustion', 'ratio']
    },
    { 
      id: CalculatorId.ATE, 
      name: 'ATE (Equilibrium)', 
      icon: <FlaskConical className="w-6 h-6" />, 
      color: 'indigo', 
      disabled: false,
      description: 'Approach to equilibrium calculations for shift and reforming reactions.',
      tags: ['equilibrium', 'approach', 'reforming', 'conversion', 'reaction', 'temperature']
    },
    { 
      id: CalculatorId.PRODUCTION_LOSS, 
      name: 'Production Loss', 
      icon: <BarChart3 className="w-6 h-6" />, 
      color: 'rose', 
      disabled: false,
      description: 'Calculate synthetic production loss due to venting or purging.',
      tags: ['purge', 'venting', 'loss', 'synthesis', 'ammonia', 'nitrogen']
    },
    { 
      id: CalculatorId.CORRECTED_FLOW, 
      name: 'Corrected Flow', 
      icon: <Scaling className="w-6 h-6" />, 
      color: 'indigo', 
      disabled: false,
      description: 'Orifice gas flow rate correction for temperature and pressure density shift.',
      tags: ['orifice', 'flow correction', 'density', 'compensation', 'pressure', 'temperature']
    },
    { 
      id: 'reformer-kinetic-model', 
      name: 'Reformer Kinetic Model', 
      icon: <Factory className="w-6 h-6" />, 
      color: 'blue', 
      disabled: false, 
      url: 'https://reformer-kinetic-model.vercel.app/',
      description: 'Primary reformer reaction kinetics, tube profiles, and heat transfer modeling.',
      tags: ['kinetics', 'profile', 'heat transfer', 'simulation', 'model', 'kinetic']
    },
  ];

  const filteredDashboardItems = useMemo(() => {
    if (!searchQuery.trim()) return dashboardItems;
    const query = searchQuery.toLowerCase().trim();
    return dashboardItems.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, dashboardItems]);

  if (activeView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-900 relative flex flex-col items-center overflow-y-auto overflow-x-hidden pb-20">
        <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

        {/* Info Icon for Landing */}
        <div className="absolute top-6 right-6 z-[60]">
          <button 
            onClick={() => setIsAboutOpen(true)}
            className="p-3 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-2xl transition-all border border-white/10 backdrop-blur-md"
          >
            <Info size={24} />
          </button>
        </div>

        {/* Background Elements */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />
        <div className="fixed top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Decorative Floating Icons */}
        <div className="absolute top-[10%] left-[10%] text-blue-500/10 animate-pulse hidden md:block"><Factory size={200} /></div>
        <div className="absolute top-[40%] right-[5%] text-emerald-500/10 animate-bounce hidden md:block" style={{ animationDuration: '5s' }}><FlaskConical size={180} /></div>

        <div className="z-10 w-full max-w-5xl px-6 pt-24 md:pt-32 space-y-24 flex-grow flex flex-col justify-center">
          <div className="text-center space-y-10 animate-in fade-in zoom-in-95 duration-700">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none">
                Ammonia <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Insights</span>
              </h1>
              <p className="text-xl md:text-3xl text-slate-400 font-bold tracking-tight">
                Comprehensive Ammonia Plant Process Calculator
              </p>
            </div>

            <div className="pt-8 flex items-center justify-center">
              <button 
                onClick={() => setActiveView('dashboard')}
                className="px-14 py-6 bg-blue-600 hover:bg-blue-500 text-white text-2xl font-black rounded-3xl shadow-2xl shadow-blue-900/60 transition-all hover:scale-105 active:scale-95 flex items-center justify-center border-b-4 border-blue-800"
              >
                Let's Calculate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      
      <div className="w-full max-w-7xl flex-grow p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div 
              className="bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-200 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setActiveView('dashboard')}
            >
              <LayoutGrid className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1">Ammonia Insights</h1>
              <p className="text-slate-500 font-medium text-sm">Comprehensive Plant Process Monitoring</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors border border-slate-100 hover:border-blue-100 rounded-xl"
            >
              <Info size={20} />
              About
            </button>
            {activeView !== 'dashboard' && (
              <button 
                onClick={() => setActiveView('dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft size={20} />
                Back to Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Views */}
        {activeView === 'dashboard' ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Elegant Search & Auto-suggest Panel */}
            <div className="relative w-full max-w-2xl mx-auto mb-6 z-30">
              <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:shadow-md focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                <div className="pl-4 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search calculators (e.g., steam, carbon, kinetic, shift...)"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSuggestionsOpen(true);
                  }}
                  onFocus={() => setIsSuggestionsOpen(true)}
                  className="w-full py-4 pl-3 pr-12 text-sm font-bold text-slate-700 bg-transparent border-0 outline-none placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSuggestionsOpen(false);
                    }}
                    className="absolute right-3 p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {isSuggestionsOpen && searchQuery.trim().length > 0 && (
                <>
                  {/* Overlay to close suggestions when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40 cursor-default" 
                    onClick={() => setIsSuggestionsOpen(false)} 
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Calculator Suggestions</span>
                      <span className="text-[10px] text-slate-400 font-bold">Matches found: {filteredDashboardItems.length}</span>
                    </div>
                    
                    {filteredDashboardItems.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                        {filteredDashboardItems.map(item => {
                          const isLink = 'url' in item;
                          return (
                            <button
                              key={`suggest-${item.id}`}
                              onClick={() => {
                                if (isLink) {
                                  window.open((item as any).url, '_blank', 'noopener,noreferrer');
                                } else {
                                  setActiveView(item.id as any);
                                }
                                setSearchQuery('');
                                setIsSuggestionsOpen(false);
                              }}
                              className="w-full p-4 hover:bg-slate-50 text-left flex items-start gap-4 transition-all group"
                            >
                              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                {React.cloneElement(item.icon as React.ReactElement, { className: 'w-5 h-5' })}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                  {item.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {item.tags.map(tag => {
                                    const isMatch = tag.toLowerCase().includes(searchQuery.toLowerCase().trim());
                                    return (
                                      <span 
                                        key={tag} 
                                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${isMatch ? 'bg-blue-100 text-blue-700 font-black' : 'bg-slate-100 text-slate-400'}`}
                                      >
                                        #{tag}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-400">
                        <Activity className="w-8 h-8 mx-auto mb-2 opacity-50 stroke-[1.5]" />
                        <p className="text-sm font-bold">No matching calculators found.</p>
                        <p className="text-xs mt-0.5">Try searching for other words like "reformer", "shift", or "steam".</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Grid of filtered items */}
            {filteredDashboardItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDashboardItems.map(item => {
                  const isLink = 'url' in item;
                  const Component = isLink ? 'a' : 'button';
                  const linkProps = isLink ? { href: (item as any).url, target: '_blank', rel: 'noopener noreferrer' } : {};
                  const buttonProps = !isLink ? { onClick: () => setActiveView(item.id as any), disabled: item.disabled } : {};

                  return (
                    <Component
                      key={item.id}
                      {...linkProps}
                      {...buttonProps}
                      className={`group p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all text-left flex flex-col gap-4 relative overflow-hidden ${!isLink && item.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-blue-300 cursor-pointer'}`}
                    >
                      <div className={`p-3 rounded-xl w-fit ${!isLink && item.disabled ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-black text-slate-800 tracking-tight leading-tight">{item.name}</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                          {isLink ? 'Open Model' : item.disabled ? 'Coming Soon' : 'Open Calculator'}
                        </p>
                      </div>
                      {(!item.disabled || isLink) && (
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] scale-150 group-hover:scale-[1.8] group-hover:rotate-12 transition-all duration-700">
                          {item.icon}
                        </div>
                      )}
                    </Component>
                  );
                })}
              </div>
            ) : (
              <div className="p-16 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 max-w-md mx-auto shadow-sm">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4 stroke-[1.5]" />
                <h3 className="font-black text-slate-800 text-lg leading-tight">No calculators match "{searchQuery}"</h3>
                <p className="text-slate-400 text-sm mt-1 font-medium">Please verify your search query or clear the filter to view all modules.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-200 hover:scale-105 active:scale-95"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : activeView === CalculatorId.CARBON_NO ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Activity className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-800">Carbon No. Input Sheet (mole %)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
                <InputGroup label="CH₄ %" name="ch4" value={carbonInputs.ch4} onChange={handleCarbonInputChange} />
                <InputGroup label="C₂H₆ %" name="c2h6" value={carbonInputs.c2h6} onChange={handleCarbonInputChange} />
                <InputGroup label="CO₂ %" name="co2" value={carbonInputs.co2} onChange={handleCarbonInputChange} />
                <InputGroup label="CO %" name="co" value={carbonInputs.co} onChange={handleCarbonInputChange} />
              </div>
              <CompositionTotal 
                values={[carbonInputs.ch4, carbonInputs.c2h6, carbonInputs.co2, carbonInputs.co]} 
              />
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                label="Carbon No." 
                value={carbonNoResult.toFixed(4)} 
                subValue="Calculated Value"
                icon={<BarChart3 className="w-5 h-5 text-blue-500" />}
                color="blue"
              />
            </div>
          </div>
        ) : activeView === CalculatorId.LHV ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Flame className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-slate-800">LHV Input Sheet (mole %)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-end">
                <InputGroup label="CH₄ %" name="ch4" value={lhvInputs.ch4} onChange={handleLhvInputChange} />
                <InputGroup label="C₂H₆ %" name="c2h6" value={lhvInputs.c2h6} onChange={handleLhvInputChange} />
                <InputGroup label="H₂ %" name="h2" value={lhvInputs.h2} onChange={handleLhvInputChange} />
                <InputGroup label="CO %" name="co" value={lhvInputs.co} onChange={handleLhvInputChange} />
                <InputGroup label="NH₃ %" name="nh3" value={lhvInputs.nh3} onChange={handleLhvInputChange} />
              </div>
              <CompositionTotal 
                values={[lhvInputs.ch4, lhvInputs.c2h6, lhvInputs.h2, lhvInputs.co, lhvInputs.nh3]} 
              />
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                label="Low Heating Value (LHV)" 
                value={`${lhvResult.toFixed(2)}`} 
                subValue="Kcal/NMC"
                icon={<Flame className="w-5 h-5 text-red-500" />}
                color="orange"
              />
            </div>
            <NoteSection content={
              <div className="text-sm text-slate-600 leading-relaxed">
                <p>LHV is the amount of heat released by combusting a specified quantity and returning the temperature of the combustion products to 150°C, which prevents the latent heat of vaporization of water in the reaction products from being recovered.</p>
                <div className="mt-4 p-4 bg-slate-50 rounded-xl font-mono text-xs">
                  Formula: LHV = (CH₄ * 85.5538) + (C₂H₆ * 152.26) + (H₂ * 25.786) + (CO * 30.19) + (NH₃ * 33.79)
                </div>
              </div>
            } />
          </div>
        ) : activeView === CalculatorId.FRONT_END_LOAD ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Zap className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-bold text-slate-800">Front End Load Input Sheet</h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Design Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    <InputGroup label="Design Gas Flow" name="designGasFlow" value={feInputs.designGasFlow} onChange={handleFeInputChange} />
                    <InputGroup label="Design CH₄ %" name="designCH4" value={feInputs.designCH4} onChange={handleFeInputChange} />
                    <InputGroup label="Design C₂H₆ %" name="designC2H6" value={feInputs.designC2H6} onChange={handleFeInputChange} />
                    <InputGroup label="Design CO₂ %" name="designCO2" value={feInputs.designCO2} onChange={handleFeInputChange} />
                    <InputGroup label="Design CO %" name="designCO" value={feInputs.designCO} onChange={handleFeInputChange} />
                  </div>
                  <CompositionTotal 
                    values={[feInputs.designCH4, feInputs.designC2H6, feInputs.designCO2, feInputs.designCO]} 
                    label="Design Composition Total"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Current Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                    <InputGroup label="Current Gas Flow" name="currentGasFlow" value={feInputs.currentGasFlow} onChange={handleFeInputChange} />
                    <InputGroup label="Current CH₄ %" name="currentCH4" value={feInputs.currentCH4} onChange={handleFeInputChange} />
                    <InputGroup label="Current C₂H₆ %" name="currentC2H6" value={feInputs.currentC2H6} onChange={handleFeInputChange} />
                    <InputGroup label="Current CO₂ %" name="currentCO2" value={feInputs.currentCO2} onChange={handleFeInputChange} />
                    <InputGroup label="Current CO %" name="currentCO" value={feInputs.currentCO} onChange={handleFeInputChange} />
                  </div>
                  <CompositionTotal 
                    values={[feInputs.currentCH4, feInputs.currentC2H6, feInputs.currentCO2, feInputs.currentCO]} 
                    label="Current Composition Total"
                  />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                label="Front End Load" 
                value={`${(frontEndLoadResult * 100).toFixed(2)} %`} 
                subValue={`Ratio: ${frontEndLoadResult.toFixed(4)}`}
                icon={<Gauge className="w-5 h-5 text-orange-500" />}
                color="orange"
              />
            </div>
          </div>
        ) : activeView === CalculatorId.BACK_END_LOAD ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <ArrowDownCircle className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-slate-800">Backend Load Input Sheet</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 items-end">
                <InputGroup label="Design NH₃ Production (MTPD)" name="designProduction" value={blInputs.designProduction} onChange={handleBlInputChange} />
                <InputGroup label="Current NH₃ Production (MTPD)" name="currentProduction" value={blInputs.currentProduction} onChange={handleBlInputChange} />
              </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                label="Backend Load" 
                value={`${backendLoadResult.toFixed(2)} %`} 
                subValue={`Production Ratio: ${(backendLoadResult / 100).toFixed(4)}`}
                icon={<Activity className="w-5 h-5 text-purple-500" />}
                color="purple"
              />
            </div>
          </div>
        ) : activeView === CalculatorId.HYDROGEN_NO ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Flame className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-800">Hydrogen No. Input Sheet (mole %)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
                <InputGroup label="H₂ %" name="h2" value={hydrogenInputs.h2} onChange={handleHydrogenInputChange} />
                <InputGroup label="CH₄ %" name="ch4" value={hydrogenInputs.ch4} onChange={handleHydrogenInputChange} />
                <InputGroup label="C₂H₆ %" name="c2h6" value={hydrogenInputs.c2h6} onChange={handleHydrogenInputChange} />
                <InputGroup label="NH₃ %" name="nh3" value={hydrogenInputs.nh3} onChange={handleHydrogenInputChange} />
              </div>
              <CompositionTotal 
                values={[hydrogenInputs.h2, hydrogenInputs.ch4, hydrogenInputs.c2h6, hydrogenInputs.nh3]} 
              />
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                label="Hydrogen No." 
                value={hydrogenNoResult.toFixed(4)} 
                subValue="Calculated Value"
                icon={<Flame className="w-5 h-5 text-emerald-500" />}
                color="emerald"
              />
            </div>
          </div>
        ) : activeView === CalculatorId.STEAM_TO_CARBON ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Droplets className="w-5 h-5 text-cyan-600" />
                <h3 className="text-lg font-bold text-slate-800">Steam to Carbon Ratio Input Sheet</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-end">
                <InputGroup label="Steam Flow (Tons/hr)" name="steamFlow" value={scInputs.steamFlow} onChange={handleScInputChange} />
                <InputGroup label="Process Gas Flow (NMC/hr)" name="processGasFlow" value={scInputs.processGasFlow} onChange={handleScInputChange} />
                <div className="hidden md:block" />
                <InputGroup label="CH₄ %" name="ch4" value={scInputs.ch4} onChange={handleScInputChange} />
                <InputGroup label="C₂H₆ %" name="c2h6" value={scInputs.c2h6} onChange={handleScInputChange} />
                <InputGroup label="CO₂ %" name="co2" value={scInputs.co2} onChange={handleScInputChange} />
                <InputGroup label="CO %" name="co" value={scInputs.co} onChange={handleScInputChange} />
              </div>
              <CompositionTotal 
                values={[scInputs.ch4, scInputs.c2h6, scInputs.co2, scInputs.co]} 
              />
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                label="Steam to Carbon Ratio" 
                value={scRatioResult.toFixed(4)} 
                subValue="Calculated S/C"
                icon={<Waves className="w-5 h-5 text-cyan-500" />}
                color="blue"
              />
            </div>
          </div>
        ) : activeView === CalculatorId.GAS_TO_AIR ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Wind className="w-5 h-5 text-slate-600" />
                <h3 className="text-lg font-bold text-slate-800">Gas to Air Ratio Input Sheet</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 items-end">
                <InputGroup label="Process Gas Flow (NMC/hr)" name="processGasFlow" value={gaInputs.processGasFlow} onChange={handleGaInputChange} />
                <InputGroup label="Air Flow (NMC/hr)" name="airFlow" value={gaInputs.airFlow} onChange={handleGaInputChange} />
              </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                label="Gas to Air Ratio" 
                value={gasToAirResult.toFixed(4)} 
                subValue="Current Volumetric Ratio"
                icon={<Scaling className="w-5 h-5 text-slate-500" />}
                color="blue"
              />
            </div>
          </div>
        ) : activeView === CalculatorId.HYDROGEN_TO_AIR ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Flame className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-slate-800">Hydrogen to Air Ratio Input Sheet</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-end">
                <InputGroup label="Process Gas Flow (NMC/hr)" name="processGasFlow" value={haInputs.processGasFlow} onChange={handleHaInputChange} />
                <InputGroup label="Air Flow (NMC/hr)" name="airFlow" value={haInputs.airFlow} onChange={handleHaInputChange} />
                <div className="hidden md:block" />
                <InputGroup label="H₂ %" name="h2" value={haInputs.h2} onChange={handleHaInputChange} />
                <InputGroup label="CH₄ %" name="ch4" value={haInputs.ch4} onChange={handleHaInputChange} />
                <InputGroup label="C₂H₆ %" name="c2h6" value={haInputs.c2h6} onChange={handleHaInputChange} />
                <InputGroup label="NH₃ %" name="nh3" value={haInputs.nh3} onChange={handleHaInputChange} />
              </div>
              <CompositionTotal 
                values={[haInputs.h2, haInputs.ch4, haInputs.c2h6, haInputs.nh3]} 
              />
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                label="Hydrogen to Air Ratio" 
                value={hydrogenToAirResult.toFixed(4)} 
                subValue="Stoichiometric H/Air Ratio"
                icon={<Flame className="w-5 h-5 text-red-500" />}
                color="purple"
              />
            </div>
          </div>
        ) : activeView === CalculatorId.PRODUCTION_LOSS ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* CH4 Section */}
            <div className="space-y-4">
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                  <TrendingDown className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-800">Production Loss: CH₄ Slip (R-203)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <InputGroup label="Dry Gas Flow (NMC/hr)" name="gasFlow" value={plInputs.ch4Slip.gasFlow} onChange={(e) => handlePlInputChange('ch4Slip', 'gasFlow', e.target.value)} />
                  <InputGroup label="Initial Slip (mole %)" name="initialSlip" value={plInputs.ch4Slip.initialSlip} onChange={(e) => handlePlInputChange('ch4Slip', 'initialSlip', e.target.value)} />
                  <InputGroup label="Final Slip (mole %)" name="finalSlip" value={plInputs.ch4Slip.finalSlip} onChange={(e) => handlePlInputChange('ch4Slip', 'finalSlip', e.target.value)} />
                </div>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label="CH₄ Loss" value={`${productionLossResults.ch4.lossNmc.toFixed(2)} NMC/hr`} subValue={`Increase: ${productionLossResults.ch4.increase.toFixed(3)} %`} icon={<Waves className="w-5 h-5 text-blue-500" />} color="blue" />
                <ResultCard label="NH₃ Loss" value={`${productionLossResults.ch4.nh3Loss.toFixed(2)} MTPD`} subValue="Ammonia Production Loss" icon={<Activity className="w-5 h-5 text-blue-600" />} color="blue" />
                <ResultCard label="Urea Loss" value={`${productionLossResults.ch4.ureaLoss.toFixed(2)} MTPD`} subValue="Equivalent Urea Loss" icon={<BarChart3 className="w-5 h-5 text-blue-700" />} color="blue" />
              </div>
            </div>

            {/* CO Section */}
            <div className="space-y-4">
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-bold text-slate-800">Production Loss: CO Slip (R-205)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <InputGroup label="Dry Gas Flow (NMC/hr)" name="gasFlow" value={plInputs.coSlip.gasFlow} onChange={(e) => handlePlInputChange('coSlip', 'gasFlow', e.target.value)} />
                  <InputGroup label="Initial Slip (mole %)" name="initialSlip" value={plInputs.coSlip.initialSlip} onChange={(e) => handlePlInputChange('coSlip', 'initialSlip', e.target.value)} />
                  <InputGroup label="Final Slip (mole %)" name="finalSlip" value={plInputs.coSlip.finalSlip} onChange={(e) => handlePlInputChange('coSlip', 'finalSlip', e.target.value)} />
                </div>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label="CO Loss" value={`${productionLossResults.co.lossNmc.toFixed(2)} NMC/hr`} subValue={`Increase: ${productionLossResults.co.increase.toFixed(3)} %`} icon={<Waves className="w-5 h-5 text-orange-500" />} color="orange" />
                <ResultCard label="NH₃ Loss" value={`${productionLossResults.co.nh3Loss.toFixed(2)} MTPD`} subValue="Ammonia Production Loss" icon={<Activity className="w-5 h-5 text-orange-600" />} color="orange" />
                <ResultCard label="Urea Loss" value={`${productionLossResults.co.ureaLoss.toFixed(2)} MTPD`} subValue="Equivalent Urea Loss" icon={<BarChart3 className="w-5 h-5 text-orange-700" />} color="orange" />
              </div>
            </div>

            {/* CO2 Section */}
            <div className="space-y-4">
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-800">Production Loss: CO₂ Slip (C-302)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <InputGroup label="Dry Gas Flow (NMC/hr)" name="gasFlow" value={plInputs.co2Slip.gasFlow} onChange={(e) => handlePlInputChange('co2Slip', 'gasFlow', e.target.value)} />
                  <InputGroup label="Initial Slip (mole %)" name="initialSlip" value={plInputs.co2Slip.initialSlip} onChange={(e) => handlePlInputChange('co2Slip', 'initialSlip', e.target.value)} />
                  <InputGroup label="Final Slip (mole %)" name="finalSlip" value={plInputs.co2Slip.finalSlip} onChange={(e) => handlePlInputChange('co2Slip', 'finalSlip', e.target.value)} />
                </div>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResultCard label="CO₂ Loss" value={`${productionLossResults.co2.lossNmc.toFixed(2)} NMC/hr`} subValue={`Increase: ${productionLossResults.co2.increase.toFixed(3)} %`} icon={<Waves className="w-5 h-5 text-emerald-500" />} color="emerald" />
                <ResultCard label="NH₃ Loss" value={`${productionLossResults.co2.nh3Loss.toFixed(2)} MTPD`} subValue="Ammonia Production Loss" icon={<Activity className="w-5 h-5 text-emerald-600" />} color="emerald" />
                <ResultCard label="Urea Loss" value={`${productionLossResults.co2.ureaLoss.toFixed(2)} MTPD`} subValue="Equivalent Urea Loss" icon={<BarChart3 className="w-5 h-5 text-emerald-700" />} color="emerald" />
              </div>
            </div>
          </div>
        ) : activeView === CalculatorId.ATE ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex justify-end">
              <div className="relative group">
                <select 
                  value={selectedEquipment} 
                  onChange={(e) => setSelectedEquipment(e.target.value as EquipmentType)}
                  className="appearance-none w-full md:w-80 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 cursor-pointer focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                >
                  {Object.values(EquipmentType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Settings2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-800">Process Input Sheet (wet mole %)</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-9 gap-6 items-end">
                <InputGroup label="CH₄ %" name="ch4" value={aetInputs.ch4} onChange={handleAetInputChange} />
                <InputGroup label="H₂ %" name="h2" value={aetInputs.h2} onChange={handleAetInputChange} />
                <InputGroup label="CO %" name="co" value={aetInputs.co} onChange={handleAetInputChange} />
                <InputGroup label="CO₂ %" name="co2" value={aetInputs.co2} onChange={handleAetInputChange} />
                <InputGroup label="H₂O %" name="h2o" value={aetInputs.h2o} onChange={handleAetInputChange} />
                <InputGroup label="N₂ %" name="n2" value={aetInputs.n2} onChange={handleAetInputChange} />
                <InputGroup label="NH₃ %" name="nh3" value={aetInputs.nh3} onChange={handleAetInputChange} />
                <InputGroup label="Exit Press (kg/cm²g)" name="pressureGauge" value={aetInputs.pressureGauge} onChange={handleAetInputChange} />
                <InputGroup label="Exit Temp (°C)" name="exitTemperature" value={aetInputs.exitTemperature} onChange={handleAetInputChange} />
              </div>
              <CompositionTotal 
                values={[aetInputs.ch4, aetInputs.h2, aetInputs.co, aetInputs.co2, aetInputs.h2o, aetInputs.n2, aetInputs.nh3]} 
              />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aetResults.results.map((res, idx) => (
                <React.Fragment key={idx}>
                  <ResultCard label={res.label || "Approach to Eq."} value={`${res.approach > 0 ? '+' : ''}${res.approach.toFixed(3)} °C`} subValue="Teq - Texit" icon={<TrendingUp className="w-5 h-5 text-emerald-500" />} color="emerald" />
                  <ResultCard label={res.label ? `Teq (${res.label})` : "Equilibrium Temp"} value={`${res.tEqC.toFixed(2)} °C`} subValue={`${res.tEqK.toFixed(2)} K`} icon={<Thermometer className="w-5 h-5 text-orange-500" />} color="orange" />
                </React.Fragment>
              ))}
              <ResultCard label="Absolute Pressure" value={`${aetResults.pAbsBar.toFixed(3)} bar`} subValue={`${aetInputs.pressureGauge} kg/cm²g`} icon={<LayoutDashboard className="w-5 h-5 text-purple-500" />} color="purple" />
              <ResultCard label="Exit Temperature" value={`${aetInputs.exitTemperature} °C`} subValue={`${(parseFloat(aetInputs.exitTemperature) + 273.15).toFixed(2)} K`} icon={<Wind className="w-5 h-5 text-blue-500" />} color="blue" />
            </div>
          </div>
        ) : activeView === CalculatorId.CORRECTED_FLOW ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Scaling className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-800">Corrected Flow Input Sheet</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Operating Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <InputGroup label="Operating Temp (°C)" name="opTemp" value={cfInputs.opTemp} onChange={handleCfInputChange} />
                    <InputGroup label="Operating Pressure (kg/cm²g)" name="opPressure" value={cfInputs.opPressure} onChange={handleCfInputChange} />
                    <InputGroup label="Measured Flow (NMC/hr)" name="measuredFlow" value={cfInputs.measuredFlow} onChange={handleCfInputChange} />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Process Gas Composition (mole %)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-6 items-end">
                    <InputGroup label="H₂ %" name="h2" value={cfInputs.h2} onChange={handleCfInputChange} />
                    <InputGroup label="Ar %" name="ar" value={cfInputs.ar} onChange={handleCfInputChange} />
                    <InputGroup label="N₂ %" name="n2" value={cfInputs.n2} onChange={handleCfInputChange} />
                    <InputGroup label="CH₄ %" name="ch4" value={cfInputs.ch4} onChange={handleCfInputChange} />
                    <InputGroup label="CO %" name="co" value={cfInputs.co} onChange={handleCfInputChange} />
                    <InputGroup label="CO₂ %" name="co2" value={cfInputs.co2} onChange={handleCfInputChange} />
                    <InputGroup label="C₂H₆ %" name="c2h6" value={cfInputs.c2h6} onChange={handleCfInputChange} />
                    <InputGroup label="H₂O %" name="h2o" value={cfInputs.h2o} onChange={handleCfInputChange} />
                    <InputGroup label="NH₃ %" name="nh3" value={cfInputs.nh3} onChange={handleCfInputChange} />
                  </div>
                  <CompositionTotal 
                    values={[cfInputs.h2, cfInputs.ar, cfInputs.n2, cfInputs.ch4, cfInputs.co, cfInputs.co2, cfInputs.c2h6, cfInputs.h2o, cfInputs.nh3]} 
                  />
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Design Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <InputGroup label="Design Temp (°C)" name="designTemp" value={cfInputs.designTemp} onChange={handleCfInputChange} />
                    <InputGroup label="Design Pressure (kg/cm²g)" name="designPressure" value={cfInputs.designPressure} onChange={handleCfInputChange} />
                    <InputGroup label="Design Gas MW (kg/kgmol)" name="designMW" value={cfInputs.designMW} onChange={handleCfInputChange} />
                    <InputGroup label="Design Compressibility (Z)" name="designZ" value={cfInputs.designZ} onChange={handleCfInputChange} />
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ResultCard 
                label="Process Gas MW" 
                value={`${correctedFlowResult.mwProcess.toFixed(4)}`} 
                subValue="kg/kgmol"
                icon={<BarChart3 className="w-5 h-5 text-blue-500" />}
                color="blue"
              />
              <ResultCard 
                label="Compressibility Factor (Z)" 
                value={`${correctedFlowResult.zProc.toFixed(4)}`} 
                subValue="Operating Z Factor"
                icon={<Activity className="w-5 h-5 text-emerald-500" />}
                color="emerald"
              />
              <ResultCard 
                label="Corrected Flow" 
                value={`${correctedFlowResult.correctedFlow.toFixed(2)} NMC/hr`} 
                subValue="Process Gas Flow"
                icon={<Scaling className="w-5 h-5 text-indigo-500" />}
                color="purple"
              />
              <ResultCard 
                label="Change in Flow" 
                value={`${correctedFlowResult.changeInFlow > 0 ? '+' : ''}${correctedFlowResult.changeInFlow.toFixed(2)} %`} 
                subValue="Flow Variation %"
                icon={<TrendingUp className="w-5 h-5 text-orange-500" />}
                color="orange"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-dashed border-slate-300">
             <div className="p-4 bg-slate-50 rounded-full mb-4">
                <Activity className="w-12 h-12 text-slate-300" />
             </div>
             <h2 className="text-xl font-bold text-slate-800">Calculator in Development</h2>
             <p className="text-slate-500">This module is currently being calibrated for plant parameters.</p>
          </div>
        )}
      </div>

      <footer className="w-full bg-slate-100 border-t border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-8 text-center flex flex-col items-center gap-1">
          <p className="text-slate-700 font-bold text-xs">Developed by Muhammad Ans, Process Control Engineer.</p>
          <p className="text-slate-400 text-[8px] uppercase tracking-[0.2em]">© 2026 | All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const CompositionTotal: React.FC<{ values: string[], label?: string }> = ({ values, label = "Total mole %" }) => {
  const total = useMemo(() => {
    return values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  }, [values]);

  const isError = total > 100;

  return (
    <div className={`mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition-all duration-300 ${isError ? 'bg-red-50 border-red-200' : 'bg-emerald-50/50 border-emerald-100'}`}>
      <div className="flex items-center gap-3">
        {isError ? <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" /> : <div className="w-2 h-2 rounded-full bg-emerald-400" />}
        <div>
          <p className={`text-xs font-black uppercase tracking-widest ${isError ? 'text-red-500' : 'text-emerald-600'}`}>{label}</p>
          {isError && <p className="text-[10px] text-red-400 font-bold">Error: Total composition cannot exceed 100%</p>}
        </div>
      </div>
      <div className={`text-xl font-black tracking-tight mt-2 sm:mt-0 ${isError ? 'text-red-600' : 'text-slate-800'}`}>
        {total.toFixed(4)} %
      </div>
    </div>
  );
};

const InputGroup: React.FC<{ label: string, name: string, value: string, onChange: (e: any) => void, type?: string }> = ({ label, name, value, onChange, type = "number" }) => (
  <div className="flex flex-col gap-2 min-w-0">
    <label className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-widest leading-none px-1 h-auto min-h-[1.5rem] whitespace-nowrap overflow-visible text-ellipsis overflow-hidden">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
      step="0.001"
    />
  </div>
);

const ResultCard: React.FC<{ label: string, value: string, subValue: string, icon: React.ReactNode, color: string }> = ({ label, value, subValue, icon, color }) => {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 border-emerald-100 ring-emerald-500/10",
    orange: "bg-orange-50 border-orange-100 ring-orange-500/10",
    blue: "bg-blue-50 border-blue-100 ring-blue-500/10",
    purple: "bg-purple-50 border-purple-100 ring-purple-500/10",
  };
  return (
    <div className={`p-5 rounded-2xl border ${colors[color] || colors.blue} ring-1 relative overflow-hidden group hover:shadow-lg hover:shadow-slate-200 transition-all`}>
      <div className="flex justify-between items-start mb-2">
        <div className="z-10">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
          <h4 className="text-xl font-black text-slate-800 tracking-tight text-wrap break-words">{value}</h4>
        </div>
        <div className={`p-2 rounded-xl bg-white shadow-sm ring-1 ring-slate-200/50 z-10 shrink-0`}>
          {icon}
        </div>
      </div>
      <p className="text-[11px] font-bold text-slate-400 z-10 relative">{subValue}</p>
      <div className="absolute -right-2 -bottom-2 opacity-[0.03] scale-150 group-hover:scale-[1.75] transition-transform duration-700 pointer-events-none">{icon}</div>
    </div>
  );
};

const NoteSection: React.FC<{ content: React.ReactNode }> = ({ content }) => (
  <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
    <h3 className="text-lg font-bold text-slate-800 mb-4">Note</h3>
    {content}
  </section>
);

export default App;