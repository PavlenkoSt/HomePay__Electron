export default interface IProduct {
  id: number
  name: string
  price: {
    retail: number
    wholesale: number
  }
  count: number
  categoryId: number | null
}
