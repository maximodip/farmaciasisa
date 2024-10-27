interface Account {
  id: number
  creationDate: string
  status: string
  total: number
}

export interface Client {
  id: number
  name: string
  dni: number
  phone: number
  address: string
  accounts: Account[]
}

export interface Product {
  id: number
  name: string
  price: string
  laboratory: string
}

export interface Customer {
  id: number
  name: string
  phone: string
  accounts: string[]
}
