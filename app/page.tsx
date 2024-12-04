'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CoilParams } from '../types/coilParams'
import { useRouter } from 'next/navigation'

const initialState: CoilParams = {
  CoilType: 2,
  AirInTemperature: 26,
  AirInHumidity: 50,
  AirInAbsHumidity: 0,
  AirInWetBulb: 0,
  AirInFlowStandard: 25000,
  AirInFlowNormal: 0,
  AirInFlowActual: 0,
  HeaderMaterial: 1,
  AirWeight_kgh: 0,
  AirWeight_kgs: 0,
  NoRows: 3,
  NoTubes: 0,
  FinPitch: 2,
  NoCircuits: 9,
  CoilWidth: 1500,
  CoilHeight: 1600,
  Capacity_kCalh: 0,
  CapacitykW_kW: 0,
  AirOutTemperature: 0,
  AirInVelocityStandard: 0,
  AirInVelocityNormal: 0,
  AirInVelocityActual: 0,
  FluidFlow_dm3s: 12,
  FluidFlow2_dm3h: 0,
  FluidTempIn: 8,
  FluidTempOut: 18,
  FluidWeight: 0,
  FluidWeightkgH: 0,
  MaxAllowedFluidSidePressureDrop: 0,
  WorkingPressure_bar: 1.013,
  WorkingPressure_atm: 0,
  WorkingPressure_kpa: 0,
  WorkingPressure_kgm2: 0,
  WorkingPressure_mmHg: 0,
  WorkingPressureMMH20: 0,
  TubeSideFoulingFactor: 0,
  GlycolType: 0,
  GlycolPercentageByVolume: 0,
  GlycolPercentageByWieght: 0,
  SafetyFactorOnSurface: 0,
  SafetyFactorOnCapacity: 0,
  FluidType: 0,
  FluidDensity: 0,
  FluidVicosity: 0,
  FluidSpecificHeat: 0,
  FluidConductivity: 0,
  FrameCode: 16,
  PriceMultiplier: 1,
  FoulingFactorFinsSide: 0,
  CondensingPressure: 0,
  CondensingTemperature: 0,
  EvaporatingPressure: 0,
  EvaporatingTemperature: 0,
  SubCooling: 0,
  SuperHeating: 0,
  TypeOfCalculation: 0,
  FinsMaterial: 1,
  FinsThickness: 0.2,
  TubeThickness: 0.35,
  Flanges: 0,
  TubeMaterial: 1,
  CustomerField1: 0,
  CustomerField2: 0,
  CustomerField3: 0,
  ConnectionSide: 0,
  OveralldimensionWidth: 0,
  ARIVersion: 0,
  TypeOfFins: 0,
  AutomaticCoilSelection: 0,
  NumberOfGasCircuits: 0,
  OverallDimensionHeight: 0,
  SteamCoilExecutionType: 0,
  ElectroTinnedAfterManufacturing: 0,
  CalculationMode: 0,
  InletManifoldDiameter: 5,
  OutletManifoldDiameter: 5,
  BasinType: 0,
  DropEliminator: 0,
  PackingType: 0,
  MinheightofBottomFrameMetalSheet: 0,
  MinheightofTopFrameMetalSheet: 0,
  TypeOfFlow: 0,
  OverallDimensionWidth: '',
  OverallDimensionHeight: '',
  GenioxSize: ''
}

// Define interface for parameter metadata
interface ParamMetadata {
  label: string;
  unit?: string;
  validation?: {
    min?: number;
    max?: number;
  };
}

