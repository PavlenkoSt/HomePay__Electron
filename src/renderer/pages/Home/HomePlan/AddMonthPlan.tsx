import { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react'
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'
import Input from 'renderer/components/Form/Input'

import styles from './AddMonthPlan.module.scss'

type AddMonthPlanPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const AddMonthPlan: FC<AddMonthPlanPropsType> = ({ visible, setVisible }) => {
  const { state, onChange, setState } = useCheckboxState()

  const [benefits, setBenefits] = useState('0')
  const [autoContinueMonthPlan, setAutoContinueMonthPlan] = useState(true)

  const close = useCallback(() => {
    setVisible(false)
    setAutoContinueMonthPlan(true)
  }, [])

  const set = useCallback(() => {
    console.log('state', state)
  }, [state])

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

  const currentDate = useMemo(() => {
    const date = new Date()

    return `${months[date.getMonth()]} ${date.getFullYear()}`
  }, [months])

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Добавить план на текущий месяц ({currentDate})</h2>
        <div>
          <div className={styles.checkbox}>
            <Checkbox
              shape="curve"
              variant="thick"
              color="success-o"
              onChange={onChange}
              state={state}
              //@ts-ignore
              setState={setState}
            >
              Автоматически пересоздавать данный план для следующих месяцев
            </Checkbox>
          </div>
          <Input
            label="Ожидаемый доход"
            value={benefits}
            setValue={(text: string) => setBenefits((+text).toString())}
            type="number"
          />
          <div className={styles.btns}>
            <TextButton onClick={set} type={ButtonTypeEnum.PRIMARY}>
              Принять
            </TextButton>
            <TextButton onClick={close}>Отмена</TextButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default AddMonthPlan
