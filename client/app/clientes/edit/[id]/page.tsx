'use client'

import { Client } from '@/lib/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface EditClientPageProps {
  params: { id: string }
}

export default function EditClientPage({ params }: EditClientPageProps) {
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    phone: '',
    address: '',
  })
  const router = useRouter()
  const { toast } = useToast()

  // Fetch client data
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clientes/${params.id}`)
        if (!res.ok) {
          if (res.status === 404) {
            notFound()
          }
          throw new Error('Failed to fetch client')
        }
        const data = await res.json()
        setClient(data)
        setFormData({
          name: data.name,
          dni: data.dni,
          phone: data.phone,
          address: data.address,
        })
      } catch {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error al cargar los datos del cliente',
        })
      }
    }

    fetchClient()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch(`/api/clientes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to update client')
      }

      toast({
        title: 'Cliente actualizado',
        description: 'Los datos del cliente han sido actualizados exitosamente',
      })

      // Navigate back to client details
      router.push(`/clientes/${params.id}`)
      router.refresh()
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error al actualizar el cliente',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!client) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold opacity-70">Editar Cliente</h1>
        <Link href={`/clientes/${params.id}`}>
          <Button variant="outline">Volver a detalles</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Cliente</CardTitle>
          <CardDescription>
            Actualiza los datos del cliente ID: {client.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nombre del cliente"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni">DNI</Label>
              <Input
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                placeholder="Número de documento"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Número de teléfono"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Dirección del cliente"
                required
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isLoading} className="font-bold">
                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
              <Link href={`/clientes/${params.id}`}>
                <Button variant="outline" type="button" className="font-bold">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
