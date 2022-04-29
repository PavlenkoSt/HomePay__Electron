import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'

import styles from './styles.module.scss'

const HomeTable = () => {
  const { moneyStore, productsStore } = useStore()

  return (
    <table
      className={styles.table}
      //@ts-ignore
      border="1"
      cellPadding={4}
      cellSpacing={0}
    >
      <tbody>
        <tr className={styles.tr}>
          <td className={styles.option}>Текущий баланс в кассе</td>
          <td className={styles.value}>{moneyStore.bill} ₴</td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.option}>Товаров на складе на сумму</td>
          <td className={styles.value}>{productsStore.retailMoneyInProducts()} ₴</td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.option}>Продаж за сегодня на сумму</td>
          <td className={styles.value}></td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.option}>Продаж в текущем месяце на сумму</td>
          <td className={styles.value}></td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.option}>Финансовый план на текущий месяц</td>
          <td className={styles.value}></td>
        </tr>
      </tbody>
    </table>
  )
}

export default observer(HomeTable)
