import classNames from 'classnames'
import { FC } from 'react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'

import styles from './SelectedProduct.module.scss'

type SelectedProductPropsType = {
  name: string
  number: number
  id: number
  count: number
  currentCount: number
  changeCount: (id: number, mode: 'increment' | 'decrement') => void
}

const SelectedProduct: FC<SelectedProductPropsType> = ({
  name,
  number,
  id,
  count,
  currentCount,
  changeCount,
}) => {
  return (
    <div className={styles.item}>
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
                    if (currentCount !== 0) {
                      changeCount(id, 'decrement')
                    }
                  }}
                  className={classNames(
                    styles.counterBtn,
                    styles.minus,
                    currentCount === 0 && styles.disable
                  )}
                >
                  –
                </div>
              </div>
            </div>
            <div className={styles.stock}>
              <div className={styles.stockLabel}>Выбрано на сумму:</div>
              <div className={styles.stockNumber}>
                посчитать и приделать кнопку закрытия на айтем
              </div>
            </div>
            <div className={styles.stock}>
              <div className={styles.stockLabel}>Всего на складе:</div>
              <div className={styles.stockNumber}>{count}</div>
            </div>
          </>
        ) : (
          <div>
            <div className={styles.noExist}>Данного товара нет на складе :(</div>
            <div className={styles.btns}>
              <div className={styles.btnHave}>
                <TextButton small type={ButtonTypeEnum.PRIMARY}>
                  Есть на складе
                </TextButton>
              </div>
              <TextButton small>Убрать со списка</TextButton>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default SelectedProduct
