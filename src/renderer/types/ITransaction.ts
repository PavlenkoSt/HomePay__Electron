export default interface ITransaction {
  id: number
  date: Date
  money: number
  productDetais: IProdcutDetails[]
}

interface IProdcutDetails {
  productId: number
  count: number
}
