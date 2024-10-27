import { Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Product } from '@/lib/types'

type ProductsTableProps = {
  products: Product[]
  loading: boolean
  onDelete: (id: number) => void
}

export function ProductsTable({
  products,
  loading,
  onDelete,
}: ProductsTableProps) {
  return (
    <>
      <Table>
        <TableCaption>
          Tabla de productos por miligramos y laboratorios
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Laboratorio</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-[50px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-x-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            products.map(({ id, name, price, laboratory }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell className="font-semibold">{name}</TableCell>
                <TableCell>{laboratory}</TableCell>
                <TableCell>${price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-x-2">
                    <Link
                      href={`/productos/${id}`}
                      className="bg-sky-600 p-2 rounded hover:bg-sky-700 transition-colors"
                    >
                      <Pencil className="w-4 h-4" color="white" />
                    </Link>
                    <button
                      onClick={() => onDelete(id)}
                      className="bg-red-600 p-2 rounded hover:bg-red-700 transition-colors"
                    >
                      <Trash className="w-4 h-4" color="white" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}
