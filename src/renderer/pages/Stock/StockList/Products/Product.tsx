import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import IProduct from 'renderer/types/IProduct'

import styles from './Product.module.scss'

import optionsPic from 'renderer/assets/options.svg'
import removePic from 'renderer/assets/close.svg'
import RemoveProductModal from './RemoveProductModal'

type ProductPropsType = {
  product: IProduct
}

const Product: FC<ProductPropsType> = ({ product }) => {
  const [removeProductModalVisible, setRemoveProductModalVisible] = useState(false)

  return (
    <>
      <tr className={styles.line}>
        <td>{product.name}</td>
        <td>{product.price.retail.toFixed(2)}</td>
        <td>{product.price.wholesale.toFixed(2)}</td>
        <td>{product.price.margin.value.toFixed(2)}</td>
        <td>{product.price.margin.percent}</td>
        <td>{product.count}</td>
        <td className={styles.action}>
          <div className={styles.btn} title="Редактировать">
            <img className={styles.pic} src={optionsPic} />
          </div>
          <div
            onClick={() => setRemoveProductModalVisible(true)}
            className={styles.btn}
            title="Удалить"
          >
            <img className={styles.pic} src={removePic} />
          </div>
        </td>
      </tr>
      <RemoveProductModal
        visible={removeProductModalVisible}
        setVisible={setRemoveProductModalVisible}
        product={product}
      />
    </>
  )
}

export default observer(Product)
