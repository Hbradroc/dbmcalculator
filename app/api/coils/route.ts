import { NextResponse } from 'next/server';

const API_BASE_URL = 'https://systemaircanada.dll-cloud.se/dbm/coils/2.1.4.17/v1';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/Coils`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching coils:', error);
    return NextResponse.json({ error: 'Failed to fetch coils' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${API_BASE_URL}/Coils`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating coil:', error);
    return NextResponse.json({ error: 'Failed to create coil' }, { status: 500 });
  }
}

