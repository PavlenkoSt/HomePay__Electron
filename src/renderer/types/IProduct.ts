export default interface IProduct {
  id: number
  name: string
  price: {
    retail: number
    wholesale: number
    margin: {
      value: number
      percent: number
    }
  }
  count: number
  categoryId: number
}

export interface IProductWithCurrentCount extends IProduct {
  currentCount: number
}
