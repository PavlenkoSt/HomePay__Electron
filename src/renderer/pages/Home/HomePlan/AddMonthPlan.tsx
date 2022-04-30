import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'

import ModalWrapper from 'renderer/components/ModalWrapper'
import MonthPicker from './MonthPicker'

import styles from './AddMonthPlan.module.scss'
import Input from 'renderer/components/Form/Input'

type AddMonthPlanPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const AddMonthPlan: FC<AddMonthPlanPropsType> = ({ visible, setVisible }) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  const [benefits, setBenefits] = useState('0')

  const close = useCallback(() => {
    setSelectedMonth(null)
    setVisible(false)
  }, [])

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Добавить план на месяц</h2>
        <h4 className={styles.title}>Выберите месяц</h4>
        <div className={styles.picker}>
          <MonthPicker selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        </div>
        {!!selectedMonth && (
          <div>
            <Input
              label="Ожидаемый доход"
              value={benefits}
              setValue={(text: string) => setBenefits((+text).toString())}
              type="number"
            />
          </div>
        )}
      </div>
    </ModalWrapper>
  )
}

export default AddMonthPlan
