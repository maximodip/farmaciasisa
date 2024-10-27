import { NextRequest, NextResponse } from 'next/server'

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

    const res = await fetch(`http://localhost:8080/products/${numericId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 404) {
      return NextResponse.json({ error: 'product not found' }, { status: 404 })
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: res.status }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
