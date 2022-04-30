import { FC } from 'react'
import classNames from 'classnames'

import CloseBtn from 'renderer/components/Btns/CloseBtn'
import TextButton from 'renderer/components/Btns/TextButton'
import formatSumWithFloat from 'renderer/utilts/formatWithFloat'

import styles from './SelectedProduct.module.scss'

type SelectedProductPropsType = {
  name: string
  number: number
  id: number
  count: number
  cost: number
  currentCount: number
  changeCount: (id: number, mode: 'increment' | 'decrement') => void
  removeItem: (id: number) => void
}

const SelectedProduct: FC<SelectedProductPropsType> = ({
  name,
  number,
  id,
  count,
  cost,
  currentCount,
  changeCount,
  removeItem,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.close}>
        <CloseBtn small setVisible={() => removeItem(id)} />
      </div>
      <div className={styles.header}>
        <div className={styles.number}>{number}</div>
        <div className={styles.name}>{name}</div>
      </div>
      <>
        {count !== 0 ? (
          <>
            <div className={styles.count}>
              <div className={styles.countLabel}>Количество:</div>
              <div className={styles.counter}>
                <div
                  onClick={() => {
                    if (currentCount !== count) {
                      changeCount(id, 'increment')
                    }
                  }}
                  className={classNames(
                    styles.counterBtn,
                    currentCount === count && styles.disable
                  )}
                >
                  +
                </div>
                <div className={styles.counterView}>{currentCount}</div>
                <div
                  onClick={() => {
                    if (currentCount !== 1) {
                      changeCount(id, 'decrement')
                    }
                  }}
                  className={classNames(
                    styles.counterBtn,
                    styles.minus,
                    currentCount === 1 && styles.disable
                  )}
                >
                  –
                </div>
              </div>
            </div>
            <div className={styles.textItem}>
              <div className={styles.textItemLabel}>Выбрано на сумму:</div>
              <div className={styles.TextItemNumber}>
                {formatSumWithFloat(currentCount * cost, true)}
              </div>
            </div>
            <div className={styles.textItem}>
              <div className={styles.textItemLabel}>Всего на складе:</div>
              <div className={styles.TextItemNumber}>{count}</div>
            </div>
          </>
        ) : (
          <div>
            <div className={styles.noExist}>Данного товара нет на складе :(</div>
            <div className={styles.btns}>
              <TextButton small onClick={() => removeItem(id)}>
                Убрать со списка
              </TextButton>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default SelectedProduct