const visibleParams = {
  CalculationType: {
    key: 'CalculationType',
    label: 'Type of Calculation'
  },
  CoilType: {
    key: 'CoilType',
    label: 'Coil Type'
  },
  AirInTemperature: {
    key: 'AirInTemperature',
    label: 'Air Inlet Temperature'
  },
  AirInHumidity: {
    key: 'AirInHumidity',
    label: 'Humidity'
  },
  AirInFlowStandard: {
    key: 'AirInFlowStandard',
    label: 'Airflow'
  },
  NoRows: {
    key: 'NoRows',
    label: 'Number of Rows'
  },
  NoTubes: {
    key: 'NoTubes',
    label: 'Number of Tubes'
  },
  FinPitch: {
    key: 'FinPitch',
    label: 'Fin Pitch'
  },
  NoCircuits: {
    key: 'NoCircuits',
    label: 'Total Circuits'
  },
  CoilWidth: {
    key: 'CoilWidth',
    label: 'Coil Width'
  },
  CoilHeight: {
    key: 'CoilHeight',
    label: 'Coil Height'
  },
  CapacitykW_kW: {
    key: 'CapacitykW_kW',
    label: 'Required Capacity'
  },
  AirOutTemperature: {
    key: 'AirOutTemperature',
    label: 'Air Outlet Temperature'
  },
  FluidFlow_dm3s: {
    key: 'FluidFlow_dm3s',
    label: 'GPM'
  },
  FluidTempIn: {
    key: 'FluidTempIn',
    label: 'Fluid Inlet Temperature'
  },
  FluidTempOut: {
    key: 'FluidTempOut',
    label: 'Fluid Outlet Temperature'
  },
  GlycolType: {
    key: 'GlycolType',
    label: 'Glycol Type'
  },
  GlycolPercentageByVolume: {
    key: 'GlycolPercentageByVolume',
    label: 'Glycol %'
  },
  FluidType: {
    key: 'FluidType',
    label: 'Fluid Type'
  },
  CondensingTemperature: {
    key: 'CondensingTemperature',
    label: 'Condensing Temperature'
  },
  EvaporatingTemperature: {
    key: 'EvaporatingTemperature',
    label: 'Evaporating Temperature'
  },
  SubCooling: {
    key: 'SubCooling',
    label: 'Sub Cooling'
  },
  SuperHeating: {
    key: 'SuperHeating',
    label: 'Super Heating'
  },
  FinsMaterial: {
    key: 'FinsMaterial',
    label: 'Fin Material'
  },
  FinsThickness: {
    key: 'FinsThickness',
    label: 'Fin Thickness'
  },
  TubeThickness: {
    key: 'TubeThickness',
    label: 'Tube Thickness'
  },
  Flanges: {
    key: 'Flanges',
    label: 'Flanges'
  },
  TubeMaterial: {
    key: 'TubeMaterial',
    label: 'Tube Material'
  },
  OveralldimensionWidth: {
    key: 'OveralldimensionWidth',
    label: 'Overall Width'
  },
  TypeOfFins: {
    key: 'TypeOfFins',
    label: 'Fin Type'
  },
  NumberOfGasCircuits: {
    key: 'NumberOfGasCircuits',
    label: 'Total Circuit'
  },
  OverallDimensionHeight: {
    key: 'OverallDimensionHeight',
    label: 'Overall Height'
  },
  CalculationMode: {
    key: 'CalculationMode',
    label: 'Use Calculation Mode'
  },
  InletManifoldDiameter: {
    key: 'InletManifoldDiameter',
    label: 'Inlet Manifold Diameter'
  },
  OutletManifoldDiameter: {
    key: 'OutletManifoldDiameter',
    label: 'Outlet Manifold Diameter'
  },
  TypeOfFlow: {
    key: 'TypeOfFlow',
    label: 'Flow Type'
  }
};

const glycolTypeOptions = {
  1: "Ethylenglycol",
  2: "Propilenglycol",
  4: "Ethilen Alcohol"
};

const calculationTypeOptions = {
  1: "Monophase",
  2: "Direct expansion",
  3: "Condenser"
};

const humidityTypeOptions = {
  'AirInHumidity': 'Relative Humidity',
  'AirInWetBulb': 'Wet Bulb Temperature'
};

const fluidTypeOptions = {
  1: "Water",
  2: "ESSOTHERM 500",
  4: "R134a",
  5: "R22",
  9: "Steam",
  10: "Sea water (100g/kg)",
  11: "Therminol 66",
  12: "R407c",
  13: "R404a",
  16: "R410a",
  72: "R407F",
  78: "R448A",
  79: "R449A",
  82: "R32"
};

const coilTypeOptions = {
  1: "P60",
  2: "P3012",
  94: "P40",
  113: "P25"
};

const finMaterialOptions = {
  1: "AL",
  2: "ALPR",
  3: "CU",
  4: "CUSN",
  9: "ALMG 2.5"
};

const tubeMaterialOptions = {
  0: "CU",
  1: "CuSn",
  2: "INOX304",
  3: "INOX316",
  4: "FE",
  5: "CUNI9010"
};

