export interface Product {
  id: number,
  name: string,
  price: number
}

export interface Item{
  product_id: number,
  quantity: number
}

export interface Branch{
  id: string,
  name: string
}
