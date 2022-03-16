import { observer } from 'mobx-react-lite'
import allProdPic from 'renderer/assets/boxes.svg'
import { useStore } from 'renderer/store'

import styles from './AllProductsBtn.module.scss'

const AllProductsBtn = () => {
  const { productsStore } = useStore()

  return (
    <div
      onClick={() => productsStore.setActiveCategoryId('all-products')}
      title="Открыть все товары"
      className={styles.allProductsBtn}
    >
      <img src={allProdPic} />
    </div>
  )
}

export default observer(AllProductsBtn)