const outputLabels: Record<string, string> = {
  AirOutTemperature: "Air outlet temperature",
  AirOutRelativeHumidity: "Air outlet relative humidity",
  AirOutAbsoluteHumidity: "Air outlet absolute humidity",
  FluidOutTemperature: "Fluid outlet temperature",
  FluidVolumeDmH: "Fluid volume Dm H",
  FluidVolumeDmS: "Fluid volume Dm S",
  FluidWeightKgH: "Fluid weight Kg H",
  FluidWeightKgS: "Fluid weight Kg S",
  AirSidePressureDrop: "Airside pressure drop",
  FluidSidePressureDrop: "Fluid side pressure drop",
  CapacityReserve: "Capacity Reserve",
  CoilHeight: "Coil height",
  CoilDepth: "Coil depth",
  DDimension: "D dimension",
  GasVelocity: "Gas velocity",
  FluidVelocity: "Fluid velocity",
  FluidDensity: "Fluid density",
  FluidViscosity: "Fluid viscosity",
  FluidSpecificHeat: "Fluid specific heat",
  FluidConductivity: "Fluid conductivity",
  SensibleHeat: "Sensible Heat",
  CondensedWater: "Condensed water",
  ErrorCode: "Error code",
  NumberOfRows: "Number of rows",
  NumberOfCircuits: "Number of circuits",
  CoilPrice: "Coil price",
  CoilWeight: "Coil weight",
  SubCooling: "Sub cooling",
  SuperHeating: "Super heating",
  VapourFraction: "Vapour fraction",
  VapourVelocityInsideInletManifold: "Vapour velocity inside inlet manifold",
  VapourVelocityInsideTubes: "Vapour velocity inside tubes",
  LiquidVelocityInsideTubes: "Liquid velocity inside tubes",
  LiquidVelocityInsideOutletManifold: "Liquid velocity inside outlet manifold",
  NumberOfDistributors: "Number of distributors",
  DistributorsDenomination: "Distributors denomination",
  CapillarsOutsideDiameter: "Capillars outside diameter",
  CapillarsInsideDiameter: "Capillars inside diameter",
  CapillarsLength: "Capillars length",
  DistributorHeaderDiameter: "Distributor header diameter",
  CondensingTemperature: "Condensing temperature",
  CondensingPressure: "Condensing pressure",
  EvaporatingTemperature: "Evaporating temperature",
  EvaporatingPressure: "Evaporating pressure",
  TotalExchangeSurface: "Total exchange surface",
  FreonPressureDrop: "Freon pressure drop",
  InletAirRelativeHumidity: "Inlet air relative humidity",
  InternalVolume: "Internal volume",
  FinsPitch: "Fins pitch",
  CustomerCode: "Customer code",
  CoilFinnedLength: "Coil finned length",
  TubesNumber: "Tubes number",
  TubeThickness: "Tube thickness",
  CoilOverallLength: "Coil overall length",
  CoilOverallHeight: "Coil overall height",
  DropEliminatorPressureDrop: "Drop eliminator pressure drop",
  DrainTrayPrice: "Drain tray price",
  DropEliminatorPrice: "Drop eliminator price",
  NotUsed: "Not used",
  NumberOfCoils: "Number of coils",
  DistanceBetweenManifoldsX: "Distance between manifolds X for water coils",
  DistanceBetweenManifoldsY: "Distance between manifolds Y for water coils",
  NumberOfGasCircuit: "Number of gas circuit",
  CoilNeedsDrawingConfirmation: "Coil needs drawing confirmation",
  FrameThickness: "Frame thickness",
  WarningCode: "Warning code",
  FinsThickness: "Fins thickness",
  ConnectionSide: "Connection side",
  AirSidePressureDropDryMode: "Airside pressure drop dry mode",
  FrameLengthOnBendsSide: "Frame length on bends side"
};

const gasCircuitsOptions = {
  0: "Auto Selection",
  1: "1 Circuit",
  2: "2 Circuits",
  3: "3 Circuits",
  4: "4 Circuits",
  6: "6 Circuits"
};

