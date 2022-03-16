import allProdPic from 'renderer/assets/boxes.svg'

import styles from './AllProductsBtn.module.scss'

const AllProductsBtn = () => {
  return (
    <div title="Открыть все товары" className={styles.allProductsBtn}>
      <img src={allProdPic} />
    </div>
  )
}

export default AllProductsBtn
