import { FC } from 'react'

import IProduct from 'renderer/types/IProduct'

import styles from './Product.module.scss'

type ProductPropsType = {
  product: IProduct
}

const Product: FC<ProductPropsType> = ({ product }) => {
  return (
    <tr className={styles.line}>
      <td>{product.name}</td>
      <td>{product.price.retail}</td>
      <td>{product.price.wholesale}</td>
      <td>{product.price.margin.value}</td>
      <td>{product.price.margin.percent}</td>
      <td>{product.count}</td>
      <td>
        <button>action</button>
      </td>
    </tr>
  )
}

export default Product
