"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoilParams } from '../types/coilParams';

// Define the allowed field types
type FieldType = 'number' | 'select' | 'dimension';

// Update the FieldConfig interface
interface FieldConfig {
  key: string;
  label: string;
  required: boolean;
  type: FieldType;
  options?: Record<string, string>;
}

export default function CoilCalculator() {
  const [dimensionType, setDimensionType] = useState('OverallDimensions');
  const [params, setParams] = useState<CoilParams>({
    CoilType: 2,
    AirInTemperature: 26,
    AirInHumidity: 50,
    AirInFlowStandard: 25000,
    NoRows: 3,
    NoTubes: 30,
    FinPitch: 2,
    FluidType: 1,
    GlycolType: 1,
    GlycolPercentageByVolume: 0,
    FluidTempIn: 8,
    FluidTempOut: 18,
    FluidFlow_dm3s: 12,
    NoCircuits: 9,
    OverallDimensionWidth: 947,
    OverallDimensionHeight: 444,
    AutomaticCoilSelection: 0,
    NumberOfGasCircuits: 0,
    SteamCoilExecutionType: 0,
    ElectroTinnedAfterManufacturing: 0,
    CalculationMode: 0,
    HeaderMaterial: 1,
    CalculationType: 1
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value
    }));
  };

  // Update renderField with proper typing
  const renderField = (paramKey: string, fieldConfig: FieldConfig) => {
    if (fieldConfig.type === 'dimension') {
      return renderDimensionFields();
    }

    if (fieldConfig.type === 'select' && fieldConfig.options) {
      return (
        <select
          id={paramKey}
          name={paramKey}
          value={params[paramKey] || ''}
          onChange={handleInputChange}
          className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
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
      />
    );
  };

  const renderDimensionFields = () => {
    const isCoilDimensions = dimensionType === 'CoilDimensions';
    const widthKey = isCoilDimensions ? 'CoilWidth' : 'OverallDimensionWidth';
    const heightKey = isCoilDimensions ? 'CoilHeight' : 'OverallDimensionHeight';
    const labelPrefix = isCoilDimensions ? 'Coil' : 'Overall';

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
                  CoilWidth: 0,
                  CoilHeight: 0,
                  OverallDimensionWidth: 0,
                  OverallDimensionHeight: 0
                }));
              }}
              className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
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
            />
          </div>
        </div>
      </div>
    );
  };

  // Update getVisibleParams to use the FieldConfig type
  const getVisibleParams = (): Record<string, FieldConfig> => {
    const calculationType = String(params.CalculationType);
    
    // Common parameters for all types
    const commonParams: Record<string, FieldConfig> = {
      CalculationType: { 
        key: 'CalculationType', 
        label: 'Calculation Type', 
        required: true,
        type: 'select' as const,
        options: {
          '1': 'Monophase',
          '2': 'Direct Expansion',
          '3': 'Condenser'
        }
      },
      CoilType: { 
        key: 'CoilType', 
        label: 'Coil Type', 
        required: true,
        type: 'select' as const,
        options: {
          '94': 'P40',
          '113': 'P25',
          '2': 'P3012'
        }
      },
      AirInTemperature: { 
        key: 'AirInTemperature', 
        label: 'Air Inlet Temperature', 
        required: true,
        type: 'number' as const
      },
      AirInHumidity: { 
        key: 'AirInHumidity', 
        label: 'Air Inlet Humidity', 
        required: true,
        type: 'number' as const
      },
      AirInFlowStandard: { 
        key: 'AirInFlowStandard', 
        label: 'Air Flow', 
        required: true,
        type: 'number' as const
      },
      NoRows: { 
        key: 'NoRows', 
        label: 'Number of Rows', 
        required: true,
        type: 'number' as const
      },
      NoTubes: {
        key: 'NoTubes',
        label: 'Number of Tubes',
        required: true,
        type: 'number' as const
      },
      FinPitch: {
        key: 'FinPitch',
        label: 'Fin Pitch',
        required: true,
        type: 'number' as const
      },
      DimensionType: { 
        key: 'DimensionType', 
        label: 'Dimensions', 
        required: true,
        type: 'dimension' as const
      }
    };

    // Monophase specific parameters
    if (calculationType === '1' || calculationType === 1) {
      return {
        ...commonParams,
        FluidType: {
          key: 'FluidType',
          label: 'Fluid Type',
          required: true,
          type: 'select' as const,
          options: {
            '1': 'Water',
            '2': 'Ethylenic Glycol',
            '3': 'Propylenic Glycol'
          }
        },
        GlycolPercentageByVolume: {
          key: 'GlycolPercentageByVolume',
          label: 'Glycol Percentage',
          required: true,
          type: 'number' as const
        },
        FluidTempIn: {
          key: 'FluidTempIn',
          label: 'Fluid Temperature In',
          required: true,
          type: 'number' as const
        },
        FluidTempOut: {
          key: 'FluidTempOut',
          label: 'Fluid Temperature Out',
          required: true,
          type: 'number' as const
        },
        FluidFlow_dm3s: {
          key: 'FluidFlow_dm3s',
          label: 'Fluid Flow (dm³/s)',
          required: true,
          type: 'number' as const
        },
        NoCircuits: {
          key: 'NoCircuits',
          label: 'Number of Circuits',
          required: true,
          type: 'number' as const
        }
      };
    }

    // Direct Expansion and Condenser specific parameters
    if (calculationType === '2' || calculationType === 2 || 
        calculationType === '3' || calculationType === 3) {
      return {
        ...commonParams,
        RefrigerantType: {
          key: 'RefrigerantType',
          label: 'Refrigerant Type',
          required: true,
          type: 'select' as const,
          options: {
            'R410': 'R410',
            'R32': 'R32',
            'R22': 'R22',
            'R134A': 'R134A'
          }
        },
        EvaporatingTemperature: {
          key: 'EvaporatingTemperature',
          label: 'Evaporating Temperature',
          required: true,
          type: 'number' as const
        },
        CondensingTemperature: {
          key: 'CondensingTemperature',
          label: 'Condensing Temperature',
          required: true,
          type: 'number' as const
        },
        NoCircuits: {
          key: 'NoCircuits',
          label: 'Number of Circuits',
          required: true,
          type: 'number' as const
        },
        DTSuperheating: {
          key: 'DTSuperheating',
          label: 'DT Superheating',
          required: true,
          type: 'number' as const
        },
        GasCircuitsConfiguration: {
          key: 'GasCircuitsConfiguration',
          label: 'Gas Circuits Configuration',
          required: true,
          type: 'number' as const
        }
      };
    }

    return commonParams;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-xl border-0 bg-white/80">
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
                      {renderField(fieldConfig.key, fieldConfig)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <Button 
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
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

