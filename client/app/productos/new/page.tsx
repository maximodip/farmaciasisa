'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

export default function NewProductForm() {
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number | ''>('')
  const [laboratory, setLaboratory] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, laboratory }),
      })
      if (!res.ok) {
        throw new Error('Failed to create product')
      }
      setName('')
      setPrice('')
      setLaboratory('')
      toast({ title: 'Éxito', description: 'Producto creado exitosamente' })
      router.push('/productos')
    } catch {
      alert('Failed to create product')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Agregar Nuevo Producto</CardTitle>
        <CardDescription>
          Ingrese los detalles del nuevo producto
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre del producto
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Ingrese el nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Precio
            </Label>
            <Input
              type="number"
              id="price"
              placeholder="Ingrese el precio del producto"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="laboratory" className="text-sm font-medium">
              Laboratorio
            </Label>
            <Input
              type="text"
              id="laboratory"
              placeholder="Ingrese el nombre del laboratorio"
              value={laboratory}
              onChange={(e) => setLaboratory(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Agregar Producto
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
