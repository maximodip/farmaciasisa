import { NextResponse, NextRequest } from 'next/server'

export async function GET() {
  const res = await fetch('http://localhost:8080/customers')

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }

  const customers = await res.json()
  return NextResponse.json(customers)
}

export async function POST(req: NextRequest) {
  const { name, phone, dni, address } = await req.json()

  const res = await fetch('http://localhost:8080/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, phone, dni, address }),
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }

  const data = await res.json()
  return NextResponse.json(data, { status: 201 })
}
