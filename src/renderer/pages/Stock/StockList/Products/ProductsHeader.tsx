import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'

import styles from './ProductsHeader.module.scss'

import backArrow from 'renderer/assets/arrow.svg'

const ProductsHeader = () => {
  const { productsStore } = useStore()

  return (
    <div>
      <div className={styles.btn} onClick={() => productsStore.setActiveCategoryId(null)}>
        <img src={backArrow} className={styles.pic} />
        <span className={styles.btnText}>К категориям</span>
      </div>
    </div>
  )
}

export default observer(ProductsHeader)
