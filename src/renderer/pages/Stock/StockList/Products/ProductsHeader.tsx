import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'

import styles from './ProductsHeader.module.scss'

import backArrow from 'renderer/assets/arrow.svg'

const ProductsHeader = () => {
  const { productsStore } = useStore()

  return (
    <div className={styles.header}>
      <div className={styles.btn} onClick={() => productsStore.setActiveCategoryId(null)}>
        <img src={backArrow} className={styles.pic} />
        <span className={styles.btnText}>К категориям</span>
      </div>
      <div>/</div>
      <div className={styles.category}>{productsStore.activeCategoryName()}</div>
    </div>
  )
}

export default observer(ProductsHeader)
