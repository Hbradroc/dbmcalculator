import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://systemaircanada.dll-cloud.se/dbm/coils/2.1.4.17/v1/StartJob'
const API_KEY = process.env.API_KEY

if (!API_KEY) {
  console.error('API_KEY is not set in the environment variables')
}

export async function POST(request: Request) {
  const body = await request.json()
  
  try {
    console.log('Preparing to send request to API...');
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY || '',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
    })

    console.log('API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API responded with status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()
    console.log('API response data:', data);
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Detailed error:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';

    return NextResponse.json({ 
      error: 'Failed to process request', 
      details: errorMessage 
    }, { 
      status: 500 
    });
  }
}

