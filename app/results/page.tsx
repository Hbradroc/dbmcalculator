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
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
  }

  if (!result) {
    return <div>No results found</div>
  }

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
              {Object.entries(result).map(([key, value]) => (
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
