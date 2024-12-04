'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from 'next/navigation'

export default function Results() {
  const searchParams = useSearchParams()
  const resultData = searchParams.get('result')

  const formatResult = (resultData: any) => {
    if (!resultData) return null;
    try {
      const data = typeof resultData === 'string' ? JSON.parse(resultData) : resultData;
      return (
        <div className="space-y-2">
          {Object.entries(data).map(([key, value]) => {
            const formattedKey = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/(Dm|Kg)/g, ' $1')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
              .trim();

            return (
              <div key={key} className="grid grid-cols-2 gap-4">
                <span className="font-medium">{formattedKey}:</span>
                <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
              </div>
            );
          })}
        </div>
      );
    } catch (error) {
      return <div className="text-red-500">{String(resultData)}</div>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Calculation Results</CardTitle>
        </CardHeader>
        <CardContent>
          {resultData ? (
            formatResult(resultData)
          ) : (
            <div className="text-center text-gray-500">No results available</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
