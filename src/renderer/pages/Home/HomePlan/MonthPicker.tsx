import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'

import styles from './MonthPicker.module.scss'

type MonthPickerPropsType = {
  selectedMonth: string | null
  setSelectedMonth: Dispatch<SetStateAction<string | null>>
}

const MonthPicker: FC<MonthPickerPropsType> = ({ selectedMonth, setSelectedMonth }) => {
  const months = useMemo(
    () => [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    []
  )

  return (
    <div className={styles.container}>
      {Array(9)
        .fill('#')
        .map((item, index) => {
          const thisDate = new Date()
          thisDate.setMonth(new Date().getMonth() + index)
          const monthIndex = thisDate.getMonth()
          const year = thisDate.getFullYear()

          const stringDate = `${monthIndex}-${year}`

          return (
            <div
              onClick={() => {
                setSelectedMonth(stringDate)
              }}
              className={classNames(styles.item, index === 5 && styles.havePlan)}
              key={index}
            >
              <div
                className={classNames(styles.text, selectedMonth === stringDate && styles.selected)}
              >{`${months[monthIndex]} ${year}`}</div>
            </div>
          )
        })}
    </div>
  )
}

export default MonthPicker