// Update the error codes mapping to include all codes
const errorCodes = {
  '-99': 'Unknown error',
  '130': 'Maximum number of connected rows exceeded (steam coil)',
  '131': 'Steam velocity too high. Please contact DBM',
  '150': 'License expired',
  '151': 'Unable to load standard coils. Be sure to call InitLib() before StartJob()',
  '10100': 'Fin pitch not allowed',
  '10200': 'Wrong circuits number or wrong max liquid side pressure drop',
  '10300': 'Calculation type not specified',
  '10305': 'Invalid gas or liquid temperatures',
  '10306': 'Wrong liquid temperature. Minimum temperature difference is 1°C between air and liquid, suggested value is 3C°',
  '10310': 'Invalid fin pitch for ratings mode',
  '10400': 'Wrong liquid type',
  '10500': 'Wrong user specified liquid properties',
  '10600': 'Liquid outlet temp. and liquid volume not specified',
  '10700': 'Incorrect tubes number or coil height',
  '10750': 'Incorrect coil length',
  '10800': 'Incorrect inlet air condition',
  '10900': 'Incorrect gas side volume or weight',
  '11000': 'Wrong coil type',
  '11010': 'Wrong frame code',
  '11020': 'Invalid fin thickness or fins pitch',
  '11030': 'Invalid tube thickness',
  '11040': 'Invalid header material',
  '11050': 'Invalid tube material',
  '11070': 'Overall length or height not specified correctly',
  '11080': 'Steam coils dimensions invalid',
  '11090': 'Invalid steam coil execution: valid values for input[46] are 1,3,6',
  '11100': 'Invalid temperature or pressure for evaporator or condenser',
  '11200': 'Invalid inlet refrigerant conditions ( error in computing vapour fraction)',
  '11300': 'Condenser or evaporator module not found',
  '11310': 'Evaporating temperature is too low (minimum value -20°C)',
  '11320': 'Minimum fins pitch is 3.0 ( see direct expansion coil selection note)',
  '11330': 'ETAM is available only for CuSn tubes and fins',
  '11340': 'Invalid basin type or material',
  '11350': 'Invalid drop eliminator',
  '11360': 'Invalid packing code',
  '11370': 'Invalid flange material',
  '11380': 'Invalid flange type',
  '11390': 'Flanges must be selected for this temperature conditions',
  '11400': 'Error in price calculation. Check for przinfo.dtl file',
  '11401': 'Error with tubes price',
  '11402': 'Error with fins price',
  '11403': 'Error with frame price',
  '11404': 'Error with inlet manifold price',
  '11405': 'Error with outlet manifold price',
  '11410': 'Invalid number of rows or circuits',
  '11420': 'Maximum fin pitch for AlMg is 3.0 mm',
  '11430': 'Tube temperature is too high for the selected material and thickness',
  '11440': 'Minimum temperature is -45°',
  '11450': 'Maximum copper manifold temperature is 160°C. Select Steel manifold',
  '11460': 'Minimum temperature is -10° for steel tubes and manifolds',
  '11470': 'Wrong package code',
  '19000': 'Invalid tube thickness. Check the minimum tube thickness based on selection type and geometry type. Expecially for R410 selection, due to working limits, is often necessary to set 1.0 mm tube thickness',
  '40000': 'Number of circuit not valid. Decrease number of circuit, increase max pressure drop or increase liquid volume',
  '41000': 'The difference between input temperature must be at least 3°C',
  '41110': 'It is suggested to use ARI calculation mode',
  '41120': 'It is suggested to use ARI mode and a fin pitch of 3.0 mm or wider',
  '41140': 'It is suggested a fin pitch of 2.5 minimum',
  '41150': 'The results cannot be guaranteed in this working conditions',
  '41160': 'The results need DBM check',
  '41170': 'It is suggested to use glycol',
  '41180': 'It is not possible to select air velocity and overall length',
  '41190': 'Steam velocity too high. Please contact DBM'
};

