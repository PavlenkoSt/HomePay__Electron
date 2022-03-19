import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import IProduct from 'renderer/types/IProduct'

import styles from './Product.module.scss'

import optionsPic from 'renderer/assets/options.svg'
import removePic from 'renderer/assets/close.svg'

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
      <td className={styles.action}>
        <div className={styles.btn} title="Редактировать">
          <img className={styles.pic} src={optionsPic} />
        </div>
        <div className={styles.btn} title="Удалить">
          <img className={styles.pic} src={removePic} />
        </div>
      </td>
    </tr>
  )
}

export default observer(Product)
