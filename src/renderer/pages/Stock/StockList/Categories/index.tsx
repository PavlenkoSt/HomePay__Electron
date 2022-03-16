import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import AddBtn from 'renderer/components/Btns/AddBtn'
import { useStore } from 'renderer/store'
import AllProductsBtn from './AllProductsBtn'
import CategoryItem from './CategoryItem'
import CategoryModal from './CategoryModal'

import styles from './styles.module.scss'

const Categories = () => {
  const { productsStore } = useStore()

  const [addModal, setAddModal] = useState(false)

  return (
    <div>
      {productsStore.categories.length ? (
        <>
          <h2 className="title">Категории ({productsStore.categories.length})</h2>
          {productsStore.categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </>
      ) : (
        <div className={styles.message}>Категорий пока нет. Добавьте первую.</div>
      )}
      <div className={styles.categoryWrapper}>
        <AddBtn action={() => setAddModal(true)} title="Добавить категорию" />
        <AllProductsBtn />
      </div>
      <CategoryModal visible={addModal} setVisible={setAddModal} />
    </div>
  )
}

export default observer(Categories)
