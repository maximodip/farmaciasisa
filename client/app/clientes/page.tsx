'use client'
import { useState } from 'react'
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
import { useRouter } from 'next/navigation'

export default function ClientCreationForm() {
  const [name, setName] = useState('')
  const [dni, setDni] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, dni, address }),
      })
      if (!res.ok) {
        throw new Error('Failed to create client')
      }
      setName('')
      setPhone('')
      setDni('')
      setAddress('')
      toast({ title: 'Éxito', description: 'Cliente creado exitosamente' })
      router.push('/')
    } catch {
      toast({
        title: 'Error',
        description: 'Error al crear el cliente',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crear Nuevo Cliente</CardTitle>
        <CardDescription>
          Ingrese los detalles del nuevo cliente
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Ingrese el nombre del cliente"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dni" className="text-sm font-medium">
              Dni
            </Label>
            <Input
              type="number"
              id="dni"
              placeholder="Ingrese el documento del cliente"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Teléfono
            </Label>
            <Input
              type="number"
              id="phone"
              placeholder="Ingrese el teléfono del cliente"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium">
              Dirección
            </Label>
            <Input
              type="text"
              id="address"
              placeholder="Ingrese la dirección del cliente"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Crear Cliente
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
