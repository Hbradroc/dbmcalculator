export interface CoilParams {
  CoilType: number;
  AirInTemperature: number;
  AirInHumidity: number;
  AirInFlowStandard: number;
  NoRows: number;
  NoTubes: number;
  FinPitch: number;
  FluidType: number;
  GlycolType: number;
  GlycolPercentageByVolume: number;
  FluidTempIn: number;
  FluidTempOut: number;
  FluidFlow_dm3s: number;
  NoCircuits: number;
  OverallDimensionWidth: number;
  OverallDimensionHeight: number;
  AutomaticCoilSelection: number;
  NumberOfGasCircuits: number;
  SteamCoilExecutionType: number;
  ElectroTinnedAfterManufacturing: number;
  CalculationMode: number;
  HeaderMaterial: number;
  CalculationType: number;
  [key: string]: number | string;
}

