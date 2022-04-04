import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import AddBtn from 'renderer/components/Btns/AddBtn'
import AddProductModal from './AddProductModal'
import ProductsHeader from './ProductsHeader'
import ProductsTable from './ProductsTable'

import styles from './styles.module.scss'
import { useStore } from 'renderer/store'

const Products = () => {
  const [addProductModalVisible, setAddProductModalVisible] = useState(false)
  const [search, setSearch] = useState('')

  const { productsStore } = useStore()

  useEffect(() => {
    productsStore.setSearchableProduct(search)
  }, [search])

  return (
    <div>
      <ProductsHeader search={search} setSearch={setSearch} />
      <ProductsTable search={search} />
      <div className={styles.btns}>
        <AddBtn action={() => setAddProductModalVisible(true)} title="Добавить товар" />
      </div>
      <AddProductModal visible={addProductModalVisible} setVisible={setAddProductModalVisible} />
    </div>
  )
}

export default observer(Products)
