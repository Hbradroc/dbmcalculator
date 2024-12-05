'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin } from 'lucide-react'

function ResultsContent() {
  const searchParams = useSearchParams()
  const resultParam = searchParams.get('result')
  const result = resultParam ? JSON.parse(resultParam) : null

  // Function to format the key
  const formatKey = (key: string) => {
    // Dictionary of exact matches for special cases
    const exactMatches: Record<string, string> = {
      'airoutlettemperature': 'Air outlet temperature',
      'airoutletrelativehumidity': 'Air outlet relative humidity',
      'airoutletabsolutehumidity': 'Air outlet absolute humidity',
      'fluidoutlettemperature': 'Fluid outlet temperature',
      'fluidvolume': 'Fluid volume Dm',
      'fluidweight': 'Fluid weight Kg',
      'airsidepressuredrop': 'Airside pressure drop',
      'fluidsidepressuredrop': 'Fluid side pressure drop',
      'coilheight': 'Coil height',
      'coildepth': 'Coil depth',
      'ddimension': 'Ddimension',
      'gasvelocity': 'Gas velocity',
      'fluidvelocity': 'Fluid velocity',
      'fluiddensity': 'Fluid density',
      'fluidviscosity': 'Fluid viscosity',
      'fluidspecificheat': 'Fluid specific heat',
      'fluidconductivity': 'Fluid conductivity',
      'sensibleheat': 'Sensible Heat',
      'condensedwater': 'Condensed water',
      'norows': 'Number of rows',
      'nocircuits': 'Number of circuits',
      'coilweight': 'Coil weight',
      'totalexchangesurface': 'Total exchange surface',
      'inletairrelativehumidity': 'Inlet air relative humidity',
      'internalvolume': 'Internal volume',
      'finspitch': 'Fins pitch',
      'coilfinnedlength': 'Coil finned length',
      'tubesnumber': 'Tubes number',
      'tubethickness': 'Tube thickness',
      'coiloveralllength': 'Coil overall length',
      'coiloverallheight': 'Coil overall height',
      'dropeliminator': 'Drop eliminator pressure drop',
      'numberofcoils': 'Number of coils',
      'distancebetweenmanifolds': 'Distance between manifolds',
      'framethickness': 'Frame thickness',
      'finsthickness': 'Fins thickness',
      'connectionside': 'Connection side',
      'airsidepressuredropdrymode': 'Airside pressure drop dry mode',
      'framelengthonbendsside': 'Frame length on bends side'
    };

    // Convert the key to lowercase for matching
    const lowercaseKey = key.toLowerCase();

    // Return exact match if it exists
    if (exactMatches[lowercaseKey]) {
      return exactMatches[lowercaseKey];
    }

    // Fallback to the original formatting for any unmatched keys
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  };

  if (!result) {
    return <div>No results found</div>
  }

  const nonZeroResults = Object.entries(result).filter(([_, value]) => value !== 0)
  const zeroResults = Object.entries(result).filter(([_, value]) => value === 0)

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

      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-xl border-0 bg-white/80">
          <CardHeader className="space-y-1 border-b border-gray-100 bg-white/50 py-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="space-y-2">
              {nonZeroResults.map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-3 py-1 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-sm">{formatKey(key)}</span>
                  <span className="text-sm">
                    {typeof value === 'object' 
                      ? JSON.stringify(value) 
                      : String(value ?? '')}
                  </span>
                </div>
              ))}
            </div>
            {zeroResults.length > 0 && (
              <details className="mt-4">
                <summary className="font-medium text-sm text-gray-700 cursor-pointer">
                  Unused Variables
                </summary>
                <div className="mt-2 space-y-2">
                  {zeroResults.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-3 py-1 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-sm">{formatKey(key)}</span>
                      <span className="text-sm">
                        {typeof value === 'object' 
                          ? JSON.stringify(value) 
                          : String(value ?? '')}
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Loading component
function LoadingResults() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-xl border-0 bg-white/80">
          <CardHeader>
            <CardTitle>Loading Results...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Main component wrapped in Suspense
export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingResults />}>
      <ResultsContent />
    </Suspense>
  )
}
