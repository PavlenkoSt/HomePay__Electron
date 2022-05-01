import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import ModalWrapper from 'renderer/components/ModalWrapper'
import Input from 'renderer/components/Form/Input'
import { useStore } from 'renderer/store'
import ToastService from 'renderer/services/ToastService'

import styles from './AddMonthPlan.module.scss'

const months = [
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
]

type AddMonthPlanPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const AddMonthPlan: FC<AddMonthPlanPropsType> = ({ visible, setVisible }) => {
  const { plansStore } = useStore()

  const {
    state: autoContinueMonthPlan,
    setState: setAutoContinueMonthPlan,
    onChange,
  } = useCheckboxState()

  const [benefits, setBenefits] = useState('0')

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const set = useCallback(() => {
    plansStore.setMonthPlansSettingsDB({
      autoCreate: !!autoContinueMonthPlan,
      sum: +benefits,
    })

    close()

    ToastService.showSuccess('Схема добавлена')
  }, [autoContinueMonthPlan, benefits])

  useEffect(() => {
    if (plansStore.monthPlansSettings) {
      setAutoContinueMonthPlan(plansStore.monthPlansSettings.autoCreate)
      if (plansStore.monthPlansSettings.sum) {
        setBenefits(plansStore.monthPlansSettings.sum.toString())
      }
    }
  }, [plansStore.monthPlansSettings])

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
              state={autoContinueMonthPlan}
              //@ts-ignore
              setState={setAutoContinueMonthPlan}
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
