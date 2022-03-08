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
      <div className={styles.list}>
        {productsStore.categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default observer(StockList)
