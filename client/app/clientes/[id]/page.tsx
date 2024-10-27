// app/clientes/[id]/page.tsx
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
import { Badge } from '@/components/ui/badge'
import { Phone, User, CreditCard, IdCard, MapPinHouse } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'

interface ClientPageProps {
  params: { id: string }
}

export default function ClientPage({ params }: ClientPageProps) {
  const [client, setClient] = useState<Client | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
      } catch {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load client data',
        })
      }
    }

    fetchClient()
  }, [params.id])

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const res = await fetch(`/api/clientes/${params.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete client')
      }

      toast({
        title: 'Cliente eliminado',
        description: 'El cliente ha sido eliminado exitosamente',
      })

      // Navigate back to clients list
      router.push('/')
      router.refresh()
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error al borrar el cliente',
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  if (!client) {
    return null
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold opacity-70">Detalles</h1>
          <Link href="/">
            <Button variant="outline">Volver a clientes</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>{client.name}</CardTitle>
                <CardDescription>ID: {client.id}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Information */}
            <section className="flex w-full justify-between flex-wrap">
              <div className="">
                <h3 className="text-lg font-semibold mb-4">Teléfono</h3>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">DNI</h3>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <IdCard className="h-4 w-4" />
                  <span>{client.dni}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Dirección</h3>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPinHouse className="h-4 w-4" />
                  <span>{client.address}</span>
                </div>
              </div>
            </section>
            <Separator />

            {/* Accounts Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Cuentas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {client.accounts?.map((account, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {new Date(account.creationDate).toLocaleDateString(
                              'es-ES'
                            )}
                          </span>
                        </div>
                        <Badge variant="default" className="uppercase">
                          {account.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <Link className="font-medium" href={'/cuentas/new'}>
                          Nueva cuenta
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex space-x-4">
              <Button variant="outline" className="font-bold">
                <Link href={`/clientes/edit/${params.id}`}>Editar Cliente</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={isDeleting}
                className="font-bold"
              >
                {isDeleting ? 'Borrando...' : 'Borrar Cliente'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente
              al cliente y todos los datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Borrando...' : 'Borrar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