// Define parameters for each calculation type
const calculationTypeParams = {
  // Monophase (1)
  '1': {
    required: {
      'CalculationType': 'Calculation Type',
      'CoilType': 'Coil Type',
      'AirInTemperature': 'Air Inlet Temperature',
      'AirInHumidity': 'Humidity',
      'AirInFlowStandard': 'Airflow',
      'FluidType': 'Fluid Type',
      'FluidTempIn': 'Fluid Inlet Temperature',
      'FluidTempOut': 'Fluid Outlet Temperature',
      'FluidFlow_dm3s': 'GPM',
      'NoRows': 'Number of Rows',
      'FinPitch': 'Fin Pitch',
      'DimensionType': 'Dimension Type'
    },
    optional: {
      'HeaderMaterial': 'Header Material',
      'FinsMaterial': 'Fins Material',
      'TubeMaterial': 'Tube Material',
      'TubeThickness': 'Tube Thickness',
      'FinsThickness': 'Fins Thickness',
      'NoCircuits': 'Number of Circuits'
    }
  },
  // Direct expansion (2)
  '2': {
    required: {
      'CalculationType': 'Calculation Type',
      'CoilType': 'Coil Type',
      'AirInTemperature': 'Air Inlet Temperature',
      'AirInHumidity': 'Humidity',
      'AirInFlowStandard': 'Airflow',
      'EvaporatingTemperature': 'Evaporating Temperature',
      'SuperHeating': 'Super Heating',
      'NoRows': 'Number of Rows',
      'FinPitch': 'Fin Pitch',
      'DimensionType': 'Dimension Type'
    },
    optional: {
      'HeaderMaterial': 'Header Material',
      'FinsMaterial': 'Fins Material',
      'TubeMaterial': 'Tube Material',
      'TubeThickness': 'Tube Thickness',
      'FinsThickness': 'Fins Thickness',
      'NoCircuits': 'Number of Circuits'
    }
  },
  // Condenser (3)
  '3': {
    required: {
      'CalculationType': 'Calculation Type',
      'CoilType': 'Coil Type',
      'AirInTemperature': 'Air Inlet Temperature',
      'AirInHumidity': 'Humidity',
      'AirInFlowStandard': 'Airflow',
      'CondensingTemperature': 'Condensing Temperature',
      'SubCooling': 'Sub Cooling',
      'NoRows': 'Number of Rows',
      'FinPitch': 'Fin Pitch',
      'DimensionType': 'Dimension Type'
    },
    optional: {
      'HeaderMaterial': 'Header Material',
      'FinsMaterial': 'Fins Material',
      'TubeMaterial': 'Tube Material',
      'TubeThickness': 'Tube Thickness',
      'FinsThickness': 'Fins Thickness',
      'NoCircuits': 'Number of Circuits'
    }
  }
};

// Add this with your other option definitions
const dimensionTypeOptions = {
  'OverallDimensions': 'Overall Width/Height',
  'CoilDimensions': 'Coil Width/Height'
};

// Add tube thickness mapping based on coil type
const tubeThicknessOptions = {
  'P40': [0.4, 0.75, 1.00],
  'P3012': [0.35, 0.6],
  'P25': [0.30, 0.50],
  'P60': [0.4, 0.75, 1.00]  // Assuming P60 uses same as P40, adjust if different
};

// Define default values for different calculation types
const defaultValuesByType = {
  '1': {  // Monophase
    CoilType: 1,
    AirInTemperature: 26,
    AirInHumidity: 50,
    AirInFlowStandard: 25000,
    HeaderMaterial: 1,
    NoRows: 3,
    FinPitch: 2,
    NoCircuits: 9,
    FluidFlow_dm3s: 12,
    FluidTempIn: 8,
    FluidTempOut: 18,
    WorkingPressure_bar: 1.013,
    FrameCode: 16,
    PriceMultiplier: 1,
    FinsMaterial: 1,
    FinsThickness: 0.2,
    TubeThickness: 0.35,
    TubeMaterial: 1,
    InletManifoldDiameter: 5,
    OutletManifoldDiameter: 5,
    OverallDimensionWidth: 947,
    OverallDimensionHeight: 444,
    FluidType: 1
  },
  '2': {  // Direct Expansion
    CoilType: 2,
    AirInTemperature: 26,
    AirInHumidity: 50,
    AirInFlowStandard: 25000,
    HeaderMaterial: 1,
    NoRows: 3,
    FinPitch: 2,
    NoCircuits: 9,
    OverallDimensionWidth: 947,
    OverallDimensionHeight: 444,
    WorkingPressure_bar: 1.013,
    FrameCode: 16,
    PriceMultiplier: 1,
    FinsMaterial: 1,
    FinsThickness: 0.2,
    TubeThickness: 0.35,
    TubeMaterial: 1,
    InletManifoldDiameter: 5,
    OutletManifoldDiameter: 5,
    EvaporatingTemperature: 5,
    SuperHeating: 5,
    FluidType: 2
  },
  '3': {  // Condenser
    CoilType: 3,
    AirInTemperature: 26,
    AirInHumidity: 50,
    AirInFlowStandard: 25000,
    HeaderMaterial: 1,
    NoRows: 3,
    FinPitch: 2,
    NoCircuits: 9,
    OverallDimensionWidth: 947,
    OverallDimensionHeight: 444,
    WorkingPressure_bar: 1.013,
    FrameCode: 16,
    PriceMultiplier: 1,
    FinsMaterial: 1,
    FinsThickness: 0.2,
    TubeThickness: 0.35,
    TubeMaterial: 1,
    InletManifoldDiameter: 5,
    OutletManifoldDiameter: 5,
    CondensingTemperature: 45,
    SubCooling: 3,
    FluidType: 2
  }
};

