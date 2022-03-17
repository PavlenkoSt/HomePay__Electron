import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import Product from './Product'

import styles from './ProductsTable.module.scss'

const ProductsTable = () => {
  const { productsStore } = useStore()

  return (
    //@ts-ignore
    <table className={styles.table} border="1" cellPadding={4} cellSpacing={0}>
      <thead>
        <tr>
          <th rowSpan={2}>Название</th>
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
        {productsStore.products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </tbody>
    </table>
  )
}

export default observer(ProductsTable)
