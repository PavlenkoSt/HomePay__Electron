import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { useStore } from 'renderer/store'

import Category from './Category'
import CategoryModal from './Category/CategoryModal'
import AddBtn from 'renderer/components/Btns/AddBtn'

import styles from './styles.module.scss'
import AllProductsBtn from './AllProductsBtn'

const StockList = () => {
  const { productsStore } = useStore()

  useEffect(() => {
    productsStore.init()
  }, [])

  const [addModal, setAddModal] = useState(false)

  return (
    <div>
      <div>
        <h2 className="title">Категории</h2>
        {productsStore.categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
        <div className={styles.categoryWrapper}>
          <AddBtn action={() => setAddModal(true)} title="Добавить категорию" />
          <AllProductsBtn />
        </div>
        <CategoryModal visible={addModal} setVisible={setAddModal} />
      </div>
    </div>
  )
}

export default observer(StockList)
