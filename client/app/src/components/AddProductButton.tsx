import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AddProductButton() {
  return (
    <Button className="flex items-center font-semibold">
      <Plus className="h-4 w-4" />
      <Link href={'/productos/new'}>Agregar Producto</Link>
    </Button>
  )
}
