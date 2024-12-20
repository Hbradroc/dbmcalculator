"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoilParams } from '../types/coilParams';
import { Mail, Linkedin } from 'lucide-react';

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

// Update the mapping to show only inch values in UI
const manifoldDiameters = {
  '2': '¾"',
  '3': '1"',
  '4': '1¼"',
  '5': '1½"',
  '6': '2"',
  '7': '2½"',
  '8': '3"',
  '9': '4"',
  '10': '5"'
};

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

  const [calculationBasedOn, setCalculationBasedOn] = useState('Rows');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create a copy of params to modify
      const submitParams = { ...params };

      // Update values based on calculation selection
      if (calculationBasedOn === 'Rows') {
        submitParams.NoRows = Number(submitParams.CalculationValue) || 0;
        submitParams.Airoutlettemperature = 0;
      } else {
        submitParams.Airoutlettemperature = Number(submitParams.CalculationValue) || 0;
        submitParams.NoRows = 0;
      }

      // Ensure NoCircuits is a number or default to 0
      submitParams.NoCircuits = Number(submitParams.NoCircuits) || 0;

      // Remove the calculation fields from the payload
      delete submitParams.CalculationBasedOn;
      delete submitParams.CalculationValue;

      const response = await fetch('/api/startJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputsData: submitParams,
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
    if (name === 'CalculationBasedOn') {
      setCalculationBasedOn(value);
    }
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
    const calculationType = params.CalculationType;
    
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
      CalculationBasedOn: {
        key: 'CalculationBasedOn',
        label: 'Calculation Based On',
        required: true,
        type: 'select' as const,
        options: {
          'Rows': 'Rows',
          'OutletTemperature': 'Outlet Temperature'
        }
      },
      CalculationValue: {
        key: 'CalculationValue',
        label: calculationBasedOn === 'Rows' ? 'Number of Rows' : 'Outlet Temperature',
        required: true,
        type: 'number' as const
      },
      InletManifoldDiameter: {
        key: 'InletManifoldDiameter',
        label: 'Inlet Manifold Diameter',
        required: true,
        type: 'select' as const,
        options: manifoldDiameters
      },
      OutletManifoldDiameter: {
        key: 'OutletManifoldDiameter',
        label: 'Outlet Manifold Diameter',
        required: true,
        type: 'select' as const,
        options: manifoldDiameters
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
    if (Number(calculationType) === 1) {
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
    if (Number(calculationType) === 2 || Number(calculationType) === 3) {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4">
      <div className="absolute top-2 right-4 flex items-center gap-2 text-gray-600">
        <a 
          href="mailto:hbradroc@uwo.ca" 
          className="flex items-center hover:text-gray-900 transition-colors"
          title="Email"
        >
          <Mail className="h-4 w-4" />
        </a>
        <a 
          href="https://linkedin.com/in/harrybradrocco" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center hover:text-gray-900 transition-colors"
          title="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>

      <div className="container mx-auto px-6 max-w-[95%]">
        <Card className="shadow-xl border-0 bg-white/80">
          <CardHeader className="space-y-1 border-b border-gray-100 bg-white/50 py-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              DBM Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(getVisibleParams()).map(([key, fieldConfig]) => (
                  <div 
                    key={fieldConfig.key} 
                    className={fieldConfig.type === 'dimension' ? 'sm:col-span-2 lg:col-span-3' : ''}
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

