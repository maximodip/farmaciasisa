'use client'

import { useEffect, useState } from 'react'
import { getProducts } from '../api/productos/route'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@/lib/types'
import { ProductsTable } from '../src/components/ProductsTable'
import { AddProductButton } from '../src/components/AddProductButton'
import SearchInput from '@/components/ui/search-input'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<Product[]>([])

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()
        const data: Product[] = await response.json()
        setProducts(data)
        setFilteredData(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('Failed to delete client')
      }

      toast({
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado exitosamente',
      })

      router.refresh()
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error al borrar el cliente',
      })
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setSearchTerm(value)

    if (value === '') {
      setFilteredData(products)
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value)
      )
      setFilteredData(filtered)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4 gap-x-12 max-md:flex-wrap">
        <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
        <SearchInput onChange={handleSearch} value={searchTerm} />
        <AddProductButton />
      </div>
      <ProductsTable
        products={filteredData}
        loading={loading}
        onDelete={handleDelete}
      />
    </>
  )
}