// Add default values constant with the exact backend values
const defaultValues = {
  CoilType: 2,
  AirInTemperature: 26,
  AirInHumidity: 50,
  AirInAbsHumidity: 0,
  AirInWetBulb: 0,
  AirInFlowStandard: 25000,
  AirInFlowNormal: 0,
  AirInFlowActual: 0,
  HeaderMaterial: 1,
  AirWeight_kgh: 0,
  AirWeight_kgs: 0,
  NoRows: 3,
  NoTubes: 0,
  FinPitch: 2,
  NoCircuits: 9,
  CoilWidth: 1500,
  CoilHeight: 1600,
  Capacity_kCalh: 0,
  CapacitykW_kW: 0,
  AirOutTemperature: 0,
  AirInVelocityStandard: 0,
  AirInVelocityNormal: 0,
  AirInVelocityActual: 0,
  FluidFlow_dm3s: 12,
  FluidFlow2_dm3h: 0,
  FluidTempIn: 8,
  FluidTempOut: 18,
  FluidWeight: 0,
  FluidWeightkgH: 0,
  MaxAllowedFluidSidePressureDrop: 0,
  WorkingPressure_bar: 1.013,
  WorkingPressure_atm: 0,
  WorkingPressure_kpa: 0,
  WorkingPressure_kgm2: 0,
  WorkingPressure_mmHg: 0,
  WorkingPressureMMH20: 0,
  TubeSideFoulingFactor: 0,
  GlycolType: 0,
  GlycolPercentageByVolume: 0,
  GlycolPercentageByWieght: 0,
  SafetyFactorOnSurface: 0,
  SafetyFactorOnCapacity: 0,
  FluidType: 0,
  FluidDensity: 0,
  FluidVicosity: 0,
  FluidSpecificHeat: 0,
  FluidConductivity: 0,
  FrameCode: 16,
  PriceMultiplier: 1,
  FoulingFactorFinsSide: 0,
  CondensingPressure: 0,
  CondensingTemperature: 0,
  EvaporatingPressure: 0,
  EvaporatingTemperature: 0,
  SubCooling: 0,
  SuperHeating: 0,
  TypeOfCalculation: 0,
  FinsMaterial: 1,
  FinsThickness: 0.2,
  TubeThickness: 0.35,
  Flanges: 0,
  TubeMaterial: 1,
  CustomerField1: 0,
  CustomerField2: 0,
  CustomerField3: 0,
  ConnectionSide: 0,
  OveralldimensionWidth: 0,
  ARIVersion: 0,
  TypeOfFins: 0,
  AutomaticCoilSelection: 0,
  NumberOfGasCircuits: 0,
  OverallDimensionHeight: 0,
  SteamCoilExecutionType: 0,
  ElectroTinnedAfterManufacturing: 0,
  CalculationMode: 0,
  InletManifoldDiameter: 5,
  OutletManifoldDiameter: 5,
  BasinType: 0,
  DropEliminator: 0,
  PackingType: 0,
  MinheightofBottomFrameMetalSheet: 0,
  MinheightofTopFrameMetalSheet: 0,
  TypeOfFlow: 0
};

// Add a function to set default values
const setDefaultValues = () => {
  setParams(defaultValues);
  setDimensionType('OverallDimensions');  // Set dimension type to Overall
};

