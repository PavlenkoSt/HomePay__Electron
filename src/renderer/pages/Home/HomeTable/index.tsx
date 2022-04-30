import { useState } from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import formatWithFloat from 'renderer/utilts/formatWithFloat'
import EditBillModal from './EditBillModal'

import styles from './styles.module.scss'

import editPic from 'renderer/assets/edit.svg'

const HomeTable = () => {
  const { moneyStore, productsStore } = useStore()

  const [editBillVisible, setEditBillVisible] = useState(false)

  return (
    <>
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
            <td className={classNames(styles.value, styles.valueBill)}>
              {formatWithFloat(moneyStore.bill, true)}
              <div onClick={() => setEditBillVisible(true)} className={styles.edit}>
                <img className={styles.editBtn} src={editPic} title="Редактировать" />
              </div>
            </td>
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
      <EditBillModal visible={editBillVisible} setVisible={setEditBillVisible} />
    </>
  )
}

export default observer(HomeTable)
