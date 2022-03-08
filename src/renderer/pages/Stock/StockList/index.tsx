import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { useStore } from 'renderer/store'

import Category from './Category'

import styles from './styles.module.scss'

const StockList = () => {
  const { productsStore } = useStore()

  useEffect(() => {
    productsStore.init()
  }, [])

  return (
    <div>
      <div>
        <h2 className="title">Категории</h2>
        {productsStore.categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
        <div className={styles.categoryWrapper}>
          <button className={styles.addCategory}>+</button>
        </div>
      </div>
    </div>
  )
}

export default observer(StockList)
