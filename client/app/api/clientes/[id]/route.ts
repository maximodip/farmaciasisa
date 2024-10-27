// app/api/clientes/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get ID from route parameter instead of search params
    const { id } = params

    // Validate if ID is numeric
    const numericId = parseInt(id)
    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid client ID format' },
        { status: 400 }
      )
    }

    const res = await fetch(`http://localhost:8080/customers/${numericId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 404) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch client data' },
        { status: res.status }
      )
    }

    const customer = await res.json()
    return NextResponse.json(customer)
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const numericId = parseInt(id)

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid client ID format' },
        { status: 400 }
      )
    }

    const res = await fetch(`http://localhost:8080/customers/${numericId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 404) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to delete client' },
        { status: res.status }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const numericId = parseInt(id)

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: 'Invalid client ID format' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { name, dni, phone, address } = body

    const res = await fetch(`http://localhost:8080/customers/${numericId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, dni, phone, address }),
    })

    if (res.status === 404) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to update client' },
        { status: res.status }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