// Update your component to use these values as initial state
export default function CoilCalculator() {
  // Update calculation type options
  const calculationTypeOptions = {
    '1': 'Monophase',
    '2': 'Direct Expansion',
    '3': 'Condenser'
  };

  // Add refrigerant options
  const refrigerantOptions = {
    'R410': 'R410',
    'R32': 'R32',
    'R22': 'R22',
    'R134A': 'R134A'
  };

  // Add glycol type options
  const glycolTypeOptions = {
    '1': 'Ethylenic',
    '2': 'Propylenic'
  };

  // Update getVisibleParams to be dynamic based on calculation type
  const getVisibleParams = () => {
    const commonParams = {
      CalculationType: { 
        key: 'CalculationType', 
        label: 'Calculation Type', 
        required: true,
        type: 'select',
        options: calculationTypeOptions
      },
      CoilType: { 
        key: 'CoilType', 
        label: 'Coil Type', 
        required: true,
        type: 'select',
        options: coilTypeOptions
      },
      AirInTemperature: { 
        key: 'AirInTemperature', 
        label: 'Air Inlet Temperature', 
        required: true,
        type: 'number'
      },
      AirInHumidity: { 
        key: 'AirInHumidity', 
        label: 'Air Inlet Humidity', 
        required: true,
        type: 'number'
      },
      AirInFlowStandard: { 
        key: 'AirInFlowStandard', 
        label: 'Air Flow', 
        required: true,
        type: 'number'
      },
      NoRows: { 
        key: 'NoRows', 
        label: 'Number of Rows', 
        required: true,
        type: 'number'
      },
      NoTubes: { 
        key: 'NoTubes', 
        label: 'Number of Tubes', 
        required: true,
        type: 'number'
      },
      FinPitch: { 
        key: 'FinPitch', 
        label: 'Fin Pitch', 
        required: true,
        type: 'number'
      },
      DimensionType: { 
        key: 'DimensionType', 
        label: 'Dimension Type', 
        required: true,
        type: 'dimension'
      }
    };

    // Add calculation-type specific parameters
    switch (params.CalculationType) {
      case '1': // Monophase
        return {
          ...commonParams,
          FluidType: { 
            key: 'FluidType', 
            label: 'Fluid Type', 
            required: true,
            type: 'select',
            options: { '1': 'Water' }
          },
          GlycolType: {
            key: 'GlycolType',
            label: 'Glycol Type',
            required: true,
            type: 'select',
            options: glycolTypeOptions
          },
          GlycolPercentageByVolume: {
            key: 'GlycolPercentageByVolume',
            label: 'Glycol Percentage',
            required: true,
            type: 'number'
          },
          FluidTempIn: { 
            key: 'FluidTempIn', 
            label: 'Fluid Temperature In', 
            required: true,
            type: 'number'
          },
          FluidTempOut: { 
            key: 'FluidTempOut', 
            label: 'Fluid Temperature Out', 
            required: true,
            type: 'number'
          },
          FluidFlow_dm3s: { 
            key: 'FluidFlow_dm3s', 
            label: 'GPM', 
            required: true,
            type: 'number'
          },
          NoCircuits: {
            key: 'NoCircuits',
            label: 'Number of Circuits',
            required: true,
            type: 'number'
          }
        };

      case '2': // Direct Expansion
      case '3': // Condenser
        return {
          ...commonParams,
          RefrigerantType: {
            key: 'RefrigerantType',
            label: 'Refrigerant Type',
            required: true,
            type: 'select',
            options: refrigerantOptions
          },
          EvaporatingTemperature: {
            key: 'EvaporatingTemperature',
            label: 'Evaporating Temperature',
            required: true,
            type: 'number'
          },
          CondensingTemperature: {
            key: 'CondensingTemperature',
            label: 'Condensing Temperature',
            required: true,
            type: 'number'
          },
          NoCircuits: {
            key: 'NoCircuits',
            label: 'Number of Circuits',
            required: true,
            type: 'number'
          },
          SuperHeating: {
            key: 'SuperHeating',
            label: 'DT Superheating',
            required: true,
            type: 'number'
          },
          NumberOfGasCircuits: {
            key: 'NumberOfGasCircuits',
            label: 'Gas Circuits Configuration',
            required: true,
            type: 'number'
          }
        };

      default:
        return commonParams;
    }
  };

  // Update initial values
  const initialValues = {
    CalculationType: "1",
    CoilType: "2",
    AirInTemperature: "26",
    AirInHumidity: "50",
    AirInFlowStandard: "25000",
    NoRows: "3",
    NoTubes: "30",
    FinPitch: "2",
    FluidType: "1",
    GlycolType: "1",
    GlycolPercentageByVolume: "0",
    FluidTempIn: "8",
    FluidTempOut: "18",
    FluidFlow_dm3s: "12",
    NoCircuits: "9",
    OverallDimensionWidth: "947",
    OverallDimensionHeight: "444",
    // Add other default values as needed
  };

  // Initialize state with default values
  const [dimensionType, setDimensionType] = useState('OverallDimensions');
  const [params, setParams] = useState<any>(initialValues);

  // Options for dropdowns
  const coilTypeOptions = {
    '94': 'P40',
    '113': 'P25',
    '2': 'P3012'
  };

  const fluidTypeOptions = {
    '1': 'Water',
    '2': 'Glycol',
    '3': 'Refrigerant'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderDimensionFields = () => {
    const isCoilDimensions = dimensionType === 'CoilDimensions';
    const widthKey = isCoilDimensions ? 'CoilWidth' : 'OverallDimensionWidth';
    const heightKey = isCoilDimensions ? 'CoilHeight' : 'OverallDimensionHeight';
    const labelPrefix = isCoilDimensions ? 'Coil' : 'Overall';

    const baseInputClasses = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition-all duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

    return (
      <div className="space-y-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Dimension Type</Label>
            <select
              value={dimensionType}
              onChange={(e) => {
                setDimensionType(e.target.value);
                setParams(prev => ({
                  ...prev,
                  CoilWidth: '',
                  CoilHeight: '',
                  OverallDimensionWidth: '',
                  OverallDimensionHeight: ''
                }));
              }}
              className={baseInputClasses}
            >
              <option value="OverallDimensions">Overall Width/Height</option>
              <option value="CoilDimensions">Coil Width/Height</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor={widthKey} className="text-sm font-medium text-gray-700">
              {`${labelPrefix} Width (mm)`}
            </Label>
            <Input
              id={widthKey}
              name={widthKey}
              type="number"
              value={params[widthKey] || ''}
              onChange={handleInputChange}
              step="any"
              className={baseInputClasses}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={heightKey} className="text-sm font-medium text-gray-700">
              {`${labelPrefix} Height (mm)`}
            </Label>
            <Input
              id={heightKey}
              name={heightKey}
              type="number"
              value={params[heightKey] || ''}
              onChange={handleInputChange}
              step="any"
              className={baseInputClasses}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/startJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputsData: params,
          optionsData: [0]
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const resultsUrl = `/results?result=${encodeURIComponent(JSON.stringify(data))}`;
        window.open(resultsUrl, '_blank');
      } else {
        alert('Error calculating results');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error calculating results');
    }
  };

  const renderField = (paramKey: string, fieldConfig: any) => {
    if (fieldConfig.type === 'dimension') {
      return renderDimensionFields();
    }

    const baseInputClasses = "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition-all duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

    if (fieldConfig.type === 'select') {
      return (
        <select
          id={paramKey}
          name={paramKey}
          value={params[paramKey] || ''}
          onChange={handleInputChange}
          className={baseInputClasses}
        >
          <option value="">Select {fieldConfig.label}</option>
          {Object.entries(fieldConfig.options).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <Input
        id={paramKey}
        name={paramKey}
        type={fieldConfig.type}
        value={params[paramKey] || ''}
        onChange={handleInputChange}
        step="any"
        className={baseInputClasses}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 border-b border-gray-100 bg-white/50">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Coil Calculator
            </CardTitle>
            <p className="text-sm text-gray-500">
              Enter the parameters below to calculate coil specifications
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(getVisibleParams()).map(([key, fieldConfig]) => (
                  <div 
                    key={fieldConfig.key} 
                    className={fieldConfig.type === 'dimension' ? 'md:col-span-2' : ''}
                  >
                    <div className="space-y-2">
                      <Label 
                        htmlFor={fieldConfig.key}
                        className="text-sm font-medium text-gray-700"
                      >
                        {fieldConfig.label}
                        {fieldConfig.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </Label>
                      <div className="relative">
                        {renderField(fieldConfig.key, fieldConfig)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <Button 
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-150 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  Calculate
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

