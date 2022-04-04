import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import { useStore } from 'renderer/store'
import Product from './Product'

import styles from './ProductsTable.module.scss'

type ProductsTablePropsType = {
  search: string
}

const ProductsTable: FC<ProductsTablePropsType> = ({ search }) => {
  const { productsStore } = useStore()

  const sortedProducts = productsStore
    .activeCategoryProducts()
    .slice()
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

  if (!sortedProducts.length) {
    if (search) {
      return (
        <div className={styles.noProducts}>
          По запросу "<i>{search}</i>" товаров не найдено.
        </div>
      )
    }

    if (productsStore.activeCategoryId === 'all-products') {
      return <div className={styles.noProducts}>Товаров пока нет.</div>
    } else {
      return <div className={styles.noProducts}>В данной категории товаров пока нет.</div>
    }
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
