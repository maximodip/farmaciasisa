// app/new-customer/page.tsx
'use client'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import LoadingSkeleton from './loading'
import { Customer } from '@/lib/types'

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [filteredData, setFilteredData] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch customers from the local API route
  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/clientes')
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setCustomers(data)
      setFilteredData(data)
    } catch (error) {
      console.error('Failed to fetch customers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setSearchTerm(value)

    if (value === '') {
      setFilteredData(customers)
    } else {
      const filtered = customers.filter((customer) =>
        customer.name.toLowerCase().includes(value)
      )
      setFilteredData(filtered)
    }
  }

  return (
    <div className="">
      <Input
        type="search"
        className="mb-4"
        placeholder="Nombre"
        onChange={handleSearch}
        value={searchTerm}
      />
      <h1>Lista de clientes</h1>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
          {customers.length === 0 ? (
            <p>No customers found</p>
          ) : (
            filteredData.map((customer) => (
              <Link
                href={`/clientes/${customer.id}`}
                key={customer.id}
                className="flex flex-col bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
              >
                <span className="font-medium text-2xl">{customer.name}</span>
                <span>
                  {customer.accounts.length}{' '}
                  {customer.accounts.length > 1 ? 'cuentas' : 'cuenta'}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
