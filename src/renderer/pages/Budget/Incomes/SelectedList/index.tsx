import { FC } from 'react'

import IProduct from 'renderer/types/IProduct'
import SelectedProduct from './SelectedProduct'

import styles from './styles.module.scss'

type SelectedListPropsType = {
  selectedProducts: IProduct[]
}

const SelectedList: FC<SelectedListPropsType> = ({ selectedProducts }) => {
  return (
    <div>
      <h4 className={styles.title}>Выбранные товары</h4>
      <div>
        {selectedProducts.map((product) => (
          <SelectedProduct key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default SelectedList
