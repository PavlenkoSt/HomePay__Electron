import { observer } from 'mobx-react-lite'

import numWord from 'renderer/helpers/numWord'
import { useStore } from 'renderer/store'

import styles from './ProductsHeader.module.scss'

import backArrow from 'renderer/assets/arrow.svg'

const ProductsHeader = () => {
  const { productsStore } = useStore()

  const productsCount = numWord(productsStore.activeCategoryCount(), ['товар', 'товара', 'товаров'])

  return (
    <div className={styles.header}>
      <div className={styles.btn} onClick={() => productsStore.setActiveCategoryId(null)}>
        <img src={backArrow} className={styles.pic} />
        <span className={styles.btnText}>К категориям</span>
      </div>
      <div>/</div>
      <div
        className={styles.category}
      >{`${productsStore.activeCategoryName()} (${productsStore.activeCategoryCount()} ${productsCount})`}</div>
    </div>
  )
}

export default observer(ProductsHeader)
