import { FC } from 'react'
import IProduct from 'renderer/types/IProduct'

type ProductPropsType = {
  product: IProduct
}

const Product: FC<ProductPropsType> = ({ product }) => {
  return <div>{product.name}</div>
}

export default Product
