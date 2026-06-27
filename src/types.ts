export type ProductType = string

export interface Product {
  id: string
  name: string
  type: ProductType
  description: string
  builder: string
  city: string | null
  icon: string | null
  link: string | null
}

export type SortOption = 'name' | 'type' | 'has-link'
