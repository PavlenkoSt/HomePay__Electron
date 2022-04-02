import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import Product from './Product'

import styles from './ProductsTable.module.scss'

const ProductsTable = () => {
  const { productsStore } = useStore()

  const sortedProducts = productsStore
    .activeCategoryProducts()
    .slice()
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

  if (!sortedProducts.length) {
    return <div className={styles.noProducts}>В данной категории товаров пока нет.</div>
  }

  return (
    //@ts-ignore
    <table className={styles.table} border="1" cellPadding={4} cellSpacing={0}>
      <thead>
        <tr>
          <th rowSpan={2}>Название</th>
          {productsStore.activeCategoryId === 'all-products' && <th rowSpan={2}>Категория</th>}
          <th colSpan={2}>Цена</th>
          <th colSpan={2}>Наценка</th>
          <th rowSpan={2}>
            <div>На складе</div>
            <div className={styles.rate}>(шт)</div>
          </th>
          <th rowSpan={2}>Действие</th>
        </tr>
        <tr>
          <th>
            <div>Закупочная</div>
            <div className={styles.rate}>(грн)</div>
          </th>
          <th>
            <div>Продажная</div>
            <div className={styles.rate}>(грн)</div>
          </th>
          <th>
            <div>Валюта</div>
            <div className={styles.rate}>(грн)</div>
          </th>
          <th>
            <div>Процент</div>
            <div className={styles.rate}>(%)</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedProducts.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </tbody>
    </table>
  )
}

export default observer(ProductsTable)
