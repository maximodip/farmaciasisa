import { NextResponse, NextRequest } from 'next/server'

export async function getProducts() {
  const res = await fetch('http://localhost:8080/products')

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }

  const products = await res.json()
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const { name, price, laboratory } = await req.json()

  const res = await fetch('http://localhost:8080/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, laboratory }),
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }

  const data = await res.json()
  return NextResponse.json(data, { status: 201 })
}
